import BrandStrip from '@/components/BrandStrip';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import ServicesBoard from '@/components/ServicesBoard';
import { getServices, getServiceCategories } from '@/lib/wp';

export default async function Home() {
  const [services, categories] = await Promise.all([
    getServices(),
    getServiceCategories(),
  ]);

  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Technology partners */}
      <BrandStrip />

      {/* Services */}
      <section className="cs-services-bg py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="bg-gradient-to-r from-[#b5cdff] via-[#6d92ff] to-[#3b63e8] bg-clip-text pb-1.5 text-4xl font-extrabold tracking-tight text-transparent drop-shadow-[0_2px_22px_rgba(79,124,255,0.35)] sm:text-5xl lg:text-[3.25rem]">
              Our Services
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400 sm:text-xl">
              We <span className='text-white'>Deliver Solutions</span> that <span className='text-white'>Drive Results</span>.
            </p>
          </div>
          <ServicesBoard services={services} categories={categories} />
        </div>
      </section>

      {/* Products */}
      <ProductsSection />
    </main>
  );
}