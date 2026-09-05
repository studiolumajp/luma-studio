/* photo-share.js — ギャラリーの写真1枚ごとに URL と共有リンクを付ける(自作コード)
   対象: photography.html / photo-*.html(JA・EN の計12ページ)
   ページ内のライトボックス関数(openLightbox / closeLightbox / lbNav)を包んで
   location.hash を #photo=<画像ファイル名> に同期する。history.replaceState のみを使い履歴は増やさない。
   共有 UI と CSS は本ファイルから注入するため、HTML 側は script 1行で足りる。 */
(function () {
  'use strict';

  var lb = document.getElementById('lightbox');
  var wrap = document.getElementById('lb-img-wrap');
  var info = lb && lb.querySelector('.lb-info');
  if (!lb || !wrap || !info) return;
  if (typeof window.openLightbox !== 'function' || typeof window.closeLightbox !== 'function') return;

  var EN = (document.documentElement.lang || 'ja').toLowerCase().indexOf('en') === 0;
  var T = EN
    ? { head: 'Share this photo', x: 'Share on X', line: 'Send on LINE', copy: 'Copy link', done: 'Copied' }
    : { head: 'この写真を共有', x: 'X で共有', line: 'LINE で送る', copy: 'リンクをコピー', done: 'コピーしました' };

  /* ── CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '.lb-share{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:10px;}',
    '.lb-share-h{font-size:12px;color:rgba(255,255,255,.7);margin-right:2px;}',
    '.lb-share-b{display:inline-flex;align-items:center;min-height:32px;padding:6px 12px;border-radius:999px;',
    'border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;font-size:12px;font-family:inherit;',
    'line-height:1;text-decoration:none;cursor:pointer;transition:background .2s ease,border-color .2s ease;}',
    '.lb-share-b:hover,.lb-share-b:focus-visible{background:rgba(255,255,255,.16);border-color:#fff;}',
    '.lb-share-url{width:min(300px,60vw);padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.35);',
    'background:rgba(255,255,255,.1);color:#fff;font-size:12px;font-family:inherit;}',
    '.lb-share-url[hidden]{display:none;}',
    '@media(prefers-reduced-motion:reduce){.lb-share-b{transition:none;}}'
  ].join('');
  document.head.appendChild(style);

  /* ── 写真 id(ファイル名の basename)と alt の対応表 ── */
  function idOf(src) {
    if (!src) return '';
    var name = src.split('?')[0].split('#')[0].split('/').pop();
    return name.replace(/\.[a-z0-9]+$/i, '');
  }
  var ALT = {};
  [].slice.call(document.querySelectorAll('.photo-item')).forEach(function (item) {
    var img = item.querySelector('img');
    if (!img) return;
    var id = idOf(img.getAttribute('src'));
    if (!id) return;
    item.setAttribute('data-photo-id', id);
    ALT[id] = img.getAttribute('alt') || '';
  });

  /* ── 共有 URL ── */
  var canon = document.querySelector('link[rel="canonical"]');
  var base = (canon && canon.href) || (location.origin + location.pathname);
  base = base.split('#')[0];

  /* ── 共有 UI ── */
  var row = document.createElement('div');
  row.className = 'lb-share';
  row.innerHTML =
    '<span class="lb-share-h"></span>' +
    '<a class="lb-share-b lb-x" href="#" target="_blank" rel="noopener noreferrer"></a>' +
    '<a class="lb-share-b lb-line" href="#" target="_blank" rel="noopener noreferrer"></a>' +
    '<button class="lb-share-b lb-copy" type="button"></button>' +
    '<input class="lb-share-url" type="text" readonly hidden />';
  info.appendChild(row);
  var headEl = row.querySelector('.lb-share-h');
  var xEl = row.querySelector('.lb-x');
  var lineEl = row.querySelector('.lb-line');
  var copyEl = row.querySelector('.lb-copy');
  var urlEl = row.querySelector('.lb-share-url');
  headEl.textContent = T.head;
  xEl.textContent = T.x;
  lineEl.textContent = T.line;
  copyEl.textContent = T.copy;

  var currentUrl = base;

  function setHash(id) {
    try { history.replaceState(null, '', location.pathname + location.search + '#photo=' + encodeURIComponent(id)); }
    catch (e) { /* replaceState が使えない環境では hash を触らない */ }
  }
  function clearHash() {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* noop */ }
  }

  function sync() {
    var img = wrap.querySelector('img');
    if (!img) return;
    var id = idOf(img.getAttribute('src'));
    if (!id) return;
    setHash(id);
    currentUrl = base + '#photo=' + encodeURIComponent(id);
    var alt = ALT[id] || '';
    if (alt.length > 60) {
      var cut = alt.slice(0, 60);
      var sep = Math.max(cut.lastIndexOf(' / '), cut.lastIndexOf('。'), cut.lastIndexOf('、'), cut.lastIndexOf(', '));
      alt = (sep > 20 ? cut.slice(0, sep) : cut).replace(/[\s、,\/]+$/, '');
    }
    xEl.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(alt + ' ' + currentUrl);
    lineEl.href = 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(currentUrl);
    urlEl.value = currentUrl;
    urlEl.hidden = true;
    copyEl.textContent = T.copy;
  }

  copyEl.addEventListener('click', function () {
    function fallback() {
      urlEl.hidden = false;
      urlEl.value = currentUrl;
      urlEl.focus();
      urlEl.select();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentUrl).then(function () {
        copyEl.textContent = T.done;
        setTimeout(function () { copyEl.textContent = T.copy; }, 2000);
      })['catch'](fallback);
    } else {
      fallback();
    }
  });

  /* ── 既存のライトボックス関数を包む ── */
  var _open = window.openLightbox;
  var _close = window.closeLightbox;
  var _nav = window.lbNav;
  window.openLightbox = function (i) { _open(i); sync(); };
  window.closeLightbox = function () { _close(); clearHash(); };
  if (typeof _nav === 'function') window.lbNav = function (d) { _nav(d); sync(); };

  /* ── 読み込み時に #photo=<id> があればその写真を開く ── */
  var m = /(?:^|[#&])photo=([^&]+)/.exec(location.hash || '');
  if (!m) return;
  var want = decodeURIComponent(m[1]);
  var target = null;
  [].slice.call(document.querySelectorAll('.photo-item')).forEach(function (item) {
    if (!target && item.getAttribute('data-photo-id') === want) target = item;
  });
  if (!target) return;

  function restore() {
    /* html に scroll-behavior:smooth があるため、復元時だけ即時スクロールにする */
    try { target.scrollIntoView({ block: 'center', behavior: 'instant' }); } catch (e) { target.scrollIntoView(); }
    window.openLightbox(Number(target.dataset.idx));
  }
  /* ブラウザーは読み込み後に URL の断片へスクロールし直すため、load の後に実行する */
  if (document.readyState === 'complete') setTimeout(restore, 0);
  else window.addEventListener('load', function () { setTimeout(restore, 0); });
})();
