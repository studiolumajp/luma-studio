# LUMA — Style Guide & Editing Manual

> **For Claude Code / 他のエディタ向け。** このドキュメントは `index.html` を含む LUMA サイト全体の編集ガイドラインです。デザイン整合性とSEO構造を保つため、**新規ページ追加時・既存ページ編集時は必ずこのガイドに従ってください。**

---

## 0. プロジェクト概要

| 項目 | 値 |
|---|---|
| サイト名 | LUMA (ルマ) |
| 運営者 | 浅野彰 (Sho Asano) |
| ドメイン | `https://studio-lumadesign.com/` |
| 言語 | 日本語 (ja-JP) / 英語 (en-US) |
| アーキテクチャ | 静的HTML(単一ファイル中心) + Tweaksパネル(React) |
| デプロイ | 静的ホスティング想定 |

### サービス4領域(SEOキーワードと対応)
1. **英会話レッスン** (LUMA Voice) — 横浜・東京・オンライン
2. **家族・カップル写真** (LUMA Frame) — 七五三・前撮り・カップルポートレート
3. **S.League 健康麻雀** — 東京・土曜開催
4. **英語で巡る東京ツアー** (LUMA Path) — 訪日客・実践学習

> ⚠️ **2026-05 更新**: カウンセリング (LUMA Space) とカラオケ指導 (LUMA Stage) は提供サービスから除外。`service-counselling.html` / `service-karaoke.html` および en/ 版は削除済み。

---

## 1. ファイル構成

```
/
├── index.html              ← メインランディング(全1393行)
├── tweaks-panel.jsx        ← Tweaks UI (触らないで)
├── profile.jpg             ← 浅野彰のポートレート
├── robots.txt
├── sitemap.xml
├── STYLE_GUIDE.md          ← このファイル
└── (将来) /service-*.html, /blog/*.html, /en/*
```

### 命名規則
- サービス個別ページ: `service-english.html`, `service-photo.html`, `service-tour.html`, `service-community.html`, `s-league.html`
- About ページ: `about.html` / `en/about.html`
- ブログ記事: `blog/<slug-in-english>.html`
- 英語版: `/en/<同パス>`

---

## 2. デザイントークン (CSS Variables)

すべての色・余白・影は **`:root` の CSS variables 経由で参照** してください。直接ハードコードしないこと(Apple風比較セクション `#compare` は例外として固有色を使用)。

### 2.1 ライトモード(デフォルト・Stripe/Notion風)

```css
:root {
  /* 背景 */
  --bg: #FFFFFF;
  --bg-soft: #FAFAF9;
  --bg-muted: #F4F4F2;
  --surface: #FFFFFF;

  /* ボーダー */
  --border: #E6E6E3;
  --border-strong: #D4D4D0;

  /* テキスト */
  --text: #0A0A0A;
  --text-muted: #4B5563;
  --text-soft: #6B7280;

  /* アクセント */
  --accent: #1E40AF;       /* deep blue (主) */
  --accent-soft: #EEF2FF;
  --accent-2: #F59E0B;     /* amber (副・グラデーション用) */
  --success: #047857;

  /* レイアウト */
  --radius: 10px;
  --radius-lg: 16px;
  --container: 1200px;

  /* 影 */
  --shadow-sm: 0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06);
  --shadow-md: 0 4px 12px rgba(15,23,42,0.06), 0 2px 4px rgba(15,23,42,0.04);
  --shadow-lg: 0 24px 48px -12px rgba(15,23,42,0.18);

  /* フォント */
  --font-sans: 'Inter', 'Noto Sans JP', -apple-system, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
}
```

### 2.2 ダークモード(Linear/Vercel風)

`<html data-tone="dark">` で切替。背景 `#0A0A0A` 系・アクセント `#818CF8` (indigo)。

### 2.3 エディトリアル(Airbnb風 Warm)

`<html data-tone="editorial">` で切替。背景 `#FFFEFB`・アクセント `#B8401E` (赤茶)。**現在のサイトデフォルトは `editorial`** (`TWEAK_DEFAULTS.tone = "editorial"`)。

### 2.4 密度(Density)

`<html data-density="compact|comfortable">` でパディング切替。デフォルトは `comfortable`。

---

## 3. タイポグラフィ

### 3.1 フォントファミリー
- **本文・見出し**: `Inter` + `Noto Sans JP`(日本語フォールバック)
- **ラベル・コード**: `JetBrains Mono`(数値・キーワード強調)
- **絵文字**: システムフォントに任せる(独自フォントはロードしない)

### 3.2 見出しスケール

