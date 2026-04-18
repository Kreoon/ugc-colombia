import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots, type BookingPurpose } from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

function parsePurpose(value: string | null): BookingPurpose {
  return value === "kickoff" ? "kickoff" : "discovery";
}

export async function GET(req: NextRequest) {
  try {
    const purpose = parsePurpose(req.nextUrl.searchParams.get("purpose"));
    const slots = await getAvailableSlots(purpose);

    const grouped: Record<
      string,
      Array<{
        start: string;
        end: string;
        host_key: string;
        host_name: string;
        time_label: string;
      }>
    > = {};

    for (const slot of slots) {
      const date = new Date(slot.start);
      const cotDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
      const dateKey = cotDate.toISOString().split("T")[0];

      if (!grouped[dateKey]) grouped[dateKey] = [];

      const hours = cotDate.getUTCHours();
      const mins = cotDate.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const h12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      const timeLabel = `${h12}:${mins.toString().padStart(2, "0")} ${ampm}`;

      grouped[dateKey].push({
        start: slot.start,
        end: slot.end,
        host_key: slot.host_key,
        host_name: slot.host_name,
        time_label: timeLabel,
      });
    }

    return NextResponse.json({ slots: grouped, purpose });
  } catch (err) {
    console.error("[availability] Error:", err);
    return NextResponse.json(
      { error: "No se pudo cargar la disponibilidad" },
      { status: 500 },
    );
  }
}
