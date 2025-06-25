# 🧸 Teddy Editor

**Teddy Editor** is a lightweight and customizable WYSIWYG editor built with **React**, **TypeScript**, and **Tailwind CSS**.  
Easily integrate it into any React app and take full control over content editing behavior and toolbar visibility.

---

## ✨ Features

- ⚛️ Built with React 19+
- 🎨 Tailwind CSS styling
- 🔐 Full TypeScript support
- 🧩 Controlled component with `onChange`, `onFocus`, and `onBlur` events
- 🧰 Optional toolbar configuration
- 🚀 Easy to integrate, easy to extend

---

## 📦 Installation

```bash
npm install teddy-editor
```

---

## ⚙️ Usage

```tsx
import "teddy-editor/dist/style.css";
import { TeddyEditor } from "teddy-editor";

function App() {
  return (
    <div className="p-6">
      <TeddyEditor
        content="<p>Initial content</p>"
        onChange={(content) => console.log("Content changed:", content)}
        onBlur={(content) => console.log("Editor lost focus:", content)}
        onFocus={() => console.log("Editor focused")}
        config={{
          showTextFormat: true,
          showInlineFormat: false,
          showAlignment: true,
          showList: true,
          showInsert: true,
          showCodeView: true,
        }}
      />
    </div>
  );
}
```

---

## 🧩 Props

| Prop                  | Type                        | Description                                 |
| --------------------- | --------------------------- | ------------------------------------------- |
| `content`             | `string`                    | Initial HTML content (optional)             |
| `onChange`            | `(content: string) => void` | Callback when content changes               |
| `onBlur`              | `(content: string) => void` | Callback when editor loses focus            |
| `onFocus`             | `() => void`                | Callback when editor gains focus            |
| `config`              | `object`                    | Optional toolbar configuration              |
| ├─ `showTextFormat`   | `boolean`                   | Show bold/italic/underline menu             |
| ├─ `showInlineFormat` | `boolean`                   | Show inline format options (sub/sup/etc)    |
| ├─ `showAlignment`    | `boolean`                   | Show alignment controls (left/center/right) |
| ├─ `showList`         | `boolean`                   | Show bullet and numbered list               |
| ├─ `showInsert`       | `boolean`                   | Show insert menu (image, link, etc)         |
| └─ `showCodeView`     | `boolean`                   | Enable raw HTML/code view toggle            |

> All `config` options are optional. If not provided, all toolbar menus are shown by default.

---

## 🛠️ Development

This project uses [Vite](https://vitejs.dev), [React](https://reactjs.org), and [TypeScript](https://www.typescriptlang.org) with ESLint.

### Scripts

```bash
npm run dev         # Start dev server
npm run build       # Build the library (JS + CSS + types)
npm run build:css   # Build Tailwind CSS only
npm run lint        # Run ESLint
```

---

## 📄 License

MIT © [Yudono Putro Utomo](https://github.com/yudono)

---

> Contributions are welcome! Found an issue or want to add features? Feel free to open a pull request.
