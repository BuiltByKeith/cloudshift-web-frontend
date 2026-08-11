import Image from 'next/image';

/* heights are tuned per logo so they read at matching optical weight,
   not matching pixel height — the lockups have very different aspect ratios */
const BRANDS = [
  { name: 'Microsoft', src: '/images/microsoft-colored.png', w: 1200, h: 346, className: 'h-9 sm:h-11' },
  { name: 'Veritas', src: '/images/veritas-colored (1).png', w: 1600, h: 400, className: 'h-8 sm:h-10' },
  { name: 'Amazon Web Services', src: '/images/aws-colored.png', w: 1024, h: 900, className: 'h-14 sm:h-17' },
  { name: 'Zoho', src: '/images/zoho-colored-scaled.png', w: 2560, h: 781, className: 'h-11 sm:h-13' },
];

export default function BrandStrip() {
  return (
    <section className="py-6 sm:py-7">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 sm:gap-x-16 lg:gap-x-20">
        {BRANDS.map((b) => (
          <li key={b.name}>
            <Image
              src={b.src}
              alt={b.name}
              width={b.w}
              height={b.h}
              className={`w-auto object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 ${b.className}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
