'use client';
import { useState } from 'react';

export default function ServicesSection({ services, categories }) {
  const [activeCat, setActiveCat] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = activeCat === 'all'
    ? services
    : services.filter(s => (s.service_category || []).includes(activeCat));

  const tabClass = (isActive) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${
      isActive
        ? 'border-brand bg-brand text-white'
        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-100'
    }`;

  return (
    <>
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2.5">
        <button className={tabClass(activeCat === 'all')} onClick={() => setActiveCat('all')}>
          No filter
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={tabClass(activeCat === cat.id)}
            onClick={() => setActiveCat(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {filtered.map(service => (
          <div
            key={service.id}
            className="flex flex-col gap-2.5 rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:-translate-y-1 hover:border-brand"
          >
            {service.acf?.icon && <div className="text-3xl">{service.acf.icon}</div>}
            <h3 className="text-lg font-semibold">{service.title.rendered}</h3>
            <p className="flex-1 text-sm text-slate-400">{service.acf?.short_description}</p>
            {service.acf?.price && (
              <span className="text-sm font-semibold text-accent">{service.acf.price}</span>
            )}
            <button
              onClick={() => setSelected(service)}
              className="mt-1.5 self-start rounded-full border border-brand px-4 py-2 text-sm text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Learn more
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-400">No services in this category yet.</p>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 text-2xl leading-none text-slate-400 transition-colors hover:text-slate-100"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold tracking-tight">{selected.title.rendered}</h2>
            {selected.acf?.price && (
              <div className="mt-1 font-semibold text-accent">{selected.acf.price}</div>
            )}
            <div
              className="prose prose-invert mt-4 max-w-none"
              dangerouslySetInnerHTML={{
                __html: selected.acf?.full_description || selected.content.rendered,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}