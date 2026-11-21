/* Ritual: Future Self Channel. Fictional, realistic characters tell their story in the first person,
   then a 9:16 video jumps ahead and shows the life they would have if they acted on what they want
   to manifest. The video is drawn on a canvas, so it plays here and can be recorded to a file.
   Generated characters and your own episode stay on this device. */
(() => {
'use strict';
const RS = window.RS, root = document.getElementById('chanDyn');
if (!RS || !root) return;
const { x, esc, store } = RS;
const W = 1080, H = 1920, URL_TXT = 'ahmedabouabass.github.io/channel';
const L = a => (RS.isAr() ? a[1] : a[0]);

/* People: who the characters are. Avatars use the same parts as the future-self tool. */
const PEOPLE = [
  { n: ['Lina', 'لينا'], g: 'f', c: ['Beirut', 'بيروت'], av: { skin: 1, hair: 'long', head: 'none', color: 1 } },
  { n: ['Omar', 'عمر'], g: 'm', c: ['Amman', 'عمّان'], av: { skin: 2, hair: 'short', head: 'none', color: 2 } },
  { n: ['Noura', 'نورة'], g: 'f', c: ['Riyadh', 'الرياض'], av: { skin: 2, hair: 'none', head: 'hijab', color: 3 } },
  { n: ['Khalid', 'خالد'], g: 'm', c: ['Dubai', 'دبي'], av: { skin: 2, hair: 'none', head: 'ghutra', color: 0 } },
  { n: ['Maya', 'مايا'], g: 'f', c: ['Cairo', 'القاهرة'], av: { skin: 3, hair: 'curly', head: 'none', color: 0 } },
  { n: ['Youssef', 'يوسف'], g: 'm', c: ['Casablanca', 'الدار البيضاء'], av: { skin: 3, hair: 'curly', head: 'none', color: 1 } },
  { n: ['Sara', 'سارة'], g: 'f', c: ['Doha', 'الدوحة'], av: { skin: 1, hair: 'none', head: 'hijab', color: 5 } },
  { n: ['Daniel', 'دانيال'], g: 'm', c: ['London', 'لندن'], av: { skin: 0, hair: 'short', head: 'none', color: 1 } },
  { n: ['Amira', 'أميرة'], g: 'f', c: ['Tunis', 'تونس'], av: { skin: 2, hair: 'long', head: 'none', color: 2 } },
  { n: ['Hassan', 'حسن'], g: 'm', c: ['Kuwait City', 'مدينة الكويت'], av: { skin: 4, hair: 'short', head: 'cap', color: 3 } },
  { n: ['Grace', 'غريس'], g: 'f', c: ['Toronto', 'تورونتو'], av: { skin: 5, hair: 'curly', head: 'none', color: 3 } },
  { n: ['Rami', 'رامي'], g: 'm', c: ['Manama', 'المنامة'], av: { skin: 3, hair: 'short', head: 'none', color: 0 } }
];

/* Paths: what they want to manifest. Written in the first person, so Arabic needs no gendered verbs. */
const PATHS = [
  { id: 'studio', ages: [24, 33], years: 2, outfit: 'smart', tag: ['their own design studio', 'استوديو تصميم خاص'],
    now: [['I\'m {name}, {age}, in {city}. I design logos for other people\'s dreams at an agency, nine to seven.', 'أنا {name}، عمري {age} عامًا، من {city}. أعمل في وكالة إعلانات وأصمّم شعارات لأحلام غيري، من التاسعة حتى السابعة.'],
      ['Every night I open a folder called "my studio", and close it again.', 'كل ليلة أفتح ملفًا اسمه «الاستوديو الخاص بي»، ثم أغلقه من جديد.']],
    want: ['I want to manifest my own design studio, with clients who chose me.', 'أريد أن أصنع الاستوديو الخاص بي، مع عملاء اختاروني أنا.'],
    block: ['I tell myself my work isn\'t good enough to charge for.', 'أقول لنفسي إن عملي ليس جيدًا بما يكفي لأطلب عليه مالًا.'],
    plan: ['If I start doubting my work, then I post one project anyway.', 'إذا بدأت أشكّ في عملي، فسأنشر مشروعًا واحدًا رغم ذلك.'],
    steps: [['I redesign a local café\'s menu for free and post it.', 'أعيد تصميم قائمة مقهى في الحيّ مجانًا وأنشرها.'],
      ['My first paying client finds me through that post.', 'أول عميل يدفع لي يجدني من خلال ذلك المنشور.'],
      ['I have enough steady clients to hand in my notice.', 'صار لدي عملاء ثابتون يكفون لأقدّم استقالتي.']],
    future: [['I unlock a small studio with my name on the door.', 'أفتح باب استوديو صغير يحمل اسمي.'],
      ['Two people work with me now, and I pay them on time.', 'يعمل معي الآن شخصان، وأدفع لهما في موعدهما.'],
      ['Clients find us because they\'ve seen our work.', 'يأتي العملاء لأنهم رأوا أعمالنا.']],
    msg: ['The folder was never the problem. Opening it every day was the answer.', 'لم تكن المشكلة في الملف. كان الحلّ أن أفتحه كل يوم.'] },
  { id: 'run', ages: [28, 45], years: 1, outfit: 'active', tag: ['a 10K run', 'ركض عشرة كيلومترات'],
    now: [['I\'m {name}, {age}, in {city}. I sit at a desk all day in an insurance office.', 'أنا {name}، عمري {age} عامًا، من {city}. أجلس خلف مكتب طوال اليوم في شركة تأمين.'],
      ['Last month I ran out of breath climbing to the third floor.', 'الشهر الماضي انقطع نفسي وأنا أصعد إلى الطابق الثالث.']],
    want: ['I want to manifest a body that can run ten kilometres.', 'أريد جسدًا يستطيع أن يركض عشرة كيلومترات.'],
    block: ['By evening the tiredness wins, and so does the sofa.', 'في المساء يغلبني التعب، وتنتصر الأريكة.'],
    plan: ['If I feel too tired after work, then I put on my shoes and walk for ten minutes.', 'إذا شعرت بالتعب بعد العمل، فسألبس حذائي وأمشي عشر دقائق.'],
    steps: [['Ten minutes of walking. That\'s all.', 'عشر دقائق من المشي. هذا كل شيء.'],
      ['I run one minute, walk two, and repeat.', 'أركض دقيقة وأمشي دقيقتين، ثم أعيد.'],
      ['I run five kilometres without stopping. Slowly, and proudly.', 'أركض خمسة كيلومترات دون توقف. ببطء، وبفخر.']],
    future: [['I take the stairs two at a time.', 'أصعد الدرج درجتين درجتين.'],
      ['Saturday mornings start with a run in the park.', 'صباح كل سبت يبدأ بركضة في الحديقة.'],
      ['I cross the 10K finish line while my family shouts my name.', 'أعبر خط النهاية في سباق العشرة كيلومترات وعائلتي تهتف باسمي.']],
    msg: ['I didn\'t need motivation. I needed ten minutes and my shoes by the door.', 'لم أكن بحاجة إلى حماس. كنت بحاجة إلى عشر دقائق وحذاء عند الباب.'] },
  { id: 'code', ages: [24, 38], years: 2, outfit: 'casual', tag: ['a job in software', 'وظيفة في البرمجيات'],
    now: [['I\'m {name}, {age}, in {city}. I answer phones at a hotel front desk.', 'أنا {name}، عمري {age} عامًا، من {city}. أردّ على الهاتف في استقبال فندق.'],
      ['At night I watch coding videos and wonder if it\'s too late.', 'في الليل أشاهد دروس البرمجة وأتساءل إن كان الوقت قد فات.']],
    want: ['I want to manifest a job building software.', 'أريد أن أحصل على وظيفة في تطوير البرمجيات.'],
    block: ['I put it off, because everyone else seems younger and faster.', 'أؤجّل، لأن الجميع يبدون أصغر سنًّا وأسرع مني.'],
    plan: ['If I want to put it off, then I write code for just 25 minutes.', 'إذا أردت التأجيل، فسأكتب الكود خمسًا وعشرين دقيقة فقط.'],
    steps: [['I build a page that says "Hello". It feels huge.', 'أبني صفحة تقول «مرحبًا». أشعر أنها إنجاز ضخم.'],
      ['I build a booking tool for the hotel, and my manager uses it.', 'أبني أداة حجز للفندق، ومديري يستخدمها.'],
      ['I finish three real projects and start applying.', 'أنهي ثلاثة مشاريع حقيقية وأبدأ التقديم على الوظائف.']],
    future: [['I walk into the office with a badge for the engineering team.', 'أدخل المكتب ببطاقة فريق التطوير.'],
      ['I fix a bug that thousands of people will never notice.', 'أصلح خللًا لن يلاحظه آلاف الناس أبدًا.'],
      ['I help someone who thinks it\'s too late for them.', 'أساعد شخصًا يظن أن الوقت قد فات عليه.']],
    msg: ['It wasn\'t too late. It was 25 minutes at a time.', 'لم يكن الوقت قد فات. كان الأمر خمسًا وعشرين دقيقة في كل مرة.'] },
  { id: 'debt', ages: [27, 44], years: 3, outfit: 'smart', tag: ['a life with zero debt', 'حياة بلا ديون'],
    now: [['I\'m {name}, {age}, in {city}. I manage a phone shop, and I\'m good with other people\'s numbers.', 'أنا {name}، عمري {age} عامًا، من {city}. أدير متجر هواتف وأتقن حسابات الآخرين.'],
      ['My own numbers I don\'t open. Three cards, all close to the limit.', 'أما حساباتي فلا أفتحها. ثلاث بطاقات، كلها قريبة من الحد.']],
    want: ['I want to manifest a life with zero debt and six months of savings.', 'أريد حياة بلا ديون، ومدّخرات تكفي ستة أشهر.'],
    block: ['When I feel stressed, I buy something to feel better.', 'حين أتوتّر، أشتري شيئًا لأرتاح.'],
    plan: ['If I want to buy something to feel better, then I wait 24 hours and check my plan.', 'إذا رغبت في شراء شيء لأرتاح، فسأنتظر أربعًا وعشرين ساعة وأراجع خطتي.'],
    steps: [['I write every debt on one page. It\'s scary, and then it\'s just a list.', 'أكتب كل ديوني في صفحة واحدة. الأمر مخيف، ثم يصبح مجرد قائمة.'],
      ['The smallest card is paid off. I cut it in half.', 'سدّدت أصغر بطاقة، وقصصتها نصفين.'],
      ['The last card is gone. Now the money goes to savings.', 'اختفت آخر بطاقة. الآن يذهب المال إلى الادّخار.']],
    future: [['I open my banking app without holding my breath.', 'أفتح تطبيق البنك دون أن أحبس أنفاسي.'],
      ['When the car breaks down, it\'s an expense, not a crisis.', 'حين تتعطّل السيارة، تكون مصروفًا لا أزمة.'],
      ['I take my mother to dinner and pay without checking the total first.', 'أدعو أمي إلى العشاء وأدفع دون أن أنظر إلى المبلغ أولًا.']],
    msg: ['Peace wasn\'t a big number. It was one honest page.', 'لم تكن الطمأنينة رقمًا كبيرًا. كانت صفحة واحدة صادقة.'] },
  { id: 'bakery', ages: [25, 42], years: 2, outfit: 'casual', tag: ['their own bakery', 'مخبز خاص'],
    now: [['I\'m {name}, {age}, in {city}. I bake for every birthday in the family.', 'أنا {name}، عمري {age} عامًا، من {city}. أخبز لكل عيد ميلاد في العائلة.'],
      ['Everyone says I should open a shop. I always answer: "One day."', 'الكل يقول إن عليّ أن أفتح محلًا، وأنا أردّ دائمًا: «يومًا ما».']],
    want: ['I want to manifest my own small bakery, with a line outside on Fridays.', 'أريد مخبزًا صغيرًا لي، وطابورًا أمامه كل يوم جمعة.'],
    block: ['I want everything to be perfect before I sell a single cake.', 'أريد أن يكون كل شيء مثاليًا قبل أن أبيع قطعة كعك واحدة.'],
    plan: ['If I catch myself waiting for perfect, then I take one order this week.', 'إذا وجدت نفسي أنتظر الكمال، فسأقبل طلبًا واحدًا هذا الأسبوع.'],
    steps: [['I post a photo of my date cake. Four people order it.', 'أنشر صورة كعكة التمر، فيطلبها أربعة أشخاص.'],
      ['I sell out at a weekend market.', 'تنفد بضاعتي كلها في سوق نهاية الأسبوع.'],
      ['I sign the lease on a tiny shop with an oven.', 'أوقّع عقد إيجار محل صغير فيه فرن.']],
    future: [['The shop smells of cardamom before sunrise.', 'تفوح رائحة الهيل من المحل قبل شروق الشمس.'],
      ['The neighbours know my name and my Friday special.', 'الجيران يعرفون اسمي وحلوى الجمعة الخاصة بي.'],
      ['I hire my cousin, the one who always tasted the dough.', 'أوظّف ابن عمي، الذي كان يتذوّق العجين دائمًا.']],
    msg: ['Waiting for perfect never sold a cake. Starting did.', 'انتظار الكمال لم يبع كعكة واحدة. البدء هو الذي باع.'] },
  { id: 'calm', ages: [34, 48], years: 1, outfit: 'casual', tag: ['a calmer life at home', 'حياة أهدأ في البيت'],
    now: [['I\'m {name}, {age}, in {city}. I lead a team of twelve at a shipping company.', 'أنا {name}، عمري {age} عامًا، من {city}. أقود فريقًا من اثني عشر شخصًا في شركة شحن.'],
      ['I answer emails at dinner. My kids have stopped asking me to play.', 'أردّ على الرسائل على مائدة العشاء. توقّف أطفالي عن دعوتي إلى اللعب.']],
    want: ['I want to manifest a calmer life, home by six and actually there.', 'أريد حياة أهدأ، أعود فيها إلى البيت عند السادسة وأعيش اللحظة مع عائلتي.'],
    block: ['My phone pulls me back into work the second I sit down.', 'هاتفي يسحبني إلى العمل في اللحظة التي أجلس فيها.'],
    plan: ['If my phone buzzes after six, then I put it in the drawer by the door.', 'إذا رنّ هاتفي بعد السادسة، فسأضعه في الدرج عند الباب.'],
    steps: [['One evening without email. Nothing burns down.', 'أمسية واحدة بلا بريد. لم يحترق شيء.'],
      ['I teach my team to decide without me.', 'أعلّم فريقي أن يقرّر من دوني.'],
      ['Weeknights are ours now. The drawer is a habit.', 'صارت ليالي الأسبوع لنا، وأصبح الدرج عادة.']],
    future: [['I\'m on the floor, building a Lego city with my kids.', 'أجلس على الأرض وأبني مع أطفالي مدينة من الليغو.'],
      ['My team runs well, and I sleep through the night.', 'فريقي يعمل جيدًا، وأنام الليل كله.'],
      ['My daughter says my laugh fills the house again.', 'تقول ابنتي إن ضحكتي عادت تملأ البيت.']],
    msg: ['The work always got done. I just stopped letting it follow me home.', 'العمل كان يُنجَز دائمًا. كل ما في الأمر أنني لم أعد أسمح له بأن يلحقني إلى البيت.'] },
  { id: 'book', ages: [30, 52], years: 2, outfit: 'smart', tag: ['a published novel', 'رواية منشورة'],
    now: [['I\'m {name}, {age}, in {city}. I teach literature to teenagers.', 'أنا {name}، عمري {age} عامًا، من {city}. أدرّس الأدب للمراهقين.'],
      ['The same novel has lived in my head for eleven years. I haven\'t written a page.', 'في رأسي الرواية نفسها منذ أحد عشر عامًا، ولم أكتب منها صفحة.']],
    want: ['I want to manifest a published novel with my name on the cover.', 'أريد رواية منشورة يحمل غلافها اسمي.'],
    block: ['I have no time, and when I do, the first sentence feels wrong.', 'ليس لدي وقت، وحين يتوفّر، تبدو الجملة الأولى خاطئة.'],
    plan: ['If I think I have no time, then I write 200 words before school.', 'إذا ظننت أنه لا وقت لدي، فسأكتب مئتي كلمة قبل المدرسة.'],
    steps: [['200 words. Most of them are bad. I keep them.', 'مئتا كلمة. معظمها سيئ، لكنني أحتفظ بها.'],
      ['Chapter five. The characters start surprising me.', 'الفصل الخامس. بدأت الشخصيات تفاجئني.'],
      ['The first draft is done: 80,000 words, one morning at a time.', 'انتهت المسودة الأولى: ثمانون ألف كلمة، صباحًا بعد صباح.']],
    future: [['I hold the first printed copy. It\'s heavier than I thought.', 'أحمل أول نسخة مطبوعة. أثقل مما توقّعت.'],
      ['A student asks me to sign it for his mother.', 'يطلب مني أحد طلابي أن أوقّعها لأمه.'],
      ['I\'m already 200 words into the next one.', 'بدأت الرواية التالية، وكتبت منها مئتي كلمة.']],
    msg: ['Eleven years of waiting, or one year of mornings. I chose the mornings.', 'أحد عشر عامًا من الانتظار، أو عام واحد من الصباحات. اخترت الصباحات.'] },
  { id: 'degree', ages: [27, 40], years: 3, outfit: 'smart', tag: ['a finished degree', 'شهادة جامعية'],
    now: [['I\'m {name}, {age}, in {city}. I left university in my second year to support my family.', 'أنا {name}، عمري {age} عامًا، من {city}. تركت الجامعة في السنة الثانية لأعيل عائلتي.'],
      ['I drive a delivery van now. The space for my diploma on the wall is still empty.', 'أعمل الآن على شاحنة توصيل، وما زال مكان الشهادة فارغًا على الحائط.']],
    want: ['I want to manifest my accounting degree, finished at last.', 'أريد أن أنهي شهادتي في المحاسبة أخيرًا.'],
    block: ['I doubt I can still study after all these years.', 'أشكّ في قدرتي على الدراسة بعد كل هذه السنوات.'],
    plan: ['If I start doubting myself, then I open the book and read one page.', 'إذا بدأت أشكّ في نفسي، فسأفتح الكتاب وأقرأ صفحة واحدة.'],
    steps: [['I enrol in two evening courses. My hand shakes as I sign the form.', 'أسجّل في مادتين مسائيتين. يدي ترتجف وأنا أوقّع الاستمارة.'],
      ['I pass my first exam and read the grade three times.', 'أنجح في أول امتحان، وأقرأ العلامة ثلاث مرات.'],
      ['One semester left. My little brother quizzes me at dinner.', 'بقي فصل واحد. أخي الصغير يختبرني على العشاء.']],
    future: [['I walk across the stage. My mother is crying in row four.', 'أمشي على المنصة، وأمي تبكي في الصف الرابع.'],
      ['The empty space on the wall is filled.', 'امتلأ المكان الفارغ على الحائط.'],
      ['I start at an accounting firm, in a shirt I ironed myself.', 'أبدأ العمل في مكتب محاسبة، بقميص كويته بنفسي.']],
    msg: ['I wasn\'t behind. I was on my own timeline, one page at a time.', 'لم يفتني القطار. كان لي توقيتي الخاص، صفحة بعد صفحة.'] }
];
/* Featured episodes: [path, person, age] */
const FEAT = [[0, 0, 27], [1, 1, 34], [4, 2, 31], [2, 5, 29], [5, 3, 41], [6, 4, 38], [3, 9, 33], [7, 8, 34]];
const DAYL = [['Day 1', 'اليوم 1'], ['Day 30', 'اليوم 30'], ['Day 180', 'اليوم 180']];
const RINGS = [0, .12, .45, .8];

const later = y => y === 1 ? x('One year later', 'بعد سنة') : y === 2 ? x('Two years later', 'بعد سنتين') : y === 3 ? x('Three years later', 'بعد ثلاث سنوات') : x(y + ' years later', 'بعد ' + y + ' سنوات');
const later2 = y => y === 1 ? x('one year', 'سنة') : y === 2 ? x('two years', 'سنتين') : y === 3 ? x('three years', 'ثلاث سنوات') : x(y + ' years', y + ' سنوات');

function state() { const s = Object.assign({ gen: [], me: null }, store.get('channel', {})); if (!Array.isArray(s.gen)) s.gen = []; return s; }
function save(s) { store.set('channel', s); }

function looks(av, outfit) {
  const a = Object.assign({ skin: 1, hair: 'short', head: 'none', color: 0 }, av);
  const o = a.head === 'ghutra' ? 'thobe' : outfit;
  return { now: Object.assign({}, a, { outfit: a.head === 'ghutra' ? 'thobe' : 'casual', color: a.head === 'hijab' ? a.color : 4 }), fut: Object.assign({}, a, { outfit: o }) };
}
function makeEp(p, q, age, num, id) {
  const P = PATHS[p], Q = PEOPLE[q]; if (!P || !Q) return null;
  const lk = looks(Q.av, P.outfit);
  return { id, num, kind: 'char', path: P, n: Q.n, g: Q.g, c: Q.c, age, av: lk.now, fav: lk.fut };
}
function meEp(m) {
  const F = RS.future(), lk = looks(F.av, F.av.outfit || 'smart'), y = +m.years || 1;
  const st = m.step, fu = m.future || '';
  const path = { id: 'me', years: y, tag: [m.want, m.want],
    now: [['I\'m {name}, {age}. This is my episode.', 'أنا {name}، عمري {age} عامًا. هذه حلقتي.'], ['Today, what I want still feels far away.', 'اليوم، ما أريده ما زال يبدو بعيدًا.']],
    want: ['I want to manifest: ' + m.want, 'أريد أن أحقّق: ' + m.want],
    block: ['What gets in the way: ' + m.block, 'ما يعترض طريقي: ' + m.block],
    plan: ['If that happens, then my first small step is: ' + st, 'إذا حدث ذلك، فخطوتي الصغيرة الأولى: ' + st],
    steps: [['Day one: ' + st, 'اليوم الأول: ' + st], ['I keep showing up, even on the slow days.', 'أواصل الحضور، حتى في الأيام البطيئة.'], ['It stops being a plan. It\'s just who I am.', 'لم تعد خطة. صارت جزءًا مني.']],
    future: [fu ? [fu, fu] : ['I wake up in the life I used to picture.', 'أستيقظ في الحياة التي كنت أتخيّلها.'], ['What I wanted isn\'t a wish any more. It\'s my normal.', 'ما كنت أريده لم يعد أمنية، بل صار حياتي العادية.'], ['I look back and thank the version of me who started.', 'أنظر إلى الوراء وأشكر النسخة مني التي بدأت.']],
    msg: ['It all started with one small step: ' + st, 'بدأ كل شيء بخطوة صغيرة: ' + st] };
  return { id: 'me', num: 0, kind: 'me', path, n: [m.name, m.name], g: '', c: null, age: m.age, av: lk.now, fav: lk.fut };
}
function epFromId(id, s) {
  if (!id) return null;
  let m = /^f(\d+)$/.exec(id); if (m && FEAT[+m[1]]) { const f = FEAT[+m[1]]; return makeEp(f[0], f[1], f[2], +m[1] + 1, id); }
  m = /^g-(\d+)-(\d+)-(\d+)$/.exec(id);
  if (m) { const i = s.gen.findIndex(g => g.id === id); return makeEp(+m[1], +m[2], Math.max(18, Math.min(80, +m[3])), i >= 0 ? FEAT.length + i + 1 : FEAT.length + s.gen.length + 1, id); }
  if (id === 'me' && s.me) return meEp(s.me);
  return null;
}
const fill = (t, ep) => String(t).replace(/\{name\}/g, L(ep.n)).replace(/\{age\}/g, ep.age).replace(/\{city\}/g, ep.c ? L(ep.c) : '');
const T = (ep, a) => fill(L(a), ep);
const gx = (ep, m, f) => (ep.g === 'f' ? f : m);

/* Labels shown above each caption */
function labels(ep) {
  const nm = L(ep.n), me = ep.kind === 'me';
  return {
    q: me ? x('What if I actually did it?', 'ماذا لو بدأت فعلًا؟') : x('What if ' + nm + ' actually did it?', gx(ep, 'ماذا لو فعلها ' + nm + ' حقًا؟', 'ماذا لو فعلتها ' + nm + ' حقًا؟')),
    want: me ? x('What I want to manifest', 'ما أريد تحقيقه') : x('What ' + nm + ' wants to manifest', gx(ep, 'ما يريده ' + nm, 'ما تريده ' + nm)),
    block: x('What gets in the way', 'ما يعترض الطريق'),
    plan: x('The plan', 'الخطة'),
    fut: me ? x('My future self', 'نسختي المستقبلية') : x('Future ' + nm, gx(ep, nm + ' المستقبلي', nm + ' المستقبلية')),
    msg: me ? x('A message from my future self', 'رسالة من نسختي المستقبلية') : x('A message from future ' + nm, gx(ep, 'رسالة من ' + nm + ' المستقبلي', 'رسالة من ' + nm + ' المستقبلية'))
  };
}
const dur = t => Math.max(3.2, Math.min(8.5, String(t).length / (RS.isAr() ? 13 : 15) + 1.6));
function scenes(ep) {
  const P = ep.path, lb = labels(ep), S = [];
  const add = (k, label, text, o) => S.push(Object.assign({ k, label, text, dur: dur(text) }, o || {}));
  const meta = ep.c ? x(ep.age + ' · ' + L(ep.c), ep.age + ' عامًا · ' + L(ep.c)) : x(ep.age + '', ep.age + ' عامًا');
  add('title', ep.kind === 'me' ? x('Your episode', 'حلقتك') : x('Episode ' + ep.num, 'الحلقة ' + ep.num), L(ep.n), { sub: meta, q: lb.q, dur: 4.6, say: L(ep.n) + '. ' + meta + '. ' + lb.q });
  P.now.forEach(t => add('now', x('Today', 'اليوم'), T(ep, t)));
  add('want', lb.want, T(ep, P.want));
  add('block', lb.block, T(ep, P.block));
  add('plan', lb.plan, T(ep, P.plan));
  P.steps.forEach((t, i) => add('day', L(DAYL[i]), T(ep, t), { ring: [RINGS[i], RINGS[i + 1]], say: L(DAYL[i]) + '. ' + T(ep, t) }));
  add('jump', later(P.years), '', { dur: 2.8, ring: [RINGS[3], 1], say: later(P.years) });
  P.future.forEach((t, i) => add('future', i ? '' : lb.fut, T(ep, t)));
  add('msg', lb.msg, T(ep, P.msg), { dur: dur(T(ep, P.msg)) + .8 });
  add('end', x('Your turn', 'دورك'), x('What would your future self tell you?', 'ماذا ستقول لك نسختك المستقبلية؟'), { dur: 5.2 });
  let t = 0; S.forEach(s => { s.t0 = t; t += s.dur; });
  return { S, total: t };
}

/* ---------- drawing ---------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, p) => a + (b - a) * p;
const ease = p => { p = clamp(p, 0, 1); return p * p * (3 - 2 * p); };
const hex = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const mix = (c1, c2, p) => { const a = hex(c1), b = hex(c2); return 'rgb(' + a.map((v, i) => Math.round(lerp(v, b[i], p))).join(',') + ')'; };
const rnd = i => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const FONT = { serif: '"Playfair Display", Georgia, serif', sans: 'Inter, system-ui, sans-serif', arS: '"Noto Naskh Arabic", serif', arT: '"IBM Plex Sans Arabic", system-ui, sans-serif' };

function wrap(ctx, text, max) {
  const words = String(text).split(/\s+/), lines = []; let line = '';
  words.forEach(w => { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > max && line) { lines.push(line); line = w; } else line = t; });
  if (line) lines.push(line);
  return lines;
}
function hill(ctx, base, amp, ph, color) {
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let i = 0; i <= 24; i++) { const xx = i / 24 * W; ctx.lineTo(xx, base - amp * Math.sin(i / 24 * Math.PI * 1.6 + ph) - amp * .4 * Math.sin(i / 24 * Math.PI * 4.2 + ph * 2)); }
  ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}
function background(ctx, t, f) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, mix('#090E18', '#1E2F55', f));
  g.addColorStop(.36, mix('#111A2B', '#7E5A6E', f));
  g.addColorStop(.52, mix('#18233A', '#E2A564', f));
  g.addColorStop(1, mix('#0A0F1A', '#2B1D17', f));
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (f < 1) for (let i = 0; i < 90; i++) {
    const a = (1 - f) * (.25 + .6 * Math.abs(Math.sin(t * .7 + i * 1.7)));
    ctx.fillStyle = 'rgba(245,240,230,' + a.toFixed(3) + ')';
    ctx.beginPath(); ctx.arc(rnd(i) * W, rnd(i + 99) * H * .5, 1.2 + rnd(i + 7) * 2.4, 0, 7); ctx.fill();
  }
  const sy = lerp(1230, 720, ease(f));
  const halo = ctx.createRadialGradient(W / 2, sy, 20, W / 2, sy, 640);
  halo.addColorStop(0, 'rgba(255,220,150,' + (.08 + .55 * f).toFixed(3) + ')'); halo.addColorStop(1, 'rgba(255,220,150,0)');
  ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,230,175,' + (.15 + .85 * f).toFixed(3) + ')';
  ctx.beginPath(); ctx.arc(W / 2, sy, 170, 0, 7); ctx.fill();
  hill(ctx, 1080, 46, .6, mix('#141E31', '#5A3B45', f));
  hill(ctx, 1150, 30, 2.2, mix('#0C1320', '#2E201C', f));
  const sh = ctx.createLinearGradient(0, 1150, 0, H);
  sh.addColorStop(0, 'rgba(5,8,14,0)'); sh.addColorStop(1, 'rgba(5,8,14,.55)');
  ctx.fillStyle = sh; ctx.fillRect(0, 1150, W, H - 1150);
  if (f > 0) for (let i = 0; i < 36; i++) {
    const sp = 40 + rnd(i + 3) * 60, yy = H - ((t * sp + rnd(i + 50) * H) % H), a = f * (.25 + .5 * rnd(i + 11));
    ctx.fillStyle = 'rgba(255,214,140,' + a.toFixed(3) + ')';
    ctx.beginPath(); ctx.arc(rnd(i + 21) * W + Math.sin(t + i) * 14, yy, 2 + rnd(i + 31) * 3, 0, 7); ctx.fill();
  }
}
function drawAvatar(ctx, img, alpha, scale, dim, t) {
  if (!img || !img.complete || !img.naturalWidth || alpha <= 0) return;
  const w = 520 * scale, h = w * 1.4, bob = Math.sin(t * 1.3) * 6;
  ctx.save(); ctx.globalAlpha = alpha;
  if (dim && 'filter' in ctx) ctx.filter = 'saturate(.5) brightness(.8)';
  ctx.drawImage(img, W / 2 - w / 2, 1158 - h + bob, w, h);
  ctx.restore();
}
function ring(ctx, p, f) {
  const cy = 1158 - 728 / 2, r = 330;
  ctx.save(); ctx.lineWidth = 7; ctx.strokeStyle = 'rgba(245,240,230,.12)';
  ctx.beginPath(); ctx.arc(W / 2, cy, r, 0, 7); ctx.stroke();
  if (p > 0) {
    ctx.strokeStyle = '#E6BC73'; ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(230,188,115,.8)'; ctx.shadowBlur = 18 + 20 * f; ctx.lineWidth = 8 + 3 * f;
    ctx.beginPath(); ctx.arc(W / 2, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(p, 0, 1)); ctx.stroke();
  }
  ctx.restore();
}
function setText(ctx, ar) { ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; try { ctx.direction = ar ? 'rtl' : 'ltr'; } catch (e) {} }
function spacing(ctx, v) { if ('letterSpacing' in ctx) ctx.letterSpacing = v; }
function para(ctx, text, y, size, ar, opts) {
  const o = opts || {}, max = o.max || 900; let s = size, lines;
  for (;;) { ctx.font = (ar ? '600 ' + s + 'px ' + FONT.arS : (o.italic ? 'italic ' : '') + '500 ' + s + 'px ' + FONT.serif); lines = wrap(ctx, text, max); if (lines.length <= (o.maxLines || 5) || s <= 42) break; s -= 4; }
  const lh = s * (ar ? 1.6 : 1.28);
  lines.forEach((ln, i) => ctx.fillText(ln, W / 2, y + i * lh));
  return y + lines.length * lh;
}
function label(ctx, text, y, ar, size) {
  ctx.font = ar ? '600 ' + (size || 40) + 'px ' + FONT.arT : '600 ' + (size || 32) + 'px ' + FONT.sans;
  spacing(ctx, ar ? '0px' : '5px'); ctx.fillStyle = '#E6BC73'; ctx.fillText(ar ? text : text.toUpperCase(), W / 2, y); spacing(ctx, '0px');
}
function frame(ctx, V, t, imgs) {
  const ar = RS.isAr(), S = V.S;
  let i = S.findIndex(s => t < s.t0 + s.dur); if (i < 0) i = S.length - 1;
  const s = S[i], lt = clamp(t - s.t0, 0, s.dur), p = lt / s.dur;
  const ji = S.findIndex(q => q.k === 'jump'), f = i < ji ? 0 : i === ji ? ease(p) : 1;
  let rp = 0;
  if (s.ring) rp = lerp(s.ring[0], s.ring[1], ease(lt / Math.min(1.6, s.dur)));
  else if (i > ji) rp = 1;
  else if (i > S.findIndex(q => q.k === 'day')) rp = RINGS[3];
  ctx.save(); ctx.clearRect(0, 0, W, H);
  background(ctx, t, f);
  ring(ctx, rp, f);
  drawAvatar(ctx, imgs.now, 1 - f, 1, true, t);
  drawAvatar(ctx, imgs.fut, f, 1 + .04 * f, false, t);
  if (s.k === 'jump') { ctx.fillStyle = 'rgba(255,238,205,' + (Math.sin(p * Math.PI) * .6).toFixed(3) + ')'; ctx.fillRect(0, 0, W, H); }
  /* top: story segments and channel name */
  const gap = 6, segW = (W - 120 - gap * (S.length - 1)) / S.length;
  S.forEach((q, k) => {
    const xx = 60 + k * (segW + gap), fillP = k < i ? 1 : k === i ? p : 0;
    ctx.fillStyle = 'rgba(245,240,230,.25)'; ctx.fillRect(xx, 54, segW, 6);
    ctx.fillStyle = 'rgba(245,240,230,.95)'; ctx.fillRect(ar ? xx + segW * (1 - fillP) : xx, 54, segW * fillP, 6);
  });
  setText(ctx, ar);
  ctx.textAlign = 'left'; try { ctx.direction = 'ltr'; } catch (e) {}
  ctx.fillStyle = '#C9974B'; ctx.beginPath(); ctx.arc(80, 128, 11, 0, 7); ctx.fill();
  ctx.fillStyle = '#F5F0E6'; ctx.font = (ar ? '600 42px ' + FONT.arS : '500 42px ' + FONT.serif);
  ctx.fillText(x('Future Self', 'النسخة المستقبلية'), 104, 142);
  ctx.textAlign = 'right'; ctx.font = '600 30px ' + (ar ? FONT.arT : FONT.sans); ctx.fillStyle = 'rgba(245,240,230,.7)';
  ctx.fillText(V.ep.kind === 'me' ? x('YOUR EPISODE', 'حلقتك') : x('EP ' + String(V.ep.num).padStart(2, '0'), 'الحلقة ' + V.ep.num), W - 60, 140);
  /* captions */
  setText(ctx, ar);
  const a = Math.min(ease(lt / .45), ease((s.dur - lt) / .45));
  ctx.save(); ctx.globalAlpha = a; ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 22;
  const rise = (1 - ease(lt / .6)) * 18;
  ctx.translate(0, rise);
  if (s.k === 'title') {
    label(ctx, s.label, 1268, ar);
    ctx.fillStyle = '#F5F0E6'; ctx.font = ar ? '600 128px ' + FONT.arS : '500 128px ' + FONT.serif; ctx.fillText(s.text, W / 2, 1420);
    ctx.font = (ar ? '500 46px ' + FONT.arT : '500 44px ' + FONT.sans); ctx.fillStyle = 'rgba(245,240,230,.75)'; ctx.fillText(s.sub, W / 2, 1500);
    ctx.fillStyle = '#E6BC73'; para(ctx, s.q, 1620, 56, ar, { italic: true, maxLines: 3 });
  } else if (s.k === 'jump') {
    ctx.fillStyle = '#FFF6E6'; ctx.shadowColor = 'rgba(90,50,10,.55)';
    para(ctx, s.label, 1400, 104, ar, { maxLines: 2 });
  } else if (s.k === 'day') {
    ctx.fillStyle = '#E6BC73'; ctx.font = ar ? '600 84px ' + FONT.arS : '500 84px ' + FONT.serif; ctx.fillText(s.label, W / 2, 1310);
    ctx.fillStyle = '#F5F0E6'; para(ctx, s.text, 1420, 62, ar);
  } else if (s.k === 'end') {
    label(ctx, s.label, 1270, ar);
    ctx.fillStyle = '#F5F0E6'; const y = para(ctx, s.text, 1380, 70, ar, { maxLines: 3 });
    ctx.font = (ar ? '500 40px ' + FONT.arT : '500 38px ' + FONT.sans); ctx.fillStyle = 'rgba(245,240,230,.8)';
    ctx.fillText(x('Make your own episode at', 'اصنع حلقتك على'), W / 2, y + 40);
    ctx.fillStyle = '#E6BC73'; try { ctx.direction = 'ltr'; } catch (e) {} ctx.font = '600 42px ' + FONT.sans; ctx.fillText(URL_TXT, W / 2, y + 108);
  } else {
    let y = 1270;
    if (s.label) { label(ctx, s.label, y, ar); y += 110; } else y += 60;
    ctx.fillStyle = s.k === 'msg' ? '#FFE9C2' : '#F5F0E6';
    const q = s.k === 'msg' ? (ar ? '«' + s.text + '»' : '“' + s.text + '”') : s.text;
    para(ctx, q, y, s.k === 'msg' ? 64 : 62, ar, { italic: s.k === 'msg' });
  }
  ctx.restore();
  if (s.k !== 'end') {
    ctx.textAlign = 'center'; try { ctx.direction = 'ltr'; } catch (e) {}
    ctx.font = '500 28px ' + FONT.sans; ctx.fillStyle = 'rgba(245,240,230,.5)'; ctx.fillText(URL_TXT, W / 2, H - 70);
  }
  ctx.restore();
  return i;
}

/* ---------- sound: a soft pad that brightens in the future, recordable ---------- */
const Music = (() => {
  let ac = null, master, lp, dest = null, timer = null, next = 0, n = 0, bright = 0;
  const CH = [[130.81, 261.63, 329.63, 392.0], [98.0, 246.94, 293.66, 392.0], [110.0, 261.63, 329.63, 440.0], [87.31, 261.63, 349.23, 440.0]];
  function ensure() {
    if (ac) return ac; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC(); master = ac.createGain(); master.gain.value = 0; lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
    lp.connect(master); master.connect(ac.destination); return ac;
  }
  function voice(hz, t0, len, peak, type) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = hz;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(peak, t0 + Math.min(1.2, len / 3)); g.gain.linearRampToValueAtTime(0, t0 + len);
    o.connect(g); g.connect(lp); o.start(t0); o.stop(t0 + len + .1);
  }
  function chord(t0) {
    const c = CH[n++ % 4];
    c.forEach((hz, k) => voice(hz, t0, 4.8, k ? .07 : .12, k ? 'triangle' : 'sine'));
    if (bright > .5) for (let j = 0; j < 4; j++) voice(c[1 + (j % 3)] * 2, t0 + j, .9, .035, 'sine');
  }
  function tick() { while (next < ac.currentTime + .6) { chord(next); next += 4; } }
  return {
    start() { if (!ensure()) return; ac.resume(); master.gain.setTargetAtTime(.4, ac.currentTime, .4); if (!timer) { next = Math.max(next, ac.currentTime + .05); timer = setInterval(tick, 200); tick(); } },
    stop() { if (!ac) return; master.gain.setTargetAtTime(0, ac.currentTime, .15); clearInterval(timer); timer = null; },
    bright(v) { bright = v; if (ac) lp.frequency.setTargetAtTime(900 + 2300 * v, ac.currentTime, .6); },
    dest() { if (!ensure()) return null; if (!dest) { dest = ac.createMediaStreamDestination(); master.connect(dest); } return dest; }
  };
})();

