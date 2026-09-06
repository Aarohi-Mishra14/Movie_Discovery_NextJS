# Movie_Discovery_NextJS

The Next.js 15 version of my Movie Discovery project. Same app, same idea - a mini Netflix where you browse what's popular, search for anything, save favourites and get an AI-powered mood-based recommendation, but rebuilt from a React + Vite SPA into a proper Next.js 15 app using the App Router, Server Components and server side rendering.

Did this as a follow-up sprint specifically to learn SSR, the difference between Server and Client Components, dynamic routing, and SEO metadata — stuff you don't really get until you rebuild something you already made and see what changes.

## What's different from the original

The original was a single-page app - one URL, everything switching via internal state. This version actually uses real routes now (`/`, `/movies`, `/movie/[id]`, `/search`, `/favorites`, `/mood-matcher`) and the initial data fetch happens on the server before the page even reaches your browser, instead of fetching after the page loads like the old version did.

The other big change: your TMDB and Gemini API keys never touch the browser anymore. In the Vite version they had to be prefixed `VITE_` which bakes them into the JS bundle, anyone could open dev tools and find them. Here they're plain server side environment variables, only ever read inside server code.

## Features

- Popular movies fetched server side and already in the page before it loads - no loading flash on first visit
- Search that updates the URL (`/search?query=...`), debounced so it's not hitting TMDB on every keystroke
- Real infinite scroll - keep scrolling, more movies just load in
- Click the heart on any movie to favourite it (saved in your browser via localStorage)
- A little toast pops up confirming when you add/remove a favourite
- Dedicated movie details page for every movie, with its own proper page title and preview info when you share the link
- Posters lazy-load automatically
- Mood Matcher tab - describe your mood, Gemini suggests a movie, the app looks it up on TMDB — now runs as a server action so the Gemini key stays private

## Tech stack

- Next.js 15 (App Router)
- React 19
- Plain CSS, no framework - same custom styles as the original, ported over
- TMDB API for movie data
- Gemini API for the mood recommendation feature

## Running it locally

You'll need a free TMDB API key (and optionally a Gemini key for Mood Matcher).

1. Clone the repo and install everything:
   ```
   git clone https://github.com/your-username/movie-discovery-nextjs.git
   cd movie-discovery-nextjs
   npm install
   ```

2. Get a TMDB key: sign up at [themoviedb.org](https://www.themoviedb.org/signup), go to Settings → API, and grab your "API Key (v3 auth)".

3. Create a file called `.env.local` in the project root (note: `.env.local`, not `.env` — that's just what Next.js expects) and add:
   ```
   TMDB_API_KEY=your_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ```
   No `VITE_` prefix this time — these are server-only now, on purpose. Gemini key is optional; without it, the Mood Matcher tab just won't show up in the nav.

4. Run it:
   ```
   npm run dev
   ```
   Open `http://localhost:3000`.

## Notes

- If movies don't load locally, check your `.env.local` first — missing or wrong key is the usual culprit. If the key's fine and it's still not working, it might genuinely be a network/DNS issue on your end (this happened to me - turned out my ISP was quietly redirecting TMDB's domain to a dead address for anything that wasn't a browser, which was a whole thing to track down).
- Kept the same philosophy as the original: no Redux, no TypeScript, no database. Just Next.js doing what it's actually for, plus the same plain React hooks for the bits that need to run in the browser (the search box, the favorite button, the mobile nav).
- If you're deploying this yourself, don't forget to add `TMDB_API_KEY` and `GEMINI_API_KEY` in your hosting provider's environment variables settings - they won't come along automatically since `.env.local` is gitignored on purpose.
