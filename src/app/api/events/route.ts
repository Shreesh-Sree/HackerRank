import { NextResponse } from "next/server";
import { db, isMockMode, mockDbActions } from "@/db/db";
import { events } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    if (isMockMode) {
      const data = await mockDbActions.getEvents();
      return NextResponse.json(data);
    }

    const data = await db!.select().from(events).orderBy(desc(events.date));
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, type, date, venue, maxCapacity } = body;

    if (!title || !description || !type || !date || !venue || !maxCapacity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const eventDate = new Date(date);

    if (isMockMode) {
      const newEvent = await mockDbActions.createEvent({
        title,
        description,
        type,
        date: eventDate,
        venue,
        maxCapacity: Number(maxCapacity),
      });
      return NextResponse.json({ success: true, event: newEvent });
    }

    const newEvent = await db!
      .insert(events)
      .values({
        title,
        description,
        type,
        date: eventDate,
        venue,
        maxCapacity: Number(maxCapacity),
      })
      .returning();

    return NextResponse.json({ success: true, event: newEvent[0] });
  } catch (error) {
    console.error("POST EVENT ERROR:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
