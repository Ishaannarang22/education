# Education Platform: Canvas + YouTube + Gemini 3 + AI Coding Coach

## Vision
Build a web app that ingests Canvas course materials and YouTube videos to generate adaptive learning plans and assessments, paired with an interactive coding environment where a live AI character provides real‑time guidance based on a student’s personalized plan.

## Key Features
- Canvas ingestion: syllabus, assignments, deadlines, resources.
- YouTube knowledge: transcripts, segment summaries, embedded playback, citations.
- Gemini 3 integration: transcription fallback, summarization, embeddings, topic extraction.
- Learning plans: topic graph, prerequisites, spaced practice, progress tracking.
- Exams/forms: generated questions with citations; practice and timed modes.
- Coding coach: LeetCode‑style interface with animated AI character reacting to code.

## Architecture
- Frontend: Next.js/React UI for courses, videos, planner, assessments, coding.
- Backend: Node.js (NestJS/Express) services (Canvas, YouTube, Gemini, Plans, Assessments, Coding).
- Data: PostgreSQL (+ pgvector for embeddings), Redis for queues/sessions.
- Workers: BullMQ jobs for ingestion/transcription/embedding.
- RAG: citation‑aware retrieval across Canvas docs and video segments.
- Auth: OAuth2 with Google for YouTube; Canvas token per user; JWT for app.

## Canvas Integration
- Prefer Canvas REST API (base URL + PAT/token) to fetch syllabus, assignments, pages, files.
- Normalize content (HTML → markdown/plain), extract topics and deadlines; respect rate limits.
- Only scrape as a last resort and with explicit consent.

## YouTube + Gemini 3
- Captions via YouTube Data API when available.
- Fallback Gemini 3 transcription on audio chunks; align timestamps.
- Post‑processing: segment by topic, summaries, key points, practice questions.
- Embeddings via Gemini 3; store segments with video/timestamps for citations.

## Learning Plan Engine
- Topic graph across Canvas + YouTube; infer prerequisites.
- Personalization via diagnostic; adapt tasks by performance and deadlines.
- Scheduler with spaced repetition and interleaving; Canvas due dates drive priority.
- Coach prompts conditioned on plan state and recent errors.

## Exams/Form Builder
- Generate MCQ/short‑answer/coding items with citations and answer keys.
- Difficulty calibration and distractor validation; human‑in‑the‑loop edits.
- Delivery: practice vs. exam mode; analytics on item quality.

## Interactive Coding Coach
- Editor: Monaco; initial language Python (JS later); sandbox via Pyodide or Docker.
- Evaluation: run tests, capture results; stream events to AI character.
- AI character: persona control; reacts to code edits, failures, and mastery; tiered hints linked to plan topics.
- Telemetry: hint usage, retries, time‑on‑task for adaptive next steps.

## APIs
- `/auth/*` (Google OAuth, Canvas token bind)
- `/canvas/*` (ingest)
- `/youtube/*` (register, ingest)
- `/plans/*` (create/update)
- `/assessments/*` (generate/submit)
- `/coding/*` (run/evaluate)
- `/search` (RAG with citations)

## Frontend
- Dashboard: upcoming tasks and progress.
- Course: syllabus, assignments, topic map.
- Video: embedded player, transcript segments, summaries, citations.
- Planner: adaptive roadmap and schedule.
- Assessments: practice/exam pages with feedback.
- Coding: editor, tests, AI character panel, hints.

## Security & Compliance
- Respect Canvas/YouTube ToS; ingest only content the user has rights to access.
- Privacy: consent, PII minimization, retention; FERPA‑aligned for education contexts.
- Guardrails: retrieval‑first prompting and strict citation checks.

## MVP Scope
1. Google OAuth + Canvas token binding.
2. Canvas ingestion for syllabus + assignments.
3. YouTube ingestion: captions + Gemini 3 fallback transcription; segmentation + embeddings.
4. RAG search with citations across Canvas + YouTube.
5. Basic learning plan generation and viewer.
6. Python coding environment with tests and AI character hints.

## Repository Actions
- Branch: `plan/project-plan` holding this document for collaboration.
- Subsequent PRs can extend sections or add implementation tasks.

## Next Steps
- Confirm Gemini 3 provider (Google AI Studio vs Vertex) and quotas.
- Identify target Canvas instance and initial courses.
- Begin scaffolding after collaborators review this plan.
