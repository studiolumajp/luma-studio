# LUMA サイト 編集ガイド

studio-lumadesign.com(このフォルダー `lumadesign/`)を編集するときの決まりごと。新しいページを足すときも、既存のページを直すときもこのガイドに従う。

- 配色、書体、トーンの正は `/luma-brand`(`/Users/shoas/Desktop/Claude Code/.claude/skills/luma-brand/SKILL.md`)。このガイドと食い違ったら `/luma-brand` と CLAUDE.md に従う
- 事業内容、料金、サービス名の正は `/business-facts`。実績の数字は `記憶ノート/数字の記録.md` で確かめてから書く
- 最終更新 2026-10-02(配色を案9 Gallery White、英字を Urbanist に切り替えたときに全面改訂。旧版は `_backups/pre-gallery-white-docs-20261002/lumadesign/STYLE_GUIDE.md`)

---

## 0. サイトの概要

| 項目 | 内容 |
|---|---|
| ドメイン | `https://studio-lumadesign.com/` |
| 言語 | 日本語(ルート)と英語(`en/`)。日英は原則ペアで持つ |
| 作り | 静的 HTML + 共通 CSS(`shared.css`)+ 素の JavaScript。ビルド工程とフレームワークはない |
| 配信 | GitHub → Cloudflare Pages。URL は拡張子なし(`/services/english`)で配信される。フォルダーの index は `/services/` のように末尾の `/` 付き |
| ヘッダー設定 | `_headers`(セキュリティヘッダーとキャッシュ)、`_redirects`(移転したページの転送) |
| 解析 | Google Analytics 4(`G-62F20N179N`)。全ページの `<head>` に同じタグ |
| フォーム | Formspree(`https://formspree.io/f/mdawgrql`)。`_headers` の CSP で許可済み |

### 掲載しているサービス

| 名前 | ページ(日本語) | 状態 |
|---|---|---|
| LUMA Voice(英会話レッスン、3か月の英語コーチング) | `services/english.html` | 受付中 |
| LUMA Path(訪日外国人向けの英語プライベートツアー) | `services/tour.html`、英語の `en/services/tour.html` と `en/tours/`・`en/areas/` | 受付中。英語ページが主 |
| LUMA Circle(コミュニティイベント) | `services/community.html` | 受付中 |
| LUMA Craft(Web・SNS・アプリ制作) | `services/web.html`、LP は `lp/craft.html` | 受付中 |
| S.League(新橋の健康麻雀の大会) | `s-league/index.html`、大会ごとの `s-league/NN.html`、`s-league/archive.html`、`s-league/sponsor.html`(英語は `en/s-league/sponsor.html`) | 開催中 |
| LUMA Frame(撮影) | `services/photo.html`、作品の `photography/index.html` と撮影地ごとの `photography/*.html`、撮影ノートの `blog/` | 2026-09-30 で新規受付終了。作品と撮影ノートは公開を続ける |

LUMA Space、LUMA Stage、LUMA Compass は現行のサービスではない。古い資料に出てきても、ページやリンクを足さない。

---

## 1. ファイル構成

```
lumadesign/
├── index.html            トップ(home.css も読む)
├── about.html            About me
├── services/             サービス一覧 (index.html) とサービスごとのページ (english, photo, tour, community, web)
├── s-league/             S.League のトップ (index.html)、大会ごと (23.html など)、戦績 (archive.html)、協賛 (sponsor.html)
├── photography/          作品ギャラリー (index.html) と撮影地ごとのページ (atami.html など)
├── contact.html / contact-en.html / legal.html / 404.html
├── tour-en.html          旧ページ(扱いは未決定。リンクを増やさない)
├── blog/                 撮影ノート(記事)
├── news/                 ニュース。一覧の元データは news/news.json、SNS 用の下書きは news/_sns/
├── lp/                   links.html(Instagram 用のリンク集、noindex)、craft.html(LUMA Craft の LP)
├── en/                   英語版。en/tours/ と en/areas/ は LUMA Path の行き先ごとのページ
├── shared.css            全ページ共通の CSS
├── home.css              トップ(日英)専用の CSS
├── nav.js                ナビのハンバーガー開閉とスクロール時の影
├── article-lightbox.js   記事の写真の拡大表示
├── photo-share.js        写真ページの共有ボタン
├── fonts/                Urbanist(urbanist-400〜800.woff2)と OFL.txt
├── images/               画像。元データは images/_originals/
├── sitemap.xml           sitemap-pages.xml と sitemap-images.xml の目次
├── robots.txt / CNAME / _headers / _redirects
├── design-lab/           試作。本番のリンクから参照しない
└── _backups/             作業前のバックアップ。編集しない
```

