// Google Calendar integration — availability + booking
// Soporta dos propósitos:
//   - "discovery": llamada de venta inicial (Alexander, founder@kreoon.com)
//   - "kickoff":  onboarding post-pago (Brian, operaciones@kreoon.com)

export type BookingPurpose = "discovery" | "kickoff";

interface Host {
  key: string;
  name: string;
  email: string;
  refreshToken: string;
}

function getHosts(purpose: BookingPurpose = "discovery"): Host[] {
  if (purpose === "kickoff") {
    const opsToken = process.env.GOOGLE_REFRESH_TOKEN_OPS;
    if (!opsToken) return [];
    return [
      {
        key: "ops",
        name: "Brian",
        email: "operaciones@kreoon.com",
        refreshToken: opsToken,
      },
    ];
  }

  // Default: discovery → Alexander
  const founderToken = process.env.GOOGLE_REFRESH_TOKEN_FOUNDER;
  if (!founderToken) return [];
  return [
    {
      key: "founder",
      name: "Alexander",
      email: "founder@kreoon.com",
      refreshToken: founderToken,
    },
  ];
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
  end: string; // ISO
  host_key: string;
  host_name: string;
}

// Config — horario de oficina: 8am-12pm y 2pm-7pm COT
const MORNING_START = 8;
const MORNING_END = 12;
const AFTERNOON_START = 14;
const AFTERNOON_END = 19;
const SLOT_DURATION_MIN = 30;
const BUFFER_MIN = 15;
const MIN_ADVANCE_HOURS = 4;
const DAYS_AHEAD = 14;
const BLOCKED_DAYS = [0, 6]; // Domingo, Sábado

