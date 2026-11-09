/* Ritual: the 7-day challenge. Seven short steps, one a day. Progress stays on this device. */
(() => {
'use strict';
const RS = window.RS, root = document.getElementById('chalDyn');
if (!RS || !root) return;
const { x, esc, iso, addDays, store } = RS;
const DAYS = [
  { t: ['See it', 'تخيّله'], w: ['Picturing a specific outcome makes it feel real and shows what could get in the way.', 'تخيّل نتيجة محددة يجعلها أقرب ويكشف ما قد يعترض طريقك.'], a: ['Pick one wish and picture it for one minute.', 'اختر أمنية واحدة وتخيّلها لمدة دقيقة.'], m: 5, l: ['routine/#future', 'Open your future self', 'افتح نسختك المستقبلية'] },
  { t: ['Plan the hard moment', 'خطّط للحظة الصعبة'], w: ['An if–then plan decides in advance what you will do when it gets hard.', 'خطة «إذا… فإنني…» تقرّر مسبقًا ما ستفعله حين يصعب الأمر.'], a: ['Write one sentence: if this gets in the way, then I will do that.', 'اكتب جملة واحدة: إذا اعترض هذا طريقي، فسأفعل ذاك.'], m: 5, l: ['routine/#future', 'Write your plan', 'اكتب خطتك'] },
  { t: ['Anchor your morning', 'ثبّت صباحك'], w: ['A fixed first ten minutes is the easiest habit to repeat.', 'عشر دقائق أولى ثابتة هي أسهل عادة يمكن تكرارها.'], a: ['Make a coffee or tea and take five slow breaths before you check your phone.', 'حضّر قهوة أو شايًا وخذ خمسة أنفاس بطيئة قبل أن تنظر إلى هاتفك.'], m: 10, l: ['routine/#breathe', 'Open the breathing timer', 'افتح مؤقّت التنفّس'] },
  { t: ['Protect one focus block', 'احمِ فترة تركيز واحدة'], w: ['One uninterrupted block moves a task further than a scattered hour.', 'فترة واحدة بلا انقطاع تُنجز أكثر من ساعة متفرقة.'], a: ['Work 25 minutes on one task with your phone in another room.', 'اعمل 25 دقيقة على مهمة واحدة وهاتفك في غرفة أخرى.'], m: 25, l: ['day/', 'Plan today', 'خطّط ليومك'] },
  { t: ['Move your body', 'حرّك جسدك'], w: ['A short walk lifts energy and gives your mind a break from screens.', 'مشي قصير يرفع الطاقة ويريح ذهنك من الشاشات.'], a: ['Walk or stretch for ten minutes, away from screens.', 'امشِ أو تمدّد عشر دقائق بعيدًا عن الشاشات.'], m: 10, l: null },
  { t: ['Reach out', 'تواصل مع أحدهم'], w: ['Small moments of connection are part of the life you are building.', 'لحظات التواصل الصغيرة جزء من الحياة التي تبنيها.'], a: ['Message or call one person you care about.', 'راسل أو اتصل بشخص تهتم لأمره.'], m: 5, l: null },
  { t: ['Review and keep one', 'راجع واحتفظ بواحدة'], w: ['Choosing one thing to keep is how a week turns into a routine.', 'اختيار شيء واحد تواصل عليه هو ما يحوّل الأسبوع إلى روتين.'], a: ['Look back over the six days, pick the one that helped most, and put it in tomorrow\'s plan.', 'راجع الأيام الستة، واختر ما أفادك أكثر، وضعه في خطة الغد.'], m: 10, l: ['day/', 'Plan tomorrow', 'خطّط ليوم الغد'] }
];
function state() { const c = Object.assign({ start: null, done: {} }, store.get('challenge', {})); if (!c.done || typeof c.done !== 'object') c.done = {}; return c; }
function save(c) { store.set('challenge', c); }
function dayNo(c) { if (!c.start) return 0; const a = new Date(c.start + 'T12:00:00'), b = new Date(iso(new Date()) + 'T12:00:00'); return Math.max(1, Math.round((b - a) / 864e5) + 1); }
const fmt = d => new Intl.DateTimeFormat(RS.isAr() ? 'ar-u-nu-latn' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(d);
function view() {
  const c = state(), F = RS.future(), n = dayNo(c), count = Object.keys(c.done).filter(k => c.done[k]).length, all = count >= 7;
  let h = '<section class="rs-hero rs-hero-chal"><div class="rs-hero-text"><p class="rs-date">' + x('Free, 7 days, about 10 minutes a day', 'مجاني، سبعة أيام، نحو عشر دقائق يوميًا') + '</p>' +
    '<h1>' + x('7 days to a calmer morning', 'سبعة أيام لصباح أهدأ') + '</h1>' +
    '<p class="rs-lede">' + x('One small step a day: picture who you are becoming, plan for the hard moment, and build a first ten minutes you can repeat.', 'خطوة صغيرة كل يوم: تخيّل من تصبح، وخطّط للحظة الصعبة، وابنِ عشر دقائق أولى تستطيع تكرارها.') + '</p>' +
    '<div class="actions">' + (c.start ? '' : '<button class="btn btn-primary" type="button" data-act="start">' + x('Start Day 1 today', 'ابدأ اليوم الأول الآن') + '</button>') +
    '<button class="btn btn-ghost" type="button" data-act="share">' + x('Share with a friend', 'شاركه مع صديق') + '</button></div><p class="rs-note" id="chalMsg" role="status" aria-live="polite"></p></div>' +
    '<div class="rs-hero-self">' + RS.ring(count / 7, RS.avatar(F.av, 120, x('Your future self', 'نسختك المستقبلية'))) +
    '<p class="rs-cap">' + (c.start ? x(count + ' of 7 days done', 'أُنجز ' + count + ' من 7 أيام') : x('Your ring fills one day at a time.', 'تمتلئ الحلقة يومًا بعد يوم.')) + '</p></div></section>';
  if (all) h += '<section class="rs-done"><h2 class="rs-h2">' + x('You finished all 7 days', 'أنهيت الأيام السبعة') + '</h2><p>' + x('Pick the one habit that helped most and put it in tomorrow\'s plan. Then keep it for a week.', 'اختر العادة التي أفادتك أكثر وضعها في خطة الغد، ثم واظب عليها أسبوعًا.') + '</p><div class="actions"><a class="btn btn-primary" href="../day/">' + x('Plan tomorrow', 'خطّط ليوم الغد') + '</a></div></section>';
  h += '<ol class="rs-chal">';
  DAYS.forEach((d, i) => {
    const k = i + 1, open = c.start && k <= n, done = !!c.done[k], today = c.start && k === Math.min(n, 7) && !done, when = c.start ? addDays(new Date(c.start + 'T12:00:00'), i) : null;
    h += '<li class="rs-cday' + (done ? ' is-done' : '') + (today ? ' is-today' : '') + (open || !c.start ? '' : ' is-locked') + '"><div class="rs-cnum" aria-hidden="true">' + k + '</div><div class="rs-cbody"><h3>' + esc(x(d.t[0], d.t[1])) + ' <span class="rs-cmeta">' + esc(x(d.m + ' min', d.m + ' دقيقة')) + (when ? ' · ' + esc(fmt(when)) : '') + '</span></h3>' +
      '<p class="rs-cwhy">' + esc(x(d.w[0], d.w[1])) + '</p><p class="rs-ctask">' + esc(x(d.a[0], d.a[1])) + '</p><div class="rs-crow">' +
      (d.l && (open || !c.start) ? '<a class="cw-link" href="' + (/^routine/.test(d.l[0]) ? '../' + d.l[0] : '../' + d.l[0]) + '">' + esc(x(d.l[1], d.l[2])) + '</a>' : '') +
      (c.start ? (open ? '<button type="button" class="chip' + (done ? ' is-on' : '') + '" data-act="toggle" data-day="' + k + '" aria-pressed="' + done + '">' + (done ? x('Done', 'تم') : x('Mark done', 'تم الإنجاز')) + '</button>' : '<span class="rs-note">' + x('Opens ', 'يفتح ') + esc(fmt(when)) + '</span>') : '') + '</div></div></li>';
  });
  h += '</ol>';
  if (c.start) h += '<p class="rs-restart"><button type="button" class="rs-link" data-act="restart" id="chalRestart">' + x('Start over', 'ابدأ من جديد') + '</button></p>';
  return h;
}
let armed = false;
function render() { root.innerHTML = view(); armed = false; }
function msg(t) { const m = document.getElementById('chalMsg'); if (m) m.textContent = t; }
root.addEventListener('click', e => {
  const t = e.target.closest ? e.target.closest('[data-act]') : null; if (!t) return;
  const a = t.dataset.act, c = state();
  if (a === 'start') { c.start = iso(new Date()); c.done = {}; save(c); render(); return; }
  if (a === 'toggle') { const k = t.dataset.day; c.done[k] = !c.done[k]; save(c); render(); return; }
  if (a === 'restart') { if (!armed) { armed = true; t.textContent = x('Tap again to erase your progress', 'اضغط مرة أخرى لمسح تقدّمك'); return; } save({ start: null, done: {} }); render(); return; }
  if (a === 'share') {
    const url = location.href.split('#')[0], text = x('Join me for 7 days to a calmer morning.', 'انضم إليّ في سبعة أيام لصباح أهدأ.');
    if (navigator.share) { navigator.share({ title: 'Ritual', text, url }).catch(() => {}); return; }
    const done = () => msg(x('Link copied.', 'تم نسخ الرابط.')), fail = () => msg(url);
    try { navigator.clipboard.writeText(url).then(done, fail); } catch (er) { fail(); }
  }
});
document.addEventListener('mr:lang', render);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') render(); });
render();
window.RS_CHAL = { view, DAYS };
})();