### 名前の付け方
- ファイル名は英小文字とハイフン(`services/english.html`、`blog/haneda-at-night.html`)。フォルダーの中のファイルには、フォルダー名を付けない(`services/tour.html`。2026-10-05 Sho 決定)
- 英語版は `en/` の下に同じ構成で置く(`en/services/tour.html`)。例外は `contact-en.html`(ルート)
- 大会ページは `s-league/` + 回の番号(`s-league/26.html`)。作るときは `/event-page` を使う

---

## 2. 配色(案9 Gallery White)

色はすべて `shared.css` の `:root` の変数で指定する。HTML や `<style>` に色コードを直接書かない。

```css
:root {
  --bg: #FFFFFF;            /* 白地 */
  --bg-soft: #F6F8FA;       /* 面(カードの淡い背景) */
  --bg-muted: #EEF2F5;      /* 淡い面(チップ、画像の読み込み中) */
  --surface: #FFFFFF;       /* カード。白地の上では --border で区切る */
  --border: #C9D3DC;        /* 区切り線 */
  --border-strong: #7A8894; /* 入力欄の枠(白地 3.64:1) */
  --text: #1F2A33;          /* 本文 */
  --text-muted: #56626D;    /* 補足(白地 6.24:1) */
  --text-soft: #56626D;
  --accent: #1565C0;        /* リンク(白地 5.75:1) */
  --accent-soft: #EEF2F5;
  --accent-2: #1565C0;      /* CTA。文字は白 */
  --cta-hover: #2342B5;     /* CTA のホバー(白文字 8.34:1) */
  --navy: #1F2A33;          /* 見出しと濃い面(フッター、反転セクション) */
  --sky: #C9D3DC;           /* 装飾 */
  --accent-2-light: #8EC5FF;/* 濃い面と写真の暗幕の上の強調(#1F2A33 上 8.06:1) */
  --success: #047857;
}
```

- 影と写真の暗幕は `rgba(31, 42, 51, a)`(= `#1F2A33`)で作る。黒 `#000000` の塗りつぶしは使わない
- 濃い面や写真の上で強調するときは `--accent-2-light` を使う。`--accent`(`#1565C0`)は濃い面の上では読めない
- 意味を持つ色は案9 の外でも使ってよい。成功の緑 `#047857`、エラーの赤(`#C0392B`、`#DC2626`)、LINE ボタンの緑 `#06803A`、S.League 24(4周年記念)の金色、戦績表の1位の金色
- `lp/craft.html` と `en/lp/craft.html` だけは専用の配色と IBM Plex のまま。`shared.css` の変数を当てはめない
- 色を足すときは、白地 4.5:1 以上(文字)、3:1 以上(枠線とアイコン)を `LUMA/marketing/site-redesign-2026-10-01/tools/contrast.py` で測る

---

## 3. 文字

### 3.1 書体
- 英字は Urbanist、日本語は Noto Sans JP。指定は `var(--font-sans)`(本文と見出し)か `var(--font-label)`(ラベルと数字)。書体名を直接書かない
- Urbanist は `fonts/urbanist-400〜800.woff2` を `'Urbanist LUMA'` として `shared.css` 冒頭の `@font-face` で読む。CSS の太さ 400 / 500 / 600 / 700 / 800 には、Noto Sans JP の付属欧文と縦線がそろう Urbanist 550 / 650 / 750 / 850 / 900 が出る。大きさは size-adjust 104%
- Noto Sans JP は Google Fonts から 400 / 500 / 700 を読む。ほかの書体を `<link>` で足さない
- 書体を変えたときは、全ページの `shared.css?v=` の版番号も上げる(訪問者の端末に古い CSS が残るため)

