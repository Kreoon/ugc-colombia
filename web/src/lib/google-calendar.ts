// Google Calendar integration — availability + booking
// Solo founder@kreoon.com por ahora

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

  // Brian deshabilitado por ahora — descomentar cuando se necesite
  // const opsToken = process.env.GOOGLE_REFRESH_TOKEN_OPS;
  // if (opsToken) {
  //   hosts.push({ key: "ops", name: "Brian", email: "operaciones@kreoon.com", refreshToken: opsToken });
  // }

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

// Config — horario de Alexander: 8am-12pm y 2pm-7pm COT
const MORNING_START = 8;          // 8 AM COT
const MORNING_END = 12;           // 12 PM COT (almuerzo empieza)
const AFTERNOON_START = 14;       // 2 PM COT (almuerzo termina)
const AFTERNOON_END = 19;         // 7 PM COT
const SLOT_DURATION_MIN = 30;     // 30 min slots
const BUFFER_MIN = 15;            // 15 min buffer antes y después de eventos
const MIN_ADVANCE_HOURS = 4;      // Mínimo 4 horas de anticipación
const DAYS_AHEAD = 14;            // 14 días hacia adelante
const BLOCKED_DAYS = [0, 6];      // Domingo=0, Sábado=6

export async function getAvailableSlots(): Promise<TimeSlot[]> {
  const hosts = getHosts();
  if (hosts.length === 0) return [];

  // Time range: ahora + 4h mínimo, hasta +14 días
  const now = new Date();
  const timeMin = new Date(now);
  timeMin.setHours(timeMin.getHours() + MIN_ADVANCE_HOURS);
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
      } catch (err) {
        console.error(`[calendar] FreeBusy failed for ${host.name}:`, err);
        // If token fails, return null to skip this host entirely (don't show slots)
        return null;
      }
    })
  );

  const allSlots: TimeSlot[] = [];
  const bufferMs = BUFFER_MIN * 60 * 1000;

  // Filter out failed hosts (null = token failed, don't show their slots)
  const validHosts = busyByHost.filter((h): h is { host: Host; busy: Array<{ start: string; end: string }> } => h !== null);

  if (validHosts.length === 0) {
    console.error("[calendar] No valid hosts — all token refreshes failed");
    return [];
  }

  for (const { host, busy } of validHosts) {
    // Expandir cada busy range con 15min buffer antes y después
    const busyRanges = busy.map((b) => ({
      start: new Date(b.start).getTime() - bufferMs,
      end: new Date(b.end).getTime() + bufferMs,
    }));

    // Iterar día por día
    const day = new Date(timeMin);
    day.setUTCHours(0, 0, 0, 0);

    while (day < timeMax) {
      const dayOfWeek = day.getDay();

      if (!BLOCKED_DAYS.includes(dayOfWeek)) {
        // 2 bloques: mañana (8-12) y tarde (2-7)
        const blocks = [
          { start: MORNING_START, end: MORNING_END },
          { start: AFTERNOON_START, end: AFTERNOON_END },
        ];

        for (const block of blocks) {
        for (let hour = block.start; hour < block.end; hour++) {
          for (let min = 0; min < 60; min += SLOT_DURATION_MIN) {
            // Último slot debe terminar antes del fin del bloque
            const endHour = hour + Math.floor((min + SLOT_DURATION_MIN) / 60);
            const endMin = (min + SLOT_DURATION_MIN) % 60;
            if (endHour > block.end || (endHour === block.end && endMin > 0)) continue;

            const slotStart = new Date(day);
            // COT = UTC-5
            slotStart.setUTCHours(hour + 5, min, 0, 0);
            const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MIN * 60 * 1000);

            // Skip slots que no cumplen mínimo de anticipación (4h)
            if (slotStart.getTime() < timeMin.getTime()) continue;

            // Check si el slot choca con algún busy range (incluyendo buffers)
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
        } // end blocks
      }

      day.setDate(day.getDate() + 1);
    }
  }

  // Si hay múltiples hosts, agrupar por horario y asignar random
  if (hosts.length > 1) {
    const slotMap = new Map<string, TimeSlot[]>();
    for (const slot of allSlots) {
      if (!slotMap.has(slot.start)) slotMap.set(slot.start, []);
      slotMap.get(slot.start)!.push(slot);
    }

    const finalSlots: TimeSlot[] = [];
    for (const [, candidates] of slotMap) {
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      finalSlots.push(pick);
    }
    finalSlots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    return finalSlots;
  }

  // Un solo host — retornar directo
  allSlots.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  return allSlots;
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

  // Validar mínimo 4h de anticipación
  const slotTime = new Date(slot.start).getTime();
  const minTime = Date.now() + MIN_ADVANCE_HOURS * 60 * 60 * 1000;
  if (slotTime < minTime) {
    throw new Error("Este horario ya no está disponible. Selecciona otro con al menos 4 horas de anticipación.");
  }

  // Verificar que el slot sigue disponible (evitar race conditions)
  const token = await getAccessToken(host.refreshToken);
  const slotStart = new Date(slot.start);
  const slotEnd = new Date(slot.end);
  const bufferMs = BUFFER_MIN * 60 * 1000;

  const checkRes = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: new Date(slotStart.getTime() - bufferMs).toISOString(),
        timeMax: new Date(slotEnd.getTime() + bufferMs).toISOString(),
        items: [{ id: "primary" }],
      }),
    }
  );
  const checkData = await checkRes.json();
  const conflicts = checkData.calendars?.primary?.busy || [];
  if (conflicts.length > 0) {
    throw new Error("Este horario acaba de ser reservado. Por favor selecciona otro.");
  }

  // Crear evento
  const event = {
    summary: `Discovery Call — ${attendee.company || attendee.name} | UGC Colombia`,
    description: [
      `Llamada de diagnóstico con UGC Colombia.`,
      ``,
      `Nombre: ${attendee.name}`,
      `Empresa: ${attendee.company || "N/A"}`,
      `Email: ${attendee.email}`,
      `Score: ${attendee.score || "N/A"}/100`,
      ``,
      `Host: ${host.name} (${host.email})`,
      ``,
      `— Generado automáticamente por ugccolombia.co`,
    ].join("\n"),
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
        { method: "email", minutes: 15 },
        { method: "popup", minutes: 15 },
      ],
    },
    colorId: "5", // Banana yellow — matches brand
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
