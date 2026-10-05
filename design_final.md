# DESIGN.md — LUMA (Final)

LUMA | Clarity by Design (https://studio-lumadesign.com/) のデザイン仕様書。
Apple Japan のレイアウト構造 + Toyota のタイポグラフィ + **Soft Aqua カラーシステム**を統合した最終デザインシステム。

> ⚠️ **2026-04-19 更新**: LUMA メインブランドカラーを従来の Warm Brown から **Soft Aqua** に全面切替。LUMA Voice で先行採用されたカラーを、LUMA 全体の統一カラーコードとして適用します。

---

## 1. Visual Theme & Atmosphere

- デザイン方針: Apple の洗練されたミニマリズムと LUMA の温かみを融合。ゆったりとした余白、すりガラス効果、ピル型ボタンで上質さを演出しつつ、LUMA ブランドの親しみやすさを維持
- 密度: ゆったりとした余白を活かしたレイアウト。コンテンツに呼吸を持たせる
- キーワード: ミニマル、清涼感、信頼感、上質さ、余白、すりガラス
- 特徴: **Soft Aqua(清涼感のあるブルー系)を基調**とし、オレンジの CTA で温かみとアクションを促す。純粋な黒(#000000)は塗りつぶしに使用しない

---

## 2. Color Palette & Roles

### Primary(ブランドカラー — Soft Aqua)

| Token | Value | CSS変数 | 用途 |
|-------|-------|---------|------|
| H1 / Navy | `#134E6F` | `--h1`, `--brand-dark` | 大見出し、強調、ダーク面(ヘッダー/フッター) |
| H2 / Primary Blue | `#1E88E5` | `--h2`, `--brand` | 中見出し、プライマリブルー、リンク |
| H3 / Sky Blue | `#5BA9D7` | `--h3` | 小見出し、サブ装飾、グラデーション |
| Accent (CTA Orange) | `#F59E0B` | `--accent` | CTA ボタン、強調アクセント |
| CTA Hover | `#D97706` | `--cta-hover` | CTA ボタンのホバー状態 |

### Surface & Backgrounds

| Token | Value | CSS変数 | 用途 |
|-------|-------|---------|------|
| Base | `#EBF5FA` | `--base`, `--background` | ページ背景(メイン) |
| Ice White | `#F8FBFC` | `--ice-white` | ほぼ白に近いセカンダリ背景 |
| Cloud | `#EBF5FA` | `--cloud`, `--surface` | セクション背景(交互) |
| White | `#FFFFFF` | — | カード背景、コンポーネントベース面 |
| Primary Light | `#D6EBF7` | `--primary-light` | 淡いアクセント背景・ホバー tint |

### Text

| Token | Value | CSS変数 | 用途 |
|-------|-------|---------|------|
| Text Primary | `#2C3E50` | `--text`, `--main-text`, `--text-primary` | 本文テキスト、見出し |
| Text Secondary | `#7A8998` | `--text-light`, `--text-secondary` | 補足テキスト、サブタイトル |
| Text Muted / Disabled | `#B0BAC4` | `--text-muted`, `--text-disabled` | 無効状態のテキスト |
| Text on Dark | `rgba(255,255,255,0.92)` | — | 暗い背景上のテキスト |
| Text on Dark Secondary | `rgba(255,255,255,0.75)` | — | 暗い背景上の補足テキスト |

### Borders

| Token | Value | CSS変数 | 用途 |
|-------|-------|---------|------|
| Border Light | `#D7E5ED` | `--border-light` | 区切り線、カード枠 |
| Border Default | `#B8CED9` | `--border` | 入力欄の枠 |
| Border Focus | `#1E88E5` | `--h2` | フォーカスリング |

### Semantic(意味的な色)

| Token | Value | CSS変数 | 用途 |
|-------|-------|---------|------|
| Success | `#5BAD7F` | `--success` | 成功、完了、OK |
| Danger / Error | `#D47575` | `--danger`, `--error` | エラー、削除操作 |
| Warning | `#E8B75C` | `--warning` | 警告、注意喚起 |

### Overlay

| Token | Value | 用途 |
|-------|-------|------|
| Modal Overlay | `rgba(19, 78, 111, 0.55)` + `backdrop-filter: blur(6px)` | モーダル背景 |
| Nav Background | `rgba(248, 251, 252, 0.92)` + `backdrop-filter: blur(10px)` | ナビゲーション背景 |
| Nav Scrolled | `rgba(248, 251, 252, 0.98)` | スクロール時のナビ背景 |

### Gradient

- **Hero**: `linear-gradient(135deg, #EBF5FA 0%, #D6EBF7 100%)`
- **Hero Accent Overlay**: `radial-gradient(circle at 20% 20%, rgba(91,169,215,0.3) 0%, transparent 50%)`
- **Dark Panel / Profile**: `linear-gradient(135deg, #1E88E5, #134E6F)`
- **CTA Panel**: `linear-gradient(135deg, #F59E0B, #D97706)`
- **Bonus / Highlight**: `linear-gradient(135deg, #FEF3D7, #FEE9BA)`(オレンジアクセント補助)

### 禁止色

- 純粋な黒(`#000000`)の塗りつぶしは使用しない
- 冷たいグレー(青みがかったグレーの濫用)は避ける。背景は Soft Aqua 系で統一する
- 旧 LUMA ブランドカラー(Warm Brown 系: `#c4956a`, `#2d2420`, `#faf8f4`, `#e8dfd0` など)は **段階的に廃止**。新規実装では使用しない

---

## 3. Typography Rules

### 3.1 フォントスタック

```css
font-family: "Poppins", "Noto Sans JP", -apple-system, "system-ui",
  "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
```

- **ラテン文字**: Poppins(Google Fonts, OFL)
- **日本語**: Noto Sans JP(Google Fonts, OFL)
- フォールバック: -apple-system → system-ui → Hiragino Kaku Gothic ProN → Meiryo → sans-serif

> ⚠️ **2026-04-19 更新**: LUMA Voice の Poppins + Noto Sans JP を LUMA 全体のフォントスタックとして採用。旧仕様の SF Pro は廃止。

### 3.2 文字サイズ・ウェイト階層

ベースサイズ: 16px
行間: 1.5〜1.8(要素ごとに最適化)
字間: -0.01em(見出し) / 標準(本文)

| Role | Size | Weight | Line Height | 備考 |
|------|------|--------|-------------|------|
| Display (Hero) | clamp(2rem, 5vw, 3.5rem) | 700 | 1.3 | ヒーロー見出し |
| Section Title (H2) | clamp(1.5rem, 3.5vw, 2.5rem) | 600 | 1.3 | セクション見出し |
| Sub Heading (H3) | clamp(1.2rem, 2.5vw, 1.6rem) | 600 | 1.3 | サブ見出し |
| Card Heading (H4) | 1.15〜1.4rem | 600 | 1.4 | カード見出し |
| Body | 1rem (16px) | 400 | 1.7 | 本文(標準) |
| Small / Caption | 0.85〜0.9rem | 400 | 1.6 | 注釈、補足 |
| Button | 1rem | 500 | 1.2 | ボタンラベル |

### 3.3 グローバル設定

```css
body {
  font-family: 'Poppins', 'Noto Sans JP', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  font-weight: 400;
  color: #2C3E50;
  background: #EBF5FA;
}
```

### 3.4 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

---

## 4. Component Stylings

### Navigation (Header)

> ⚠️ **2026-04-19 更新**: ヘッダーを Navy 背景に変更し、WHO I AM セクションと同系のブランド統一感を持たせる。HERO(白背景)との境目を明確にし、ロゴ文字の可読性を担保する。

| Property | Value |
|----------|-------|
| Height | 44px(fixed) |
| Position | fixed, top: 0 |
| Background | `rgba(19, 78, 111, 0.96)`(Navy 96%) |
| Background (scrolled) | `rgba(19, 78, 111, 0.98)`(Navy 98%) |
| Backdrop Filter | `blur(20px) saturate(180%)` |
| Border Bottom (scrolled) | `1px solid rgba(214, 235, 247, 0.2)` |
| Padding (horizontal) | 48px(desktop) / 16px(mobile) |
| Logo Color | `#FFFFFF`(White) |
| Link Font Size | 12px |
| Link Color | `#D6EBF7`(Primary Light) |
| Link Hover Color | `#FFFFFF` |
| Lang Button Border | `rgba(255, 255, 255, 0.35)` |
| Lang Button Color | `#D6EBF7` |
| Lang Button Active/Hover | bg `#FFFFFF`, color `#134E6F`(Navy) |
| Hamburger Color | `#D6EBF7` |

### Footer

> 2026-04-19 追加: Navy 背景で LUMA ブランドを締める。ヘッダーと同系のトーンで、ページ全体に一貫した視覚的フレームを与える。

| Property | Value |
|----------|-------|
| Background | `#134E6F`(Navy / H1) |
| Padding | 56px 48px(desktop) / 40px 16px(mobile) |
| Logo Color | `#FFFFFF`(White) |
| Tagline Color | `#D6EBF7`(Primary Light) |
| Link Font Size | 12px |
| Link Color | `#D6EBF7`(Primary Light) |
| Link Hover Color | `#FFFFFF` |
| Copyright Color | `#D6EBF7`(Primary Light) |

### Hero Section

> 2026-04-19 追加: HERO は白基調で清潔感を出し、右サイドのビジュアルパネルに Soft Aqua グラデーションを配置。Navy ヘッダーとの対比でコンテンツを際立たせる。

| Property | Value |
|----------|-------|
| Background (left / content) | `#FFFFFF`(White) |
| Background (right / visual panel) | `linear-gradient(135deg, #D7E5ED 0%, #D6EBF7 40%, #FFFFFF 100%)` |
| Eyebrow Color | `#1E88E5`(H2 / Primary Blue) |
| Title Color | `#134E6F`(H1 / Navy) |
| Title `<em>` Color | `#1E88E5`(H2) |
| Subtitle Color | `#7A8998`(Text Light) |
| Description Color | `#7A8998`(Text Light) |
| Primary CTA Background | `#2C3E50`(Text Primary) |
| Primary CTA Text | `#FFFFFF` |
| Primary CTA Hover BG | `#1E88E5`(H2) |
| Outline CTA Text | `#2C3E50` |
| Outline CTA Border | `1px solid #2C3E50` |
| Outline CTA Hover | color/border `#1E88E5` |
| Hero Watermark ("LUMA" text) | `#D6EBF7`(Primary Light) |
| Hero Quick Link Border | `#B8CED9`(Border) |
| Hero Quick Link Background | `#FFFFFF` |
| Hero Quick Link Hover Color | `#1E88E5` |

### Buttons

**Primary (CTA)**

| Property | Value |
|----------|-------|
| Background | `#F59E0B` (Accent Orange) |
| Text Color | `#FFFFFF` |
| Font Size | 1rem (btn-large: 1.1rem) |
| Font Weight | 500 |
| Padding | 14px 28px (large: 18px 40px) |
| Border Radius | 12px |
| Shadow | `0 2px 8px rgba(19,78,111,0.06)` |
| Hover | background `#D97706`, `translateY(-2px)` |

**Secondary (Blue)**

| Property | Value |
|----------|-------|
| Background | `#1E88E5` (H2) |
| Text Color | `#FFFFFF` |
| Hover | background `#134E6F` (H1) |

**Outline**

| Property | Value |
|----------|-------|
| Background | transparent |
| Text Color | `#134E6F` (H1) |
| Border | 2px solid `#1E88E5` (H2) |
| Hover | background `#D6EBF7` (Primary Light), color `#134E6F` |

### Inputs

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | 1px solid `#B8CED9` |
| Border (focus) | border-color `#1E88E5`, box-shadow `0 0 0 3px rgba(30,136,229,0.15)` |
| Border Radius | 12px |
| Font Size | 1rem |
| Padding | 12px 16px |

### Cards

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` |
| Border | 1px solid `#D7E5ED` |
| Border Radius | 20px (card-lg) / 12px (card-md) |
| Padding | 32px |
| Shadow | `0 2px 8px rgba(19,78,111,0.06)` |
| Hover Shadow | `0 4px 16px rgba(19,78,111,0.10)` |
| Hover Transform | `translateY(-4px)` |

### Modal

| Property | Value |
|----------|-------|
| Border Radius | 20px |
| Max Width | 600px |
| Padding | 48px 40px |
| Shadow | `0 8px 32px rgba(19,78,111,0.12)` |

---

## 5. Layout Principles

### Content Width

| Context | Max Width | 備考 |
|---------|-----------|------|
| Hero Section | 1680px | フル幅ヒーロー |
| Content (Main) | 1200px | 通常コンテンツ領域 |
| Narrow Content | 840px | 読み物コンテンツ |
| Services Grid | 1200px | カードグリッド |
| Contact Form | 560px | フォーム幅 |

### Spacing (8px ベース)

| Token | Value | 用途 |
|-------|-------|------|
| 3XS | 2px | 最小マージン |
| 2XS | 4px | アイコンとラベルの間隔 |
| XS | 8px | コンパクトなパディング |
| S | 12px | ボタン内パディング(上下) |
| M | 16px | 標準パディング |
| L | 24px | セクション内の間隔 |
| XL | 32px | セクション間の間隔 |
| 2XL | 48px | 大セクション間の間隔 |
| 3XL | 64px | ヒーロー間隔 |
| 4XL | 80px | セクションパディング(上下) |

### Border Radius Scale

| Token | Value | 用途 |
|-------|-------|------|
| Small | 6px | バッジ、タグ |
| Medium | 12px | 入力欄、ボタン、カード(小) |
| Large | 20px | カード(大)、モーダル |
| Pill | 100px | ピル型バッジ、言語トグル |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 2px 8px rgba(19,78,111,0.06)` | カード(default) |
| 2 | `0 4px 16px rgba(19,78,111,0.10)` | カード(hover)、ドロップダウン |
| 3 | `0 8px 32px rgba(19,78,111,0.12)` | モーダル、ヒーローデモ |

- シャドウ色は Navy(`#134E6F`)ベースの半透明で、Soft Aqua トーンを維持
- Transition: 0.25s〜0.4s(インタラクティブ要素)

---

## 7. Animation & Transition

| Name | Duration | Easing | 用途 |
|------|----------|--------|------|
| fadeUp | 0.8s | ease | ヒーロー要素の段階表示 |
| fadeIn | 1.2s | ease | 画像・右パネル |
| reveal | 0.7s | ease | スクロール連動表示(IntersectionObserver) |
| card hover | 0.25s | ease | カードの浮き上がり |
| button hover | 0.25s | ease | ボタン色変化・translateY |
| nav transition | 0.2s | — | ナビ背景変化 |

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width |
|------|-------|
| Large (Desktop) | ≥ 1024px |
| Medium (Tablet) | 834px–1023px |
| Small (Mobile) | 320px–833px |

### レスポンシブ挙動

**Desktop (≥ 1024px)**
- Hero: 2カラムグリッド or センタリング
- Services: 3〜5カラムグリッド
- About / Profile: 2カラムグリッド
- ナビ: テキストリンク型、CTA ボタン表示
- コンテンツ: max-width 制約あり(1200px / 1680px)

**Tablet (834–1023px)**
- Hero: 1カラム
- Services: 2カラムグリッド
- About / Profile: 1カラムスタック

**Mobile (320–833px)**
- Hero: 1カラム、CTA 縦積み
- Services: 1カラムスタック
- ナビ: ハンバーガーメニュー

タッチターゲット: 最小 44px × 44px

---

## 9. Do's and Don'ts

### Do(推奨)

- テキスト色は `#2C3E50` (`--text`) を使い、純粋な `#000000` は避ける
- 背景は `#EBF5FA` (`--base`) を基本とし、Soft Aqua トーンを維持する
- セクション背景の交互切り替えには `--base` と `#FFFFFF`(White)を使う
- CTA は `#F59E0B` (`--accent`、オレンジ)で統一し、行動を促す
- セカンダリボタンは `#1E88E5` (`--h2`、ブルー)で色分けする
- フォントスタックは `"Poppins", "Noto Sans JP"` を先頭に統一する
- シャドウは Navy(`#134E6F`)ベースの寒色系で、Soft Aqua トーンを維持
- カード・モーダルの角丸は 12px〜20px で統一する
- 暗い背景上のテキストは `rgba(255,255,255,0.92)` を使い、純粋な `#FFFFFF` は避ける

### Don't(禁止)

- 純粋な黒(`#000000`)を塗りつぶしに使わない
- 旧 Warm Brown 系カラー(`#c4956a`, `#2d2420`, `#faf8f4` など)を新規実装で使わない
- CTA オレンジ(`#F59E0B`)の上に明度の低いテキストを置かない(コントラスト不足)
- Navy(`#134E6F`)背景上で `--text-light` (`#7A8998`)を使わない(コントラスト不足)
- フォントスタックに SF Pro を先頭に置かない(Poppins + Noto Sans JP 統一)

---

## 10. CSS Custom Properties

```css
:root {
  color-scheme: light only;

  /* Primary — Soft Aqua */
  --h1:            #134E6F;  /* Navy / 大見出し */
  --h2:            #1E88E5;  /* Primary Blue / 中見出し */
  --h3:            #5BA9D7;  /* Sky Blue / 小見出し */
  --accent:        #F59E0B;  /* CTA Orange */
  --cta-hover:     #D97706;  /* CTA Hover */

  /* Surfaces */
  --base:          #EBF5FA;  /* ページ背景(メイン) */
  --ice-white:     #F8FBFC;  /* セカンダリ背景 */
  --cloud:         #EBF5FA;  /* セクション交互背景 */
  --primary-light: #D6EBF7;  /* 淡いアクセント */
  --white:         #FFFFFF;

  /* Text */
  --main-text:     #2C3E50;
  --text:          #2C3E50;
  --text-light:    #7A8998;
  --text-muted:    #B0BAC4;

  /* Borders */
  --border-light:  #D7E5ED;
  --border:        #B8CED9;

  /* Semantic */
  --success:       #5BAD7F;
  --danger:        #D47575;
  --error:         #D47575;
  --warning:       #E8B75C;

  /* Aliases (互換・Role-based) */
  --brand:         #1E88E5;  /* = h2 */
  --brand-dark:    #134E6F;  /* = h1 */
  --text-primary:  #2C3E50;  /* = text */
  --text-secondary:#7A8998;  /* = text-light */
  --text-disabled: #B0BAC4;  /* = text-muted */
  --background:    #EBF5FA;  /* = base */
  --surface:       #EBF5FA;  /* = cloud */

  /* Shadows */
  --shadow-sm:     0 2px 8px  rgba(19, 78, 111, 0.06);
  --shadow-md:     0 4px 16px rgba(19, 78, 111, 0.10);
  --shadow-lg:     0 8px 32px rgba(19, 78, 111, 0.12);

  /* Radius */
  --radius-sm:     6px;
  --radius-md:     12px;
  --radius-lg:     20px;
  --radius-pill:   100px;

  /* Fonts */
  --font-en:       'Poppins', sans-serif;
  --font-jp:       'Noto Sans JP', sans-serif;
  --font:          'Poppins', 'Noto Sans JP', sans-serif;
}
```

---

## 11. Quick Reference

| Property | Value |
|----------|-------|
| H1 (Navy) | `#134E6F` |
| H2 (Primary Blue) | `#1E88E5` |
| H3 (Sky) | `#5BA9D7` |
| Accent (CTA Orange) | `#F59E0B` |
| CTA Hover | `#D97706` |
| Background (Base) | `#EBF5FA` |
| Background (Ice White) | `#F8FBFC` |
| Surface (Card) | `#FFFFFF` |
| Text Primary | `#2C3E50` |
| Text Secondary | `#7A8998` |
| Border | `#D7E5ED` |
| Font Stack | `"Poppins", "Noto Sans JP", sans-serif` |
| Body Size | 16px |
| Line Height | 1.7 |
| Heading Weight | 600〜700 |
| Body Weight | 400 |
| Button Radius | 12px |
| Card Radius | 20px |
| Input Radius | 12px |
| Nav Height | 68px |
| Content Max Width | 1200px |
| Hero Max Width | 1680px |
| Spacing Base | 8px |
| Breakpoint Large | ≥ 1024px |
| Breakpoint Medium | 834px–1023px |
| Breakpoint Small | 320px–833px |

---

## 12. Design Origin

このデザインシステムは以下を統合して構築されています:

| Layer | Source | 採用要素 |
|-------|--------|----------|
| **Color** | **LUMA Voice (Soft Aqua)** | Primary(Navy/Blue/Sky/Orange)、Surface、Gradient、Shadow すべて |
| **Typography** | LUMA Voice | Poppins(EN) + Noto Sans JP(JP)フォントスタック |
| **Layout & Components** | Apple Japan DESIGN.md | ナビすりガラス、ピル型バッジ、カード角丸、ブレークポイント |

---

## 13. Brand Migration History

### 2026-04-19: Warm Brown → Soft Aqua
- 旧メインカラー(Warm Brown: `#c4956a`, `#2d2420`, `#faf8f4`)を廃止
- 新メインカラー(Soft Aqua: `#134E6F`, `#1E88E5`, `#F59E0B`, `#EBF5FA`)に統一
- きっかけ: LUMA Voice 開発において清涼感・信頼感のある配色を採用し、LUMA 全体の統一カラーとして転用

### 影響範囲
- 新規開発: 本仕様書準拠で実装
- 既存サイト(`studio-lumadesign.com` 等): 段階的に再実装予定
- 全サブブランド(Voice / Frame / Path / Space / Stage / Circle): 統一カラー準拠

---

_最終更新: 2026-04-19_
_旧仕様(Warm Brown)の詳細が必要な場合は、Git 履歴にて参照してください_
