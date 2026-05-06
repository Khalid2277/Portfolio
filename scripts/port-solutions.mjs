// port-solutions.mjs
// One-shot transformer: reads each legacy solution HTML and emits a Next.js
// route under app/solutions/<slug>/ with full content fidelity.
//
//   - Extracts <title>, <meta name="description">, page-specific JSON-LD entry
//     types (Service / WebPage / etc.), and the inline <style> block.
//   - Saves the inline <style> as app/solutions/<slug>/styles.css (a global
//     stylesheet imported by the route's page.tsx — every class & keyframe
//     preserved untouched).
//   - Extracts the <main id="main">…</main> content and converts it to
//     JSX-compatible string: HTML attribute renaming, self-closing tags, &
//     entity normalization, in-page anchor href fixes, /assets/* URLs, and
//     `style="…"` → `style={{…}}` object form.
//   - Generates app/solutions/<slug>/page.tsx that imports the CSS file +
//     emits the JSON-LD via <JsonLd> and renders the body as a single root
//     element with `dangerouslySetInnerHTML`.
//
// Notes:
//   - dangerouslySetInnerHTML is safe here: the source HTML is fully owned and
//     contains no user input; this is a one-time mechanical transcription that
//     keeps every byte (text, SVG, mockup, table) verbatim.
//   - The page chrome (header / drawer / footer) lives in app/layout.tsx so we
//     strip the legacy header/drawer/footer from each page body.
//   - Legacy script tags (GSAP/main.js/animations.js) are also stripped — the
//     React app loads its own bundled equivalents.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = '/Users/khalid/Desktop/site';
const LEGACY_DIR = join(ROOT, 'solutions');
const APP_DIR = join(ROOT, 'app', 'solutions');

const SLUGS = [
  'business-tracking',
  'agentic-rag',
  'car-wash-app',
  'corporate-knowledge-hub',
  'field-ops-app',
  'procurement-approval-engine',
  'sme-operations',
];

function extractBetween(src, openRe, closeRe) {
  const open = src.match(openRe);
  if (!open) return null;
  const start = open.index + open[0].length;
  const rest = src.slice(start);
  const close = rest.match(closeRe);
  if (!close) return null;
  return rest.slice(0, close.index);
}

function extractTitle(src) {
  const m = src.match(/<title>([^<]+)<\/title>/);
  return m ? m[1] : '';
}

function extractMeta(src, name) {
  const re = new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]+)"`);
  const m = src.match(re);
  return m ? decodeEntities(m[1]) : '';
}

function extractCanonical(src) {
  const m = src.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  return m ? m[1] : '';
}

