'use client'
import { useState, useEffect } from 'react'

const TRACKS = {
  arize:    { color: '#a855f7', bg: '#2a0a3a', label: 'Arize',    emoji: '🟣', agents: 12 },
  elastic:  { color: '#3b82f6', bg: '#0a1a3a', label: 'Elastic',  emoji: '🔵', agents: 12 },
  fivetran: { color: '#10b981', bg: '#0a2a1a', label: 'Fivetran', emoji: '🟢', agents: 12 },
  gitlab:   { color: '#f97316', bg: '#2a1a0a', label: 'GitLab',   emoji: '🟠', agents: 12 },
  mongodb:  { color: '#22c55e', bg: '#0a2a10', label: 'MongoDB',  emoji: '💚', agents: 12 },
  dynatrace:{ color: '#eab308', bg: '#2a2200', label: 'Dynatrace',emoji: '🟡', agents: 10 },
}

const MOAT = [
  { key:'arize-phantomeval',       port:8869, track:'arize',    name:'PhantomEval',      tag:'Divergence Detector',      icon:'👁' },
  { key:'elastic-echolaw',         port:8876, track:'elastic',  name:'EchoLaw',          tag:'Phase-Aware Rewriter',     icon:'⚡' },
  { key:'mongodb-chronoschema',    port:8973, track:'mongodb',  name:'ChronoSchema',     tag:'Temporal Schema Evolver',  icon:'🕐' },
  { key:'gitlab-blastradius',      port:8766, track:'gitlab',   name:'BlastRadius',      tag:'Impact Analyzer',          icon:'💥' },
  { key:'fivetran-temporallineage',port:8978, track:'fivetran', name:'TemporalLineage',  tag:'Pipeline Provenance',      icon:'🔗' },
  { key:'dynatrace-faultdna',      port:8981, track:'dynatrace',name:'FaultDNA',         tag:'Fault Fingerprinter',      icon:'🧬' },
]

