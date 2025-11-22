import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const results = [
    {
      id: "canvas-syllabus",
      title: "Course Syllabus",
      snippet: "Grading rubric and weekly topics including graph algorithms.",
      source: "canvas",
      url: "https://canvas.example/course/syllabus",
      score: 0.92,
      citations: [
        {
          from: "Syllabus Week 7",
          url: "https://canvas.example/course/syllabus#week7",
        },
      ],
    },
    {
      id: "youtube-lecture-3",
      title: "Graph Traversal Explained",
      snippet: "DFS vs BFS with complexity and practical tips.",
      source: "youtube",
      url: "https://youtube.com/watch?v=abc123",
      score: 0.88,
      citations: [
        {
          from: "00:12:31–00:16:04",
          url: "https://youtube.com/watch?v=abc123&t=751",
        },
      ],
    },
  ];
  return NextResponse.json({ query: q, results });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const q = body?.query || "";
  return NextResponse.json({ query: q, results: [] });
}