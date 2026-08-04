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