export async function getAvailableSlots(
  purpose: BookingPurpose = "discovery",
): Promise<TimeSlot[]> {
  const hosts = getHosts(purpose);
  if (hosts.length === 0) return [];

  const now = new Date();
  const timeMin = new Date(now);
  timeMin.setHours(timeMin.getHours() + MIN_ADVANCE_HOURS);
  const timeMax = new Date(now);
  timeMax.setDate(timeMax.getDate() + DAYS_AHEAD);

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
          },
        );
        const data = await res.json();
        const busy: Array<{ start: string; end: string }> =
          data.calendars?.primary?.busy || [];
        return { host, busy };
      } catch (err) {
        console.error(`[calendar] FreeBusy failed for ${host.name}:`, err);
        return null;
      }
    }),
  );

  const allSlots: TimeSlot[] = [];
  const bufferMs = BUFFER_MIN * 60 * 1000;

  const validHosts = busyByHost.filter(
    (h): h is { host: Host; busy: Array<{ start: string; end: string }> } =>
      h !== null,
  );

  if (validHosts.length === 0) {
    console.error("[calendar] No valid hosts — all token refreshes failed");
    return [];
  }

  for (const { host, busy } of validHosts) {
    const busyRanges = busy.map((b) => ({
      start: new Date(b.start).getTime() - bufferMs,
      end: new Date(b.end).getTime() + bufferMs,
    }));

    const day = new Date(timeMin);
    day.setUTCHours(0, 0, 0, 0);

    while (day < timeMax) {
      const dayOfWeek = day.getDay();

      if (!BLOCKED_DAYS.includes(dayOfWeek)) {
        const blocks = [
          { start: MORNING_START, end: MORNING_END },
          { start: AFTERNOON_START, end: AFTERNOON_END },
        ];

        for (const block of blocks) {
          for (let hour = block.start; hour < block.end; hour++) {
            for (let min = 0; min < 60; min += SLOT_DURATION_MIN) {
              const endHour = hour + Math.floor((min + SLOT_DURATION_MIN) / 60);
              const endMin = (min + SLOT_DURATION_MIN) % 60;
              if (endHour > block.end || (endHour === block.end && endMin > 0))
                continue;

              const slotStart = new Date(day);
              // COT = UTC-5
              slotStart.setUTCHours(hour + 5, min, 0, 0);
              const slotEnd = new Date(
                slotStart.getTime() + SLOT_DURATION_MIN * 60 * 1000,
              );

              if (slotStart.getTime() < timeMin.getTime()) continue;

              const isAvailable = !busyRanges.some(
                (b) => slotStart.getTime() < b.end && slotEnd.getTime() > b.start,
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
      }

      day.setDate(day.getDate() + 1);
    }
  }

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
    finalSlots.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
    return finalSlots;
  }

  allSlots.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
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
  attendee: { name: string; email: string; company?: string; score?: number },
  options: { purpose?: BookingPurpose } = {},
): Promise<BookingResult> {
  const purpose = options.purpose ?? "discovery";
  const hosts = getHosts(purpose);
  const host = hosts.find((h) => h.key === slot.host_key);
  if (!host) {
    if (hosts.length === 0) {
      throw new Error(
        `No hay host configurado para "${purpose}". Falta el refresh token en env.`,
      );
    }
    throw new Error("Host not found");
  }

  // Validar mínimo 4h de anticipación
  const slotTime = new Date(slot.start).getTime();
  const minTime = Date.now() + MIN_ADVANCE_HOURS * 60 * 60 * 1000;
  if (slotTime < minTime) {
    throw new Error(
      "Este horario ya no está disponible. Selecciona otro con al menos 4 horas de anticipación.",
    );
  }

  // Anti race-condition: revalidar disponibilidad
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
    },
  );
  const checkData = await checkRes.json();
  const conflicts = checkData.calendars?.primary?.busy || [];
  if (conflicts.length > 0) {
    throw new Error(
      "Este horario acaba de ser reservado. Por favor selecciona otro.",
    );
  }

  // Customizar summary y descripción según el propósito
  const isKickoff = purpose === "kickoff";
  const companyTag = attendee.company ? ` (${attendee.company})` : "";
  const summary = isKickoff
    ? `Onboarding de inicio — ${attendee.name}${companyTag} | UGC Colombia`
    : `Llamada de Diagnóstico Estratégico — ${attendee.name}${companyTag} | UGC Colombia`;

  const description = isKickoff
    ? [
        "Sesión de kickoff post-pago con UGC Colombia.",
        "",
        `Cliente: ${attendee.name}`,
        `Empresa: ${attendee.company || "N/A"}`,
        `Correo: ${attendee.email}`,
        "",
        `Coordinador de cuenta: ${host.name} (${host.email})`,
        "",
        "Agenda sugerida:",
        "• Confirmación de objetivos comerciales del cliente.",
        "• Revisión de marca, productos y diferenciales.",
        "• Selección de creadores y calendario de producción.",
        "• Próximos pasos + entrega de assets necesarios.",
        "",
        "— Generado automáticamente por ugccolombia.co tras el pago",
      ].join("\n")
    : [
        "Llamada de diagnóstico con UGC Colombia.",
        "",
        `Nombre: ${attendee.name}`,
        `Empresa: ${attendee.company || "N/A"}`,
        `Email: ${attendee.email}`,
        `Score: ${attendee.score || "N/A"}/100`,
        "",
        `Host: ${host.name} (${host.email})`,
        "",
        "— Generado automáticamente por ugccolombia.co",
      ].join("\n");

  const event = {
    summary,
    description,
    start: { dateTime: slot.start, timeZone: "America/Bogota" },
    end: { dateTime: slot.end, timeZone: "America/Bogota" },
    attendees: [
      { email: attendee.email, displayName: attendee.name },
      { email: host.email, displayName: host.name },
    ],
    conferenceData: {
      createRequest: {
        requestId: `ugc-${purpose}-${Date.now()}`,
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
    colorId: isKickoff ? "10" : "5", // 10 = verde basil para kickoff, 5 = banana
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
    },
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
    meet_link:
      data.hangoutLink || data.conferenceData?.entryPoints?.[0]?.uri,
  };
}
