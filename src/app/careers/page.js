import { getJobs } from '@/lib/wp';

export default async function Careers() {
  const jobs = await getJobs();
  return (
    <main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <h1 className="text-4xl font-bold tracking-tight">Careers</h1>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {jobs.map(job => (
          <div key={job.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">{job.title.rendered}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {job.acf?.location} · {job.acf?.employment_type}
            </p>
            {job.acf?.department && (
              <span className="mt-2 inline-block text-sm font-semibold text-accent">
                {job.acf.department}
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}