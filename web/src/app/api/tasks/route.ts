import { NextResponse } from "next/server";

export async function GET() {
  const tasks = [
    { id: 101, title: "Final Project Submission", courseId: 1, type: "assignment", date: "2025-12-15", urgency: "high" },
    { id: 102, title: "Practice Quiz: Loops & Functions", courseId: 1, type: "assessment", date: "2025-11-25", urgency: "medium" },
    { id: 103, title: "Watch: The French Revolution (Video Segment 3)", courseId: 2, type: "video", date: "2025-11-28", urgency: "low" },
    { id: 104, title: "Coding Challenge: Binary Search Tree", courseId: 1, type: "coding", date: "2025-12-05", urgency: "high" },
  ];
  return NextResponse.json({ tasks });
}