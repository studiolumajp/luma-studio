/* Cookie 同意と GA4 の読み込み (2026-10-02 GDPR 対応)
   同意モードの基本実装: 「同意する」が選ばれるまで gtag.js を読み込まない。
   gtag() のスタブは先に定義するので、nav.js や contact.html のイベント呼び出しは
   同意前でもエラーにならず、dataLayer に積まれるだけで外部へは送られない。 */
(function () {
  var GA_ID = 'G-62F20N179N';
  var KEY = 'luma_consent_v1';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  var isEn = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
  var T = isEn ? {
    text: 'We\'d like to use Google Analytics 4 cookies to see how people use this site. They load only if you agree, and the site works fully if you decline.',
    accept: 'Accept',
    decline: 'Decline',
    link: 'More about cookies',
    href: '/en/legal#cookies',
    settings: 'Cookie settings',
    label: 'Cookie consent'
  } : {
    text: '同意いただいた場合だけ、アクセス解析の Cookie (Google アナリティクス 4) を使います。拒否してもサイトはすべてお使いいただけます。',
    accept: '同意する',
    decline: '拒否する',
    link: 'Cookie の詳しい説明',
    href: '/legal#cookies',
    settings: 'Cookie 設定',
    label: 'Cookie の同意'
  };

  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.analytics ? v.analytics : null; }
    catch (e) { return null; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: state, ts: new Date().toISOString() })); }
    catch (e) {}
  }

  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function clearGACookies() {
    var host = location.hostname;
    var domains = ['', host, '.' + host];
    var parts = host.split('.');
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  var state = read();
  if (state === 'granted') loadGA();
  else if (state === 'denied') clearGACookies();

  var CSS =
    '.cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:1000;background:#FFFFFF;color:#1F2A33;border-top:1px solid #C9D3DC;box-shadow:0 -8px 24px -12px rgba(31,42,51,.25);font-family:inherit}' +
    '.cc-inner{max-width:1080px;margin:0 auto;padding:16px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 24px}' +
    '.cc-text{flex:1 1 360px;margin:0;font-size:14px;line-height:1.7}' +
    '.cc-text a{color:#1565C0;text-decoration:underline;white-space:nowrap}' +
    '.cc-actions{display:flex;gap:12px;flex:0 0 auto}' +
    '.cc-btn{min-width:112px;min-height:44px;padding:10px 20px;border-radius:999px;border:1.5px solid #1565C0;background:#FFFFFF;color:#1565C0;font:inherit;font-size:14px;font-weight:600;cursor:pointer}' +
    '.cc-btn:hover{background:#EEF2F5}' +
    '.cc-btn:focus-visible,.cc-link-btn:focus-visible{outline:3px solid #1F2A33;outline-offset:3px}' +
    'body.cc-open .line-float{display:none}' +
    '.cc-link-btn{background:none;border:0;padding:0;margin:0 0 0 16px;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}' +
    '@media (max-width:560px){.cc-actions{width:100%}.cc-btn{flex:1 1 0}}';

  function injectCSS() {
    if (document.getElementById('cc-style')) return;
    var st = document.createElement('style');
    st.id = 'cc-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  var banner = null;
  function closeBanner() {
    if (!banner) return;
    banner.remove();
    banner = null;
    document.body.classList.remove('cc-open');
    document.body.style.paddingBottom = '';
  }

  function openBanner() {
    injectCSS();
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', T.label);
    banner.innerHTML =
      '<div class="cc-inner">' +
        '<p class="cc-text">' + T.text + ' <a href="' + T.href + '">' + T.link + '</a></p>' +
        '<div class="cc-actions">' +
          '<button type="button" class="cc-btn" data-cc="granted">' + T.accept + '</button>' +
          '<button type="button" class="cc-btn" data-cc="denied">' + T.decline + '</button>' +
        '</div>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cc]');
      if (!b) return;
      var next = b.getAttribute('data-cc');
      var prev = read();
      save(next);
      closeBanner();
      if (next === 'granted') loadGA();
      else if (prev === 'granted' || loaded) {
        gtag('consent', 'update', { analytics_storage: 'denied' });
        clearGACookies();
        location.reload();
      }
    });
    document.body.appendChild(banner);
    document.body.classList.add('cc-open');
    document.body.style.paddingBottom = banner.offsetHeight + 'px';
  }
  window.lumaOpenCookieSettings = openBanner;

  function init() {
    injectCSS();
    var fb = document.querySelector('.footer-bottom, .foot-bottom');
    if (fb && !fb.querySelector('.cc-link-btn')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cc-link-btn';
      btn.textContent = T.settings;
      btn.addEventListener('click', openBanner);
      fb.appendChild(btn);
    }
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', openBanner);
    });
    if (!state) openBanner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
