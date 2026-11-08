/* Ritual: shared helpers for the home page and the day planner. Everything is stored on the device. */
(() => {
'use strict';
const store = {
  get(k, d) { try { const v = localStorage.getItem('mr.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('mr.' + k, JSON.stringify(v)); } catch (e) {} }
};
const isAr = () => !!(window.MR_I18N && window.MR_I18N.lang === 'ar');
const x = (en, ar) => (isAr() ? ar : en);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let uid = 0;
const SKIN = ['#F5D5B8', '#E8B98F', '#D39A6B', '#B97A4C', '#8A5634', '#5E3A22'];
const COLORS = ['#C9974B', '#2F5D8C', '#3E7C6B', '#8C3F4F', '#4A4A5A', '#E6BC73'];
function dark(hex, f) { const n = parseInt(hex.slice(1), 16); return 'rgb(' + [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v * f)).join(',') + ')'; }
function avatar(a, size, label) {
  const id = 'fy' + (++uid), s = SKIN[a.skin] || SKIN[1], c = COLORS[a.color] || COLORS[0], hair = '#2b1b12', cloth = '#F5F0E6';
  const cover = a.head !== 'none', hairOn = !cover && a.hair !== 'none';
  let o = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="' + size + '" height="' + Math.round(size * 1.4) + '" role="img" aria-label="' + esc(label || x('Your future self', 'نسختك المستقبلية')) + '">';
  o += '<defs><radialGradient id="' + id + '"><stop offset="0" stop-color="#E6BC73" stop-opacity=".42"/><stop offset="1" stop-color="#E6BC73" stop-opacity="0"/></radialGradient></defs>';
  o += '<circle cx="100" cy="135" r="112" fill="url(#' + id + ')"/>';
  o += '<path d="M160 44l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#E6BC73"/>';
  if (hairOn && a.hair === 'long') o += '<path d="M58 118C52 190 60 218 78 224L122 224C140 218 148 190 142 118Z" fill="' + hair + '"/>';
  o += '<path d="M30 280C30 214 64 192 100 192C136 192 170 214 170 280Z" fill="' + c + '"/>';
  if (a.outfit === 'smart') o += '<path d="M84 194L100 228L116 194Z" fill="' + cloth + '"/><path d="M84 194L100 244L68 216Z" fill="' + dark(c, .78) + '"/><path d="M116 194L100 244L132 216Z" fill="' + dark(c, .78) + '"/>';
  if (a.outfit === 'active') o += '<path d="M30 254H170" stroke="' + cloth + '" stroke-width="5" opacity=".8"/><path d="M100 200V280" stroke="' + dark(c, .7) + '" stroke-width="3"/>';
  if (a.outfit === 'thobe') o += '<path d="M100 214V280" stroke="' + dark(c, .75) + '" stroke-width="3"/><circle cx="100" cy="232" r="2.6" fill="' + dark(c, .6) + '"/>';
  if (a.head !== 'hijab') o += '<rect x="86" y="160" width="28" height="42" rx="10" fill="' + s + '"/>';
  if (a.outfit === 'casual') o += '<path d="M82 194Q100 216 118 194Z" fill="' + s + '"/>';
  if (a.outfit === 'thobe') o += '<path d="M90 194L100 212L110 194Z" fill="' + s + '"/>';
  if (a.head === 'ghutra') o += '<path d="M52 128C48 58 152 58 148 128L150 176L128 162L72 162L50 176Z" fill="' + cloth + '" stroke="#d9d2c3"/>';
  if (a.head === 'hijab') o += '<path d="M50 130C46 58 154 58 150 130C150 170 140 194 124 204L76 204C60 194 50 170 50 130Z" fill="' + c + '"/>';
  o += '<ellipse cx="100" cy="116" rx="37" ry="44" fill="' + s + '"/>';
  o += '<ellipse cx="86" cy="116" rx="3.2" ry="4" fill="' + hair + '"/><ellipse cx="114" cy="116" rx="3.2" ry="4" fill="' + hair + '"/>';
  o += '<path d="M78 106Q86 101 94 105M106 105Q114 101 122 106" stroke="' + hair + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  o += '<path d="M88 138Q100 148 112 138" stroke="#7a3d2b" stroke-width="3" fill="none" stroke-linecap="round"/>';
  if (hairOn && (a.hair === 'short' || a.hair === 'long')) o += '<path d="M63 112C60 70 90 60 100 60C118 60 142 72 137 112C130 92 118 84 100 84C82 84 70 92 63 112Z" fill="' + hair + '"/>';
  if (hairOn && a.hair === 'curly') o += [[68, 92], [78, 76], [94, 68], [110, 68], [124, 76], [134, 92], [100, 80]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="14" fill="' + hair + '"/>').join('');
  if (a.head === 'cap') o += '<path d="M62 106C62 66 138 66 138 106Z" fill="' + c + '"/><rect x="56" y="102" width="88" height="9" rx="4.5" fill="' + dark(c, .8) + '"/>';
  if (a.head === 'ghutra') o += '<path d="M62 100C64 66 136 66 138 100C128 86 114 80 100 80C86 80 72 86 62 100Z" fill="' + cloth + '"/><path d="M62 84Q100 62 138 84" stroke="#1b1b1b" stroke-width="6" fill="none" stroke-linecap="round"/>';
  if (a.head === 'hijab') o += '<path d="M63 104C66 76 134 76 137 104C126 90 114 86 100 86C86 86 74 90 63 104Z" fill="' + c + '"/>';
  return o + '</svg>';
}


const pad = n => String(n).padStart(2, '0');
const iso = d => d.toLocaleDateString('en-CA');
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const hm = m => pad(Math.floor(m / 60) % 24) + ':' + pad(((m % 60) + 60) % 60);

function future() {
  const F = Object.assign({ done: false, av: {}, snap: null }, store.get('future', {}));
  F.av = Object.assign({ skin: 1, hair: 'short', head: 'none', outfit: 'smart', color: 0 }, F.av || {});
  return F;
}
const allDays = () => { const d = store.get('days', {}); return d && typeof d === 'object' ? d : {}; };
const getDay = ds => { const p = allDays()[ds]; return p && Array.isArray(p.blocks) ? p : null; };
function saveDay(ds, plan) {
  const all = allDays(); all[ds] = plan;
  const keys = Object.keys(all).sort(); while (keys.length > 90) delete all[keys.shift()];
  store.set('days', all);
}
function stats(plan) {
  if (!plan || !plan.blocks || !plan.blocks.length) return { done: 0, total: 0, p: 0 };
  const total = plan.blocks.length, done = plan.blocks.filter(b => b.d).length;
  return { done, total, p: done / total };
}
function ring(p, inner) {
  const c = 2 * Math.PI * 100;
  return '<div class="rs-ring"><svg class="rs-ringsvg" viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="100" class="rs-track"/><circle cx="110" cy="110" r="100" class="rs-prog" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - Math.max(0, Math.min(1, p)))).toFixed(1) + '" transform="rotate(-90 110 110)"/></svg><div class="rs-inner">' + inner + '</div></div>';
}
function applyStatic() {
  Array.prototype.forEach.call(document.querySelectorAll('[data-en]'), el => { el.textContent = isAr() ? el.dataset.ar : el.dataset.en; });
  const t = isAr() ? document.documentElement.dataset.titleAr : document.documentElement.dataset.titleEn; if (t) document.title = t;
}
document.addEventListener('mr:lang', applyStatic);
applyStatic();
window.RS = { store, isAr, x, esc, avatar, iso, addDays, hm, pad, future, getDay, saveDay, stats, ring, applyStatic };
})();
