import { getPosts } from '@/lib/wp';

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
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

      <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="cs-glass flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-[#7fa5ff]/40"
          >
            {/* category and reading time only exist on the stand-in content —
                a live WordPress post simply renders the date on its own */}
            <div className="flex items-center gap-2.5 text-[12px] text-white/45">
              {post.category && (
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-semibold uppercase tracking-wider text-[#a9c6ff]">
                  {post.category}
                </span>
              )}
              <span>{formatDate(post.date)}</span>
            </div>

            <h2 className="mt-4 text-lg font-semibold leading-snug text-white">
              {post.title.rendered}
            </h2>

            <div
              className="prose prose-invert prose-sm mt-2.5 max-w-none prose-p:text-white/65"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            <div className="mt-6 flex-1" />

            {post.readingTime && (
              <span className="text-[12.5px] text-white/45">{post.readingTime}</span>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