```css
h1 { font-size: clamp(36px, 5.5vw, 64px); letter-spacing: -0.03em; }
h2 { font-size: clamp(28px, 3.6vw, 44px); letter-spacing: -0.02em; }
h3 { font-size: clamp(20px, 2vw, 26px); letter-spacing: -0.02em; }

/* 全見出し共通 */
h1, h2, h3, h4 {
  font-weight: 700;
  line-height: 1.15;
  text-wrap: pretty;
}
```

**Apple風比較セクション(`#compare`)のみ例外**:
```css
.cmp-head h2 {
  font-size: clamp(40px, 5.5vw, 64px);
  font-weight: 600;          /* 軽め */
  letter-spacing: -0.035em;  /* タイト */
}
```

### 3.3 本文
- ベース `16px` / `line-height: 1.6` / `letter-spacing: -0.005em`
- ミュートテキスト: `color: var(--text-muted)` または `var(--text-soft)`
- パラグラフ末尾改行: `text-wrap: pretty`(見出しのみ)

### 3.4 Eyebrow(セクション小見出し)

**全セクションで統一** — `class="eyebrow"`。

```html
<span class="eyebrow">サービス比較</span>
```

```css
.eyebrow {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px; font-weight: 500;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: inline-flex; align-items: center; gap: 8px;
}
.eyebrow::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
}
```

⚠️ **Apple風セクションだけ** `font-family: Inter` を別途指定しない(統一済み)。

---

## 4. レイアウトシステム

### 4.1 コンテナ
```html
<section id="..." aria-labelledby="...-heading">
  <div class="container">
    <!-- 内容 -->
  </div>
</section>
```

```css
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }
section { padding: 96px 0; }
.section-head { max-width: 720px; margin-bottom: 56px; }
```

### 4.2 グリッド原則
- **必ず CSS Grid または Flexbox + `gap`** を使う。`margin` での間隔調整は禁止。
- ベース間隔: `8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 / 96`(8の倍数)。
- レスポンシブ: `grid-template-columns: repeat(N, 1fr)` を `@media` で切替。

### 4.3 ブレークポイント
```css
@media (max-width: 980px) { /* タブレット → 2列 */ }
@media (max-width: 640px) { /* モバイル → 1列 */ }
```

---

## 5. コンポーネントカタログ

### 5.1 ボタン

```html
<a class="btn btn-primary">無料相談</a>
<a class="btn btn-secondary">詳細を見る</a>
```

| クラス | 用途 |
|---|---|
| `.btn-primary` | 主CTA(黒・反転色) |
| `.btn-secondary` | 副次アクション(枠線) |
| `.cmp-btn-primary` | Apple風比較カード内のCTA(青ピル `#0071E3`) |
| `.cmp-btn-link` | テキストリンク風 |

### 5.2 サービスグリッド(`.services-grid`)
- Stripe/Notion風 2×2 グリッド（4 サービス体制）、1pxの罫線で区切り
- 各セルは `.svc` クラスで `padding: 32px`
- ナンバリング `.svc-num`(`01 / SERVICE`)で連番

### 5.3 比較カード(`.cmp-card`) — **Apple風(変更時は要注意)**
- 角丸 `24px`、ホワイト背景
- ビジュアル領域 `height: 240px`、絵文字 `88px` を中央配置
- ホバー: `translateY(-4px)` + `box-shadow`、絵文字 `scale(1.08)`
- テーマカラー: `theme-eng / theme-photo / theme-mahjong / theme-tour`（`theme-counsel` / `theme-karaoke` は 2026-05 廃止）

```html
<a class="cmp-card theme-eng reveal" href="#contact">
  <div class="cmp-visual">
    <span class="cmp-emoji">📖</span>
    <span class="cmp-tag">English</span>
  </div>
  <div class="cmp-body">
    <h3>英会話レッスン</h3>
    <p class="cmp-pitch">3行のキャッチコピー...</p>
    <div class="cmp-meta">
      <span>東京・横浜</span><span class="cmp-meta-dot"></span><span>オンライン可</span>
    </div>
    <div class="cmp-actions">
      <span class="cmp-btn cmp-btn-primary">無料相談</span>
      <span class="cmp-btn cmp-btn-link">詳細を見る →</span>
    </div>
  </div>
</a>
```

⚠️ **`.cmp-pitch` は3行分のボリューム必須。** 短すぎるとカード高さがバラつきます。

### 5.4 FAQアコーディオン
- `.faq-item[data-open="true"]` で開閉状態
- `<button class="faq-q" onclick="toggleFaq(this)" aria-expanded="...">` で操作
- JSON-LDの `FAQPage` と必ず同期させる(下記§9参照)

### 5.5 ナビゲーション
- `nav.site-nav` は sticky + backdrop-filter
- リンク `<a class="nav-cta">` がCTA(黒ボタン)
- 言語切替 `<a class="lang-switch">JP / EN</a>`(英語版作成時に有効化)

