/* WordPress returns titles and term names with HTML entities (&amp;, &#038; …) */
const ENTITIES = {
  '&amp;': '&', '&#038;': '&', '&quot;': '"', '&#8220;': '“', '&#8221;': '”',
  '&#039;': "'", '&#8217;': '’', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ',
  '&ndash;': '–', '&#8211;': '–', '&mdash;': '—', '&#8212;': '—', '&hellip;': '…',
};

export function decode(str = '') {
  return str.replace(/&[a-z]+;|&#\d+;/gi, (m) => ENTITIES[m] ?? m);
}

export function stripTags(html = '') {
  return decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/* rough but honest: 200 words a minute, floored at one minute */
export function readingTime(html = '') {
  const words = stripTags(html).split(' ').filter(Boolean).length;
  if (!words) return null;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
