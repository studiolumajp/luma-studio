/* hero-slideshow.js — HERO の背景写真を一定間隔で入れ替える (2026-09-03)
   ・写真とディレクトリは <header data-slides data-slide-dir> から読む (日英でパスが違うため)
   ・毎回シャッフルするので、読み込むたびに順番が変わる
   ・1枚目だけ先に読み、2枚目以降は表示の3秒前に読む (初回表示を軽くする)
   ・画面幅と DPR で 960 版と 1920 版を出し分ける
   ・停止ボタンは WCAG 2.2.2 対応
   ・prefers-reduced-motion のときも写真は入れ替える。切り替えは opacity だけで要素が
     動かないため、Reduce Motion が避けたい前庭系への刺激にあたらない。
     ただし間隔を 7秒 → 14秒 に伸ばし、フェードも CSS 側で長くする */
(function () {
  'use strict';

  var hero = document.querySelector('.hero--slideshow');
  if (!hero) return;

  var names;
  try { names = JSON.parse(hero.getAttribute('data-slides') || '[]'); }
  catch (e) { return; }
  if (!names || names.length < 2) return;

  var dir = hero.getAttribute('data-slide-dir') || './images/hero/';
  var INTERVAL = 7000;   // 切り替え間隔
  var LEAD = 3000;       // 次の写真を読み始めるタイミング (切り替えの3秒前)
  var EN = (document.documentElement.lang || 'ja').toLowerCase().indexOf('en') === 0;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  // 幅 = min(1920, 960) の出し分け。DPR 込みの実ピクセルで判定する
  function srcOf(name) {
    var need = (window.innerWidth || 1024) * (window.devicePixelRatio || 1);
    // 境界は preload の imagesrcset (960w / 1920w + sizes=100vw) の選択規則と揃える
    return dir + name + '-' + (need > 960 ? 1920 : 960) + '.webp';
  }

  // Fisher-Yates。ただし 1枚目は固定する (head の rel="preload" と一致させ、
  // LCP になる 1枚目を確実に先読みさせるため)。2枚目以降だけシャッフルする
  var order = names.slice();
  for (var i = order.length - 1; i > 1; i--) {
    var j = 1 + Math.floor(Math.random() * i);
    var t = order[i]; order[i] = order[j]; order[j] = t;
  }

  var wrap = document.createElement('div');
  wrap.className = 'hero-slides';
  wrap.setAttribute('aria-hidden', 'true');
  var layers = [document.createElement('div'), document.createElement('div')];
  layers.forEach(function (l) { l.className = 'hero-slide'; wrap.appendChild(l); });
  hero.insertBefore(wrap, hero.firstChild);

  var idx = 0, front = 0, timer = null, lead = null, playing = false;

  function paint(layer, name) { layer.style.backgroundImage = 'url("' + srcOf(name) + '")'; }
  function preload(name) { var im = new Image(); im.src = srcOf(name); }

  paint(layers[0], order[0]);
  layers[0].classList.add('is-on');

  function advance() {
    idx = (idx + 1) % order.length;
    var back = 1 - front;
    paint(layers[back], order[idx]);
    layers[back].classList.add('is-on');
    layers[front].classList.remove('is-on');
    front = back;
  }

  function schedule() {
    clearTimeout(timer); clearTimeout(lead);
    // 先読みは切り替えの LEAD ミリ秒前。INTERVAL を変えても負にならないようにする
    lead = setTimeout(function () { preload(order[(idx + 1) % order.length]); },
                      Math.max(0, INTERVAL - LEAD));
    timer = setTimeout(function () { advance(); schedule(); }, INTERVAL);
  }

  function play() { playing = true; schedule(); sync(); }
  function stop() { playing = false; clearTimeout(timer); clearTimeout(lead); sync(); }

  /* ── 停止・再生ボタン (WCAG 2.2.2) ── */
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'hero-slide-toggle';
  hero.appendChild(btn);

  var ICON_PAUSE = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

  function sync() {
    var label = playing
      ? (EN ? 'Pause the background slideshow' : '背景写真の自動切り替えを停止する')
      : (EN ? 'Play the background slideshow' : '背景写真の自動切り替えを再開する');
    btn.innerHTML = (playing ? ICON_PAUSE : ICON_PLAY) +
      '<span>' + (playing ? (EN ? 'Pause' : '停止') : (EN ? 'Play' : '再生')) + '</span>';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('aria-pressed', playing ? 'false' : 'true');
  }
  btn.addEventListener('click', function () { playing ? stop() : play(); });

  // タブが隠れているあいだは止める (通信量とバッテリーの節約)
  document.addEventListener('visibilitychange', function () {
    if (!playing) return;
    if (document.hidden) { clearTimeout(timer); clearTimeout(lead); } else { schedule(); }
  });

  // 動きを減らす設定では間隔を倍にする (opacity のみの変化なので停止まではしない)
  if (reduce && reduce.matches) INTERVAL = 14000;
  if (reduce && reduce.addEventListener) {
    reduce.addEventListener('change', function (ev) {
      INTERVAL = ev.matches ? 14000 : 7000;
      if (playing) schedule();
    });
  }
  preload(order[1]);
  play();
})();
