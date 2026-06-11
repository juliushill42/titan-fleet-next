# TitanU AI — Agent Fleet Dashboard
**Google Cloud Rapid Agent Hackathon 2026** · Patent JCH-2026-001 · Julius Cameron Hill · TitanU AI LLC

## Live Demo
🌐 [agents.titanuai.com](https://agents.titanuai.com)

## What It Does
106 autonomous AI agents across 6 partner tracks, powered by **Gemini 2.5 Flash** + **Google Cloud Agent Builder** + partner MCP servers. Each agent handles a real-world workflow — from threat hunting to clinical decision support to pipeline orchestration.

## Tech Stack
- **AI**: Gemini 2.5 Flash (Google Cloud)
- **Agent Framework**: Google Cloud Agent Builder
- **Partner MCP Servers**: Arize, Elastic, Fivetran, GitLab, MongoDB, Dynatrace
- **Frontend**: Next.js 15, React 19
- **Deployment**: Vercel + custom domain

## Partner Tracks
| Track | Agents | Moat Agent |
|-------|--------|------------|
| Arize | 12 | PhantomEval — Divergence Detector |
| Elastic | 12 | EchoLaw — Phase-Aware Rewriter |
| Fivetran | 12 | TemporalLineage — Pipeline Provenance |
| GitLab | 12 | BlastRadius — Impact Analyzer |
| MongoDB | 12 | ChronoSchema — Temporal Schema Evolver |
| Dynatrace | 10 | FaultDNA — Fault Fingerprinter |

## Setup & Run
```bash
git clone https://github.com/juliushill42/titan-fleet-next
cd titan-fleet-next
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Deploy
```bash
git push origin main  # Auto-deploys via Vercel
```

## Architecture
- 6 Hackathon Moat agents (live microservices, polyglot: Rust + Julia + Python)
- 100 fleet agents across all partner tracks
- Real MCP server calls at runtime via Google Cloud Agent Builder
- Gemini 2.5 Flash inference on every agent query

## License
MIT © 2026 Julius Cameron Hill / TitanU AI LLC
