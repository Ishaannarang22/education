import path from "path";
import fs from "fs/promises";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type Section = { text: string; bullets: string[] };

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractTitle(md: string) {
  const m = md.match(/^#\s+(.*)$/m);
  return m ? m[1].trim() : "Education Platform";
}

function extractSection(md: string, heading: string): Section {
  const re = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, "m");
  const match = md.match(re);
  if (!match) return { text: "", bullets: [] };
  const start = match.index! + match[0].length;
  const rest = md.slice(start);
  const nextIdx = rest.search(/^##\s+/m);
  const block = nextIdx === -1 ? rest : rest.slice(0, nextIdx);
  const lines = block
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const bullets = lines
    .filter((l) => l.startsWith("- "))
    .map((l) => l.replace(/^[-*]\s+/, ""));
  const text = lines.filter((l) => !l.startsWith("- ")).join(" ");
  return { text, bullets };
}

function extractNumbered(md: string, heading: string) {
  const re = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, "m");
  const match = md.match(re);
  if (!match) return [] as string[];
  const start = match.index! + match[0].length;
  const rest = md.slice(start);
  const nextIdx = rest.search(/^##\s+/m);
  const block = nextIdx === -1 ? rest : rest.slice(0, nextIdx);
  return block
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => /^\d+\./.test(l))
    .map((l) => l.replace(/^\d+\.\s+/, ""));
}

