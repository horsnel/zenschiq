# ZenschIQ — Sovereign Intelligence Terminal

> Trade at the Sovereign Level. Not the retail one.

ZenschIQ processes **466,984 rows** of live market data to surface the highest-conviction signals — with AI bots that execute for you, automatically.

## 🚀 Live Demo

Deployed on Cloudflare Pages. Visit the site after deployment setup.

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (zero dependencies)
- **AI Engine**: Gemini 2.5 Flash (Mensch Score™)
- **Database**: Supabase Realtime
- **Deployment**: Cloudflare Pages

## 📦 Project Structure

```
zenschiq/
├── index.html          # Single-page application (all-in-one)
├── .gitignore
├── README.md
└── wrangler.toml       # Cloudflare Pages config (optional)
```

## 🔧 Local Development

Since this is a static single-page application, you can simply open `index.html` in a browser:

```bash
# Option 1: Direct open
open index.html

# Option 2: Use a simple HTTP server
npx serve .

# Option 3: Python
python3 -m http.server 8000
```

## 🚢 Deploy to Cloudflare Pages

### Prerequisites
- A [Cloudflare](https://dash.cloudflare.com/) account
- This repo pushed to GitHub

### Steps
1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. Click **"Create a project"** → **"Connect to Git"**
3. Select your GitHub repository
4. Configure build settings:
   - **Framework preset**: `None`
   - **Build command**: (leave empty)
   - **Build output directory**: `/` or `.` (root)
5. Click **"Save and Deploy"**

Cloudflare will automatically deploy on every push to `main`.

## 🔄 GitHub Integration

```bash
# Initialize (if not already)
git init
git add .
git commit -m "Initial commit: ZenschIQ Sovereign Intelligence Terminal"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/zenschiq.git
git branch -M main
git push -u origin main
```

## 📄 License

All rights reserved.