### 5.6 Reveal アニメーション
スクロールでフェードイン。**新規セクションも必ず付与**。

```html
<div class="section-head reveal"> ... </div>
```

JSの `IntersectionObserver` が自動的に `.visible` を付与します(index.html末尾参照)。

---

## 6. 新規ページ作成テンプレート

### 6.1 サービス個別ページ(例: `service-english.html`)

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0F172A" />

  <!-- ── SEO META ── -->
  <title>英会話レッスン 横浜・東京・オンライン | LUMA Voice — 浅野彰</title>
  <meta name="description" content="オーストラリア9年の経験を持つバイリンガル講師による英会話レッスン。初心者からビジネス英語・IELTSまで、横浜・東京・オンラインで対応。無料相談30分受付中。" />
  <meta name="keywords" content="英会話 横浜,英語レッスン 東京,オンライン英会話,IELTS 対策,ビジネス英語,LUMA Voice,浅野彰" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="https://studio-lumadesign.com/service-english.html" />

  <!-- ── hreflang ── -->
  <link rel="alternate" hreflang="ja" href="https://studio-lumadesign.com/service-english.html" />
  <link rel="alternate" hreflang="en" href="https://studio-lumadesign.com/en/service-english.html" />

  <!-- ── OG/Twitter ── (index.htmlからコピーして該当部分のみ書き換え) -->

  <!-- ── Fonts(同一) ── -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <!-- ── JSON-LD: Service + BreadcrumbList ── -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "英会話レッスン (LUMA Voice)",
        "provider": {"@id": "https://studio-lumadesign.com/#business"},
        "areaServed": "東京・横浜・オンライン",
        "serviceType": "英会話レッスン",
        "url": "https://studio-lumadesign.com/service-english.html",
        "offers": {"@type": "Offer", "priceCurrency": "JPY", "description": "無料相談30分あり、料金は要相談"}
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://studio-lumadesign.com/"},
          {"@type": "ListItem", "position": 2, "name": "英会話レッスン", "item": "https://studio-lumadesign.com/service-english.html"}
        ]
      }
    ]
  }
  </script>

  <!-- ── スタイルは index.html の <style> ブロックを共有(別CSSファイル化推奨) ── -->
  <link rel="stylesheet" href="./shared.css" />
  <!-- もしくは <style>...</style> を index.html からコピー -->
</head>
<body>

<nav class="site-nav"> <!-- index.html と同一 --> </nav>

<!-- パンくず -->
<nav class="breadcrumb" aria-label="パンくずリスト">
  <ol>
    <li><a href="/">ホーム</a></li>
    <li aria-current="page">英会話レッスン</li>
  </ol>
</nav>

<!-- ヒーロー(個別ページ用) -->
<section class="hero">
  <div class="container">
    <span class="eyebrow">LUMA Voice</span>
    <h1 class="hero-title">話せる英語を、<br /><span class="accent">最短ルート</span>で。</h1>
    <p class="hero-sub">...</p>
    <div class="hero-cta-row">
      <a class="btn btn-primary" href="/#contact">無料相談</a>
      <a class="btn btn-secondary" href="/">トップへ戻る</a>
    </div>
  </div>
</section>

<!-- セクションは index.html の section-head パターンで -->

<footer> <!-- index.html と同一 --> </footer>

</body>
</html>
```

### 6.2 ブログ記事ページ
- `<article>` タグで本文をラップ
- JSON-LDに `BlogPosting` スキーマを必ず追加
- `og:type` を `article` に変更

---

## 7. SEO ルール (絶対に守る)

### 7.1 必須メタタグ
すべてのページに以下を含めること:
- `<title>` — 60文字以内・地域+サービス+ブランド名の順
- `<meta name="description">` — 120-160字
- `<link rel="canonical">` — 自身の絶対URL
- `<link rel="alternate" hreflang="ja|en|x-default">`
- `<meta property="og:type|title|description|image|url">`
- `<meta name="twitter:card" content="summary_large_image">`

### 7.2 構造化データ(JSON-LD)
各ページに以下のいずれかを最低1つ:
- トップ → `Organization + LocalBusiness + Person + WebSite + Service×4 + FAQPage + BreadcrumbList`(現状)
- サービスページ → `Service + BreadcrumbList`
- ブログ → `BlogPosting + BreadcrumbList`

`@id: "https://studio-lumadesign.com/#business"` で全ページ参照を統一すること。

### 7.3 見出し階層
- `h1` は1ページ1つだけ
- `h2` → `h3` → `h4` を飛ばさない
- セクションには必ず `aria-labelledby` で見出しを紐付け

### 7.4 画像
- `<img>` には必ず `alt`(日本語可)・`width`・`height`・`loading="lazy"`(ファーストビュー以外)
- ファイルパス: `./profile.jpg` のように相対パス

### 7.5 robots.txt / sitemap.xml
新規ページを追加したら **必ず `sitemap.xml` に追加**。

---

## 8. Tweaks パネル(編集時の注意)

`tweaks-panel.jsx` には触らない。`index.html` 末尾の `<script type="text/babel">` ブロックで設定変更。

### 8.1 デフォルト値の編集
コメントマーカー `/*EDITMODE-BEGIN*/...{...}.../*EDITMODE-END*/` の中身は**有効なJSONのみ**。

```javascript
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "editorial",
  "heroStyle": "split",
  "density": "comfortable",
  "showLogoStrip": true,
  "showCompare": true,
  "showBlog": true
}/*EDITMODE-END*/;
```

### 8.2 Tweak追加時
1. 上のJSONに新キーを追加(double-quoted)
2. `LumaTweaks()` 関数内で `useEffect` 監視を追加
3. `<TweaksPanel>` JSX内に対応するコントロールを追加

---

## 9. FAQ 同期ルール

FAQセクション(`#faq`)を編集する際は **必ず JSON-LD の `FAQPage` も同時に更新**。順序とテキストを完全一致させること。

