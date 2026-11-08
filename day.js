/* Ritual: plan your day. Build a day from blocks, tick them off, and see your future self take shape. */
(() => {
'use strict';
const RS = window.RS, root = document.getElementById('dayDyn');
if (!RS || !root) return;
const { x, esc, iso, addDays, hm } = RS;
const LIB = {
  ritual: { en: 'Morning Ritual', ar: 'طقس الصباح', m: 20, link: '../routine/' },
  ready: { en: 'Get ready', ar: 'التجهّز', m: 30 },
  work: { en: 'Work', ar: 'العمل', m: 180 },
  deep: { en: 'Deep work', ar: 'عمل عميق', m: 90 },
  study: { en: 'Study', ar: 'دراسة', m: 90 },
  meal: { en: 'Meal', ar: 'وجبة', m: 45 },
  move: { en: 'Move your body', ar: 'حرّك جسدك', m: 30 },
  pause: { en: 'Pause', ar: 'استراحة', m: 15 },
  people: { en: 'Family and friends', ar: 'العائلة والأصدقاء', m: 60 },
  read: { en: 'Read', ar: 'قراءة', m: 30 },
  plan: { en: 'Plan tomorrow', ar: 'خطّط للغد', m: 10 },
  wind: { en: 'Wind down', ar: 'الاسترخاء قبل النوم', m: 30 }
};
const TPL = {
  work: { en: 'Workday', ar: 'يوم عمل', seq: ['ritual', 'ready', ['work', 240], 'meal', ['work', 120], 'move', 'people', 'plan', 'wind'] },
  rest: { en: 'Rest day', ar: 'يوم راحة', seq: ['ritual', 'move', 'meal', 'read', ['people', 120], 'pause', 'wind'] },
  study: { en: 'Study day', ar: 'يوم دراسة', seq: ['ritual', 'deep', 'pause', 'study', 'meal', 'move', ['study', 60], 'plan', 'wind'] },
  reset: { en: 'Reset day', ar: 'يوم تعافٍ', seq: ['ritual', 'move', 'pause', 'meal', 'read', 'wind'] }
};
const DURS = [5, 10, 15, 20, 30, 45, 60, 90, 120, 180, 240];
const label = b => b.t || (LIB[b.k] ? x(LIB[b.k].en, LIB[b.k].ar) : '');
const calc = () => (window.MR_CAL && window.MR_CAL._core) || null;
function dayInfo(d) {
  try { const c = calc(), cc = c.country(); return { weekend: c.isWeekend(cc, d), hol: c.itemsOn(cc, d).filter(i => i.r.t === 'h').map(i => (RS.isAr() ? i.r.ar : i.r.en)) }; }
  catch (e) { return { weekend: false, hol: [] }; }
}
let offset = 0, tplSel = null, focusSel = null;
const dateOf = () => addDays(new Date(), offset);
const minutes = w => { const p = String(w || '06:30').split(':'); return (+p[0] || 0) * 60 + (+p[1] || 0); };
function build(tpl, wake) {
  let t = minutes(wake);
  return TPL[tpl].seq.map((e, i) => { const k = Array.isArray(e) ? e[0] : e, m = Array.isArray(e) ? e[1] : LIB[k].m; const b = { id: Date.now().toString(36) + i, k, m, s: t, d: false }; t += m; return b; });
}
function reflow(plan) { let t = minutes(plan.wake); plan.blocks.forEach(b => { b.s = t; t += b.m; }); }
const wd = d => new Intl.DateTimeFormat(RS.isAr() ? 'ar-u-nu-latn' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
const wdShort = d => new Intl.DateTimeFormat(RS.isAr() ? 'ar-u-nu-latn' : 'en-GB', { weekday: 'short' }).format(d);

function message(st, offsetDay) {
  if (offsetDay) return x('This is tomorrow\'s plan. Adjust it tonight so the morning is easy.', 'هذه خطة الغد. عدّلها الليلة ليكون الصباح سهلًا.');
  if (!st.total) return '';
  if (st.done === 0) return x('Begin with the first block. Only that one.', 'ابدأ بالكتلة الأولى فقط.');
  if (st.p < 0.5) return x('You have started. Keep going, one block at a time.', 'لقد بدأت. تابع، كتلة بعد كتلة.');
  if (st.p < 1) return x('More than half done. Your future self is taking shape.', 'أنجزت أكثر من النصف. نسختك المستقبلية تتشكّل.');
  return x('Every block is done. Plan tomorrow so the next day starts easy.', 'أنجزت كل الكتل. خطّط للغد ليبدأ يومك التالي بسهولة.');
}
function weekStrip() {
  const bars = []; let total = 0;
  for (let i = 6; i >= 0; i--) {
    const d = addDays(new Date(), -i), st = RS.stats(RS.getDay(iso(d))); total += st.done;
    bars.push('<li><span class="rs-bar"><i style="height:' + Math.round(st.p * 100) + '%"></i></span><span class="rs-bl">' + esc(wdShort(d)) + '</span></li>');
  }
  return '<h2 class="rs-h2">' + x('This week', 'هذا الأسبوع') + '</h2><ul class="rs-week" aria-label="' + x('Blocks done in the last 7 days', 'الكتل المنجزة في آخر 7 أيام') + '">' + bars.join('') + '</ul><p class="rs-note">' + x('Blocks done in the last 7 days: ' + total + '.', 'الكتل المنجزة في آخر 7 أيام: ' + total + '.') + '</p>';
}
function view() {
  const d = dateOf(), ds = iso(d), plan = RS.getDay(ds), info = dayInfo(d), F = RS.future();
  const wake = (plan && plan.wake) || RS.store.get('wake', '06:30');
  const suggested = info.weekend || info.hol.length ? 'rest' : 'work';
  const tpl = tplSel || (plan && plan.tpl) || suggested;
  const st = RS.stats(plan);
  const lang = RS.isAr() ? 'ar' : 'en';
  let h = '<a class="back" href="../">' + x('Home', 'الرئيسية') + '</a><h1 id="day-title" tabindex="-1">' + x('Plan your day', 'خطّط ليومك') + '</h1>' +
    '<p class="lede">' + x('Build a day from blocks, tick them off, and watch your future self take shape.', 'ابنِ يومك من كتل، وضع علامة على ما أنجزته، وراقب نسختك المستقبلية وهي تتشكّل.') + '</p>';
  if (F.done && F.snap && F.snap[lang] && F.snap[lang].sentence) h += '<p class="rs-future"><span class="rs-fl">' + x('Your plan for the hard moments', 'خطتك للحظات الصعبة') + '</span>' + esc(F.snap[lang].sentence) + '</p>';
  else h += '<p class="rs-future"><a class="cw-link" href="../routine/#future">' + x('Start by meeting your future self', 'ابدأ بالتعرّف على نسختك المستقبلية') + '</a></p>';
  h += '<div class="chips rs-days" role="group" aria-label="' + x('Which day', 'أي يوم') + '"><button type="button" class="chip" data-off="0" aria-pressed="' + (offset === 0) + '">' + x('Today', 'اليوم') + '</button><button type="button" class="chip" data-off="1" aria-pressed="' + (offset === 1) + '">' + x('Tomorrow', 'غدًا') + '</button></div>';
  h += '<p class="rs-date">' + esc(wd(d)) + (info.hol.length ? ' · ' + esc(info.hol.join(RS.isAr() ? '، ' : ', ')) : info.weekend ? ' · ' + x('weekend', 'عطلة نهاية الأسبوع') : '') + '</p>';
  if ((info.weekend || info.hol.length) && !plan) h += '<p class="rs-note">' + x('A rest day is suggested, since it is a weekend or holiday where you are.', 'نقترح يوم راحة، لأنه عطلة نهاية أسبوع أو عطلة رسمية في بلدك.') + '</p>';
  h += '<div class="rs-build"><p class="rs-ol">' + x('Start from', 'ابدأ من') + '</p><div class="chips" role="group" aria-label="' + x('Day type', 'نوع اليوم') + '">' +
    Object.keys(TPL).map(k => '<button type="button" class="chip" data-tpl="' + k + '" aria-pressed="' + (k === tpl) + '">' + x(TPL[k].en, TPL[k].ar) + '</button>').join('') + '</div>' +
    '<div class="rs-wakeRow"><label class="fy-field rs-wake" for="dayWake"><span>' + x('Wake up at', 'وقت الاستيقاظ') + '</span><input id="dayWake" type="time" value="' + esc(wake) + '"></label>' +
    '<button type="button" class="btn ' + (plan ? 'btn-ghost sm' : 'btn-primary') + '" id="dayBuild">' + (plan ? x('Rebuild from this type', 'أعد البناء من هذا النوع') : x('Build my day', 'ابنِ يومي')) + '</button></div>' +
    (plan ? '<p class="rs-note">' + x('Rebuilding replaces the blocks below.', 'إعادة البناء تستبدل الكتل أدناه.') + '</p>' : '') + '</div>';
  if (plan) {
    const inner = RS.avatar(F.av, 104, x('Your future self', 'نسختك المستقبلية'));
    h += '<section class="rs-progress" aria-label="' + x('Progress', 'التقدّم') + '">' + RS.ring(st.p, inner) + '<div class="rs-ptext"><p class="rs-count"><strong>' + st.done + '</strong> ' + x('of', 'من') + ' <strong>' + st.total + '</strong> ' + x('blocks done', 'كتلة منجزة') + '</p><p class="rs-msg" role="status" aria-live="polite">' + esc(message(st, offset)) + '</p>' +
      (st.p === 1 && offset === 0 ? '<button type="button" class="btn btn-primary sm" data-off="1">' + x('Plan tomorrow', 'خطّط للغد') + '</button>' : '') + '</div></section>';
    h += '<ol class="rs-blocks">' + plan.blocks.map((b, i) =>
      '<li class="rs-block' + (b.d ? ' is-done' : '') + '"><input class="rs-chk" type="checkbox" data-i="' + i + '" id="blk' + i + '"' + (b.d ? ' checked' : '') + ' aria-label="' + x('Done', 'تم') + '">' +
      '<span class="rs-time">' + hm(b.s) + '</span>' +
      '<input class="rs-title" type="text" data-ti="' + i + '" value="' + esc(label(b)) + '" maxlength="60" aria-label="' + x('Block name', 'اسم الكتلة') + '">' +
      '<select class="rs-dur" data-di="' + i + '" aria-label="' + x('Length in minutes', 'المدة بالدقائق') + '">' + (DURS.indexOf(b.m) < 0 ? [b.m] : []).concat(DURS).sort((p, q) => p - q).map(m => '<option value="' + m + '"' + (m === b.m ? ' selected' : '') + '>' + m + ' ' + x('min', 'د') + '</option>').join('') + '</select>' +
      (LIB[b.k] && LIB[b.k].link ? '<a class="cw-link rs-open" href="' + LIB[b.k].link + '">' + x('Open', 'فتح') + '</a>' : '') +
      '<span class="rs-tools"><button type="button" class="rs-ib" data-act="up" data-i="' + i + '" aria-label="' + x('Move up', 'انقل لأعلى') + '"' + (i === 0 ? ' disabled' : '') + '>▲</button><button type="button" class="rs-ib" data-act="down" data-i="' + i + '" aria-label="' + x('Move down', 'انقل لأسفل') + '"' + (i === plan.blocks.length - 1 ? ' disabled' : '') + '>▼</button><button type="button" class="rs-ib" data-act="del" data-i="' + i + '" aria-label="' + x('Remove block', 'احذف الكتلة') + '">✕</button></span></li>').join('') + '</ol>';
    h += '<div class="rs-add"><label class="fy-field" for="addSel"><span>' + x('Add a block', 'أضف كتلة') + '</span><select id="addSel">' +
      Object.keys(LIB).map(k => '<option value="' + k + '">' + esc(x(LIB[k].en, LIB[k].ar)) + '</option>').join('') + '<option value="">' + x('Something else…', 'شيء آخر…') + '</option></select></label>' +
      '<label class="fy-field" for="addCustom"><span>' + x('Name, if something else', 'الاسم، إن كان شيئًا آخر') + '</span><input id="addCustom" type="text" maxlength="60"></label>' +
      '<button type="button" class="btn btn-ghost sm" data-act="add">' + x('Add', 'أضف') + '</button></div>';
  }
  return h + '<div class="rs-weekbox">' + weekStrip() + '</div>';
}
function render() {
  root.innerHTML = view();
  if (focusSel) { const el = root.querySelector(focusSel); if (el) el.focus(); focusSel = null; }
}
function cur() { const ds = iso(dateOf()); return { ds, plan: RS.getDay(ds) }; }
root.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t || !root.contains(t)) return;
  const d = t.dataset;
  if (d.off !== undefined) { offset = +d.off; tplSel = null; render(); return; }
  if (d.tpl !== undefined) { tplSel = d.tpl; render(); return; }
  if (t.id === 'dayBuild') {
    const ds = iso(dateOf()), wake = ($('#dayWake') || {}).value || RS.store.get('wake', '06:30'), info = dayInfo(dateOf());
    const tpl = tplSel || (RS.getDay(ds) && RS.getDay(ds).tpl) || (info.weekend || info.hol.length ? 'rest' : 'work');
    RS.store.set('wake', wake); RS.saveDay(ds, { tpl, wake, blocks: build(tpl, wake) }); tplSel = null; focusSel = '.rs-chk'; render(); return;
  }
  const { ds, plan } = cur(); if (!plan || !d.act) return;
  const i = +d.i;
  if (d.act === 'up' && i > 0) { const b = plan.blocks.splice(i, 1)[0]; plan.blocks.splice(i - 1, 0, b); focusSel = '[data-act="up"][data-i="' + (i - 1) + '"]'; }
  else if (d.act === 'down' && i < plan.blocks.length - 1) { const b = plan.blocks.splice(i, 1)[0]; plan.blocks.splice(i + 1, 0, b); focusSel = '[data-act="down"][data-i="' + (i + 1) + '"]'; }
  else if (d.act === 'del') { plan.blocks.splice(i, 1); }
  else if (d.act === 'add') {
    const k = ($('#addSel') || {}).value, custom = (($('#addCustom') || {}).value || '').trim();
    if (!k && !custom) { focusSel = '#addCustom'; render(); return; }
    plan.blocks.push({ id: Date.now().toString(36), k: k || null, t: custom || undefined, m: k && LIB[k] ? LIB[k].m : 30, s: 0, d: false }); focusSel = '#addSel';
  } else return;
  reflow(plan); RS.saveDay(ds, plan); render();
});
root.addEventListener('change', e => {
  const t = e.target, { ds, plan } = cur();
  if (t.id === 'dayWake') { RS.store.set('wake', t.value); if (plan) { plan.wake = t.value; reflow(plan); RS.saveDay(ds, plan); render(); } return; }
  if (!plan) return;
  if (t.classList.contains('rs-chk')) { plan.blocks[+t.dataset.i].d = t.checked; RS.saveDay(ds, plan); focusSel = '#blk' + t.dataset.i; render(); return; }
  if (t.dataset.di !== undefined) { plan.blocks[+t.dataset.di].m = +t.value; reflow(plan); RS.saveDay(ds, plan); render(); }
});
root.addEventListener('input', e => {
  const t = e.target; if (t.dataset.ti === undefined) return;
  const { ds, plan } = cur(); if (!plan) return;
  plan.blocks[+t.dataset.ti].t = t.value; RS.saveDay(ds, plan);
});
function $(s) { return root.querySelector(s); }
document.addEventListener('mr:lang', render);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') render(); });
render();
window.RS_DAY = { view, build, TPL, LIB };
})();
