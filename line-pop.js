/* line-pop.js — スマホでは LINE ボタンを丸いアイコンにし、押すと小窓を開く (2026-10-05 Sho 指示)
   幅640px以下だけ動く。パソコンでは今までどおり、押すとすぐ LINE が開く。
   小窓の中の「LINE を開く」で、元のボタンと同じリンクを開く。 */
(function () {
  var btn = document.querySelector('a.line-float');
  if (!btn) return;
  var mq = window.matchMedia('(max-width: 640px)');
  // 文言はページの言語で切り替える (英語版の文言は 2026-10-05 に執筆・校閲)
  var EN = /^en/i.test(document.documentElement.lang || '');
  var T = EN ? { title: 'Chat on LINE', open: 'Open LINE', close: 'Close' }
             : { title: 'LINE で相談', open: 'LINE を開く', close: '閉じる' };
  var pop = document.createElement('div');
  pop.className = 'line-pop';
  pop.id = 'line-pop';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-label', T.title);
  pop.hidden = true;
  pop.innerHTML =
    '<p class="line-pop-t">' + T.title + '</p>' +
    '<a class="line-pop-go" href="' + btn.getAttribute('href') + '" target="_blank" rel="noopener noreferrer">' + T.open + '</a>' +
    '<button type="button" class="line-pop-x">' + T.close + '</button>';
  document.body.appendChild(pop);
  btn.setAttribute('aria-controls', 'line-pop');

  function open() { pop.hidden = false; btn.setAttribute('aria-expanded', 'true'); pop.querySelector('.line-pop-go').focus(); }
  function close(back) { if (pop.hidden) return; pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (back) btn.focus(); }

  btn.addEventListener('click', function (e) {
    if (!mq.matches) return;            // パソコンは今までどおり
    e.preventDefault();
    pop.hidden ? open() : close(true);
  });
  pop.querySelector('.line-pop-x').addEventListener('click', function () { close(true); });
  pop.querySelector('.line-pop-go').addEventListener('click', function () { close(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(true); });
  document.addEventListener('click', function (e) {
    if (!pop.hidden && !pop.contains(e.target) && !btn.contains(e.target)) close(false);
  });
  mq.addEventListener && mq.addEventListener('change', function () { close(false); });
})();
