import { decode, readingTime } from '@/lib/html';
import { getPosts } from '@/lib/wp';

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* posts are requested with _embed, so the assigned terms come back inline —
   wp:term is an array of arrays, one per taxonomy */
function primaryCategory(post) {
  if (post.category) return post.category;
  const groups = post._embedded?.['wp:term'] || [];
  const term = groups.flat().find((t) => t?.taxonomy === 'category');
  if (!term || term.slug === 'uncategorized') return null;
  return decode(term.name);
}

export default async function Blogs() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-[#b5cdff] via-[#6d92ff] to-[#3b63e8] bg-clip-text pb-1.5 text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Blogs
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400">
          Notes from the team on cloud, security, and building software that lasts.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-slate-400">No posts published yet.</p>
      ) : (
        <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {posts.map((post) => {
            const category = primaryCategory(post);
            const time = post.readingTime || readingTime(post.content?.rendered);

            return (
              <article
                key={post.id}
                className="cs-glass flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-[#7fa5ff]/40"
              >
                <div className="flex items-center gap-2.5 text-[12px] text-white/45">
                  {category && (
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-semibold uppercase tracking-wider text-[#a9c6ff]">
                      {category}
                    </span>
                  )}
                  <span>{formatDate(post.date)}</span>
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white">
                  {decode(post.title.rendered)}
                </h2>

                <div
                  className="prose prose-invert prose-sm mt-2.5 max-w-none prose-p:text-white/65 prose-a:text-[#a9c6ff]"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />

                <div className="mt-6 flex-1" />

                {time && <span className="text-[12.5px] text-white/45">{time}</span>}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
