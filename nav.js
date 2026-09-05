/* ============================================================
   nav.js — モバイル用ハンバーガーメニュー開閉
   全14ページ共通で読み込む単一ロジック（二重管理を避けるため）。
   依存ライブラリなし・vanilla JS・<script defer> で読み込む想定。
   ============================================================ */
(function () {
  'use strict';

  // 1ページに1つのナビを想定。要素が無ければ何もしない（防御的）。
  var nav = document.querySelector('nav.site-nav');
  if (!nav) return;

  // ── スクロール検知 (案4 / 2026-08-06) ──
  // ヘッダーの背景色は常時固定 (Sho指示)。スクロール時に付く .is-scrolled は
  // 「浮いている」ことを示す影の有無だけに使う。
  // 見た目の切替は shared.css 側。ここでは class の付け外しのみ。
  // ハンバーガー処理より前に登録するので、以降の early return の影響を受けない。
  var syncScrolled = function () {
    nav.classList.toggle('is-scrolled', (window.pageYOffset || document.documentElement.scrollTop) > 8);
  };
  syncScrolled();
  window.addEventListener('scroll', syncScrolled, { passive: true });

  var toggle = nav.querySelector('.nav-toggle');
  var links = nav.querySelector('.nav-links');
  if (!toggle || !links) return;

  // aria-controls の参照先 id を保証（無ければ付与）
  if (!links.id) links.id = 'primary-nav';
  toggle.setAttribute('aria-controls', links.id);
  toggle.setAttribute('aria-expanded', 'false');

  // ── バー内の .lang-switch をパネル内へ複製 ──
  // shared.css は ≤960px でバー内の .lang-switch を隠すため(横揺れ防止)、
  // そのままだとモバイルから言語を切り替えられない。パネル末尾に複製を足し、
  // CSS 側で ≤960px のときだけ表示する。複製なのでデスクトップの見た目は不変。
  Array.prototype.forEach.call(nav.querySelectorAll('.lang-switch'), function (src) {
    var li = document.createElement('li');
    li.className = 'nav-lang-item';
    var clone = src.cloneNode(true);
    clone.classList.remove('lang-switch'); // パネル内リンクの標準スタイルを当てる
    clone.removeAttribute('id');
    li.appendChild(clone);
    links.appendChild(li);
  });

  function isOpen() {
    return nav.classList.contains('nav-open');
  }

  function open() {
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function close() {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    isOpen() ? close() : open();
  }

  // ボタンクリックで開閉
  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
  });

  // パネル内リンクをタップしたら閉じる
  // （サブメニューを開く「サービス」見出しリンクは閉じない＝下層を見せる）
  links.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.classList.contains('dropdown-toggle')) return;
    close();
  });

  // Esc キーで閉じ、フォーカスをボタンへ戻す（アクセシビリティ）
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      close();
      toggle.focus();
    }
  });

  // メニュー外をタップしたら閉じる
  document.addEventListener('click', function (e) {
    if (isOpen() && !nav.contains(e.target)) close();
  });

  // デスクトップ幅に戻ったら状態をリセット（パネルの開きっぱなし防止）
  var mq = window.matchMedia('(min-width: 961px)');
  function handleMq(e) {
    if (e.matches) close();
  }
  if (mq.addEventListener) {
    mq.addEventListener('change', handleMq);
  } else if (mq.addListener) {
    mq.addListener(handleMq); // 古いブラウザ向けフォールバック
  }
})();

/* ══════════════════════════════════════════════════════════════
   HERO 背景動画の遅延読み込み (2026-09-05 / 工程C)
   768px 未満では poster の静止画だけを表示し、動画 (webm 1.4MB) を読まない。
   prefers-reduced-motion のときも読まない。
   HTML 側は <video preload="none" data-src-webm data-src-mp4> で source を持たない。
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var vids = [].slice.call(document.querySelectorAll('video.hero-video[data-src-webm]'));
  if (!vids.length) return;

  var wide = window.matchMedia && window.matchMedia('(min-width: 768px)');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!wide || !wide.matches) return;
  if (reduce && reduce.matches) return;

  vids.forEach(function (v) {
    if (v.querySelector('source')) return;
    [['data-src-webm', 'video/webm'], ['data-src-mp4', 'video/mp4']].forEach(function (pair) {
      var url = v.getAttribute(pair[0]);
      if (!url) return;
      var s = document.createElement('source');
      s.src = url; s.type = pair[1];
      v.appendChild(s);
    });
    v.muted = true;          // 自動再生の条件 (ブラウザの仕様)
    v.setAttribute('preload', 'auto');
    v.load();
    var p = v.play();
    if (p && typeof p.catch === 'function') p.catch(function () { /* 自動再生拒否時は poster のまま */ });
  });
})();

/* ══════════════════════════════════════════════════════════════
   GA4 カスタムイベント (2026-09-05 / 工程C)
   LINE ボタンと mailto: のクリックを計測する。
   gtag スニペットが無いページでもエラーにならないよう typeof で守る。
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (!document.addEventListener || !Element.prototype.closest) return;

  document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function') return;
    var t = e.target;
    if (!t || typeof t.closest !== 'function') return;

    var line = t.closest('a[href*="lin.ee"]');
    if (line) {
      gtag('event', 'click_line', { link_url: line.href, location: document.title });
      return;
    }
    var mail = t.closest('a[href^="mailto:"]');
    if (mail) {
      gtag('event', 'click_email', { link_url: mail.href });
    }
  });
})();