/* ---------- player ---------- */
const P = { ep: null, V: null, t: 0, playing: false, last: 0, idx: -1, raf: 0, imgs: {}, narr: true, music: true, rec: null, url: null };
const svgImg = (av) => { const im = new Image(); im.onload = () => draw(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(RS.avatar(av, 600, '').replace(/<circle cx="100" cy="135" r="112"[^>]*\/>/, '')); return im; };
function canvas() { return document.getElementById('chCanvas'); }
function draw() { const c = canvas(); if (!c || !P.V) return; const i = frame(c.getContext('2d'), P.V, P.t, P.imgs); syncUI(); return i; }
function load(ep, keepT) {
  P.ep = ep; P.V = scenes(ep); P.V.ep = ep; P.imgs = { now: svgImg(ep.av), fut: svgImg(ep.fav) };
  if (!keepT) P.t = Math.min(1.6, P.V.total); P.idx = -1; stop(); draw();
}
function say(s) {
  if (!P.narr || !window.speechSynthesis) return;
  const text = s.say || [s.label, s.text].filter(Boolean).join('. '); if (!text) return;
  const lang = RS.isAr() ? 'ar' : 'en', v = speechSynthesis.getVoices().find(vv => vv.lang && vv.lang.toLowerCase().indexOf(lang) === 0);
  if (!v && lang === 'ar') return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); if (v) u.voice = v; u.lang = lang === 'ar' ? 'ar-SA' : 'en-US'; u.rate = .95; speechSynthesis.speak(u);
}
function loop(ts) {
  if (!P.playing) return;
  P.t += Math.min(.1, (ts - P.last) / 1000); P.last = ts;
  if (P.t >= P.V.total) { P.t = P.V.total - .001; draw(); finish(); return; }
  const i = draw();
  if (i !== P.idx) { P.idx = i; say(P.V.S[i]); Music.bright(P.V.S[i].k === 'jump' || i > P.V.S.findIndex(q => q.k === 'jump') ? 1 : 0); }
  P.raf = requestAnimationFrame(loop);
}
function play() {
  if (!P.V) return; if (P.t >= P.V.total - .05) P.t = 0;
  P.playing = true; P.last = performance.now(); P.idx = -1;
  if (P.music) Music.start();
  cancelAnimationFrame(P.raf); P.raf = requestAnimationFrame(loop); syncUI();
}
function stop() { P.playing = false; cancelAnimationFrame(P.raf); Music.stop(); if (window.speechSynthesis) speechSynthesis.cancel(); syncUI(); }
function finish() { stop(); if (P.rec && P.rec.state === 'recording') setTimeout(() => P.rec && P.rec.state === 'recording' && P.rec.stop(), 300); }
const mmss = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
function syncUI() {
  const b = document.getElementById('chPlay'), r = document.getElementById('chSeek'), tm = document.getElementById('chTime');
  if (b) { b.textContent = P.playing ? x('Pause', 'إيقاف مؤقت') : x('Play', 'تشغيل'); b.setAttribute('aria-pressed', P.playing); }
  if (r && P.V) { r.max = P.V.total.toFixed(2); r.value = P.t.toFixed(2); }
  if (tm && P.V) tm.textContent = mmss(P.t) + ' / ' + mmss(P.V.total);
}
function status(t, html) { const m = document.getElementById('chStatus'); if (!m) return; if (html) m.innerHTML = t; else m.textContent = t; }
function record() {
  const c = canvas();
  if (P.rec && P.rec.state === 'recording') { P.rec.stop(); stop(); return; }
  if (!c || !c.captureStream || !window.MediaRecorder) { status(x('This browser can\'t record the video. Try Chrome, Edge or Firefox on a computer, or use your phone\'s screen recorder.', 'لا يستطيع هذا المتصفح تسجيل الفيديو. جرّب كروم أو إيدج أو فايرفوكس على الحاسوب، أو استخدم مسجّل الشاشة في هاتفك.')); return; }
  const types = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  const mime = types.find(m => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || '';
  let stream;
  try { stream = c.captureStream(30); } catch (e) { status(x('Recording was blocked by the browser.', 'منع المتصفح التسجيل.')); return; }
  if (P.music) { const d = Music.dest(); if (d) d.stream.getAudioTracks().forEach(tr => stream.addTrack(tr)); }
  const chunks = [];
  try { P.rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 8e6 } : undefined); } catch (e) { status(x('Recording is not available here.', 'التسجيل غير متاح هنا.')); return; }
  P.rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  P.rec.onstop = () => {
    const type = (P.rec && P.rec.mimeType) || mime || 'video/webm', ext = /mp4/.test(type) ? 'mp4' : 'webm';
    if (P.url) URL.revokeObjectURL(P.url);
    P.url = URL.createObjectURL(new Blob(chunks, { type }));
    const name = 'future-self-' + String(P.ep.n[0]).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.' + ext;
    status('<a class="btn btn-primary sm" href="' + P.url + '" download="' + esc(name) + '">' + esc(x('Download the video', 'نزّل الفيديو')) + ' (' + ext.toUpperCase() + ')</a>', true);
    P.rec = null; syncRec();
  };
  P.t = 0; P.rec.start(250); play(); syncRec();
  status(x('Recording in real time. Keep this tab open until it ends.', 'التسجيل جارٍ في الوقت الفعلي. أبقِ هذه الصفحة مفتوحة حتى ينتهي.'));
}
function syncRec() { const b = document.getElementById('chRec'); if (b) b.textContent = P.rec ? x('Stop recording', 'أوقف التسجيل') : x('Record and download', 'سجّل ونزّل'); }

