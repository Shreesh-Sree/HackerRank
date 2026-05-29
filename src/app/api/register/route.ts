import { NextResponse } from "next/server";
import { db, isMockMode, mockDbActions } from "@/db/db";
import { members } from "@/db/schema";
import { z } from "zod";
import { Resend } from "resend";

// Configure Resend safely
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  rollNumber: z.string().min(3, "Invalid roll number"),
  department: z.string().min(2, "Department name is too short"),
  year: z.number().int().min(1).max(4),
  hackerrankUsername: z.string().min(2, "HackerRank username is too short"),
  whyJoin: z.string().min(10, "Tell us a bit more (minimum 10 characters)"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    let newMember;
    if (isMockMode) {
      newMember = await mockDbActions.registerMember(data);
    } else {
      const inserted = await db!
        .insert(members)
        .values({
          ...data,
          isApproved: false, // requires admin review/approve
        })
        .returning();
      newMember = inserted[0];
    }

    // Try sending automated pixel-art confirmation HTML email via Resend
    try {
      if (resend) {
        await resend.emails.send({
          from: "HRCC SJGI <crew@sjgi.edu>",
          to: data.email,
          subject: "Mission Accepted — Welcome to HRCC SJGI!",
          html: `
            <div style="background-color: #050505; color: #F5F5F5; font-family: 'Courier New', monospace; padding: 40px; border: 4px solid #1A0533; text-align: center;">
              <h1 style="color: #39FF14; font-size: 24px; text-shadow: 0 0 10px #39FF14; margin-bottom: 20px;">MISSION ACCEPTED</h1>
              <p style="font-size: 14px; line-height: 1.6; max-width: 500px; margin: 0 auto;">
                Welcome, <strong>${data.name}</strong>, to the elite <strong>HackerRank Campus Crew — St. Joseph's Group of Institutions</strong>.
              </p>
              <div style="border: 2px dashed #00FFFF; padding: 15px; display: inline-block; margin: 30px auto; background-color: #121418;">
                <p style="margin: 0; color: #FFD700; font-size: 12px;">CREW REGISTRATION STATUS:</p>
                <p style="margin: 5px 0 0 0; color: #00FFFF; font-weight: bold; font-size: 16px;">PENDING ADMIN APPROVAL</p>
              </div>
              <p style="font-size: 11px; color: #888; margin-top: 40px;">
                "Code Beyond Reality" <br/>
                &copy; 2025 HRCC SJGI - All Bugs Reserved.
              </p>
            </div>
          `,
        });
        console.log("CONFIRMATION EMAIL DISPATCHED TO:", data.email);
      } else {
        console.log("SIMULATING EMAIL DISPATCH (RESEND_API_KEY NOT CONFIGURED) TO:", data.email);
      }
    } catch (emailErr) {
      console.error("EMAIL DISPATCH ERROR:", emailErr);
      // Suppress email failures to guarantee seamless registration flow
    }

    return NextResponse.json({ success: true, member: newMember });
  } catch (error) {
    console.error("POST REGISTER ERROR:", error);
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
  }
}
