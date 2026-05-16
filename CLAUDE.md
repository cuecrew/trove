# Trove — Project Context

## What it is
A personal life-tracking PWA. Combines Letterboxd + Goodreads + Untappd + travel diary into one app.
Tracks: movies, TV shows, books, games, travel, food, drinks.
Core loop: open app → log something in <15 seconds → feel good about your year.

## Owner
GitHub: cuecrew
Live URL: https://cuecrew.github.io/trove
Repo: https://github.com/cuecrew/trove

## Tech stack
- React 18 via CDN (no Node, no build step) — chosen because no Node/sudo access on build machine
- Babel standalone — JSX compiled in-browser
- localStorage for all data persistence (key: `trove_items`, onboarding: `trove_onboarded`)
- Python `python3 -m http.server 3000 --directory trove` for local preview
- GitHub Pages for hosting (main branch, /trove subfolder)
- PWA: manifest.json + sw.js (service worker with skipWaiting + clients.claim)

## File structure
```
claude code test/
  CLAUDE.md                  ← this file (Claude Code auto-reads)
  trove/
    CLAUDE.md                ← same file, committed to GitHub
    index.html               ← entry point, loads all scripts as text/babel
    manifest.json            ← PWA manifest (start_url: /trove/, scope: /trove/)
    sw.js                    ← service worker (cache: trove-v3)
    icon-192.png             ← chest icon, generated via Python raw PNG
    icon-512.png
    src/
      tokens.js              ← design tokens (T, CATS, CAT_ORDER, TONES)
      data.js                ← SAMPLE, FEED, SEARCH_SEEDS (static seed data)
      icons.js               ← ICONS SVG paths, Icon component, TroveMark
      primitives.js          ← Cover, Stars, StarPicker, StatusBar, TabBar, etc.
      quickadd.js            ← QuickAddFlow (4-step sheet: category→search→rate→saved)
      screens.js             ← HomeFeedDiary, CategoryScreen, ShelvesScreen, DetailScreen, ProfileScreen
      screens-more.js        ← OnboardingWelcome, OnboardingPickCategories, UniversalSearchScreen, SettingsScreen
      app.js                 ← TroveApp root, navigation state machine, localStorage read/write
```

## Navigation state machine (app.js)
Screens: `home`, `shelves-home`, `shelves`, `detail`, `search`, `me`, `settings`
Tab bar is rendered as an absolute overlay in app.js (zIndex 40) — not the one inside each screen.

## Design tokens
- Background: #0E0B09 (warm near-black)
- Brand/saffron: #F4B23C
- Fonts: Bricolage Grotesque (headings), Geist (UI)
- 7 category accent colors defined in CATS object

## Key decisions made
- No Node/build step: machine has no Homebrew/sudo, git was pre-installed at /usr/bin/git
- GitHub auth via PAT embedded in remote URL (no gh CLI)
- PWA not native app: avoids $99 App Store fee + Flutter/React Native complexity
- localStorage not a DB: no backend needed for single-user personal tracking
- StatusBar component is now a safe-area spacer (not fake phone UI) — viewport-fit=cover in index.html
- HomeIndicator returns null — iOS renders its own natively in standalone mode
- Service worker uses skipWaiting()+clients.claim() so updates deploy instantly
- HTML navigation uses network-first, assets use cache-first

## What's been built
- Full onboarding (welcome + category picker)
- Home feed / diary with streak counter
- Shelves screen (category grid with counts)
- Category screen (grid/list view, filter chips)
- Detail screen (full-bleed cover, rating, tags, history)
- Profile/You screen (stats, heatmap, category bar, top-rated rail)
- Universal search screen
- Settings screen (toggles, data import/export stubs)
- QuickAdd flow (4 steps, slide-up sheet)
- Toast notification after saving

## What's rough / known issues
- Search seeds (SEARCH_SEEDS in data.js) still show hardcoded titles — not real search API
- "Edit" button on detail screen has no onClick (stub)
- Search/more buttons in CategoryScreen header are stubs
- Heatmap on profile screen is generated from a hash function, not real activity data
- Streak calculation uses loggedAt ISO timestamp — works correctly
- No real user accounts, no sync across devices
- App Store listing would require Capacitor wrapper (WebView) to submit

## What to avoid
- Don't add features before fixing rough edges above
- Don't use SAMPLE data as fallbacks — app should show empty states for new users
- Don't touch manifest start_url or scope (breaks PWA install)
- Don't use `git add -A` — add files explicitly to avoid committing secrets

## Local dev
```bash
cd "/Users/vijansoni/Downloads/claude code test"
python3 -m http.server 3000 --directory trove
# open http://localhost:3000
```

## Deploy
```bash
cd "/Users/vijansoni/Downloads/claude code test/trove"
git add <files>
git commit -m "message"
git push
# live at cuecrew.github.io/trove after ~60 seconds
```

## Last updated
2026-05-16 — after fixing icon, status bar, nav clickability, profile stats, service worker
