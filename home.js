/* Ritual: the home page. Your virtual self, today's plan, and the way in to every routine. */
(() => {
'use strict';
const RS = window.RS, root = document.getElementById('homeDyn');
if (!RS || !root) return;
const { x, esc, iso } = RS;
const dateLine = () => {
  const d = new Date(), f = new Intl.DateTimeFormat(RS.isAr() ? 'ar-u-nu-latn' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
  try { const c = window.MR_CAL._core, cc = c.country(), hol = c.itemsOn(cc, d).filter(i => i.r.t === 'h').map(i => (RS.isAr() ? i.r.ar : i.r.en));
    if (hol.length) return f + ' · ' + hol.join(RS.isAr() ? '، ' : ', '); if (c.isWeekend(cc, d)) return f + ' · ' + x('weekend', 'عطلة نهاية الأسبوع'); } catch (e) {}
  return f;
};
function view() {
  const F = RS.future(), lang = RS.isAr() ? 'ar' : 'en', plan = RS.getDay(iso(new Date())), st = RS.stats(plan);
  const has = F.done && F.snap && F.snap[lang] && F.snap[lang].sentence, snap = has ? F.snap[lang] : null;
  const next = plan ? plan.blocks.filter(b => !b.d)[0] : null;
  let h = '<section class="rs-hero"><div class="rs-hero-text"><p class="rs-date">' + esc(dateLine()) + '</p>' +
    '<h1>' + x('Design your day. Meet who you are becoming.', 'صمّم يومك. وتعرّف على من تصبح.') + '</h1>' +
    '<p class="rs-lede">' + x('Picture your future self, plan a day that moves you toward them, and follow it one block at a time.', 'تخيّل نسختك المستقبلية، وخطّط ليوم يقرّبك منها، وتابعه كتلة بعد كتلة.') + '</p>' +
    '<div class="actions"><a class="btn btn-primary" href="day/">' + (plan ? x('Open today\'s plan', 'افتح خطة اليوم') : x('Plan today', 'خطّط ليومك')) + '</a><a class="btn btn-ghost" href="routine/#future">' + x('Meet your future self', 'تعرّف على نسختك المستقبلية') + '</a></div></div>' +
    '<div class="rs-hero-self">' + RS.ring(st.p, RS.avatar(F.av, 120, x('Your future self', 'نسختك المستقبلية'))) +
    '<p class="rs-cap">' + (plan ? x(st.done + ' of ' + st.total + ' blocks done today', 'أُنجزت ' + st.done + ' من ' + st.total + ' كتلة اليوم') : x('Your ring fills as you finish today\'s blocks.', 'تمتلئ الحلقة كلما أنجزت كتل اليوم.')) + '</p></div></section>';
  h += '<section class="rs-cards">';
  h += '<article class="rs-card"><h2>' + x('Today', 'اليوم') + '</h2>' + (plan
    ? '<p>' + x(st.done + ' of ' + st.total + ' blocks done.', 'أُنجزت ' + st.done + ' من ' + st.total + ' كتلة.') + '</p>' + (next ? '<p class="rs-note">' + x('Next up at ', 'التالي عند ') + RS.hm(next.s) + '</p>' : '<p class="rs-note">' + x('Every block is done.', 'أنجزت كل الكتل.') + '</p>')
    : '<p>' + x('No plan yet. It takes about two minutes.', 'لا توجد خطة بعد. تستغرق نحو دقيقتين.') + '</p>') +
    '<a class="cw-link" href="day/">' + (plan ? x('Open the plan', 'افتح الخطة') : x('Plan today', 'خطّط ليومك')) + '</a></article>';
  h += '<article class="rs-card"><h2>' + x('Your future self', 'نسختك المستقبلية') + '</h2>' + (has
    ? '<p class="rs-wish">' + esc(snap.wish) + '</p><p class="rs-note">' + esc(snap.sentence) + '</p>'
    : '<p>' + x('Start with a wish, then a plan for the moment it gets hard.', 'ابدأ بأمنية، ثم خطة للحظة التي يصعب فيها الأمر.') + '</p>') +
    '<a class="cw-link" href="routine/#future">' + (has ? x('Open', 'فتح') : x('Meet your future self', 'تعرّف على نسختك المستقبلية')) + '</a></article>';
  h += '<article class="rs-card"><h2>' + x('Routines', 'الروتين') + '</h2><ul class="rs-links"><li><a class="cw-link" href="routine/">' + x('Morning Ritual', 'طقس الصباح') + '</a><span>' + x('coffee, breathing, breakfast', 'قهوة، تنفّس، فطور') + '</span></li><li><a class="cw-link" href="routine/#music">' + x('Music and reading', 'الموسيقى والقراءة') + '</a><span>' + x('a shelf for your morning', 'رفّ لصباحك') + '</span></li><li><a class="cw-link" href="routine/#calendar">' + x('Your calendar', 'تقويمك') + '</a><span>' + x('holidays and Hijri dates', 'العطل والتواريخ الهجرية') + '</span></li></ul></article>';
  h += '</section>';
  h += '<section class="rs-how"><h2 class="rs-h2">' + x('How it works', 'كيف يعمل') + '</h2><ol class="rs-steps">' +
    '<li><strong>' + x('See it', 'تخيّله') + '</strong><span>' + x('Picture the best version of you and name what could get in the way.', 'تخيّل أفضل نسخة منك وسمِّ ما قد يعترض طريقك.') + '</span></li>' +
    '<li><strong>' + x('Plan it', 'خطّط له') + '</strong><span>' + x('Build a day from blocks, starting with a morning that sets the tone.', 'ابنِ يومك من كتل، تبدأ بصباح يضبط إيقاعك.') + '</span></li>' +
    '<li><strong>' + x('Do it', 'نفّذه') + '</strong><span>' + x('Tick blocks off as you go and watch your week fill in.', 'ضع علامة على الكتل وراقب أسبوعك وهو يمتلئ.') + '</span></li></ol></section>';
  return h;
}
function render() { root.innerHTML = view(); }
document.addEventListener('mr:lang', render);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') render(); });
render();
window.RS_HOME = { view };
})();
