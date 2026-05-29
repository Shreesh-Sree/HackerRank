import { NextResponse } from "next/server";
import { db, isMockMode, mockDbActions } from "@/db/db";
import { rsvps } from "@/db/schema";
import { z } from "zod";

const rsvpSchema = z.object({
  eventId: z.string().uuid("Invalid event ID format"),
  memberEmail: z.string().email("Invalid email format"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = rsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { eventId, memberEmail, name } = result.data;

    if (isMockMode) {
      const newRsvp = await mockDbActions.rsvpEvent({
        eventId,
        memberEmail,
        name,
      });
      return NextResponse.json({ success: true, rsvp: newRsvp });
    }

    const newRsvp = await db!
      .insert(rsvps)
      .values({
        eventId,
        memberEmail,
        name,
      })
      .returning();

    return NextResponse.json({ success: true, rsvp: newRsvp[0] });
  } catch (error) {
    console.error("POST RSVP ERROR:", error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