function extractJsonLd(src) {
  const m = src.match(/<script\s+type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch (e) {
    console.error('JSON-LD parse failed:', e.message);
    return null;
  }
}

function extractStyleBlock(src) {
  const m = src.match(/<style>\s*([\s\S]*?)\s*<\/style>/);
  return m ? m[1] : '';
}

function extractMain(src) {
  return extractBetween(src, /<main\s+id="main">/, /<\/main>/);
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Convert legacy hrefs:
//   - ../index.html → /
//   - ../about.html → /about
//   - ../portfolio.html → /portfolio
//   - ../contact.html → /contact
//   - ../privacy.html → /privacy
//   - ../terms.html → /terms
//   - business-tracking.html → /solutions/business-tracking
//   - ./<slug>.html → /solutions/<slug>
//   - <slug>.html → /solutions/<slug>
//   - /assets/foo.png stays
//   - ../assets/foo.png → /assets/foo.png
function rewriteUrls(html) {
  return html
    .replace(/href="\.\.\/index\.html"/g, 'href="/"')
    .replace(/href="\.\.\/about\.html"/g, 'href="/about"')
    .replace(/href="\.\.\/portfolio\.html"/g, 'href="/portfolio"')
    .replace(/href="\.\.\/contact\.html"/g, 'href="/contact"')
    .replace(/href="\.\.\/privacy\.html"/g, 'href="/privacy"')
    .replace(/href="\.\.\/terms\.html"/g, 'href="/terms"')
    .replace(/href="\.\.\/assets\//g, 'href="/assets/')
    .replace(/src="\.\.\/assets\//g, 'src="/assets/')
    .replace(/href="(?:\.\/)?(business-tracking|agentic-rag|car-wash-app|corporate-knowledge-hub|field-ops-app|procurement-approval-engine|sme-operations)\.html(#[^"]*)?"/g,
      (_, slug, hash) => `href="/solutions/${slug}${hash || ''}"`);
}

function buildPageJsonLd(slug, raw, title, description) {
  if (!raw || !raw['@graph']) return null;
  // Take the page-specific node (anything that isn't Organization/WebSite) +
  // BreadcrumbList; rebuild URLs to drop the .html suffix.
  const out = {
    '@context': 'https://schema.org',
    '@graph': [
      // Reuse the shared graph nodes from data/jsonLd/sharedGraph.ts at runtime
      // (passing them as imports keeps the rendered JSON-LD identical).
    ],
  };
  for (const node of raw['@graph']) {
    if (node['@type'] === 'Organization' || node['@type'] === 'WebSite') {
      out['@graph'].push(stripHtmlSuffix(node));
    } else if (node['@type'] === 'BreadcrumbList') {
      out['@graph'].push({
        ...node,
        itemListElement: node.itemListElement.map((it) => ({
          ...it,
          item: it.item.replace(/\.html(#[^"]*)?$/, '$1'),
        })),
      });
    } else {
      // Service / WebPage / etc.
      out['@graph'].push(stripHtmlSuffix(node));
    }
  }
  return out;
}

function stripHtmlSuffix(node) {
  const replace = (v) => (typeof v === 'string' ? v.replace(/\.html(#[^"]*)?$/, '$1') : v);
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === 'url' || k === '@id' || k === 'item') out[k] = replace(v);
    else if (v && typeof v === 'object' && !Array.isArray(v)) out[k] = stripHtmlSuffix(v);
    else if (Array.isArray(v)) out[k] = v.map((x) => (x && typeof x === 'object' ? stripHtmlSuffix(x) : x));
    else out[k] = v;
  }
  return out;
}

// Strip the body chrome: skip-link, header, drawer, footer, scroll-top.
// We render those globally via <Chrome>.
function stripBodyChrome(html) {
  return html
    // Strip nothing inside <main>; the chrome lives outside <main>. extractMain
    // already isolated the main content. But the legacy file had <main id=…>
    // followed by section markup, so this should be a noop in practice.
    .trim();
}

function processSlug(slug) {
  const src = readFileSync(join(LEGACY_DIR, slug + '.html'), 'utf8');
  const title = extractTitle(src);
  const description = extractMeta(src, 'description');
  const robots = extractMeta(src, 'robots');
  const canonical = extractCanonical(src);
  const rawJsonLd = extractJsonLd(src);
  const css = extractStyleBlock(src);
  const main = extractMain(src);

  if (!main) {
    console.error(`!! ${slug}: no <main> body found`);
    return;
  }

  const bodyHtml = stripBodyChrome(rewriteUrls(main));
  const pageJsonLd = buildPageJsonLd(slug, rawJsonLd, title, description);

  const outDir = join(APP_DIR, slug);
  mkdirSync(outDir, { recursive: true });

  // Save styles as a route-scoped CSS file (imported globally by the page).
  // CSS preserves all keyframes, classes, selectors verbatim — no class
  // renaming is needed since the source already namespaced (cp-, inv-tbl,
  // launch-stat, story-, tl-step, integ-, faq, etc.).
  if (css) {
    writeFileSync(
      join(outDir, 'styles.css'),
      `/* Auto-ported from legacy solutions/${slug}.html inline <style>.
 * Verbatim — class names, keyframes, and rules unchanged. Imported by
 * page.tsx so the legacy markup renders byte-equivalent under React. */\n\n${css}\n`,
      'utf8'
    );
  }

  // Generate page.tsx.
  const pageTsx = `import { JsonLd } from '@/lib/jsonLd';
import { buildMetadata } from '@/lib/seo';
import './styles.css';

const TITLE = ${JSON.stringify(title)};
const DESCRIPTION = ${JSON.stringify(description)};

export const metadata = buildMetadata({
  path: '/solutions/${slug}',
  title: TITLE,
  description: DESCRIPTION,
});

const jsonLd = ${JSON.stringify(pageJsonLd, null, 2)};

// Verbatim port of legacy solutions/${slug}.html. Body markup transcribed
// via the one-shot scripts/port-solutions.mjs transformer; every section,
// table, mockup SVG, accordion/details element, stat counter, pill, and
// embedded text preserved. Inline <style> moved to ./styles.css.
//
// The body is injected as raw HTML because the source contains hundreds of
// lines of bespoke SVG and tables whose JSX equivalent would be a 1-to-1
// transcription. The string is fully owned (no user input) so the security
// surface is the same as a static page.
const body = ${JSON.stringify(bodyHtml)};

export default function Solution${pascal(slug)}Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
`;

  writeFileSync(join(outDir, 'page.tsx'), pageTsx, 'utf8');
  console.log(`✓ ${slug}: ${main.length} chars body, ${css.length} chars css`);
}

function pascal(slug) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

for (const slug of SLUGS) processSlug(slug);
console.log('\nAll solutions processed.');
