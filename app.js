'use strict';
const data = window.DIRECTORY;
const $ = id => document.getElementById(id);
function node(tag, text, cls) {
  const e = document.createElement(tag);
  if (text != null) e.textContent = text;
  if (cls) e.className = cls;
  return e;
}
function validUrl(href) {
  try { const u = new URL(href); return ['https:', 'http:'].includes(u.protocol) ? u : null; }
  catch { return null; }
}
const suppliers = data.suppliers.filter(s => s.name && validUrl(s.website));
function field(title, value) {
  const div = node('div', null, 'supplier-field');
  div.append(node('h3', title), node('p', value || 'Not provided.'));
  return div;
}
function card(s) {
  const url = validUrl(s.website);
  const article = node('article', null, 'supplier-card');
  const header = node('div', null, 'supplier-header');
  const mark = node('span', s.name.trim().charAt(0).toUpperCase(), 'supplier-mark');
  mark.setAttribute('aria-hidden', 'true');
  const heading = node('div', null, 'supplier-heading');
  const title = node('h3'); const link = node('a', s.name);
  link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
  title.append(link); heading.append(title, node('small', url.hostname));
  header.append(mark, heading); article.append(header);
  article.append(field('What they sell', s.overview), field('Important information', s.notes));
  if (String(s.promoCode || '').trim()) {
    const promo = node('div', null, 'promo');
    const details = node('div'); details.append(node('small', 'PROMO CODE'), node('code', s.promoCode));
    const button = node('button', 'Copy', 'copy');
    button.type = 'button'; button.setAttribute('aria-label', `Copy promo code for ${s.name}`);
    const status = node('span', '', 'sr'); status.setAttribute('role', 'status');
    button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(s.promoCode); button.textContent = 'Copied'; status.textContent = 'Promo code copied'; }
      catch { button.textContent = 'Select code'; status.textContent = 'Copy unavailable. Select the displayed code manually.'; }
    });
    promo.append(details, button, status); article.append(promo);
  }
  const visit = node('a', 'Visit website ↗', 'primary visit'); visit.href = url.href;
  visit.target = '_blank'; visit.rel = 'noopener noreferrer';
  visit.setAttribute('aria-label', `Visit ${s.name} website (opens in new tab)`);
  article.append(visit); return article;
}
function render() {
  const words = $('search').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const rows = suppliers.filter(s => {
    const text = [s.name, s.website, s.overview, s.notes].join(' ').toLowerCase();
    return words.every(word => text.includes(word));
  }).sort((a,b) => a.name.localeCompare(b.name) * ($('sort').value === 'desc' ? -1 : 1));
  $('resultCount').textContent = `${rows.length} ${rows.length === 1 ? 'website' : 'websites'}`;
  const target = $('results'); target.replaceChildren();
  if (!rows.length) {
    const empty = node('div', null, 'empty');
    empty.append(node('h3', suppliers.length ? 'No matching websites' : 'Supplier directory coming soon'), node('p', suppliers.length ? 'Try another search or clear the search.' : 'Supplier profiles will appear here once added.'));
    target.append(empty); return;
  }
  for (const s of rows) target.append(card(s));
}
$('supplierCount').textContent = suppliers.length;
$('promoCount').textContent = suppliers.filter(s => String(s.promoCode || '').trim()).length;
$('version').textContent = `Version ${data.version}`;
$('search').addEventListener('input', render);
$('sort').addEventListener('change', render);
$('clear').addEventListener('click', () => { $('search').value = ''; $('sort').value = 'asc'; render(); $('search').focus(); });
render();