### 3.2 大きさと行間(`shared.css` の値)

| 要素 | 指定 |
|---|---|
| 本文 | 16px、行間 1.7 |
| h1 | `clamp(36px, 5.5vw, 64px)`、字間 -0.03em |
| h2 | `clamp(26px, 3.4vw, 42px)` |
| h3 | `clamp(20px, 2vw, 26px)` |
| h1〜h4 共通 | 太さ 700、行間 1.15、字間 -0.02em。h1 と h2 は `--navy`、h3 と h4 は `--text` |
| セクション冒頭の説明 | `.section-head p` 17px、`--text-muted` |
| eyebrow(見出しの上の小さなラベル) | `clamp(12px, 1vw, 14px)`、太さ 600、大文字、字間 0.10em、`--accent`。固定の 12px に戻さない |
| パンくず | eyebrow と同じ `clamp(12px, 1vw, 14px)` |

### 3.3 日本語の折り返し
- 見出しとボタンは `word-break: auto-phrase` と `text-wrap: balance`、本文は `text-wrap: pretty` で文節ごとに折り返す(`shared.css` で指定済み)
- 切れてほしくない語は `<span class="nb">` で囲む。スマホだけ改行したい位置には `<br class="sp">` を使う
- 改行の位置合わせに素の `<br>` を使わない。`overflow-wrap: anywhere` も使わない(語の途中で切れる)

### 3.4 書き方の決まり
- 記号、括弧、英字、数字はすべて半角。日本語の句読点(、。)と「」はそのまま。丸数字は使ってよい
- 本文、見出し、ボタンに絵文字を使わない。アイコンは Lucide の線画を `<svg class="i">` で入れる(`shared.css` 冒頭にライセンス表記あり)
- 日本語の本文は `/japanese-writing`、英語の本文は `/english-writing` に従う。お客様が読む文章はこの2つの 0章の手順(書き手の Agent と校閲の Agent)で作る
- S.League の文章では、賭博、射幸性、アルコールを連想させる表現を使わない(CLAUDE.md 2章)

---

## 4. レイアウト

- コンテナは `.container`(最大幅 1200px、左右 24px)。セクションは `section { padding: 104px 0; }`、見出しのまとまりは `.section-head`(最大幅 720px)
- 並べるときは Grid か Flexbox の `gap` で間隔を作る。`margin` で要素の間隔を作らない
- 主なブレークポイントは 980 / 900 / 860 / 768 / 640 / 560px。新しく作るときは 768px と 640px に合わせる
- 375px(スマホ)、768px(タブレット)、1280px(PC)で、横のはみ出しと文字の重なりが0件であること。文字の重なりが1件でもあれば不合格(`/luma-brand` 5章)
- ページ固有の調整は `<style id="page-overrides">` に書き、`shared.css` の変数を上書きしない。3ページ以上で同じ指定が要るときは `shared.css` に移す

---

## 5. 部品

### 5.1 ナビゲーション
- `nav.site-nav` は上に固定され、スクロールすると `nav.js` が `.is-scrolled` を付けて影を出す
- スマホではハンバーガーで開閉する(`nav.js`、全ページで `<script src="./nav.js?v=…" defer>`)
- 項目はトップと同じ並び(サービスのドロップダウン、撮影ノート、ニュース、About me、FAQ、EN、無料相談)。ナビを変えるときは全ページを列挙して同時に直す

### 5.2 パンくず
- `<nav class="breadcrumb" aria-label="パンくずリスト"><ol>…</ol></nav>`。最後の項目に `aria-current="page"`
- JSON-LD の `BreadcrumbList` と項目をそろえる

### 5.3 ヒーロー
- 写真のヒーローは `.hero.hero--photo`。暗幕(`--scrim-1〜4`)と白い文字、強調の色(`--accent-2-light`)は `shared.css` で共通化している。ページ側で文字色を書き直さない
- 写真を入れ替えるヒーローは HERO SLIDESHOW(停止ボタン付き、`prefers-reduced-motion` で止まる)

### 5.4 ボタン

