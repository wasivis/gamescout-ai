# 🎮 GameScout AI

**Find your next favorite game.** Tell GameScout what you enjoy, what mood you're in, or what you'd like to play next, and its AI scout will return five tailored recommendations.

GameScout AI is a web app built with Next.js. Recommendations are generated with Groq, then presented with a genre, description, match-vibe score, and a note explaining why each game might suit you. Each result links to a Steam search for the game.

## ✨ Features

- 🎯 Personalized recommendations from natural-language preferences
- 🕹️ Five game picks per request, with descriptions and genres
- 💡 A match-vibe score and an explanation for each pick
- 🛒 Quick links to find recommended games on Steam
- ⚡ Responsive interface with loading feedback
- 🔐 Groq API calls run on the server; your API key is not exposed to the browser

## 🧰 Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Groq](https://groq.com/) via the [Groq JavaScript SDK](https://github.com/groq/groq-typescript)

## 🚀 Getting started

### Requirements

- [Node.js](https://nodejs.org/) and npm
- A [Groq API key](https://console.groq.com/keys) with access to the model configured by the app

### Install and configure

1. Clone the repository and open a terminal in the project folder.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create a `.env.local` file in the project root and add your Groq API key:

   ```dotenv
   GROQ_API_KEY=your_groq_api_key
   ```

   Keep this key private. Do not add a `NEXT_PUBLIC_` prefix or commit `.env.local` to version control.

4. Start the development server:

   ```powershell
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000).

## 🧭 Using GameScout

Enter a preference in the search box and choose **Find Games**. You can describe favorite games, genres, themes, or the kind of experience you're looking for—for example:

> I love Elden Ring, but want something cozy and less challenging.

GameScout sends your request to its server-side `/api/recommend` endpoint. The endpoint asks Groq for five game recommendations and returns them as JSON. The browser displays each recommendation and links to a Steam search.

## ⚙️ Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | Run ESLint |

## 🔑 Configuration

| Variable | Required | Description |
| --- | :---: | --- |
| `GROQ_API_KEY` | Yes | Server-side API key used to request recommendations from Groq |

The model ID is configured in `src/app/api/recommend/route.ts`. If Groq reports that the model is unavailable or your account cannot access it, check Groq's current [model catalog](https://console.groq.com/docs/models) and [deprecation notices](https://console.groq.com/docs/deprecations).

## 🗂️ Project structure

```text
src/
└── app/
    ├── api/
    │   └── recommend/
    │       └── route.ts   # Server-side Groq recommendation endpoint
    ├── globals.css        # Global styles and Tailwind CSS
    ├── layout.tsx         # Root layout and page metadata
    └── page.tsx           # GameScout interface
```

## ☁️ Deployment

Deploy to any host that supports Next.js. Configure `GROQ_API_KEY` as a **server-side environment variable** in the hosting provider, then build and start the app using the provider's recommended Next.js workflow. Never expose the key in client-side code or commit it to the repository.

## 🤝 Contributing

Contributions and suggestions are welcome. For a change, open an issue to discuss it or submit a pull request with a clear description of what changed and how it was checked.

## 📄 License

No license is currently specified for this project. Contact the project owner before redistributing or reusing it.
