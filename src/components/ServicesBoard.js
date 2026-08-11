'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/* WordPress returns titles with HTML entities (&amp;, &#038; …) */
const ENTITIES = {
  '&amp;': '&', '&#038;': '&', '&quot;': '"', '&#8220;': '“', '&#8221;': '”',
  '&#039;': "'", '&#8217;': '’', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ',
  '&ndash;': '–', '&#8211;': '–', '&mdash;': '—', '&#8212;': '—',
};

function decode(str = '') {
  return str.replace(/&[a-z]+;|&#\d+;/gi, (m) => ENTITIES[m] ?? m);
}

function formatPrice(price) {
  if (!price) return null;
  const digits = String(price).replace(/[^\d.]/g, '');
  if (!digits || Number.isNaN(Number(digits))) return String(price);
  return `$${Number(digits).toLocaleString('en-US')}`;
}

/* Split the category list into two panels, keeping the service counts as even
   as the data allows. Uncategorised services land in the lighter panel. */
function buildPanels(services, categories) {
  const byCat = new Map(categories.map((c) => [c.id, []]));
  const orphans = [];

  services.forEach((s) => {
    const catId = (s.service_category || []).find((id) => byCat.has(id));
    if (catId === undefined) orphans.push(s);
    else byCat.get(catId).push(s);
  });

  const panels = [
    { cats: [], services: [] },
    { cats: [], services: [] },
  ];

  categories.forEach((cat) => {
    const items = byCat.get(cat.id) || [];
    if (!items.length) return;
    const target = panels[0].services.length <= panels[1].services.length ? panels[0] : panels[1];
    target.cats.push({ id: cat.id, name: decode(cat.name) });
    target.services.push(...items);
  });

  orphans.forEach((s) => {
    const target = panels[0].services.length <= panels[1].services.length ? panels[0] : panels[1];
    target.services.push(s);
  });

  return panels;
}

function ServiceRow({ service, onOpen }) {
  const price = formatPrice(service.acf?.price);

  return (
    <li>
      <button
        type="button"
        onClick={(e) => onOpen(service, e.currentTarget)}
        className="cs-listrow group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 hover:translate-x-1"
      >
        {service.acf?.icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/12 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
            {service.acf.icon}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-white">
            {decode(service.title.rendered)}
          </span>
          {service.acf?.short_description && (
            <span className="mt-0.5 block truncate text-[12.5px] text-white/60">
              {decode(service.acf.short_description)}
            </span>
          )}
          {price && (
            <span className="mt-1.5 block text-[13px] font-semibold text-[#a9c6ff]">{price}</span>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-white/60 transition-colors group-hover:text-white">
          <span className="hidden sm:inline">View details</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </li>
  );
}

/* compact card used by the grid view */
function ServiceCard({ service, onOpen }) {
  const price = formatPrice(service.acf?.price);

  return (
    <li>
      <button
        type="button"
        onClick={(e) => onOpen(service, e.currentTarget)}
        className="cs-listrow group flex h-full w-full flex-col rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1"
      >
        {service.acf?.icon && (
          <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-xl bg-white/12 text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
            {service.acf.icon}
          </span>
        )}

        <span className="block text-[15px] font-semibold leading-snug text-white">
          {decode(service.title.rendered)}
        </span>

        {service.acf?.short_description && (
          <span className="mt-1.5 line-clamp-2 block text-[12.5px] leading-relaxed text-white/60">
            {decode(service.acf.short_description)}
          </span>
        )}

        {price && (
          <span className="mt-2 block text-[13px] font-semibold text-[#a9c6ff]">{price}</span>
        )}

        <span className="mt-4 flex items-center gap-1.5 pt-0.5 text-[12.5px] font-medium text-white/60 transition-colors group-hover:text-white">
          View details
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </li>
  );
}

const VIEW_ICONS = {
  list: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.6" />
    </>
  ),
};

function ViewToggle({ view, onChange }) {
  return (
    <div
      role="group"
      aria-label="Service layout"
      className="cs-tab flex shrink-0 items-center gap-1 rounded-full p-1"
    >
      {['list', 'grid'].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={view === v}
          aria-label={`${v} view`}
          title={`${v[0].toUpperCase()}${v.slice(1)} view`}
          className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-300 ${
            view === v ? 'cs-tab-active text-white' : 'text-white/55 hover:text-white'
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            {VIEW_ICONS[v]}
          </svg>
        </button>
      ))}
    </div>
  );
}

function BookPanel({ panel, side, onOpen }) {
  const [activeCat, setActiveCat] = useState('all');
  const [view, setView] = useState('list');

  const visible =
    activeCat === 'all'
      ? panel.services
      : panel.services.filter((s) => (s.service_category || []).includes(activeCat));

  const tabClass = (isActive) =>
    `rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all duration-300 ${
      isActive ? 'cs-tab-active text-white' : 'text-white/60 hover:text-white'
    }`;

  return (
    <div className="relative">
      {/* glow bloom behind the panel */}
      <div
        aria-hidden="true"
        className={`cs-panel-halo pointer-events-none absolute -inset-10 -z-10 ${
          side === 'left' ? 'origin-right' : 'origin-left'
        }`}
      />

      {/* The toggle deliberately lives OUTSIDE the tilted panel. Under a 3D
          transform Chrome hit-tests the composited layer at a position that
          drifts with distance from the transform-origin, which made the right
          panel's toggle need an offset cursor. Rendering it in the untransformed
          wrapper means its paint box and its hit box are the same box. */}
      <div className="absolute right-6 top-6 z-20 sm:right-8 sm:top-8">
        <ViewToggle view={view} onChange={setView} />
      </div>

      <div
        className={`cs-panel ${
          side === 'left' ? 'cs-book-l' : 'cs-book-r'
        } h-full rounded-[1.75rem] p-6 shadow-[0_40px_90px_-40px_rgba(79,124,255,0.55)] sm:p-8`}
      >
        <h3 className="pr-24 text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
          {panel.title}
        </h3>

        {/* clears the absolutely-positioned toggle sitting at the top-right */}
        <p className="mt-6 text-sm leading-relaxed text-white/65">{panel.blurb}</p>

        {panel.cats.length > 0 && (
          <div className="mt-5 flex justify-center">
            <div
              role="group"
              aria-label="Filter services by category"
              className="cs-tab flex flex-wrap items-center justify-center gap-1 rounded-full p-1"
            >
              <button
                type="button"
                aria-pressed={activeCat === 'all'}
                className={tabClass(activeCat === 'all')}
                onClick={() => setActiveCat('all')}
              >
                No filter
              </button>
              {panel.cats.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={activeCat === cat.id}
                  className={tabClass(activeCat === cat.id)}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <ul
          key={view}
          className={`cs-view-swap mt-6 ${
            view === 'grid' ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'space-y-3'
          }`}
        >
          {visible.map((s) =>
            view === 'grid' ? (
              <ServiceCard key={s.id} service={s} onOpen={onOpen} />
            ) : (
              <ServiceRow key={s.id} service={s} onOpen={onOpen} />
            ),
          )}
        </ul>

        {visible.length === 0 && (
          <p className="mt-6 text-center text-sm text-white/50">
            No services in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}

const PANEL_COPY = [
  {
    title: 'Build & Engineer',
    blurb:
      'Design, development, and delivery of the products and platforms your business runs on.',
  },
  {
    title: 'Run & Optimize',
    blurb:
      'Cloud, automation, and continuous improvement that keep what you ship fast, safe, and cost-efficient.',
  },
];

const OPEN_MS = 460;
const CLOSE_MS = 300;

export default function ServicesBoard({ services, categories }) {
  const [selected, setSelected] = useState(null);
  /* measure → from → to → exit: the row's rect is captured, the panel is
     rendered at its final size, then flown in from that rect (a FLIP). */
  const [phase, setPhase] = useState('idle');
  const originRef = useRef(null);
  const fromRef = useRef(null);
  const panelRef = useRef(null);

  const open = useCallback((service, rowEl) => {
    originRef.current = rowEl.getBoundingClientRect();
    setSelected(service);
    setPhase('measure');
  }, []);

  const close = useCallback(() => {
    setPhase((p) => (p === 'exit' || p === 'idle' ? p : 'exit'));
  }, []);

  /* panel is mounted at its natural size but invisible — measure it, then
     work out the transform that would place it exactly over the clicked row */
  useLayoutEffect(() => {
    if (phase !== 'measure' || !panelRef.current || !originRef.current) return;
    const o = originRef.current;
    const t = panelRef.current.getBoundingClientRect();
    // geometric mean of the width and height ratios: uniform, so no text
    // distortion, but small enough to read as a widget opening up
    const scale = Math.min(0.9, Math.max(0.25, Math.sqrt((o.width / t.width) * (o.height / t.height))));
    const dx = o.left + o.width / 2 - (t.left + t.width / 2);
    const dy = o.top + o.height / 2 - (t.top + t.height / 2);
    fromRef.current = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
    setPhase('from');
  }, [phase]);

  /* one frame at the start position, then release to identity */
  useEffect(() => {
    if (phase !== 'from') return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('to')));
    return () => cancelAnimationFrame(id);
  }, [phase]);

  /* unmount once the closing flight finishes */
  useEffect(() => {
    if (phase !== 'exit') return;
    const id = setTimeout(() => {
      setSelected(null);
      setPhase('idle');
    }, CLOSE_MS);
    return () => clearTimeout(id);
  }, [phase]);

  /* escape to close, and hold the page still while open */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === 'Escape' && close();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevPad = root.style.paddingRight;

    /* Lock <html>, not <body>: body's overflow propagates to the viewport and
       takes body's `scrollbar-gutter` (auto) with it, which throws away the
       reserved track and lets the page widen. Locking the root keeps its own
       `scrollbar-gutter: stable` in force. */
    const widthBefore = root.clientWidth;
    root.style.overflow = 'hidden';
    /* fallback for browsers without scrollbar-gutter: pad back whatever width
       the vanishing scrollbar just handed us */
    const shift = root.clientWidth - widthBefore;
    if (shift > 0) root.style.paddingRight = `${shift}px`;

    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPad;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected, close]);

  const panels = buildPanels(services, categories).map((p, i) => ({ ...p, ...PANEL_COPY[i] }));

  const panelStyle =
    phase === 'measure'
      ? { opacity: 0 }
      : phase === 'from'
        ? { transform: fromRef.current, opacity: 0.35 }
        : phase === 'to'
          ? {
              transform: 'none',
              opacity: 1,
              transition: `transform ${OPEN_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${OPEN_MS / 2}ms ease-out`,
            }
          : {
              transform: fromRef.current,
              opacity: 0,
              transition: `transform ${CLOSE_MS}ms cubic-bezier(0.4, 0, 0.6, 1), opacity ${CLOSE_MS - 60}ms ease-in`,
            };

  return (
    <>
      <div className="cs-book grid gap-10 lg:grid-cols-2 lg:gap-7">
        {panels.map((panel, i) => (
          <BookPanel
            key={panel.title}
            panel={panel}
            side={i === 0 ? 'left' : 'right'}
            onOpen={open}
          />
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-100 flex items-center justify-center p-6"
          onClick={close}
        >
          {/* backdrop fades independently of the panel flight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out"
            style={{ opacity: phase === 'to' ? 1 : 0 }}
          />

          <div
            ref={panelRef}
            style={panelStyle}
            className="cs-modal-panel cs-panel relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-4 text-2xl leading-none text-white/60 transition-colors hover:text-white"
            >
              ×
            </button>
            <div className="cs-modal-body">
              <h2 className="pr-8 text-2xl font-bold tracking-tight text-white">
                {decode(selected.title.rendered)}
              </h2>
              {formatPrice(selected.acf?.price) && (
                <div className="mt-1.5 font-semibold text-[#a9c6ff]">
                  {formatPrice(selected.acf.price)}
                </div>
              )}
              <div
                className="prose prose-invert mt-4 max-w-none prose-p:text-white/75"
                dangerouslySetInnerHTML={{
                  __html: selected.acf?.full_description || selected.content.rendered,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
