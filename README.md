# makeitwhatyouwant

A dynamic website generator that creates unique, interactive HTML pages on-demand using AI.  
Every URL path generates a completely different experience — making each visit unique.

---

## 🚀 Features

- **Dynamic Content Generation**  
  Every URL path generates a unique webpage using AI

- **Client-Side Only**  
  Pure HTML/CSS/JS — no backend required

- **Modern UI**  
  - Sleek glass-effect toolbar  
  - Smooth animations and transitions  
  - Responsive design  
  - Dark mode by default

- **Toolbar Tools**  
  - Hard Reload – regenerate entirely new content  
  - Soft Reload – refresh without API call  
  - Random – visit a surprise path  
  - Download HTML – save the current page  
  - Share on Twitter – spread your creations  
  - History – track your path visits  
  - Social Links – connect with the dev

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)  
- **Styling**: Tailwind CSS v4  
- **Animations**: Framer Motion  
- **AI**: Google Gemini 1.5 Flash  
- **Images**: Unsplash API integration  

---

## 📦 Getting Started

```bash
git clone https://github.com/Doris-Lam/makeitwhatyouwant.git
cd makeitwhatyouwant
npm install
```

Create a `.env.local` file in the root directory with your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

🔑 **Get your free API keys from:**
- [Google AI Studio](https://aistudio.google.com/app/apikey) (Gemini)
- [Unsplash Developers](https://unsplash.com/developers)

Start the development server:

```bash
npm run dev
```
---

## 🧠 How It Works

1. Any path like `/cool/page` triggers AI-powered content generation
2. Keywords from the path fetch relevant images via Unsplash
3. Combined data is sent to Gemini for creative HTML generation
4. Generated HTML is rendered instantly in the browser
5. Toolbar stays persistent for seamless interaction

---

## 👀 Try These Paths

```
/space/adventure        → Cosmic exploration  
/underwater/city        → Aquatic architecture  
/cyber/punk             → Futuristic neon  
/medieval/castle        → Historical fantasy  
/crystal/cave/magic     → Mystical realms  
/rainbow/paradise       → Colorful dreamland
```

Or invent your own!

---

## 🎛️ Customization

- **✏️ Prompts** → `src/lib/prompts.ts`
- **🧰 Toolbar** → `src/components/HoverToolbar.tsx`

---

## ⚙️ Deployment

Optimized for Vercel:

```bash
npm run build
```

Ensure your environment variables are set on your hosting platform.

---

## 💰 Cost Estimation

- **Gemini**: ~50K characters/page → ~$0.00625
- **Unsplash**: Free tier = 50 requests/hour

Super cheap to run even at scale 🚀

---

## 🤝 Contributing

Open an issue or submit a PR — contributions are always welcome!

---

## 📄 License

MIT License — use freely and make it what you want!
