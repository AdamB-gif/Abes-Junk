import fs from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const dir = path.join(root, 'services');

const FAQ_CSS_MARKER = '/* FAQ */';
const FAQ_CSS = `    ${FAQ_CSS_MARKER}
    .faq-block { margin-top: 5rem; }
    .faq-block h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; letter-spacing: -0.025em; color: var(--cream); margin-bottom: 2rem; }
    .faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .faq-item { background: rgba(196,133,42,0.04); border: 1px solid rgba(196,133,42,0.12); border-radius: 8px; overflow: hidden; transition: border-color 0.2s, background 0.2s; }
    .faq-item[open] { border-color: rgba(196,133,42,0.35); background: rgba(196,133,42,0.07); }
    .faq-item summary { list-style: none; cursor: pointer; padding: 1.15rem 1.5rem; font-size: 1rem; font-weight: 600; color: var(--cream); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item summary::after { content: '+'; font-family: 'DM Mono', monospace; font-size: 1.3rem; color: var(--amber); transition: transform 0.2s; line-height: 1; }
    .faq-item[open] summary::after { content: '\u2212'; transform: rotate(0deg); }
    .faq-item summary:hover { color: var(--amber-lt); }
    .faq-answer { padding: 0 1.5rem 1.25rem; font-size: 0.925rem; line-height: 1.7; color: var(--smoke); }
    .faq-answer a { color: var(--amber); }`;

const escapeHtml = s => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function extractFaqs(html) {
  const re = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const json = JSON.parse(m[1]);
      if (json['@type'] === 'FAQPage' && Array.isArray(json.mainEntity)) {
        return json.mainEntity.map(q => [q.name, q.acceptedAnswer.text]);
      }
    } catch (e) { /* skip */ }
  }
  return null;
}

function buildFaqHtml(faqs) {
  const items = faqs.map(([q, a]) =>
    `        <details class="faq-item">
          <summary>${escapeHtml(q)}</summary>
          <div class="faq-answer">${escapeHtml(a)}</div>
        </details>`
  ).join('\n');
  return `    <div class="faq-block">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
${items}
      </div>
    </div>\n\n`;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const f of files) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');

  const hasHtml = s.includes('class="faq-block"');
  const hasCss  = s.includes(FAQ_CSS_MARKER);
  if (hasHtml && hasCss) {
    console.log('skip (already has FAQ UI + CSS)', f);
    continue;
  }

  const faqs = extractFaqs(s);
  if (!faqs) {
    console.log('skip (no FAQ JSON-LD found)', f);
    continue;
  }

  // 1. Insert CSS block right before the .other-services rule (present on every page)
  if (!hasCss) {
    const before = s;
    s = s.replace(/(\n\s*)\.other-services \{ margin-top: 6rem; \}/,
      `$1${FAQ_CSS.trimStart()}$1.other-services { margin-top: 6rem; }`);
    if (s === before) console.log('WARN: CSS marker not matched in', f);
  }

  // 2. Insert visible FAQ HTML between </cta-block> and <div class="other-services">
  if (!hasHtml) {
    const faqHtml = buildFaqHtml(faqs);
    s = s.replace(/(\s*)<div class="other-services">/,
      `\n\n${faqHtml}$1<div class="other-services">`);
  }

  fs.writeFileSync(p, s);
  console.log('updated', f, `(${faqs.length} FAQs)`);
}
