import { NextResponse } from "next/server";
import { db, isMockMode, mockDbActions } from "@/db/db";
import { leaderboard, members } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    if (isMockMode) {
      const data = await mockDbActions.getLeaderboard();
      return NextResponse.json(data);
    }

    const data = await db!
      .select({
        id: leaderboard.id,
        memberId: leaderboard.memberId,
        score: leaderboard.score,
        eventsAttended: leaderboard.eventsAttended,
        updatedAt: leaderboard.updatedAt,
        member: {
          name: members.name,
          hackerrankUsername: members.hackerrankUsername,
        },
      })
      .from(leaderboard)
      .leftJoin(members, eq(leaderboard.memberId, members.id))
      .orderBy(desc(leaderboard.score))
      .limit(10);

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET LEADERBOARD ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