/* ---------- page ---------- */
function caption(ep) {
  const nm = L(ep.n), y = later2(ep.path.years), tag = L(ep.path.tag);
  if (ep.kind === 'me') return x('My future self video: what my life could look like in ' + y + ' if I act on what I want to manifest. What would your future self tell you?\n\n#futureself #manifestation #glowup #ritual', 'فيديو نسختي المستقبلية: كيف قد تبدو حياتي بعد ' + y + ' إن عملت على ما أريد تحقيقه. ماذا ستقول لك نسختك المستقبلية؟\n\n#النسخة_المستقبلية #تطوير_الذات #futureself');
  return x(nm + ', ' + ep.age + ', from ' + L(ep.c) + ', wanted ' + tag + '. This is ' + nm + ' ' + y + ' later, after actually doing the work. What would your future self tell you?\n\n#futureself #manifestation #glowup #ritual',
    gx(ep, nm + '، ' + ep.age + ' عامًا، من ' + L(ep.c) + '، أراد ' + tag + '. هذا ' + nm + ' بعد ' + y + '، بعد أن بدأ فعلًا. ماذا ستقول لك نسختك المستقبلية؟', nm + '، ' + ep.age + ' عامًا، من ' + L(ep.c) + '، أرادت ' + tag + '. هذه ' + nm + ' بعد ' + y + '، بعد أن بدأت فعلًا. ماذا ستقول لك نسختك المستقبلية؟') + '\n\n#النسخة_المستقبلية #تطوير_الذات #futureself');
}
function story(ep) {
  const Pt = ep.path, lb = labels(ep), p = t => '<p>' + esc(T(ep, t)) + '</p>';
  return '<dl class="ch-story">' +
    '<dt>' + x('Today', 'اليوم') + '</dt><dd>' + Pt.now.map(p).join('') + '</dd>' +
    '<dt>' + esc(lb.want) + '</dt><dd>' + p(Pt.want) + '</dd>' +
    '<dt>' + esc(lb.block) + '</dt><dd>' + p(Pt.block) + '</dd>' +
    '<dt>' + esc(lb.plan) + '</dt><dd class="ch-plan">' + p(Pt.plan) + '</dd>' +
    '<dt>' + x('The journey', 'الرحلة') + '</dt><dd><ol class="ch-days">' + Pt.steps.map((t, i) => '<li><b>' + esc(L(DAYL[i])) + '</b> ' + esc(T(ep, t)) + '</li>').join('') + '</ol></dd>' +
    '<dt>' + esc(later(Pt.years)) + '</dt><dd>' + Pt.future.map(p).join('') + '</dd>' +
    '<dt>' + esc(lb.msg) + '</dt><dd class="ch-quote">' + p(Pt.msg) + '</dd></dl>';
}
function card(ep, on) {
  const meta = ep.kind === 'me' ? x('Your episode', 'حلقتك') : x('Ep ' + ep.num + ' · ' + ep.age + ' · ' + L(ep.c), 'الحلقة ' + ep.num + ' · ' + ep.age + ' · ' + L(ep.c));
  return '<li><button type="button" class="ch-card' + (on ? ' is-on' : '') + '" data-act="pick" data-id="' + esc(ep.id) + '" aria-pressed="' + on + '">' +
    '<span class="ch-mini">' + RS.avatar(ep.fav, 56, L(ep.n)) + '</span><span class="ch-ct"><strong>' + esc(L(ep.n)) + '</strong><span class="ch-meta">' + esc(meta) + '</span><span class="ch-want">' + esc(L(ep.path.tag)) + '</span></span></button></li>';
}
function form(s) {
  const F = RS.future(), lang = RS.isAr() ? 'ar' : 'en', m = s.me || {}, snap = F.snap && F.snap[lang];
  const v = (k, d) => esc(m[k] != null ? m[k] : (d || ''));
  const yrs = [1, 2, 3, 5].map(y => '<option value="' + y + '"' + (+(m.years || 1) === y ? ' selected' : '') + '>' + esc(later2(y)) + '</option>').join('');
  return '<form class="ch-form" id="chForm" autocomplete="off">' +
    '<div class="ch-fgrid"><label class="fy-field">' + x('Your first name', 'اسمك الأول') + '<input name="name" required maxlength="24" value="' + v('name') + '"></label>' +
    '<label class="fy-field">' + x('Your age', 'عمرك') + '<input name="age" type="number" min="12" max="99" required value="' + v('age') + '"></label></div>' +
    '<label class="fy-field">' + x('What do you want to manifest?', 'ماذا تريد أن تحقّق؟') + '<input name="want" required maxlength="90" placeholder="' + esc(x('e.g. my own business', 'مثلًا: مشروعي الخاص')) + '" value="' + v('want', snap && snap.wish) + '"></label>' +
    '<label class="fy-field">' + x('What usually gets in the way?', 'ما الذي يعترض طريقك عادةً؟') + '<input name="block" required maxlength="90" placeholder="' + esc(x('e.g. I put it off', 'مثلًا: أؤجّل الأمر')) + '" value="' + v('block') + '"></label>' +
    '<label class="fy-field">' + x('Your first small step', 'خطوتك الصغيرة الأولى') + '<input name="step" required maxlength="90" placeholder="' + esc(x('e.g. work on it for 25 minutes', 'مثلًا: أعمل عليه خمسًا وعشرين دقيقة')) + '" value="' + v('step') + '"></label>' +
    '<label class="fy-field">' + x('One thing you would see in that future (optional)', 'شيء واحد ستراه في ذلك المستقبل (اختياري)') + '<input name="future" maxlength="110" placeholder="' + esc(x('e.g. I open my shop on a Saturday morning', 'مثلًا: أفتح محلي صباح يوم سبت')) + '" value="' + v('future') + '"></label>' +
    '<div class="ch-fgrid"><label class="fy-field">' + x('Jump ahead', 'القفزة إلى الأمام') + '<select name="years" class="ch-sel">' + yrs + '</select></label></div>' +
    '<p class="rs-note">' + x('Your episode uses the avatar from ', 'تستخدم حلقتك الشخصية من ') + '<a class="cw-link" href="../routine/#future">' + x('your future self', 'نسختك المستقبلية') + '</a>' + x('. Write in the language you want the video in.', '. اكتب باللغة التي تريد الفيديو بها.') + '</p>' +
    '<div class="actions"><button class="btn btn-primary" type="submit">' + x('Make my episode', 'اصنع حلقتي') + '</button></div></form>';
}
function view() {
  const s = state(), ep = P.ep;
  const feat = FEAT.map((f, i) => makeEp(f[0], f[1], f[2], i + 1, 'f' + i));
  const gen = s.gen.map(g => epFromId(g.id, s)).filter(Boolean);
  const me = s.me ? meEp(s.me) : null;
  let h = '<section class="ch-hero"><p class="rs-date">' + x('Future Self Channel · new episodes any time', 'قناة النسخة المستقبلية · حلقات جديدة في أي وقت') + '</p>' +
    '<h1>' + x('Who would they become if they actually did it?', 'من سيصبحون لو بدؤوا فعلًا؟') + '</h1>' +
    '<p class="rs-lede">' + x('Realistic characters tell their story: where they are now, what they want to manifest, and what gets in the way. Then the video jumps ahead and shows their future self.', 'شخصيات واقعية تروي قصتها: أين هي اليوم، وماذا تريد أن تحقّق، وما يعترض طريقها. ثم يقفز الفيديو إلى الأمام ويُظهر نسختها المستقبلية.') + '</p></section>';
  h += '<section class="ch-studio" id="chStudio"><div class="ch-player">' +
    '<canvas id="chCanvas" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(x('Future self video for ', 'فيديو النسخة المستقبلية لـ') + L(ep.n)) + '"></canvas>' +
    '<div class="ch-ctl"><button type="button" class="btn btn-primary sm" id="chPlay" data-act="play" aria-pressed="false">' + x('Play', 'تشغيل') + '</button>' +
    '<input type="range" id="chSeek" min="0" step="0.05" value="0" aria-label="' + esc(x('Seek', 'تقديم')) + '"><span class="ch-time" id="chTime">0:00</span></div>' +
    '<div class="ch-ctl"><button type="button" class="chip" data-act="narr" aria-pressed="' + P.narr + '">' + x('Narration', 'السرد الصوتي') + '</button>' +
    '<button type="button" class="chip" data-act="music" aria-pressed="' + P.music + '">' + x('Music', 'الموسيقى') + '</button>' +
    '<button type="button" class="btn btn-ghost sm" id="chRec" data-act="rec">' + x('Record and download', 'سجّل ونزّل') + '</button></div>' +
    '<p class="rs-note ch-status" id="chStatus" role="status" aria-live="polite">' + x('Downloads a 1080×1920 video with the music, ready for Shorts, Reels or TikTok. Narration plays live but isn\'t recorded.', 'يُنزّل فيديو بمقاس 1080×1920 مع الموسيقى، جاهزًا لـ Shorts وReels وتيك توك. السرد الصوتي يُسمع أثناء التشغيل لكنه لا يُسجَّل.') + '</p></div>' +
    '<div class="ch-info"><p class="rs-date">' + esc(ep.kind === 'me' ? x('Your episode', 'حلقتك') : x('Episode ' + ep.num, 'الحلقة ' + ep.num)) + '</p>' +
    '<h2 class="ch-name">' + esc(L(ep.n)) + '</h2><p class="rs-note">' + esc(ep.c ? x(ep.age + ' · ' + L(ep.c) + ' · jumps ahead ' + later2(ep.path.years), ep.age + ' عامًا · ' + L(ep.c) + ' · قفزة ' + later2(ep.path.years)) : x(ep.age + ' · jumps ahead ' + later2(ep.path.years), ep.age + ' عامًا · قفزة ' + later2(ep.path.years))) + '</p>' +
    story(ep) +
    '<div class="ch-cap"><label class="fy-field">' + x('Caption for posting', 'نص المنشور') + '<textarea id="chCaption" rows="4" readonly>' + esc(caption(ep)) + '</textarea></label>' +
    '<div class="actions"><button type="button" class="btn btn-ghost sm" data-act="copy">' + x('Copy caption', 'انسخ النص') + '</button><button type="button" class="btn btn-ghost sm" data-act="share">' + x('Share this episode', 'شارك هذه الحلقة') + '</button></div>' +
    '<p class="rs-note" id="chMsg" role="status" aria-live="polite"></p></div></div></section>';
  h += '<section class="ch-eps"><div class="ch-head"><h2 class="rs-h2">' + x('Episodes', 'الحلقات') + '</h2><button type="button" class="btn btn-primary sm" data-act="new">' + x('Create a new character', 'أنشئ شخصية جديدة') + '</button></div>' +
    '<ul class="ch-grid">' + (me ? card(me, ep.id === 'me') : '') + feat.concat(gen).map(e => card(e, e.id === ep.id)).join('') + '</ul></section>';
  h += '<section class="ch-own" id="chOwn"><h2 class="rs-h2">' + x('Make your own episode', 'اصنع حلقتك الخاصة') + '</h2>' +
    '<p class="rs-note">' + x('Tell your story in a few lines and watch your own future self video. It stays on this device.', 'احكِ قصتك في بضعة أسطر وشاهد فيديو نسختك المستقبلية. يبقى كل شيء على جهازك.') + '</p>' + form(s) + '</section>';
  h += '<p class="rs-note ch-fine">' + x('All characters are fictional; any resemblance to real people is a coincidence. On this channel, manifesting means picturing a future clearly, naming what gets in the way, and acting on it in small daily steps.', 'كل الشخصيات خيالية، وأي تشابه مع أشخاص حقيقيين محض صدفة. في هذه القناة، التحقيق يعني أن تتخيّل المستقبل بوضوح، وتسمّي ما يعترض طريقك، وتعمل عليه بخطوات يومية صغيرة.') + '</p>';
  return h;
}
function pick(id, scroll) {
  const s = state(), ep = epFromId(id, s); if (!ep) return;
  if (/^g-/.test(id) && !s.gen.some(g => g.id === id)) { s.gen.unshift({ id }); s.gen = s.gen.slice(0, 16); save(s); }
  P.ep = ep; render();
  try { history.replaceState(null, '', '#ep=' + id); } catch (e) {}
  if (scroll) { const st = document.getElementById('chStudio'); if (st) st.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
function render(keepT) {
  if (P.rec && P.rec.state === 'recording') P.rec.stop();
  root.innerHTML = view(); load(P.ep, keepT);
}
function msg(t) { const m = document.getElementById('chMsg'); if (m) m.textContent = t; }

root.addEventListener('click', e => {
  const t = e.target.closest ? e.target.closest('[data-act]') : null; if (!t) return;
  const a = t.dataset.act;
  if (a === 'play') { P.playing ? stop() : play(); return; }
  if (a === 'narr' || a === 'music') {
    P[a] = !P[a]; t.setAttribute('aria-pressed', P[a]);
    if (a === 'narr' && !P.narr && window.speechSynthesis) speechSynthesis.cancel();
    if (a === 'music' && P.playing) { P.music ? Music.start() : Music.stop(); }
    return;
  }
  if (a === 'rec') { record(); return; }
  if (a === 'pick') { pick(t.dataset.id, true); return; }
  if (a === 'new') {
    const s = state(), used = new Set(FEAT.map(f => f[0] + '-' + f[1]).concat(s.gen.map(g => g.id.split('-').slice(1, 3).join('-'))));
    let p, q, tries = 0;
    do { p = Math.floor(Math.random() * PATHS.length); q = Math.floor(Math.random() * PEOPLE.length); } while (used.has(p + '-' + q) && ++tries < 60);
    const ag = PATHS[p].ages, age = ag[0] + Math.floor(Math.random() * (ag[1] - ag[0] + 1));
    pick('g-' + p + '-' + q + '-' + age, true); return;
  }
  if (a === 'copy') {
    const c = document.getElementById('chCaption'), v = c ? c.value : '';
    const ok = () => msg(x('Caption copied.', 'تم نسخ النص.'));
    try { navigator.clipboard.writeText(v).then(ok, () => { c.select(); }); } catch (er) { if (c) c.select(); }
    return;
  }
  if (a === 'share') {
    const url = location.href.split('#')[0] + (P.ep.id === 'me' ? '' : '#ep=' + P.ep.id), text = P.ep.id === 'me' ? x('Make your own future self video.', 'اصنع فيديو نسختك المستقبلية.') : x('Watch ' + L(P.ep.n) + '\'s future self.', 'شاهد النسخة المستقبلية لـ' + L(P.ep.n) + '.');
    if (navigator.share) { navigator.share({ title: 'Future Self Channel', text, url }).catch(() => {}); return; }
    try { navigator.clipboard.writeText(url).then(() => msg(x('Link copied.', 'تم نسخ الرابط.')), () => msg(url)); } catch (er) { msg(url); }
  }
});
root.addEventListener('input', e => {
  if (e.target.id !== 'chSeek' || !P.V) return;
  P.t = clamp(parseFloat(e.target.value) || 0, 0, P.V.total - .001); P.idx = -1;
  if (window.speechSynthesis) speechSynthesis.cancel();
  draw();
});
root.addEventListener('submit', e => {
  if (e.target.id !== 'chForm') return; e.preventDefault();
  const fd = new FormData(e.target), g = k => String(fd.get(k) || '').trim().replace(/[.。]+$/, '');
  const m = { name: g('name'), age: Math.max(12, Math.min(99, parseInt(g('age'), 10) || 30)), want: g('want'), block: g('block'), step: g('step'), future: g('future'), years: parseInt(g('years'), 10) || 1 };
  if (!m.name || !m.want || !m.block || !m.step) return;
  const s = state(); s.me = m; save(s); pick('me', true);
});
document.addEventListener('keydown', e => {
  if (e.key !== ' ' || !P.V) return; const tg = e.target;
  if (tg && (tg.closest('input,textarea,select,button,a') || tg.isContentEditable)) return;
  if (!document.getElementById('chCanvas')) return; e.preventDefault(); P.playing ? stop() : play();
});
document.addEventListener('mr:lang', () => render());
if (window.speechSynthesis) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }

const hashId = (/[#&]ep=([\w-]+)/.exec(location.hash) || [])[1];
P.ep = epFromId(hashId, state()) || makeEp(FEAT[0][0], FEAT[0][1], FEAT[0][2], 1, 'f0');
if (hashId && /^g-/.test(hashId)) { const s = state(); if (!s.gen.some(g => g.id === hashId)) { s.gen.unshift({ id: hashId }); save(s); P.ep = epFromId(hashId, s); } }
render();
if (document.fonts && document.fonts.load) Promise.all(['500 64px "Playfair Display"', 'italic 500 64px "Playfair Display"', '600 64px "Noto Naskh Arabic"', '600 32px Inter', '600 40px "IBM Plex Sans Arabic"'].map(f => document.fonts.load(f).catch(() => {}))).then(() => draw());
window.RS_CHAN = { PATHS, PEOPLE, FEAT, scenes, epFromId };
})();
