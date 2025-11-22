import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "📚",
    title: "1. Unified Knowledge Base",
    accent: "border-indigo-500",
    highlights: [
      {
        heading: "Canvas + YouTube Integration",
        text: "Ingest syllabus, assignments, deadlines, and assigned YouTube lectures into one trusted hub.",
      },
      {
        heading: "Powered by Gemini 3",
        text: "Transcripts segmented by topic with citations and embeddings for precision learning and search.",
      },
    ],
  },
  {
    icon: "🗺️",
    title: "2. Your Personalized Learning Plan",
    accent: "border-purple-500",
    highlights: [
      {
        heading: "Adaptive Roadmap",
        text: "Dynamic topic graph that maps prerequisites and personalizes a study schedule with spaced practice.",
      },
      {
        heading: "Deadline-Driven Priority",
        text: "Canvas due dates automatically drive what to tackle next so you stay ahead of coursework.",
      },
    ],
  },
  {
    icon: "📝",
    title: "3. Practice Makes Perfect",
    accent: "border-pink-500",
    highlights: [
      {
        heading: "Generated Exams & Forms",
        text: "Practice questions and coding challenges with source-linked citations for every answer.",
      },
      {
        heading: "Practice & Timed Modes",
        text: "Train for any format with flexible practice settings and detailed performance analytics.",
      },
    ],
  },
  {
    icon: "🤖",
    title: "4. The Live Coding Coach (MVP)",
    accent: "border-yellow-400",
    highlights: [
      {
        heading: "Interactive Coding Environment",
        text: "LeetCode-style Python sandbox with tests to keep students honest and unblocked.",
      },
      {
        heading: "Personal AI Character",
        text: "Animated coach reacts to errors in real time and offers tiered hints tied to the learning plan.",
      },
    ],
  },
];

const benefits = [
  {
    icon: "🧠",
    title: "Smarter Study",
    text: "AI identifies your gaps and focuses time on the topics you need most.",
  },
  {
    icon: "🔍",
    title: "Instant Answers & RAG",
    text: "Citable search across every Canvas document and lecture transcript.",
  },
  {
    icon: "🥇",
    title: "True Mastery",
    text: "Spaced repetition converts short-term recall into durable knowledge.",
  },
  {
    icon: "🤝",
    title: "Personalized Help",
    text: "Context-aware coaching keeps you in flow when code hits a roadblock.",
  },
  {
    icon: "📅",
    title: "Stay on Track",
    text: "Assignments, deadlines, and tasks prioritized in one adaptive plan.",
  },
  {
    icon: "💡",
    title: "Deep Learning Insights",
    text: "Telemetry on time-on-task, hint usage, and test performance.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_35%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <span className="mr-2 inline-block">🚀</span> Elevate Your Learning: The AI-Powered
            Education Platform
          </h1>
          <p className="mt-4 text-xl font-light sm:text-2xl">Stop Studying. Start Mastering.</p>
          <p className="mt-6 text-lg text-indigo-50 sm:text-xl">
            Welcome to the future of learning—where your course materials and video lectures become a
            personalized, adaptive roadmap to mastery. Canvas courses, YouTube’s depth, and Gemini 3
            power every plan, assessment, and coding session.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="rounded-full bg-yellow-400 px-8 py-3 text-base font-bold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-yellow-300"
            >
              <a href="/dashboard">Sign Up with Google</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-white bg-transparent px-8 py-3 text-base font-bold text-white transition hover:bg-white hover:text-indigo-600"
            >
              <a href="/canvas">Connect Your Canvas Account</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="space-y-16 pb-16 md:space-y-24 md:pb-24">
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-slate-900 md:text-4xl">
            ✨ How It Works: Your Adaptive Learning Ecosystem
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className={`h-full border-t-4 ${feature.accent} bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-indigo-200/60`}
              >
                <CardContent className="space-y-3 p-6">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  {feature.highlights.map((item) => (
                    <div key={item.heading}>
                      <p className="text-sm font-semibold text-slate-700">{item.heading}:</p>
                      <p className="text-sm text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-center text-3xl font-extrabold text-slate-900 md:text-4xl">
              💡 Key Benefits for Students
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="bg-white shadow-md">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <span className="text-2xl text-indigo-500">{benefit.icon}</span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{benefit.title}</h4>
                      <p className="text-sm text-slate-600">{benefit.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-600 to-purple-500 py-16 text-white md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">🔒 Security & Privacy You Can Trust</h2>
            <p className="mt-4 text-lg font-light">
              We integrate securely with Canvas and YouTube. Your data stays private, protected with FERPA-aligned
              guardrails, and only used to enhance your learning experience.
            </p>
            <h3 className="mt-10 text-3xl font-bold">Ready to Transform Your Study Habit?</h3>
            <p className="mt-4 text-xl">
              Turn course chaos into a clear, actionable path to A&apos;s with adaptive plans and a live coding coach.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-white px-10 py-4 text-lg font-bold text-indigo-600 shadow-lg transition hover:scale-[1.02] hover:bg-gray-200"
              >
                <a href="/dashboard">➡️ Sign Up with Google</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 border-white bg-transparent px-10 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-indigo-600"
              >
                <a href="/canvas">Connect Your Canvas</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-6 text-center text-sm text-white">
        <div className="mx-auto max-w-6xl px-6">
          &copy; {new Date().getFullYear()} Adaptive Learning Platform. All rights reserved. | Terms of Service |
          Privacy Policy
        </div>
      </footer>
    </div>
  );
}