```html
<!-- HTML -->
<div class="faq-item">
  <button class="faq-q" onclick="toggleFaq(this)">
    <span>質問テキスト</span>
  </button>
  <div class="faq-a"><p>回答テキスト</p></div>
</div>
```

```json
{"@type": "Question",
 "name": "質問テキスト",
 "acceptedAnswer": {"@type": "Answer", "text": "回答テキスト"}}
```

---

## 10. 編集時の禁則事項

| ❌ やってはいけないこと | ✅ 正しい方法 |
|---|---|
| インラインスタイルで色をハードコード | `var(--accent)` 経由 |
| `margin` で要素間隔を作る | `display: flex/grid` + `gap` |
| `<br>` で改行調整(モバイル崩れる) | CSS の `text-wrap` / レスポンシブ調整 |
| 新フォントを `<link>` で追加 | `Inter` / `Noto Sans JP` / `JetBrains Mono` のみ使用 |
| `aggregateRating`(レビュー集計) を JSON-LD に追加 | 実レビューの裏付けが無い限り入れない(Google規約) |
| `.cmp-pitch` を1行の短文に | 3行分のボリューム維持 |
| `aria-labelledby` の付け忘れ | `<section id="x" aria-labelledby="x-heading">` 必須 |
| 絵文字を画像化(SVG等で再描画) | 絵文字はそのままユニコードで(将来差し替え可能性のため) |
| 単一HTMLを1500行超に肥大化 | サービスページ等は別ファイル化、または `<style>` を共有CSSへ |

---

## 11. アクセシビリティ最低ライン

- ボタン・リンクのフォーカスリングは消さない
- コントラスト比 WCAG AA 以上(`--text` on `--bg` で 16:1 を確保済み)
- ヒット領域 ≥ 44×44px(モバイル)
- `aria-current="page"` をパンくずの最終項目に
- `aria-expanded` を FAQ ボタンに
- 画像の `alt` を空文字にしない(装飾画像のみ `alt=""`)

---

## 12. テスト前チェックリスト(編集後に必ず確認)

- [ ] `Cmd+P` プレビュー / Lighthouse で SEO スコア 95+ 維持
- [ ] モバイル(375px幅)で横スクロール発生していない
- [ ] 全テーマ(Light / Dark / Editorial)で破綻なし
- [ ] FAQ HTML と JSON-LD `FAQPage` が一致
- [ ] 新規追加リンクが `sitemap.xml` に登録済み
- [ ] 新規画像に `alt`・`width`・`height` が付いている
- [ ] コンソールエラー 0 件
- [ ] `.reveal` が新セクションに付与されている

---

## 13. ブランドボイス(コピーライティング)

- **Tone**: あたたかい・誠実・静かな自信
- **避ける表現**: 「絶対」「最強」「必ず成功」(誇大)
- **推奨**: 「一緒に」「あなたに合わせて」「最短ルートで」「丁寧に」
- **数値の使い方**: 実績がある場合のみ(オーストラリア9年・335名・98.6点 など)
- **絵文字**: ナビ・本文では極力使わない。比較カードのビジュアル領域のみ可。

---

## 14. 連絡先・お問い合わせ

- メール: `studio.luma.jp@gmail.com`
- フォーム: Formspree(`#contact` セクション内、`https://formspree.io/...`)
- Instagram: `@luma_studio_jp`
- LinkedIn: `shoasano2252`

---

**最終更新**: 2026年5月 (4 サービス体制 / About ページ追加) / **対応バージョン**: index.html

不明点は `index.html` 内の該当セクションを `grep` で検索し、既存パターンを踏襲してください。判断に迷ったら **このガイドのルールが優先** されます。
