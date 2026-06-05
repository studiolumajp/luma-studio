# LUMA Warm Brown Palette — Archive

> ⚠️ **2026-04-19 廃止**
> LUMA ブランドカラーは **Warm Brown 系 → Soft Aqua 系** へ全面切替されました。
> このファイルは旧パレットの記録（アーカイブ）です。新規実装には使用しないでください。
> 新ブランドガイド: [CLAUDE.md](../CLAUDE.md) セクション 4-1 を参照。

---

## 1. 旧カラーパレット（Warm Brown）

| 役割 | カラーコード | CSS変数 | 旧用途 |
|---|---|---|---|
| Cream | `#faf8f4` | `--cream` / `--background` | ページ背景メイン |
| Warm White | `#f5f1eb` | `--warm-white` / `--surface` | セカンダリ背景 |
| Beige | `#e8dfd0` | `--beige` / `--border` / `--border-light` | 区切り線・カード枠 |
| Sand | `#d4c4ad` | `--sand` | 淡いアクセント |
| Taupe | `#b8a898` | `--taupe` / `--text-disabled` | 補足テキスト |
| Brown | `#8c7460` | `--brown` / `--brand-dark` | 濃いブランドカラー |
| Dark | `#2d2420` | `--dark` | ダーク面・ダーク背景 |
| Accent（Warm Ochre） | `#c4956a` | `--accent` / `--brand` | CTA・リンク・強調アクセント |
| Accent Light | `#e8c9a8` | `--accent-light` | 淡アクセント |
| Text | `#3d3028` | `--text` / `--text-primary` | 本文テキスト |
| Text Light | `#7a6858` | `--text-light` / `--text-secondary` | 補足テキスト |
| Success | `#5a8a6a` | `--success` | 成功色 |
| Danger | `#b54a3a` | `--danger` | エラー色 |
| Warning | `#c49840` | `--warning` | 警告色 |

### その他ハードコード値

| 用途 | カラーコード |
|---|---|
| ロゴテキスト（hero・footer） | `#EDCAA2` |
| Story セクション背景 | `#8e5f45` |
| Footer ダーク背景（印刷モード） | `#1a1208` |
| ダークモード body 文字色 | `#3d2e22` |

---

## 2. 旧 `:root` 定義（参考）

```css
:root {
  color-scheme: light only;
  /* Brand Colors */
  --cream: #faf8f4;
  --warm-white: #f5f1eb;
  --beige: #e8dfd0;
  --sand: #d4c4ad;
  --taupe: #b8a898;
  --brown: #8c7460;
  --dark: #2d2420;
  --accent: #c4956a;
  --accent-light: #e8c9a8;
  --text: #3d3028;
  --text-light: #7a6858;
  --success: #5a8a6a;
  --danger: #b54a3a;
  --warning: #c49840;
  /* Semantic Aliases */
  --brand: #c4956a;
  --brand-dark: #8c7460;
  --text-primary: #3d3028;
  --text-secondary: #7a6858;
  --text-disabled: #b8a898;
  --border: #e8dfd0;
  --border-light: #e8dfd0;
  --background: #faf8f4;
  --surface: #f5f1eb;
}
```

---

## 3. トーン＆スタイル（旧）

- ウォームでナチュラル、やわらかな印象
- 高級感のある茶系基調
- CTA は Warm Ochre（`#c4956a`）で温かみを演出

---

## 4. 廃止の背景

2026-04-19、LUMA Voice で先行採用されていた **Soft Aqua** 配色を
LUMA 全体の統一ブランドカラーとして採用。
Warm Brown 系は新規実装では使用せず、段階的に置換済み。
