// Google Calendar integration — availability + booking
// Uses OAuth refresh tokens for Alexander (founder) and Brian (ops)

interface Host {
  key: string;
  name: string;
  email: string;
  refreshToken: string;
}

function getHosts(): Host[] {
  const hosts: Host[] = [];

  const founderToken = process.env.GOOGLE_REFRESH_TOKEN_FOUNDER;
  if (founderToken) {
    hosts.push({
      key: "founder",
      name: "Alexander",
      email: "founder@kreoon.com",
      refreshToken: founderToken,
    });
  }

  const opsToken = process.env.GOOGLE_REFRESH_TOKEN_OPS;
  if (opsToken) {
    hosts.push({
      key: "ops",
      name: "Brian",
      email: "operaciones@kreoon.com",
      refreshToken: opsToken,
    });
  }

  return hosts;
}

async function getAccessToken(refreshToken: string): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Google OAuth not configured");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to refresh Google token");
  return data.access_token;
}

// ─── Availability ────────────────────────────────────────────────────────────

export interface TimeSlot {
  start: string; // ISO
  end: string;   // ISO
  host_key: string;
  host_name: string;
}

// Business hours in COT (UTC-5)
const BUSINESS_START_HOUR = 9;  // 9 AM
const BUSINESS_END_HOUR = 18;   // 6 PM
const SLOT_DURATION_MIN = 30;
const DAYS_AHEAD = 14;
const BLOCKED_DAYS = [0, 6]; // Sunday=0, Saturday=6

export async function getAvailableSlots(): Promise<TimeSlot[]> {
  const hosts = getHosts();
  if (hosts.length === 0) return [];

  // Time range: today + 14 days
  const now = new Date();
  const timeMin = new Date(now);
  timeMin.setMinutes(timeMin.getMinutes() + 60); // at least 1h from now
  const timeMax = new Date(now);
  timeMax.setDate(timeMax.getDate() + DAYS_AHEAD);

  // Get busy times for all hosts in parallel
  const busyByHost = await Promise.all(
    hosts.map(async (host) => {
      try {
        const token = await getAccessToken(host.refreshToken);
        const res = await fetch(
          "https://www.googleapis.com/calendar/v3/freeBusy",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              timeMin: timeMin.toISOString(),
              timeMax: timeMax.toISOString(),
              items: [{ id: "primary" }],
            }),
          }
        );
        const data = await res.json();
        const busy: Array<{ start: string; end: string }> =
          data.calendars?.primary?.busy || [];
        return { host, busy };
      } catch {
        return { host, busy: [] as Array<{ start: string; end: string }> };
      }
    })
  );

  // Generate all possible slots per host
  const allSlots: TimeSlot[] = [];

  for (const { host, busy } of busyByHost) {
    const busyRanges = busy.map((b) => ({
      start: new Date(b.start).getTime(),
      end: new Date(b.end).getTime(),
    }));

    // Iterate day by day
    const day = new Date(timeMin);
    day.setUTCHours(0, 0, 0, 0);

    while (day < timeMax) {
      const dayOfWeek = day.getDay();

      // Skip weekends
      if (!BLOCKED_DAYS.includes(dayOfWeek)) {
        // Generate slots for this day in COT
        for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour++) {
          for (let min = 0; min < 60; min += SLOT_DURATION_MIN) {
            const slotStart = new Date(day);
            // COT = UTC-5
            slotStart.setUTCHours(hour + 5, min, 0, 0);
            const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MIN * 60 * 1000);

            // Skip slots in the past
            if (slotStart.getTime() < timeMin.getTime()) continue;

            // Check if slot overlaps with any busy period
            const isAvailable = !busyRanges.some(
              (b) => slotStart.getTime() < b.end && slotEnd.getTime() > b.start
            );

            if (isAvailable) {
              allSlots.push({
                start: slotStart.toISOString(),
                end: slotEnd.toISOString(),
                host_key: host.key,
                host_name: host.name,
              });
            }
          }
        }
      }

      day.setDate(day.getDate() + 1);
    }
  }

  // Group by time slot and randomly pick one host per slot
  const slotMap = new Map<string, TimeSlot[]>();
  for (const slot of allSlots) {
    const key = slot.start;
    if (!slotMap.has(key)) slotMap.set(key, []);
    slotMap.get(key)!.push(slot);
  }

  const finalSlots: TimeSlot[] = [];
  for (const [, candidates] of slotMap) {
    // Random pick between available hosts
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    finalSlots.push(pick);
  }

  // Sort by time
  finalSlots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return finalSlots;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export interface BookingResult {
  event_id: string;
  host_name: string;
  host_email: string;
  start: string;
  end: string;
  meet_link?: string;
}

export async function createBooking(
  slot: { start: string; end: string; host_key: string },
  attendee: { name: string; email: string; company?: string; score?: number }
): Promise<BookingResult> {
  const hosts = getHosts();
  const host = hosts.find((h) => h.key === slot.host_key);
  if (!host) throw new Error("Host not found");

  const token = await getAccessToken(host.refreshToken);

  const event = {
    summary: `Discovery Call — ${attendee.company || attendee.name} | UGC Colombia`,
    description: `Llamada de diagnóstico con UGC Colombia.\n\nNombre: ${attendee.name}\nEmpresa: ${attendee.company || "N/A"}\nEmail: ${attendee.email}\nScore: ${attendee.score || "N/A"}/100\n\nHost: ${host.name}`,
    start: { dateTime: slot.start, timeZone: "America/Bogota" },
    end: { dateTime: slot.end, timeZone: "America/Bogota" },
    attendees: [
      { email: attendee.email, displayName: attendee.name },
      { email: host.email, displayName: host.name },
    ],
    conferenceData: {
      createRequest: {
        requestId: `ugc-${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 60 },
        { method: "popup", minutes: 15 },
      ],
    },
    sendUpdates: "all",
  };

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  const data = await res.json();

  if (!data.id) {
    throw new Error(data.error?.message || "Failed to create calendar event");
  }

  return {
    event_id: data.id,
    host_name: host.name,
    host_email: host.email,
    start: slot.start,
    end: slot.end,
    meet_link: data.hangoutLink || data.conferenceData?.entryPoints?.[0]?.uri,
  };
}
