# zaportfolio — Mohamad Reza Reziyanto

Personal portfolio website built with Next.js 16, showcasing projects, achievements, dashboard stats, and more.

🌐 **Live:** [zaportfolio.vercel.app](https://zaportfolio.vercel.app)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Auth:** NextAuth.js v4 (Google & GitHub OAuth)
- **Database:** Supabase (Chat Room realtime)
- **AI:** Google Gemini (Smart Talk)
- **Analytics:** Umami
- **i18n:** next-intl (EN / ID)
- **Deployment:** Vercel

---

## Features

- 🏠 **Home** — intro, skills, and featured bento sections
- 👤 **About** — career and education timeline
- 🏆 **Achievements** — certificates and badges with filter
- 📁 **Projects** — showcase of personal & open-source projects
- 📊 **Dashboard** — real-time stats (GitHub, WakaTime, Codewars, Monkeytype, Umami)
- 💬 **Buku Tamu** — realtime guest book powered by Supabase Realtime
- 📞 **Contact** — social media cards + WhatsApp message form
- 🔗 **Links** — Linktree-style page with QR code
- 🤖 **Smart Talk** — AI chatbot powered by Google Gemini

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ezazee/zaportfolio
cd zaportfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Key variables to fill:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_AUTHOR_NAME` | Your full name |
| `NEXT_PUBLIC_AUTHOR_EMAIL` | Your email address |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub username |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Instagram profile URL |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | LinkedIn profile URL |
| `NEXT_PUBLIC_SOCIAL_WHATSAPP` | WhatsApp wa.me URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (international, e.g. 628xxx) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_ID` | GitHub OAuth app ID |
| `GITHUB_SECRET` | GitHub OAuth app secret |
| `NEXTAUTH_SECRET` | NextAuth secret key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `WAKATIME_API_KEY` | WakaTime API key |
| `MONKEYTYPE_API_KEY` | Monkeytype API key |
| `UMAMI_API_KEY` | Umami analytics API key |
| `DOMAIN` | Production domain (e.g. https://zaportfolio.vercel.app) |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Acknowledgement

This project is based on [satriabahari.my.id](https://satriabahari.my.id) by [Satria Bahari](https://github.com/satriabahari), licensed under the [MIT License](./LICENSE).

Significant modifications and new features have been added to tailor this project to my own needs.

---

## License

[MIT](./LICENSE) — see the LICENSE file for details.
