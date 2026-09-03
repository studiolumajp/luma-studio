/* article-lightbox.js — 撮影ノート(blog/)の本文写真を拡大表示する
   photo-*.html のライトボックスと同じ挙動:
   クリックで拡大 / ← → で移動 / Esc で閉じる / 背景クリックで閉じる / フォーカストラップ
   対象は .art 内の figure img のみ。CSS も本ファイルから注入するため HTML 側は script 1行で足りる。 */
(function () {
  'use strict';

  var imgs = [].slice.call(document.querySelectorAll('.art figure img'));
  if (!imgs.length) return;

  var EN = (document.documentElement.lang || 'ja').toLowerCase().indexOf('en') === 0;
  var T = EN
    ? { open: 'View larger', close: 'Close', prev: 'Previous', next: 'Next', dialog: 'Enlarged photo' }
    : { open: 'を拡大表示', close: '閉じる', prev: '前へ', next: '次へ', dialog: '写真の拡大表示' };

  /* ── CSS ── */
  var css = [
    '.art figure img{cursor:zoom-in;transition:opacity .2s ease;}',
    '.art figure img:hover{opacity:.88;}',
    '.art figure img:focus-visible{outline:2px solid var(--accent,#1E88E5);outline-offset:3px;}',
    '.alb{display:none;position:fixed;inset:0;background:rgba(10,10,10,.94);z-index:1000;align-items:center;justify-content:center;padding:24px;}',
    '.alb.open{display:flex;}',
    '.alb-inner{position:relative;max-width:1200px;max-height:100%;width:100%;display:flex;flex-direction:column;align-items:center;gap:16px;}',
    '.alb-img-wrap{width:100%;max-height:78vh;display:flex;justify-content:center;}',
    '.alb-img{max-width:100%;max-height:78vh;width:auto;height:auto;object-fit:contain;border-radius:var(--radius,8px);}',
    '.alb-info{color:#fff;text-align:center;font-family:var(--font-sans,sans-serif);display:flex;flex-direction:column;gap:4px;}',
    '.alb-caption{font-size:16px;font-weight:600;}',
    '.alb-counter{font-family:var(--font-mono,monospace);font-size:12px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.08em;}',
    '.alb-btn{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:18px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease;}',
    '.alb-btn:hover,.alb-btn:focus-visible{background:rgba(255,255,255,.22);}',
    '.alb-prev{left:-8px;}.alb-next{right:-8px;}',
    '.alb-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:18px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease;}',
    '.alb-close:hover,.alb-close:focus-visible{background:rgba(255,255,255,.22);}',
    '@media(max-width:640px){.alb{padding:12px;}.alb-prev{left:2px;}.alb-next{right:2px;}.alb-btn{width:38px;height:38px;}.alb-close{top:12px;right:12px;width:38px;height:38px;}}',
    '@media(prefers-reduced-motion:reduce){.art figure img,.alb-btn,.alb-close{transition:none;}}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── 写真データ ── */
  var PHOTOS = imgs.map(function (img) {
    var alt = img.getAttribute('alt') || '';
    return { src: img.getAttribute('src'), alt: alt, cap: alt.split(' — ')[0] };
  });

  /* ── DOM ── */
  var box = document.createElement('div');
  box.className = 'alb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', T.dialog);
  box.innerHTML =
    '<button class="alb-close" type="button" aria-label="' + T.close + '">✕</button>' +
    '<button class="alb-btn alb-prev" type="button" aria-label="' + T.prev + '">←</button>' +
    '<button class="alb-btn alb-next" type="button" aria-label="' + T.next + '">→</button>' +
    '<div class="alb-inner">' +
      '<div class="alb-img-wrap"></div>' +
      '<div class="alb-info"><div class="alb-caption"></div><div class="alb-counter"></div></div>' +
    '</div>';
  document.body.appendChild(box);

  var wrap = box.querySelector('.alb-img-wrap');
  var capEl = box.querySelector('.alb-caption');
  var cntEl = box.querySelector('.alb-counter');
  var closeBtn = box.querySelector('.alb-close');

  var index = 0;
  var trigger = null;

  function render() {
    var p = PHOTOS[index];
    var im = document.createElement('img');
    im.className = 'alb-img';
    im.src = p.src;
    im.alt = p.alt;
    wrap.innerHTML = '';
    wrap.appendChild(im);
    capEl.textContent = p.cap;
    cntEl.textContent = (index + 1) + ' / ' + PHOTOS.length;
  }

  function open(i) {
    trigger = document.activeElement; // 復帰先を保持
    index = i;
    render();
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
    if (trigger && typeof trigger.focus === 'function') trigger.focus();
  }

  function nav(dir) {
    index = (index + dir + PHOTOS.length) % PHOTOS.length;
    render();
  }

  /* ── サムネイル側 ── */
  imgs.forEach(function (img, i) {
    var name = PHOTOS[i].cap;
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', EN ? T.open + ': ' + name : name + T.open);
    img.addEventListener('click', function () { open(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  /* ── 操作 ── */
  closeBtn.addEventListener('click', close);
  box.querySelector('.alb-prev').addEventListener('click', function () { nav(-1); });
  box.querySelector('.alb-next').addEventListener('click', function () { nav(1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nav(1);
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'Escape') close();
    // フォーカストラップ: Tab はモーダル内のボタン間だけを巡回
    if (e.key === 'Tab') {
      var f = [].slice.call(box.querySelectorAll('button')).filter(function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
