const API = process.env.NEXT_PUBLIC_WP_API_URL;

async function get(path) {
  const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WP fetch failed: ${path} (${res.status})`);
  return res.json();
}

export const getServices          = () => get('/services?per_page=100');
export const getServiceCategories = () => get('/service_category?per_page=100');
export const getJobs              = () => get('/jobs?per_page=100');
export const getPosts             = () => get('/posts?per_page=100&_embed');