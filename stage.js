/* stage.js — 案1 固定ステージ (2026-10-05)
   使い方: 既存の区画の一覧に class="stage-list" を付け、その直前に
   <div class="stage-wrap" data-stage style="--n:場面の数"> を置く。
   場面は .layer の data-cnt / data-t / data-en / data-x / data-href / data-link に書く。
   動画の場面は <video data-src-webm data-src-mp4 poster muted playsinline loop preload="none">。
   動きを減らす設定の端末と、JS が動かない環境では何もしない (一覧のまま表示)。 */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wraps = [].slice.call(document.querySelectorAll('[data-stage]'));
  if (reduce || !wraps.length) return;
  document.documentElement.classList.add('stage-on');

  var nav = document.querySelector('nav.site-nav');
  function navH() { return nav ? nav.getBoundingClientRect().height : 64; }
  function setNav() { document.documentElement.style.setProperty('--nav-h', Math.round(navH()) + 'px'); }
  setNav();

  function loadVideo(v) {
    if (v.dataset.loaded) return;
    var webm = v.dataset.srcWebm, mp4 = v.dataset.srcMp4;
    v.src = (webm && v.canPlayType('video/webm')) ? webm : (mp4 || webm);
    v.dataset.loaded = '1';
  }

  var stages = wraps.map(function (w) {
    var st = w.querySelector('.stage');
    var layers = [].slice.call(st.querySelectorAll('.layer'));
    var bars = [].slice.call(st.querySelectorAll('.bar b'));
    var cap = st.querySelector('.cap');
    var toggle = st.querySelector('.toggle');
    var s = { w: w, st: st, layers: layers, bars: bars, cur: -1, inView: false, userPaused: false,
      cnt: cap.querySelector('.cnt'), t: cap.querySelector('.t'), en: cap.querySelector('.en'),
      x: cap.querySelector('.x'), a: cap.querySelector('a'), toggle: toggle };
    if (toggle) {
      toggle.addEventListener('click', function () {
        s.userPaused = !s.userPaused;
        var en = /^en/i.test(document.documentElement.lang || '');
        toggle.textContent = s.userPaused ? (en ? 'Play' : '再生') : (en ? 'Pause' : '一時停止');
        toggle.setAttribute('aria-pressed', s.userPaused ? 'true' : 'false');
        playCurrent(s);
      });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { s.inView = es[0].isIntersecting; playCurrent(s); }, { threshold: 0.15 }).observe(st);
    } else { s.inView = true; }
    return s;
  });

  function playCurrent(s) {
    s.layers.forEach(function (l, k) {
      var v = l.querySelector('video'); if (!v) return;
      if (k === s.cur && s.inView && !s.userPaused) { loadVideo(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!v.paused) v.pause();
    });
  }

  function show(s, i) {
    s.cur = i;
    s.layers.forEach(function (l, k) { l.classList.toggle('on', k === i); });
    var d = s.layers[i].dataset;
    s.cnt.textContent = (d.cnt ? d.cnt + '  ·  ' : '') + ('0' + (i + 1)).slice(-2) + ' / ' + ('0' + s.layers.length).slice(-2);
    s.t.textContent = d.t || '';
    s.en.textContent = d.en || ''; s.en.hidden = !d.en;
    s.x.textContent = d.x || ''; s.x.hidden = !d.x;
    if (s.a) { s.a.hidden = !d.href; if (d.href) { s.a.href = d.href; s.a.textContent = d.link || ''; } }
    playCurrent(s);
  }

  var ticking = false;
  function update() {
    ticking = false;
    var top = navH() + 12;
    stages.forEach(function (s) {
      var r = s.w.getBoundingClientRect(), total = r.height - s.st.offsetHeight;
      if (total <= 0) return;
      var p = Math.min(1, Math.max(0, (top - r.top) / total));
      var n = s.layers.length, x = p * n, i = Math.min(n - 1, Math.floor(x)), local = Math.min(1, x - i);
      s.bars.forEach(function (b, k) { b.style.transform = 'scaleX(' + (k < i ? 1 : k === i ? local.toFixed(3) : 0) + ')'; });
      s.layers[i].style.setProperty('--p', local.toFixed(3));
      if (i !== s.cur) show(s, i);
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { setNav(); onScroll(); });
  stages.forEach(function (s) { show(s, 0); });
  update();
})();