| クラス | 用途 |
|---|---|
| `.btn.btn-primary` | 主な CTA。青 `#1565C0` に白文字 |
| `.btn.btn-secondary` | 副次の操作。白地に枠線。写真の上では透明に白枠 |
| `.btn.btn-line` | LINE での相談(淡い面に濃い文字、ホバーで青) |
| `.line-float` | 画面右下に固定の LINE 相談ボタン(全ページ共通) |

CTA は1つの画面に主ボタン1つを基本にする。オレンジなど青以外の差し色を足さない。

### 5.5 カードとセクション
- カードは `--surface` + `--border` + `--radius-lg`(18px)。影は `--shadow-sm` / `--shadow-md`
- 濃い面のセクションは `.section-invert`(背景 `--navy`、リンクと強調は `--accent-2-light`)
- サービス一覧のカードは `.cmp-card`(`services/index.html` など)。説明文 `.cmp-pitch` は高さがそろうよう3行程度にする

### 5.6 FAQ
- `.faq-item` の中に `<button class="faq-q" onclick="toggleFaq(this)" aria-expanded="…">` と `.faq-a`
- 画面の FAQ と JSON-LD の `FAQPage` は、質問と回答の文面と順番を完全に一致させる(Google の指針)

### 5.7 ニュース
- 記事は `news/<slug>.html`。一覧(`news/index.html`)、トップの最新3件、前後の記事のリンク、`news/news.json`、サイトマップを同時に更新する
- 分類チップ(`.nw-chip`)は白文字か濃い文字とのコントラストが 4.5:1 以上の色にする

### 5.8 表示アニメーション
- `.reveal` を付けた要素はスクロールで表示される。JavaScript が動かない環境と `prefers-reduced-motion` では最初から表示する指定が `shared.css` にある

---

## 6. 新しいページの雛形

`<head>` は既存の同じ種類のページ(サービスなら `services/english.html`、記事なら `blog/haneda-at-night.html`)をコピーし、次の順番を守る。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#1F2A33" />
<meta name="color-scheme" content="light only" />
<title>サービス名 地域 | LUMA</title>
<meta name="description" content="…" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="https://studio-lumadesign.com/<拡張子なしのパス>" />
<link rel="alternate" hreflang="ja" href="https://studio-lumadesign.com/<パス>" />
<link rel="alternate" hreflang="en" href="https://studio-lumadesign.com/en/<パス>" />
<link rel="alternate" hreflang="x-default" href="https://studio-lumadesign.com/<パス>" />
<!-- Open Graph と Twitter Card(og:image は 1200×630) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/fonts/urbanist-400.woff2" as="font" type="font/woff2" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
<script type="application/ld+json">{ … }</script>
<!-- Google Analytics(既存ページと同じ) -->
<link rel="stylesheet" href="./shared.css?v=gallery1" />
<style id="page-overrides"> /* このページだけの調整 */ </style>
</head>
<body>
<a class="skip-link" href="#home">メインコンテンツへスキップ</a>
<nav class="site-nav">…(既存ページと同じ)…</nav>
<nav class="breadcrumb" aria-label="パンくずリスト">…</nav>
<header class="hero hero--photo" id="home" tabindex="-1">…</header>
<!-- 以降のセクション。<section id="x" aria-labelledby="x-heading"> で見出しと結ぶ -->
<footer>…(既存ページと同じ)…</footer>
<script src="./nav.js?v=aqua30" defer></script>
</body>
</html>
```

- サブフォルダーのページは `../shared.css`、`../nav.js` のように相対パスを合わせる。Urbanist の preload は `/fonts/…` の絶対パスのまま
- 英語版は `lang="en"`、canonical と hreflang を英語のパスにする

---

## 7. SEO

### 7.1 各ページに必ず入れるもの
- `<title>`(60字以内。内容 + 地域 + ブランド名)と `<meta name="description">`
- `canonical`(拡張子なしの絶対 URL)と `hreflang`(ja / en / x-default)
- Open Graph(`og:type`、`og:url`、`og:title`、`og:description`、`og:image`)と `twitter:card`(`summary_large_image`)

### 7.2 構造化データ(JSON-LD)

| ページ | 型 |
|---|---|
| トップ | `LocalBusiness` + `ProfessionalService`、`Person`、`WebSite`、`Service`、`FAQPage`、`BreadcrumbList` |
| サービス | `Service`(または `ProfessionalService`)+ `BreadcrumbList` |
| S.League の大会 | `Event` + `BreadcrumbList` |
| 撮影ノート | `Article` + `BreadcrumbList`(写真は `ImageObject`) |
| ニュース | `NewsArticle` + `BreadcrumbList` |

- 事業者は `"@id": "https://studio-lumadesign.com/#business"`、代表者は `#representative` で全ページから参照する
- 実際のレビューがない限り `aggregateRating` を入れない

