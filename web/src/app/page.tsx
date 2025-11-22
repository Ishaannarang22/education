import path from "path";
import fs from "fs/promises";

function extractTitle(md: string) {
  const m = md.match(/^#\s+(.*)$/m);
  return m ? m[1].trim() : "Education Platform";
}

function extractSection(md: string, heading: string) {
  const re = new RegExp(`^##\\s+${heading}\\s*$`, "m");
  const match = md.match(re);
  if (!match) return { text: "", bullets: [] as string[] };
  const start = match.index! + match[0].length;
  const rest = md.slice(start);
  const nextIdx = rest.search(/^##\s+/m);
  const block = nextIdx === -1 ? rest : rest.slice(0, nextIdx);
  const lines = block.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const bullets = lines.filter((l) => l.startsWith("- ")).map((l) => l.replace(/^[-*]\s+/, ""));
  const text = lines.filter((l) => !l.startsWith("- ")).join(" ");
  return { text, bullets };
}

function extractNumbered(md: string, heading: string) {
  const re = new RegExp(`^##\\s+${heading}\\s*$`, "m");
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
  const mvp = extractNumbered(md, "MVP Scope");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-zinc-900 to-black">
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-300">
            {vision.text || "Adaptive learning with Canvas, YouTube, Gemini 3, and an AI coding coach."}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-medium">Vision</h2>
            <p className="mt-3 text-sm text-zinc-200">{vision.text}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-medium">Key Features</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200">
              {features.bullets.slice(0, 8).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-medium">Architecture</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200">
              {architecture.bullets.slice(0, 8).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-violet-400/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-medium">MVP Scope</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-200">
              {mvp.slice(0, 8).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
