/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICONS = {
  spark: (
    <path d="M12 2.5 13.7 8l5.5 1.7-5.5 1.7-1.7 5.5-1.7-5.5L4.8 9.7 10.3 8 12 2.5ZM19 14l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8L19 14Z" />
  ),
  code: <path d="m8.7 16.9-4.9-4.9 4.9-4.9 1.4 1.4L6.6 12l3.5 3.5-1.4 1.4Zm6.6 0-1.4-1.4L17.4 12l-3.5-3.5 1.4-1.4 4.9 4.9-4.9 4.9Z" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  chart: <path d="M4 19h16v2H4v-2Zm1-8h3v6H5v-6Zm5-5h3v11h-3V6Zm5 3h3v8h-3V9Z" />,
  shield: <path d="M12 2 20 5.4v6.1c0 5.2-3.4 8.9-8 10.5-4.6-1.6-8-5.3-8-10.5V5.4L12 2Zm-1.2 13.4 5.3-5.3-1.4-1.4-3.9 3.9-1.8-1.8-1.4 1.4 3.2 3.2Z" />,
};

function Icon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Panel chrome                                                        */
/* ------------------------------------------------------------------ */

function Panel({ icon, eyebrow, title, children }) {
  return (
    <div className="cs-panel flex h-full flex-col overflow-hidden rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/22 text-white">
          <Icon name={icon} className="h-3.5 w-3.5" />
        </span>
        <span className="text-[9px] uppercase tracking-[0.14em] text-white/65">{eyebrow}</span>
      </div>
      <h3 className="mt-2 text-[14px] font-bold leading-snug text-white">{title}</h3>
      <div className="mt-3 min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Software development — code editor                               */
/* ------------------------------------------------------------------ */

const TOKEN = {
  kw: 'text-[#7cc4ff]',
  fn: 'text-[#a8c4ff]',
  str: 'text-[#6ee7b7]',
  id: 'text-slate-100',
  mut: 'text-slate-500',
};

const CODE = [
  [['kw', 'export async '], ['kw', 'function '], ['fn', 'deploy'], ['mut', '(env) {']],
  [['mut', '  '], ['kw', 'const '], ['id', 'build'], ['mut', ' = '], ['kw', 'await '], ['fn', 'ci.run'], ['mut', '('], ['str', "'test:all'"], ['mut', ')']],
  [['mut', '  '], ['kw', 'if '], ['mut', '(!'], ['id', 'build'], ['mut', '.ok) '], ['kw', 'return '], ['fn', 'rollback'], ['mut', '(env)']],
  [['mut', '  '], ['kw', 'return '], ['fn', 'cloud.release'], ['mut', '(env, build.sha)']],
  [['mut', '}']],
];

function CodePanel() {
  return (
    <Panel icon="code" eyebrow="Software Development" title="Ship production code, not prototypes">
      <div className="cs-screen flex h-full flex-col rounded-xl p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="ml-1.5 rounded bg-white/8 px-1.5 py-0.5 font-mono text-[8px] text-slate-400">
            deploy.ts
          </span>
        </div>

        <pre className="mt-2 overflow-hidden font-mono text-[8.5px] leading-[1.6]">
          {CODE.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="w-2 shrink-0 select-none text-right text-slate-600">{i + 1}</span>
              <span className="truncate">
                {line.map(([t, text], j) => (
                  <span key={j} className={TOKEN[t]}>
                    {text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>

        <div className="mt-auto flex items-center gap-1.5 border-t border-white/8 pt-2 text-[8.5px]">
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-accent" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm-1.2 14.2 6-6-1.4-1.4-4.6 4.6-2-2-1.4 1.4 3.4 3.4Z" />
          </svg>
          <span className="text-slate-300">248 tests passed</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">deployed in 42s</span>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* 2. AI automation — agent workflow                                   */
/* ------------------------------------------------------------------ */

const STEPS = [
  { t: 'Intake trigger', s: 'done' },
  { t: 'Classify & extract', s: 'done' },
  { t: 'Agent decision', s: 'run' },
  { t: 'Route & notify', s: 'idle' },
];

function AutomationPanel() {
  return (
    <Panel icon="bolt" eyebrow="AI Automation" title="Agents that run the busywork">
      <div className="flex h-full flex-col">
        <div className="relative space-y-1.5">
          {STEPS.map((s, i) => (
            <div key={s.t} className="flex items-center gap-2">
              <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                {i < STEPS.length - 1 && (
                  <span className="absolute top-4 h-[calc(100%+0.375rem)] w-px bg-white/25" />
                )}
                <span
                  className={`h-2.5 w-2.5 rounded-full ${s.s === 'idle' ? 'bg-white/30' : 'bg-white'
                    } ${s.s === 'run' ? 'ring-3 ring-white/35' : ''}`}
                />
              </span>
              <div className="cs-panel-row flex flex-1 items-center justify-between rounded-lg px-2.5 py-1.5">
                <span className="text-[10px] font-medium text-white">{s.t}</span>
                <span className="text-[8.5px] text-white/70">
                  {s.s === 'done' ? 'done' : s.s === 'run' ? 'running' : 'queued'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="text-xl font-bold leading-none text-white">1.2M</div>
            <div className="mt-1 text-[9px] text-white/65">tasks automated / mo</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold leading-none text-white">73%</div>
            <div className="mt-1 text-[9px] text-white/65">manual hours cut</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Data analytics + market research — charts                        */
/* ------------------------------------------------------------------ */

const BARS = [38, 52, 44, 66, 58, 82, 95];
const SHARE = [
  { l: 'You', v: 46, c: '#8ab4ff' },
  { l: 'Comp. A', v: 31, c: '#4f7cff' },
  { l: 'Other', v: 23, c: '#6ee7b7' },
];

function AnalyticsPanel() {
  const circ = 2 * Math.PI * 15.9155;
  let offset = 0;

  return (
    <Panel icon="chart" eyebrow="Data Analytics & Market Research" title="See the market before it moves">
      <div className="cs-screen flex h-full flex-col rounded-xl p-2.5">
        {/* bar chart with trend line */}
        <div className="relative flex h-16 items-end gap-1.5">
          {BARS.map((b, i) => (
            <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/35 to-[#8ab4ff]" style={{ height: `${b}%` }} />
          ))}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M4 28 L18 22 L32 25 L46 15 L60 18 L74 7 L92 2" fill="none" stroke="#6ee7b7" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="mt-1 flex justify-between font-mono text-[7.5px] text-slate-500">
          <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
        </div>

        {/* market share donut */}
        <div className="mt-auto flex items-center gap-3 border-t border-white/8 pt-2.5">
          <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90 shrink-0">
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            {SHARE.map((s) => {
              const dash = (s.v / 100) * circ;
              const el = (
                <circle
                  key={s.l}
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke={s.c}
                  strokeWidth="4"
                  strokeDasharray={`${dash} ${circ - dash}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += dash;
              return el;
            })}
          </svg>
          <div className="min-w-0 flex-1 space-y-1">
            {SHARE.map((s) => (
              <div key={s.l} className="flex items-center gap-1.5 text-[8.5px]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c }} />
                <span className="flex-1 truncate text-slate-400">{s.l} share</span>
                <span className="text-slate-200">{s.v}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Security auditing — findings                                     */
/* ------------------------------------------------------------------ */

const FINDINGS = [
  { l: 'Critical', v: 0, c: 'bg-white/30' },
  { l: 'High', v: 1, c: 'bg-[#8ab4ff]' },
  { l: 'Medium', v: 4, c: 'bg-white/45' },
];

function SecurityPanel() {
  return (
    <Panel icon="shield" eyebrow="Security Auditing" title="Findings you can act on">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3">
          <div className="relative grid h-14 w-14 shrink-0 place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="94 100"
              />
            </svg>
            <div className="text-center">
              <div className="text-sm font-bold leading-none text-white">94</div>
              <div className="text-[7px] text-white/70">posture</div>
            </div>
          </div>
          <p className="text-[9.5px] leading-snug text-white/75">
            Continuous pen-testing, dependency and IAM review, mapped to SOC 2 and NIST 800-53.
          </p>
        </div>

        <div className="mt-auto space-y-1.5 pt-3">
          {FINDINGS.map((f) => (
            <div key={f.l} className="cs-panel-row flex items-center gap-2 rounded-lg px-2.5 py-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${f.c}`} />
              <span className="flex-1 text-[10px] text-white">{f.l}</span>
              <span className="text-[10px] font-semibold text-white">{f.v}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

/* fixed positions — no randomness, so server and client markup match */
const SPARKS = [
  { x: '6%', y: '18%', s: '3px', d: '0s', t: '6s' },
  { x: '14%', y: '68%', s: '2px', d: '1.4s', t: '7s' },
  { x: '23%', y: '38%', s: '2px', d: '3.1s', t: '5.5s' },
  { x: '31%', y: '84%', s: '3px', d: '2.2s', t: '8s' },
  { x: '44%', y: '12%', s: '2px', d: '4.3s', t: '6.5s' },
  { x: '47%', y: '58%', s: '3px', d: '0.8s', t: '7.5s' },
  { x: '61%', y: '88%', s: '2px', d: '2.7s', t: '6s' },
  { x: '69%', y: '22%', s: '3px', d: '5.1s', t: '9s' },
  { x: '82%', y: '64%', s: '2px', d: '1.9s', t: '5s' },
  { x: '91%', y: '32%', s: '3px', d: '3.6s', t: '8.5s' },
  { x: '96%', y: '78%', s: '2px', d: '4.8s', t: '6.5s' },
];

const STATS = [
  { v: '150+', l: 'Projects delivered\nacross five practices' },
  { v: '120+', l: 'Engineers, analysts,\nand cleared staff' },
  { v: '98%', l: 'Client retention\nrate' },
];

export default function Hero() {
  return (
    <section className="cs-hero-full relative isolate overflow-hidden bg-ink">
      {/* background: drifting patterns, floating orbs, twinkling specks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="cs-glow absolute inset-0" />
        <div
          className="cs-orb cs-orb-a h-80 w-80 bg-brand/30"
          style={{ left: '58%', top: '8%' }}
        />
        <div
          className="cs-orb cs-orb-b h-96 w-96 bg-[#2545c8]/35"
          style={{ left: '72%', top: '46%' }}
        />
        <div className="cs-mesh" />
        <div className="cs-mesh-current" />
        <div className="cs-mesh-current cs-mesh-current-b" />
        {SPARKS.map((s, i) => (
          <span
            key={i}
            className="cs-spark"
            style={{
              left: s.x,
              top: s.y,
              width: s.s,
              height: s.s,
              animationDelay: s.d,
              animationDuration: s.t,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8 lg:py-10">
        {/* ---------------- copy ---------------- */}
        <div className="relative z-10">


          <h1 className="mt-6 text-[1.85rem] font-extrabold leading-[1.16] tracking-tight text-slate-100 sm:text-[2.2rem] lg:text-[2.15rem] xl:text-[2.4rem]">
            Power your Digital Modernization and Business Transformation with
            <br />
            <span className="mt-2 inline-block bg-gradient-to-r from-[#b5cdff] via-[#6d92ff] to-[#3b63e8] bg-clip-text pb-1.5 text-[2.6rem] leading-[1.08] text-transparent drop-shadow-[0_2px_22px_rgba(79,124,255,0.4)] sm:text-[3.05rem] lg:text-[2.95rem] xl:text-[3.35rem]">
              Cloud Shift Inc.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400">
            Cloud Shift Inc. combines Agentic AI software solution design creativity,
            business architecting acumen and cloud computing technologies to produce client solutions
            that transform their businesses into competitive enterprises.
          </p>

          {/* email capture */}
          <form action="/contact" method="get" className="mt-7 flex max-w-md items-center gap-3">
            <label htmlFor="hero-email" className="sr-only">
              Work email
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              required
              placeholder="Enter email"
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-brand/70 focus:bg-white/8"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-gradient-to-b from-[#6d92ff] to-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-16px_rgba(79,124,255,1)] transition-all hover:-translate-y-0.5 hover:to-brand-hover"
            >
              Get Started
            </button>
          </form>

          {/* stats */}
          <dl className="mt-10 grid grid-cols-3 gap-6 sm:max-w-lg lg:mt-12">
            {STATS.map((s) => (
              <div key={s.v}>
                <dt className="text-[1.75rem] font-bold leading-none text-slate-100">{s.v}</dt>
                <dd className="mt-2 whitespace-pre-line text-[12.5px] leading-snug text-slate-400">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------- floating panels ---------------- */}
        {/* desktop: tilted 3D collage */}
        <div className="relative hidden h-[clamp(28rem,64vh,37rem)] lg:block">
          <div className="cs-tilt absolute inset-0">
            <div className="absolute left-[-1%] top-[3%] z-20 h-[50%] w-[57%]">
              <CodePanel />
            </div>
            <div className="absolute right-[-3%] top-[-2%] z-10 h-[52%] w-[44%]">
              <AnalyticsPanel />
            </div>
            <div className="absolute bottom-[1%] left-[6%] z-30 h-[50%] w-[52%]">
              <AutomationPanel />
            </div>
            <div className="absolute bottom-[7%] right-[-4%] z-20 h-[44%] w-[42%]">
              <SecurityPanel />
            </div>
          </div>
        </div>

        {/* mobile / tablet: stacked, untilted */}
        <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
          <div className="h-64">
            <CodePanel />
          </div>
          <div className="h-64">
            <AnalyticsPanel />
          </div>
          <div className="h-64">
            <AutomationPanel />
          </div>
          <div className="h-64">
            <SecurityPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
