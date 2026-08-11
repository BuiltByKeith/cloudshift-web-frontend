import { JOBS, POSTS, SERVICE_CATEGORIES, SERVICES } from './dummy';

const API = process.env.NEXT_PUBLIC_WP_API_URL;

/* No API configured — which is the case for any deployment, since the
   WordPress instance currently only exists on localhost — so the site builds
   against the stand-in content in ./dummy instead. Set NEXT_PUBLIC_WP_API_URL
   to a reachable WordPress REST endpoint and every function below goes back to
   fetching live data with no other changes. */
const USE_DUMMY = !API;

async function get(path) {
  const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WP fetch failed: ${path} (${res.status})`);
  return res.json();
}

export const getServices = () =>
  USE_DUMMY ? Promise.resolve(SERVICES) : get('/services?per_page=100');

export const getServiceCategories = () =>
  USE_DUMMY ? Promise.resolve(SERVICE_CATEGORIES) : get('/service_category?per_page=100');

export const getJobs = () => (USE_DUMMY ? Promise.resolve(JOBS) : get('/jobs?per_page=100'));

export const getPosts = () =>
  USE_DUMMY ? Promise.resolve(POSTS) : get('/posts?per_page=100&_embed');