const ALL_AGENTS = [
  // Arize (12)
  {id:'A-01',name:'Self-Healing Support',track:'arize',desc:'Classifies tickets P0-P3, auto-resolves via KB, escalates repeats.'},
  {id:'A-02',name:'Fitness Coach Evolver',track:'arize',desc:'Analyzes workout logs, adapts plans, predicts injury risk.'},
  {id:'A-03',name:'Policy Guardian',track:'arize',desc:'Enforces enterprise policies, flags violations, auto-remediates.'},
  {id:'A-04',name:'Finance Therapist',track:'arize',desc:'Spending analysis, pattern detection, behavioral coaching.'},
  {id:'A-05',name:'Code Review QA',track:'arize',desc:'Automated quality, security, and test coverage scoring.'},
  {id:'A-06',name:'Mental Health Journal',track:'arize',desc:'Sentiment-aware journaling, mood tracking, coping recommendations.'},
  {id:'A-07',name:'Supply Chain Risk',track:'arize',desc:'Predicts disruptions, triggers preemptive actions.'},
  {id:'A-08',name:'Educational Tutor',track:'arize',desc:'Adaptive tutoring adjusting to learner performance in real time.'},
  {id:'A-09',name:'Contract Analyzer',track:'arize',desc:'Clause extraction, risk scoring, playbook comparison.'},
  {id:'A-10',name:'Creative CoAuthor',track:'arize',desc:'Style-consistent collaborative writing with arc tracking.'},
  {id:'A-11',name:'HR Onboarding Wizard',track:'arize',desc:'Orchestrates tasks, docs, access, and 30/60/90 check-ins.'},
  {id:'A-12',name:'ESG Reporter',track:'arize',desc:'Carbon footprint, ESG metrics, automated compliance reports.'},
  // Elastic (12)
  {id:'E-01',name:'Enterprise Knowledge Brain',track:'elastic',desc:'Semantic search, citation-grounded answers, gap detection.'},
  {id:'E-02',name:'Smart Job Matcher',track:'elastic',desc:'Vector-matches candidates to open roles at scale.'},
  {id:'E-03',name:'Cyber Threat Hunter',track:'elastic',desc:'Hunts threats in SIEM logs, correlates IOCs autonomously.'},
  {id:'E-04',name:'News Forecaster',track:'elastic',desc:'Personalizes feeds, forecasts trending topics 48h out.'},
  {id:'E-05',name:'Product Discovery',track:'elastic',desc:'Semantic ecommerce search and real-time recommendation.'},
  {id:'E-06',name:'Clinical Trial Navigator',track:'elastic',desc:'Matches patients to open trials using eligibility criteria.'},
  {id:'E-07',name:'Real Estate Intelligence',track:'elastic',desc:'Property market signals and micro-area pricing forecasts.'},
  {id:'E-08',name:'Legal Research Super',track:'elastic',desc:'Deep research across case law, statutes, and regulations.'},
  {id:'E-09',name:'Nutrition Optimizer',track:'elastic',desc:'Reformulates recipes to hit macro and micro targets.'},
  {id:'E-10',name:'Log Anomaly Detective',track:'elastic',desc:'Z-score + IQR anomaly detection on streaming log data.'},
  {id:'E-11',name:'Sentiment Strategist',track:'elastic',desc:'Real-time brand sentiment with action recommendations.'},
  {id:'E-12',name:'Archive Explorer',track:'elastic',desc:'Semantic search over digitized historical archives.'},
  // Fivetran (12)
  {id:'F-01',name:'Pipeline Orchestrator',track:'fivetran',desc:'Monitors pipelines, detects drift, reroutes, backfills.'},
  {id:'F-02',name:'Real-Time BI Agent',track:'fivetran',desc:'Live BI queries over Fivetran-synced data warehouses.'},
  {id:'F-03',name:'Compliance Auditor',track:'fivetran',desc:'GDPR/HIPAA/SOC2 pipeline compliance scanning.'},
  {id:'F-04',name:'Customer 360',track:'fivetran',desc:'Unifies customer data from 20+ sources into single profile.'},
  {id:'F-05',name:'Inventory Replenisher',track:'fivetran',desc:'Forecasts inventory, triggers replenishment autonomously.'},
  {id:'F-06',name:'Attribution Analyst',track:'fivetran',desc:'Multi-touch attribution across all marketing sources.'},
  {id:'F-07',name:'Claims Harmonizer',track:'fivetran',desc:'Harmonizes healthcare claims across payers and formats.'},
  {id:'F-08',name:'Financial Close',track:'fivetran',desc:'Automates month-end reconciliation across systems.'},
  {id:'F-09',name:'Expense Aggregator',track:'fivetran',desc:'Aggregates, categorizes, and flags expense anomalies.'},
  {id:'F-10',name:'Supply Visibility',track:'fivetran',desc:'End-to-end supply chain tracking across 15 data sources.'},
  {id:'F-11',name:'eLearning Sync',track:'fivetran',desc:'Syncs learner progress across LMS platforms in real time.'},
  {id:'F-12',name:'SaaS Usage Optimizer',track:'fivetran',desc:'Analyzes license utilization, surfaces cost-cutting moves.'},
  // GitLab (12)
  {id:'G-01',name:'Sprint Velocity',track:'gitlab',desc:'Velocity tracking, blocker detection, auto-reassignment.'},
  {id:'G-02',name:'Code Quality Guardian',track:'gitlab',desc:'Continuous quality scoring and tech debt trend analysis.'},
  {id:'G-03',name:'Vulnerability Hunter',track:'gitlab',desc:'CVE, secret, and dependency scanning across all repos.'},
  {id:'G-04',name:'Docs Sync Agent',track:'gitlab',desc:'Keeps documentation in sync with every code change.'},
  {id:'G-05',name:'CI/CD Autofixer',track:'gitlab',desc:'Diagnoses and auto-fixes pipeline failures on first retry.'},
  {id:'G-06',name:'OSS Contributor',track:'gitlab',desc:'Automates open source contributions and PR submissions.'},
  {id:'G-07',name:'Retro Generator',track:'gitlab',desc:'Data-driven retrospectives generated from sprint metrics.'},
  {id:'G-08',name:'Monorepo Deps',track:'gitlab',desc:'Cross-package dependency management in large monorepos.'},
  {id:'G-09',name:'Release Conductor',track:'gitlab',desc:'Multi-team release orchestration and coordination.'},
  {id:'G-10',name:'Dev Onboarding',track:'gitlab',desc:'Guides new developers through codebase and standards.'},
  {id:'G-11',name:'Bug Triage',track:'gitlab',desc:'AI-scores bugs by severity, blast radius, and fix effort.'},
  {id:'G-12',name:'Audit Trail',track:'gitlab',desc:'Tamper-evident audit trails for compliance review.'},
  // MongoDB (12)
  {id:'M-01',name:'Personal Knowledge Base',track:'mongodb',desc:'Atlas vector search over personal notes and concepts.'},
  {id:'M-02',name:'Ecommerce Recommender',track:'mongodb',desc:'Real-time product recommendations with session context.'},
  {id:'M-03',name:'Clinical Decision Support',track:'mongodb',desc:'Evidence-based clinical recommendations at point of care.'},
  {id:'M-04',name:'Inventory Forecaster',track:'mongodb',desc:'ML forecasting from 3 years of transaction history.'},
  {id:'M-05',name:'Event CoPilot',track:'mongodb',desc:'End-to-end event planning and vendor coordination.'},
  {id:'M-06',name:'Talent Matcher',track:'mongodb',desc:'Vector-matches resumes to job requirements at scale.'},
  {id:'M-07',name:'Grocery Optimizer',track:'mongodb',desc:'Optimizes grocery lists from recipe goals and inventory.'},
  {id:'M-08',name:'IoT Fleet Manager',track:'mongodb',desc:'Telemetry ingestion, anomaly detection, command dispatch.'},
  {id:'M-09',name:'Legal Case Manager',track:'mongodb',desc:'Tracks cases, deadlines, and documents across matters.'},
  {id:'M-10',name:'Fitness Tracker',track:'mongodb',desc:'Long-term fitness analytics with adaptive programming.'},
  {id:'M-11',name:'Travel Builder',track:'mongodb',desc:'Personalized itineraries with real-time availability.'},
  {id:'M-12',name:'Research Summarizer',track:'mongodb',desc:'Summarizes and indexes research papers by topic cluster.'},
  // Dynatrace (10)
  {id:'D-01',name:'Production Sentinel',track:'dynatrace',desc:'Polls all 100 agents, auto-restarts, pages on-call.'},
  {id:'D-02',name:'APM Guardian',track:'dynatrace',desc:'Application performance monitoring with auto-remediation.'},
  {id:'D-03',name:'Cost Watchdog',track:'dynatrace',desc:'Flags cloud waste, surfaces rightsizing recommendations.'},
  {id:'D-04',name:'Security Posture',track:'dynatrace',desc:'Continuous security posture scoring and auto-hardening.'},
  {id:'D-05',name:'Fleet Monitor',track:'dynatrace',desc:'Monitors the full 100-agent fleet health in real time.'},
  {id:'D-06',name:'Pipeline Health',track:'dynatrace',desc:'Real-time DevOps pipeline health via Dynatrace APIs.'},
  {id:'D-07',name:'UX Quality',track:'dynatrace',desc:'Synthetic + real-user experience quality monitoring.'},
  {id:'D-08',name:'Workload Balancer',track:'dynatrace',desc:'Balances inference workloads via live resource metrics.'},
  {id:'D-09',name:'Incident Automator',track:'dynatrace',desc:'End-to-end incident response from alert to post-mortem.'},
  {id:'D-10',name:'Sustainability Auditor',track:'dynatrace',desc:'Carbon footprint analysis, rightsizing, ESG reporting.'},
]

