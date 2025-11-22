import { NextResponse } from "next/server";

export async function GET() {
  const mastery = {
    overallScore: 78,
    topicsMastered: 12,
    hoursThisWeek: 6.5,
  };
  return NextResponse.json({ mastery });
}