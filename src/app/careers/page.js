import { decode } from '@/lib/html';
import { getJobs } from '@/lib/wp';

function formatSalary(range) {
  if (!range) return null;
  const digits = String(range).replace(/[^\d.]/g, '');
  if (!digits || Number.isNaN(Number(digits))) return decode(String(range));
  return `$${Number(digits).toLocaleString('en-US')}`;
}

export default async function Careers() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-[#b5cdff] via-[#6d92ff] to-[#3b63e8] bg-clip-text pb-1.5 text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Careers
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400">
          Open roles at CloudShift. Do not see a fit? Send us your CV anyway.
        </p>
      </div>

      {jobs.length === 0 ? (
        <p className="mt-16 text-center text-slate-400">No open roles right now.</p>
      ) : (
        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {jobs.map((job) => {
            const salary = formatSalary(job.acf?.salary_range);
            const meta = [job.acf?.location, job.acf?.employment_type]
              .filter(Boolean)
              .map((v) => decode(String(v)))
              .join(' · ');

            return (
              <article
                key={job.id}
                className="cs-glass flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-[#7fa5ff]/40"
              >
                {job.acf?.department && (
                  <span className="self-start rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#a9c6ff]">
                    {decode(job.acf.department)}
                  </span>
                )}

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white">
                  {decode(job.title.rendered)}
                </h2>

                {meta && <p className="mt-2 text-sm text-white/60">{meta}</p>}

                {salary && (
                  <p className="mt-1.5 text-[13px] font-semibold text-[#a9c6ff]">{salary}</p>
                )}

                <div className="mt-6 flex-1" />

                <span className="text-[12.5px] font-medium text-white/50">Applications open</span>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
