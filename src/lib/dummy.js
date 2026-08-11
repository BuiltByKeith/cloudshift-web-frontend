/* Stand-in content used whenever NEXT_PUBLIC_WP_API_URL is not configured —
   deployments cannot reach a WordPress instance running on localhost, so the
   site builds against this instead. Every object mirrors the shape of the
   WordPress REST response it replaces, so nothing downstream has to change. */

export const SERVICE_CATEGORIES = [
  { id: 11, name: 'Cloud' },
  { id: 12, name: 'Software' },
  { id: 13, name: 'Security' },
  { id: 14, name: 'Support' },
];

const service = (id, catId, title, icon, short, price, full) => ({
  id,
  service_category: [catId],
  title: { rendered: title },
  content: { rendered: full },
  acf: {
    icon,
    short_description: short,
    price,
    full_description: full,
  },
});

export const SERVICES = [
  service(
    101,
    12,
    'Custom Software Development',
    '🧩',
    'Web and internal systems built around how your business actually works.',
    '',
    '<p>We design, build and ship software to fit an existing process rather than forcing a rewrite of it. Discovery, delivery and handover are run as one engagement, so the team that scopes the work is the team that builds it.</p><p>Typical engagements cover internal tools, customer portals and line-of-business systems that have outgrown spreadsheets.</p>',
  ),
  service(
    102,
    12,
    'Web Application Development',
    '🌐',
    'Fast, accessible front ends backed by APIs you can build on.',
    '',
    '<p>Modern web applications with a clear separation between interface and data, so the same back end can serve a site, a mobile client and third-party integrations without rework.</p>',
  ),
  service(
    103,
    12,
    'System Integration',
    '🔗',
    'Get your existing platforms talking to each other properly.',
    '',
    '<p>Point-to-point integrations tend to multiply until nobody can trace a record end to end. We map the flows first, then build integrations with retries, logging and a single source of truth for each entity.</p>',
  ),
  service(
    104,
    11,
    'Cloud Migration',
    '☁️',
    'Move workloads to the cloud without a weekend of downtime.',
    '',
    '<p>Assessment, dependency mapping, staged cutover and rollback planning. We migrate in slices so there is always a way back, and so the business keeps running while it happens.</p>',
  ),
  service(
    105,
    11,
    'Cloud Infrastructure & DevOps',
    '⚙️',
    'Repeatable environments, automated deploys, no manual steps.',
    '',
    '<p>Infrastructure defined as code, pipelines that build and deploy on every merge, and environments that can be rebuilt from scratch. The goal is boring, predictable releases.</p>',
  ),
  service(
    106,
    11,
    'Microsoft 365 & Workspace Deployment',
    '📨',
    'Mail, identity and collaboration set up once, set up right.',
    '',
    '<p>Tenant setup, mailbox and data migration, identity configuration and end-user rollout, including the licensing review most projects discover too late.</p>',
  ),
  service(
    107,
    13,
    'Backup & Disaster Recovery',
    '🛟',
    'Backups that have been restored, not just scheduled.',
    '',
    '<p>Backup design, retention policy and — the part usually skipped — scheduled restore drills, so recovery time is a measured number rather than an assumption.</p>',
  ),
  service(
    108,
    13,
    'Security Assessment',
    '🔐',
    'Find the gaps before somebody else does.',
    '',
    '<p>A review of identity, access, patching, endpoint posture and exposed surface, delivered as a prioritised list of fixes with the effort and impact of each one spelled out.</p>',
  ),
  service(
    109,
    14,
    'Managed IT Support',
    '🛠️',
    'Day-to-day support with response times in writing.',
    '',
    '<p>Helpdesk, monitoring, patching and asset management under an agreed service level, with monthly reporting on what was raised and what was resolved.</p>',
  ),
  service(
    110,
    14,
    'IT Consulting & Roadmapping',
    '🧭',
    'Decide what to build, buy, keep or retire.',
    '',
    '<p>A short engagement that produces a costed roadmap: what the current estate looks like, what it is costing, and the sequence of changes that gets the most value soonest.</p>',
  ),
];

export const JOBS = [
  {
    id: 201,
    title: { rendered: 'Senior Full-Stack Engineer' },
    acf: { location: 'Manila, PH', employment_type: 'Full-time', department: 'Engineering' },
  },
  {
    id: 202,
    title: { rendered: 'Cloud Infrastructure Engineer' },
    acf: { location: 'Remote', employment_type: 'Full-time', department: 'Cloud' },
  },
  {
    id: 203,
    title: { rendered: 'QA Automation Engineer' },
    acf: { location: 'Manila, PH', employment_type: 'Full-time', department: 'Engineering' },
  },
  {
    id: 204,
    title: { rendered: 'UI/UX Designer' },
    acf: { location: 'Hybrid — Manila, PH', employment_type: 'Full-time', department: 'Design' },
  },
  {
    id: 205,
    title: { rendered: 'IT Support Specialist' },
    acf: { location: 'Manila, PH', employment_type: 'Full-time', department: 'Support' },
  },
  {
    id: 206,
    title: { rendered: 'Business Development Associate' },
    acf: { location: 'Remote', employment_type: 'Contract', department: 'Sales' },
  },
];

const post = (id, date, category, readingTime, title, excerpt) => ({
  id,
  date,
  category,
  readingTime,
  title: { rendered: title },
  excerpt: { rendered: `<p>${excerpt}</p>` },
  content: { rendered: `<p>${excerpt}</p>` },
});

export const POSTS = [
  post(
    301,
    '2026-07-28',
    'Cloud',
    '6 min read',
    'Planning a migration that does not stall halfway',
    'Most cloud migrations do not fail on the technology. They stall on the parts nobody scoped: data ownership, licence terms, and the one legacy service everything quietly depends on.',
  ),
  post(
    302,
    '2026-07-14',
    'Security',
    '5 min read',
    'Backups you have never restored are not backups',
    'A restore drill costs an afternoon. Finding out your snapshots were incomplete during an actual incident costs considerably more than that.',
  ),
  post(
    303,
    '2026-06-30',
    'Automation',
    '4 min read',
    'Where workflow automation actually pays for itself',
    'Automating a broken process just makes it fail faster. Map the handoffs first, cut the steps that exist only out of habit, then automate what is left.',
  ),
  post(
    304,
    '2026-06-11',
    'Engineering',
    '7 min read',
    'Choosing between managed services and running it yourself',
    'Managed services trade money for attention. That is usually a good trade, right up until the moment the service stops fitting how your team works.',
  ),
  post(
    305,
    '2026-05-22',
    'Workplace',
    '5 min read',
    'What a good onboarding week looks like for a new engineer',
    'Ship something small on day two. Nothing builds context faster than following one change all the way through to production.',
  ),
  post(
    306,
    '2026-05-05',
    'Cloud',
    '6 min read',
    'Cutting cloud spend without cutting capability',
    'The savings are rarely in the compute line. They are in the idle environments, the oversized storage tiers, and the egress nobody has looked at in a year.',
  ),
];