export default async function Home() {
  const planPath = path.resolve(process.cwd(), "..", "PROJECT_PLAN.md");
  const md = await fs.readFile(planPath, "utf-8");

  const title = extractTitle(md);
  const vision = extractSection(md, "Vision");
  const features = extractSection(md, "Key Features");
  const architecture = extractSection(md, "Architecture");
  const canvas = extractSection(md, "Canvas Integration");
  const youtube = extractSection(md, "YouTube + Gemini 3");
  const learning = extractSection(md, "Learning Plan Engine");
  const exams = extractSection(md, "Exams/Form Builder");
  const coding = extractSection(md, "Interactive Coding Coach");
  const apis = extractSection(md, "APIs");
  const frontend = extractSection(md, "Frontend");
  const security = extractSection(md, "Security & Compliance");
  const mvp = extractNumbered(md, "MVP Scope");
  const nextSteps = extractSection(md, "Next Steps");
  const repoActions = extractSection(md, "Repository Actions");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-[#050b11] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-r from-emerald-500/20 via-cyan-400/10 to-amber-400/20 blur-3xl" />
        <div className="absolute left-8 top-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute right-10 top-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 space-y-12">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 shadow-lg shadow-emerald-500/30" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm text-zinc-200">{title}</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-200/80">
                Plan-driven landing
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-5 text-sm text-zinc-200 md:flex">
            <a href="#vision" className="hover:text-white">Vision</a>
            <a href="#features" className="hover:text-white">Capabilities</a>
            <a href="#integrations" className="hover:text-white">Integrations</a>
            <a href="#mvp" className="hover:text-white">MVP</a>
          </div>
          <Button asChild>
            <a href="/youtube">Open the app</a>
          </Button>
        </nav>

        <section id="vision" className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
              Canvas + YouTube + Gemini 3 + AI Coach
            </p>
            <h1 className="bg-gradient-to-br from-white via-emerald-50 to-cyan-100 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg text-zinc-200">
              {vision.text || "Adaptive learning plans, live AI guidance, and ingestion of every course signal."}
            </p>
            <p className="max-w-3xl text-sm text-zinc-400">
              Powered directly by the working project plan - this page is a live reflection of the scope, not a marketing rewrite.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">Learning plans + coding coach</Badge>
              <Badge variant="outline">Canvas & YouTube ingestion</Badge>
              <Badge variant="outline">Gemini 3 summarization</Badge>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#features"
                className="rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:brightness-110"
              >
                Explore capabilities
              </a>
              <a
                href="#architecture"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white transition hover:border-white/30"
              >
                View architecture
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-white/5 to-amber-400/10 blur-3xl" />
            <Card className="rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Vision</CardTitle>
                <Badge className="bg-white/10 text-emerald-200" variant="outline">From plan</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-zinc-200">
                  {vision.text ||
                    "Build a web app that ingests Canvas materials and YouTube videos to generate adaptive learning plans, assessments, and a live AI coding coach."}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-zinc-200">
                  <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                      <CardDescription className="text-emerald-200">Signals</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="font-medium">Canvas + YouTube + Gemini</p>
                    </CardContent>
                  </Card>
                  <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                      <CardDescription className="text-emerald-200">Coach</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="font-medium">Real-time hints & progress</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Capabilities</p>
              <h2 className="text-2xl font-semibold text-white">Key Features</h2>
            </div>
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 md:inline-flex">
              Sourced live from PROJECT_PLAN.md
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {(features.bullets.length ? features.bullets : ["Canvas ingestion", "YouTube knowledge", "Gemini 3 integration", "Learning plans", "Assessments", "AI coding coach"]).map((b, i) => (
              <Card key={i} className="group rounded-2xl border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-emerald-500/20">
                <CardContent className="p-0">
                  <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 opacity-80 transition group-hover:opacity-100" />
                  <div className="text-sm text-zinc-100">{b}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="integrations" className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Canvas Integration</h3>
              <Badge className="bg-emerald-500/15 text-emerald-100" variant="outline">API-first</Badge>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-200">
              {(canvas.bullets.length ? canvas.bullets : ["Canvas REST for syllabus, assignments, pages, files", "Normalize content to markdown/plain", "Extract topics & deadlines", "Respect rate limits and consent"]).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">YouTube + Gemini 3</h3>
              <Badge className="bg-amber-500/15 text-amber-100" variant="outline">Media + AI</Badge>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-200">
              {(youtube.bullets.length ? youtube.bullets : ["Captions via YouTube Data API", "Gemini 3 fallback transcription", "Segment summaries & key points", "Embeddings with citations"]).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Learning Plan Engine</h3>
              <Badge className="bg-cyan-500/15 text-cyan-100" variant="outline">Adaptive</Badge>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-200">
              {(learning.bullets.length ? learning.bullets : ["Topic graph with prerequisites", "Personalized by diagnostics", "Scheduler with spaced repetition", "Coach prompts tied to progress"]).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Exams / Form Builder</h3>
              <Badge className="bg-emerald-500/15 text-emerald-100" variant="outline">Assess</Badge>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-200">
              {(exams.bullets.length ? exams.bullets : ["Generate MCQ and coding items", "Difficulty calibration", "Practice vs. timed modes", "Analytics on item quality"]).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Interactive Coding Coach</h3>
              <Badge className="bg-amber-500/15 text-amber-100" variant="outline">Live</Badge>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-200">
              {(coding.bullets.length ? coding.bullets : ["Monaco editor starting with Python", "Sandboxed execution", "Streamed feedback to AI character", "Telemetry for adaptive hints"]).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section id="architecture" className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Stack</p>
                <h3 className="text-xl font-semibold">Architecture</h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-zinc-100">Frontend | Backend | Data</span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {(architecture.bullets.length ? architecture.bullets : ["Next.js frontend", "Node.js backend (Nest/Express)", "PostgreSQL + pgvector", "Redis queues/sessions", "BullMQ workers", "RAG with citations", "OAuth2 for Google/Canvas", "JWT for app"]).map((b, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-zinc-200">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="rounded-2xl border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">APIs</h4>
                <span className="text-[11px] uppercase tracking-[0.14em] text-cyan-100">Endpoints</span>
              </div>
              <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-[13px] text-emerald-100">
                {(apis.bullets.length ? apis.bullets : ["/auth/*", "/canvas/*", "/youtube/*", "/plans/*", "/assessments/*", "/coding/*", "/search"]).map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-emerald-300/80">&bull;</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-2xl border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Frontend Surfaces</h4>
                <span className="text-[11px] uppercase tracking-[0.14em] text-amber-100">UI</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {(frontend.bullets.length ? frontend.bullets : ["Dashboard", "Course view", "Video view", "Planner", "Assessments", "Coding"]).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <section id="mvp" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Roadmap</p>
              <h3 className="text-xl font-semibold">MVP Scope</h3>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">Sequenced from plan</span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {(mvp.length ? mvp : [
              "Google OAuth + Canvas token binding",
              "Canvas ingestion for syllabus + assignments",
              "YouTube ingestion with captions and Gemini 3 transcription",
              "RAG search with citations",
              "Learning plan generation and viewer",
              "Python coding environment with AI hints",
            ]).map((item, i) => (
              <div key={i} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-400 text-base font-semibold text-slate-950 shadow-emerald-500/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm text-zinc-100">{item}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Security & Compliance</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-100">Guardrails</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-zinc-200">
              {(security.bullets.length ? security.bullets : ["Respect Canvas/YouTube ToS", "Consent and PII minimization", "Retention aligned to FERPA", "Retrieval-first prompting with citation checks"]).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Repository Actions</h4>
                <span className="text-[11px] uppercase tracking-[0.14em] text-cyan-100">Collaboration</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {(repoActions.bullets.length ? repoActions.bullets : ["Branch: plan/project-plan for this document", "PRs extend sections or add tasks"]).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Next Steps</h4>
                <span className="text-[11px] uppercase tracking-[0.14em] text-amber-100">Focus</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {(nextSteps.bullets.length ? nextSteps.bullets : ["Confirm Gemini 3 provider", "Identify target Canvas instance and courses", "Begin scaffolding after review"]).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div>
            (c) {new Date().getFullYear()} {title}. Live brief powered by PROJECT_PLAN.md.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#vision" className="hover:text-white">Vision</a>
            <a href="#features" className="hover:text-white">Capabilities</a>
            <a href="#integrations" className="hover:text-white">Integrations</a>
            <a href="#mvp" className="hover:text-white">MVP</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