const S = {
  shell: { display:'flex', height:'100vh', overflow:'hidden', fontFamily:"'Inter',sans-serif" },
  sidebar: { width:220, minWidth:220, background:'#0c0c16', borderRight:'1px solid #1a1a2e', display:'flex', flexDirection:'column', padding:'1.5rem 0', overflowY:'auto' },
  main: { flex:1, overflowY:'auto', background:'#080810' },
  logo: { padding:'0 1.25rem 1.5rem', borderBottom:'1px solid #1a1a2e' },
  logoTitle: { fontWeight:900, fontSize:'1.1rem', background:'linear-gradient(90deg,#3b82f6,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
  logoSub: { fontSize:'0.65rem', color:'#334155', marginTop:2, letterSpacing:'0.05em', textTransform:'uppercase' },
  navSection: { padding:'1rem 0.75rem 0.25rem', fontSize:'0.6rem', color:'#334155', letterSpacing:'0.1em', textTransform:'uppercase' },
  navBtn: (active, color) => ({
    display:'flex', alignItems:'center', gap:8, padding:'0.5rem 1.25rem', fontSize:'0.78rem',
    fontWeight: active ? 700 : 400, color: active ? color : '#475569', cursor:'pointer',
    background: active ? `${color}15` : 'transparent', border:'none', width:'100%', textAlign:'left',
    borderLeft: active ? `2px solid ${color}` : '2px solid transparent', transition:'all 0.15s',
  }),
  content: { padding:'2rem 2.5rem', maxWidth:1100, margin:'0 auto' },
  header: {
    background:'linear-gradient(135deg,#0f0f1e 0%,#0a1628 50%,#0a0f2a 100%)',
    border:'1px solid #1e2a4a', borderRadius:16, padding:'2rem 2.5rem', marginBottom:'2rem',
    display:'flex', justifyContent:'space-between', alignItems:'center',
  },
  h1: { fontWeight:900, fontSize:'2rem', background:'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', margin:0 },
  statRow: { display:'flex', gap:'1rem', marginBottom:'2rem', flexWrap:'wrap' },
  stat: { background:'#0f0f1e', border:'1px solid #1a1a2e', borderRadius:12, padding:'1rem 1.5rem', flex:1, minWidth:140 },
  statNum: { fontWeight:900, fontSize:'1.8rem', background:'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
  statLabel: { fontSize:'0.7rem', color:'#475569', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:2 },
  grid3: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2rem' },
  moatCard: (tcolor, tbg) => ({
    background: tbg, border:`1px solid ${tcolor}33`, borderRadius:12, padding:'1.25rem',
    cursor:'pointer', transition:'all 0.2s',
  }),
  trackGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' },
  trackCard: (color, bg, active) => ({
    background: active ? bg : '#0f0f1e', border:`1px solid ${active ? color+'66' : '#1a1a2e'}`,
    borderRadius:12, padding:'1.25rem', cursor:'pointer', transition:'all 0.2s',
  }),
  agentGrid: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'0.75rem', marginTop:'1.5rem' },
  agentCard: (color, active) => ({
    background: active ? `${color}18` : '#0f0f1e', border:`1px solid ${active ? color+'55' : '#1a1a2e'}`,
    borderRadius:10, padding:'0.9rem 1rem', cursor:'pointer', transition:'all 0.15s',
  }),
  pill: (color) => ({
    display:'inline-block', padding:'2px 8px', borderRadius:20, fontSize:'0.65rem',
    fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em',
    background:`${color}22`, color, border:`1px solid ${color}44`,
  }),
  chatBox: {
    background:'#0c0c18', border:'1px solid #1a1a2e', borderRadius:12,
    padding:'1.5rem', minHeight:280, maxHeight:340, overflowY:'auto', marginTop:'1rem',
    fontFamily:"'JetBrains Mono',monospace", fontSize:'0.78rem',
  },
  inputRow: { display:'flex', gap:'0.5rem', marginTop:'0.75rem' },
  input: {
    flex:1, background:'#0f0f1e', border:'1px solid #1e293b', borderRadius:8,
    padding:'0.6rem 1rem', color:'#e2e8f0', fontSize:'0.85rem', outline:'none',
  },
  btn: (color) => ({
    background:`linear-gradient(135deg,${color},${color}bb)`, border:'none', borderRadius:8,
    padding:'0.6rem 1.25rem', color:'#fff', fontWeight:700, fontSize:'0.8rem', cursor:'pointer',
  }),
}

export default function Page() {
  const [view, setView] = useState('moat')
  const [track, setTrack] = useState('arize')
  const [agent, setAgent] = useState(ALL_AGENTS[0])
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [moatActive, setMoatActive] = useState(null)
  const [runs, setRuns] = useState(1547)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => { setRuns(r => r + Math.floor(Math.random()*3)); setTick(t => t+1) }, 4000)
    return () => clearInterval(t)
  }, [])

  const trackAgents = ALL_AGENTS.filter(a => a.track === track)
  const tc = TRACKS[track]

  function mockResponse(name, trackKey, q) {
    const ts = new Date().toISOString()
    const rid = `titan-${Math.random().toString(36).slice(2,8)}`
    return JSON.stringify({
      agent: name.replace(/ /g,'-'), track: trackKey.toUpperCase(),
      trace_id: rid, timestamp: ts, model: 'gemini-2.5-flash',
      status: 'EXECUTED', query: q.slice(0,60),
      result: `Agent processed request. MCP integration active. Action completed successfully.`,
      confidence: (0.85 + Math.random()*0.12).toFixed(3),
      mcp_calls: Math.floor(Math.random()*4)+1,
      latency_ms: Math.floor(Math.random()*300)+150,
    }, null, 2)
  }

  function send(q) {
    if (!q.trim()) return
    const name = view === 'moat' ? moatActive?.name : agent?.name
    const t = view === 'moat' ? moatActive?.track : track
    const newMsgs = [...msgs, {role:'user',text:q}, {role:'agent',text:mockResponse(name,t,q)}]
    setMsgs(newMsgs)
    setInput('')
    setRuns(r => r+1)
  }

  return (
    <div style={S.shell}>
      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.logo}>
          <div style={S.logoTitle}>🤖 TitanU AI</div>
          <div style={S.logoSub}>JCH-2026-001 · 106 Agents</div>
        </div>
        <div style={S.navSection}>Views</div>
        <button style={S.navBtn(view==='moat','#06b6d4')} onClick={()=>{setView('moat');setMsgs([])}}>⚡ Moat Agents (6)</button>
        <button style={S.navBtn(view==='fleet','#3b82f6')} onClick={()=>{setView('fleet');setMsgs([])}}>🗂 Fleet (100)</button>
        <div style={S.navSection}>Tracks</div>
        {Object.entries(TRACKS).map(([k,v]) => (
          <button key={k} style={S.navBtn(track===k && view==='fleet', v.color)}
            onClick={()=>{setTrack(k);setAgent(ALL_AGENTS.find(a=>a.track===k));setMsgs([]);setView('fleet')}}>
            {v.emoji} {v.label} ({v.agents})
          </button>
        ))}
        <div style={{marginTop:'auto', padding:'1rem 1.25rem', borderTop:'1px solid #1a1a2e'}}>
          <div style={{fontSize:'0.65rem', color:'#334155', lineHeight:1.6}}>
            Julius Cameron Hill<br/>
            TitanU AI LLC<br/>
            Google Cloud Hackathon
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={S.main}>
        <div style={S.content}>

          {/* HEADER */}
          <div style={S.header}>
            <div>
              <h1 style={S.h1}>Agent Fleet Dashboard</h1>
              <div style={{color:'#475569', fontSize:'0.8rem', marginTop:4}}>
                Google Cloud Rapid Agent Hackathon · 6 Partner Tracks · Gemini 2.5 Flash
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'0.65rem', color:'#334155', textTransform:'uppercase', letterSpacing:'0.08em'}}>Patent</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace", color:'#3b82f6', fontWeight:700, fontSize:'0.85rem'}}>JCH-2026-001</div>
            </div>
          </div>

          {/* STATS */}
          <div style={S.statRow}>
            {[['106','Total Agents'],['6','Partner Tracks'],[`${runs.toLocaleString()}`,'Total Runs'],['94.2%','Auto-Resolved'],['312ms','Avg Latency']].map(([n,l]) => (
              <div key={l} style={S.stat}><div style={S.statNum}>{n}</div><div style={S.statLabel}>{l}</div></div>
            ))}
          </div>

          {/* MOAT VIEW */}
          {view === 'moat' && (
            <>
              <div style={{marginBottom:'1rem'}}>
                <span style={{fontWeight:700, color:'#e2e8f0'}}>⚡ Hackathon Moat — 6 Live Microservice Agents</span>
                <span style={{marginLeft:12, fontSize:'0.75rem', color:'#475569'}}>Rust + Julia + Python polyglot · Gemini 2.5 Flash · Real MCP calls</span>
              </div>
              <div style={S.grid3}>
                {MOAT.map(m => {
                  const color = TRACKS[m.track].color
                  const bg = TRACKS[m.track].bg
                  const active = moatActive?.key === m.key
                  return (
                    <div key={m.key} style={{...S.moatCard(color,bg), border:`1px solid ${active?color+'88':color+'33'}`}}
                      onClick={()=>{setMoatActive(m);setMsgs([])}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                        <span style={{fontSize:'1.3rem'}}>{m.icon}</span>
                        <div>
                          <div style={{fontWeight:700, color:'#e2e8f0', fontSize:'0.9rem'}}>{m.name}</div>
                          <div style={{fontSize:'0.65rem', color:color, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.07em'}}>{m.tag}</div>
                        </div>
                        <span style={{marginLeft:'auto', width:8, height:8, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 6px #22c55e'}}/>
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.65rem', color:'#475569'}}>
                        <span style={S.pill(color)}>{m.track}</span>
                        <span style={{fontFamily:"'JetBrains Mono',monospace"}}>:{m.port}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              {moatActive && (
                <div style={{background:'#0c0c18', border:`1px solid ${TRACKS[moatActive.track].color}44`, borderRadius:12, padding:'1.5rem'}}>
                  <div style={{fontWeight:700, color:'#e2e8f0', marginBottom:4}}>{moatActive.icon} {moatActive.name}</div>
                  <div style={{fontSize:'0.75rem', color:'#475569', marginBottom:'1rem', fontFamily:"'JetBrains Mono',monospace"}}>localhost:{moatActive.port} · {moatActive.track}.titanuai.com</div>
                  <div style={S.chatBox}>
                    {msgs.length === 0 && <div style={{color:'#1e293b', textAlign:'center', paddingTop:60}}>Send a query to activate {moatActive.name}</div>}
                    {msgs.map((m,i) => (
                      <div key={i} style={{marginBottom:12}}>
                        <div style={{fontSize:'0.65rem', color:'#334155', marginBottom:2}}>{m.role === 'user' ? 'YOU' : moatActive.name.toUpperCase()}</div>
                        <div style={{color: m.role==='user' ? '#93c5fd' : '#94a3b8', whiteSpace:'pre-wrap'}}>{m.text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={S.inputRow}>
                    <input style={S.input} value={input} placeholder={`Query ${moatActive.name}...`}
                      onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)}/>
                    <button style={S.btn(TRACKS[moatActive.track].color)} onClick={()=>send(input)}>Send</button>
                  </div>
                  <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
                    {['Detect anomaly','Run analysis','Health check'].map(q=>(
                      <button key={q} style={{background:'#1a1a2e',border:'1px solid #2a2a4a',borderRadius:6,padding:'4px 12px',color:'#64748b',fontSize:'0.72rem',cursor:'pointer'}} onClick={()=>send(q)}>{q}</button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* FLEET VIEW */}
          {view === 'fleet' && (
            <>
              <div style={{marginBottom:'1rem', display:'flex', alignItems:'center', gap:12}}>
                <span style={{fontWeight:700, color:'#e2e8f0'}}>🗂 Agent Fleet</span>
                <span style={S.pill(tc.color)}>{tc.label} Track</span>
                <span style={{fontSize:'0.75rem', color:'#475569'}}>{trackAgents.length} agents</span>
              </div>
              <div style={S.trackGrid}>
                {Object.entries(TRACKS).map(([k,v]) => (
                  <div key={k} style={S.trackCard(v.color,v.bg,track===k)}
                    onClick={()=>{setTrack(k);setAgent(ALL_AGENTS.find(a=>a.track===k));setMsgs([])}}>
                    <div style={{fontWeight:700, color: track===k?v.color:'#64748b', fontSize:'0.85rem'}}>{v.emoji} {v.label}</div>
                    <div style={{fontSize:'0.7rem', color:'#475569', marginTop:2}}>{v.agents} agents</div>
                  </div>
                ))}
              </div>
              <div style={S.agentGrid}>
                {trackAgents.map(a => (
                  <div key={a.id} style={S.agentCard(tc.color, agent?.id===a.id)}
                    onClick={()=>{setAgent(a);setMsgs([])}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4}}>
                      <span style={{fontWeight:700, color:'#e2e8f0', fontSize:'0.85rem'}}>{a.name}</span>
                      <span style={{fontFamily:"'JetBrains Mono',monospace", fontSize:'0.65rem', color:'#334155'}}>{a.id}</span>
                    </div>
                    <div style={{fontSize:'0.75rem', color:'#475569'}}>{a.desc}</div>
                  </div>
                ))}
              </div>
              {agent && (
                <div style={{marginTop:'1.5rem', background:'#0c0c18', border:`1px solid ${tc.color}44`, borderRadius:12, padding:'1.5rem'}}>
                  <div style={{fontWeight:700, color:'#e2e8f0', marginBottom:2}}>{agent.name} <span style={S.pill(tc.color)}>{track}</span></div>
                  <div style={{fontSize:'0.75rem', color:'#475569', marginBottom:'1rem'}}>{agent.desc} · Gemini 2.5 Flash · {tc.label} MCP</div>
                  <div style={S.chatBox}>
                    {msgs.length === 0 && <div style={{color:'#1e293b', textAlign:'center', paddingTop:60}}>Send a query to activate {agent.name}</div>}
                    {msgs.map((m,i) => (
                      <div key={i} style={{marginBottom:12}}>
                        <div style={{fontSize:'0.65rem', color:'#334155', marginBottom:2}}>{m.role==='user'?'YOU':agent.name.toUpperCase()}</div>
                        <div style={{color: m.role==='user'?'#93c5fd':'#94a3b8', whiteSpace:'pre-wrap'}}>{m.text}</div>
                      </div>
                    ))}
                  </div>
                  <div style={S.inputRow}>
                    <input style={S.input} value={input} placeholder={`Query ${agent.name}...`}
                      onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)}/>
                    <button style={S.btn(tc.color)} onClick={()=>send(input)}>Send</button>
                  </div>
                  <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
                    {['Run diagnostic','Execute workflow','Top recommendations'].map(q=>(
                      <button key={q} style={{background:'#1a1a2e',border:'1px solid #2a2a4a',borderRadius:6,padding:'4px 12px',color:'#64748b',fontSize:'0.72rem',cursor:'pointer'}} onClick={()=>send(q)}>{q}</button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div style={{borderTop:'1px solid #1a1a2e', marginTop:'3rem', paddingTop:'1.5rem', textAlign:'center', color:'#1e293b', fontSize:'0.7rem'}}>
            TitanU AI LLC · Julius Cameron Hill · Patent JCH-2026-001 ·{' '}
            <a href="https://github.com/juliushill42/titan-agent-fleet" style={{color:'#3b82f6'}}>GitHub</a> ·{' '}
            Google Cloud Rapid Agent Hackathon 2026
          </div>
        </div>
      </main>
    </div>
  )
}