### 7.3 見出しと画像
- `h1` は1ページに1つ。`h2` → `h3` → `h4` の順を飛ばさない
- `<img>` には `alt`、`width`、`height` を付け、ファーストビュー以外は `loading="lazy"`。装飾だけの画像は `alt=""`
- 写真は webp を基本にし、元データは `images/_originals/` に置く

### 7.4 サイトマップ
- ページを足したら `sitemap-pages.xml` に、写真を足したら `sitemap-images.xml` に追記する。noindex のページ(`lp/links.html`)は入れない

---

## 8. アクセシビリティ

- コントラストは文字 4.5:1 以上、枠線とアイコン 3:1 以上(WCAG AA)
- フォーカスの枠を消さない。スキップリンク(`.skip-link`、飛び先はヒーローの `<header id="home" tabindex="-1">`)を置く。news/ の記事、404、lp/ にはまだない
- タップできる範囲は 44×44px 以上
- 動きは `prefers-reduced-motion: reduce` で止める
- 開閉する部品には `aria-expanded`、パンくずの最後に `aria-current="page"`

---

## 9. やってはいけないこと

| してはいけないこと | 代わりにすること |
|---|---|
| 色コードを HTML や `<style>` に直接書く | `var(--accent)` などの変数を使う |
| 旧配色(Warm Brown、旧 Vivroom)と黒の塗りつぶしを使う | 案9 の変数を使う |
| 書体名を直接書く、書体を `<link>` で足す | `var(--font-sans)` / `var(--font-label)` |
| `margin` で要素の間隔を作る | Grid か Flexbox の `gap` |
| 素の `<br>` で改行を合わせる | `.nb`、`<br class="sp">`、`text-wrap` |
| 絵文字を本文、見出し、ボタンに使う | Lucide の線画アイコン |
| 一部のページだけ共通部分を直す | `grep` で全ページを列挙してから同時に直す |
| 日本語だけ、英語だけ文言を変える | 日英を同時に直す |
| 根拠のない数字や実績を書く | `記憶ノート/数字の記録.md` と `/business-facts` で確かめる |
| 受付を終えたサービス(Frame の撮影)や中止したサービスへの申し込み導線を足す | 現行の4サービスと S.League だけを案内する |

---

## 10. 公開前の確認

- [ ] `/site-qa` を実行する(旧カラー、黒の塗りつぶし、リンク切れ、全角、viewport)。拡張子なしのリンクはリンク切れとして数えられるが、Cloudflare Pages では開ける
- [ ] 375 / 768 / 1280px で、横のはみ出しと文字の重なりが0件
- [ ] コンソールのエラーが0件
- [ ] FAQ の画面と JSON-LD が一致している
- [ ] 足したページと写真がサイトマップに入っている
- [ ] CSS を変えたときは `shared.css?v=` / `home.css?v=` の版番号を上げた
- [ ] git push とデプロイは `/deploy-check` の手順で Sho に確認してから行う

---

## 11. 連絡先とアカウント(サイトに載せているもの)

| 種類 | 内容 |
|---|---|
| メール | `studio.luma.jp@gmail.com` |
| フォーム | Formspree `https://formspree.io/f/mdawgrql`(`contact.html`) |
| LINE | `https://lin.ee/YetEeTz` |
| Instagram | `@luma_frame.jp`(作品と撮影ノート) |
| X | `@s_league_Japan`(S.League) |

アカウント名と事業の記載を変えるときは `/business-facts` を先に直す。
