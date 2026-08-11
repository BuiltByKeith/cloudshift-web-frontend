import { getPosts } from '@/lib/wp';

export default async function Blogs() {
  const posts = await getPosts();
  return (
    <main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <h1 className="text-4xl font-bold tracking-tight">Blogs</h1>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {posts.map(post => (
          <div key={post.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">{post.title.rendered}</h3>
            <div
              className="prose prose-invert prose-sm mt-2 max-w-none"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}