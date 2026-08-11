/* Placeholder content. Shaped like the WordPress REST response (title.rendered,
   excerpt.rendered, date) so switching back to getPosts() is a one-line change
   once the API is reachable from the deployed environment. */
const POSTS = [
  {
    id: 1,
    date: '2026-07-28',
    category: 'Cloud',
    readingTime: '6 min read',
    title: { rendered: 'Planning a migration that does not stall halfway' },
    excerpt: {
      rendered:
        '<p>Most cloud migrations do not fail on the technology. They stall on the parts nobody scoped: data ownership, licence terms, and the one legacy service everything quietly depends on.</p>',
    },
  },
  {
    id: 2,
    date: '2026-07-14',
    category: 'Security',
    readingTime: '5 min read',
    title: { rendered: 'Backups you have never restored are not backups' },
    excerpt: {
      rendered:
        '<p>A restore drill costs an afternoon. Finding out your snapshots were incomplete during an actual incident costs considerably more than that.</p>',
    },
  },
  {
    id: 3,
    date: '2026-06-30',
    category: 'Automation',
    readingTime: '4 min read',
    title: { rendered: 'Where workflow automation actually pays for itself' },
    excerpt: {
      rendered:
        '<p>Automating a broken process just makes it fail faster. Map the handoffs first, cut the steps that exist only out of habit, then automate what is left.</p>',
    },
  },
  {
    id: 4,
    date: '2026-06-11',
    category: 'Engineering',
    readingTime: '7 min read',
    title: { rendered: 'Choosing between managed services and running it yourself' },
    excerpt: {
      rendered:
        '<p>Managed services trade money for attention. That is usually a good trade, right up until the moment the service stops fitting how your team works.</p>',
    },
  },
  {
    id: 5,
    date: '2026-05-22',
    category: 'Workplace',
    readingTime: '5 min read',
    title: { rendered: 'What a good onboarding week looks like for a new engineer' },
    excerpt: {
      rendered:
        '<p>Ship something small on day two. Nothing builds context faster than following one change all the way through to production.</p>',
    },
  },
  {
    id: 6,
    date: '2026-05-05',
    category: 'Cloud',
    readingTime: '6 min read',
    title: { rendered: 'Cutting cloud spend without cutting capability' },
    excerpt: {
      rendered:
        '<p>The savings are rarely in the compute line. They are in the idle environments, the oversized storage tiers, and the egress nobody has looked at in a year.</p>',
    },
  },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function Blogs() {
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
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="cs-glass flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-[#7fa5ff]/40"
          >
            <div className="flex items-center gap-2.5 text-[12px] text-white/45">
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-semibold uppercase tracking-wider text-[#a9c6ff]">
                {post.category}
              </span>
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

            <span className="text-[12.5px] text-white/45">{post.readingTime}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
