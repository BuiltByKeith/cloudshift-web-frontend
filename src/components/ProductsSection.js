import Image from 'next/image';

/* Copy is placeholder — swap the taglines, descriptions and points freely.
   `shot` is the plain landing-page screenshot that sits at the back of the card,
   `laptop` is the transparent render that sits in front of it on the right. */
const PRODUCTS = [
  {
    name: 'TaskFlow',
    tagline: 'Document & Workflow',
    description:
      'Capture, route and approve documents in one place, with every step tracked end to end.',
    points: ['Digital document management', 'No-code workflow builder', 'Full audit trail'],
    shot: '/images/taskflow.png',
    laptop: '/images/taskflow-in-laptop.png',
  },
  {
    name: 'VirtuHire',
    tagline: 'Hiring Platform',
    description:
      'Pre-recorded video interviews that cut scheduling out of hiring and keep the whole panel aligned.',
    points: ['Pre-recorded interviews', 'Team scoring & feedback', 'Candidate shortlisting'],
    shot: '/images/virtuhire.png',
    laptop: '/images/virtuhire-in-laptop.png',
    featured: true,
  },
  {
    name: 'Practitioner360',
    tagline: 'Practice Management',
    description:
      'One view of every practitioner, client and record, so day-to-day practice work stays organised.',
    points: ['Unified practitioner records', 'Scheduling & case tracking', 'Reporting dashboard'],
    shot: '/images/practitioner360.png',
    laptop: '/images/practitioner360-in-laptop.png',
  },
];

function ProductCard({ product }) {
  return (
    <li
      className={`cs-product-card flex flex-col rounded-[1.75rem] p-6 sm:p-7 ${
        product.featured ? 'cs-product-card-featured' : ''
      }`}
    >
      {/* Media stack, contained by the card: the landing-page screenshot is the
          backdrop, the laptop render sits centred in front of it. */}
      <div className="cs-product-media relative mb-11">
        <div className="cs-product-shot relative overflow-hidden rounded-2xl">
          <div className="relative aspect-16/9">
            <Image
              src={product.shot}
              alt={`${product.name} landing page`}
              fill
              sizes="(max-width: 768px) 88vw, (max-width: 1024px) 44vw, 30vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* laptop centred on the shot and dropped low, so it stands on the
            screenshot's bottom edge and hangs slightly past it */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-[30%] flex justify-center px-3">
          <Image
            src={product.laptop}
            alt={`${product.name} shown on a laptop`}
            width={1890}
            height={1417}
            sizes="(max-width: 768px) 54vw, (max-width: 1024px) 27vw, 19vw"
            className="cs-product-laptop w-[64%]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {product.tagline}
        </p>
        {product.featured && (
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-[#a9c6ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">{product.name}</h3>

      <p className="mt-3 text-sm leading-relaxed text-white/65">{product.description}</p>

      <ul className="mt-6 space-y-2.5">
        {product.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#7fa5ff]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {point}
          </li>
        ))}
      </ul>

      {/* pushes the action to the card's bottom edge so all three line up */}
      <div className="mt-8 flex-1" />

      <button
        type="button"
        className="group inline-flex items-center gap-2 self-start rounded-full border border-white/14 bg-white/6 px-4 py-2 text-[13px] font-medium text-white/80 transition-all duration-300 hover:border-[#7fa5ff]/50 hover:bg-white/12 hover:text-white"
      >
        Learn more
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
      </button>
    </li>
  );
}

export default function ProductsSection() {
  return (
    <section className="cs-products relative overflow-hidden py-24">
      <div aria-hidden="true" className="cs-products-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[84rem] px-6">
        <div className="mb-16 text-center">
          <h2 className="bg-gradient-to-r from-[#b5cdff] via-[#6d92ff] to-[#3b63e8] bg-clip-text pb-1.5 text-4xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_22px_rgba(79,124,255,0.35)] sm:text-5xl lg:text-[3.25rem]">
            Our Products
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Platforms we <span className="text-white">Build</span> and{' '}
            <span className="text-white">Stand Behind</span>.
          </p>
        </div>

        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-11 xl:gap-12">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
