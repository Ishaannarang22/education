import { NextResponse } from "next/server";

export async function GET() {
  const courses = [
    { id: 1, name: "CS 101: Introduction to Programming", progress: 75, due: "Dec 15", focus: "Data Structures" },
    { id: 2, name: "History 205: World Civilizations", progress: 40, due: "Dec 22", focus: "Renaissance Art" },
    { id: 3, name: "Math 310: Calculus III", progress: 92, due: "Dec 8", focus: "Vector Fields" },
  ];
  return NextResponse.json({ courses });
}