# Jakarta Weather

Hourly temperature forecast for Jakarta, built with Ionic Vue.

The app reads the 7-day hourly forecast from [Open-Meteo](https://open-meteo.com/) and shows the time and temperature for each hour (`time` and `temperature_2m`), converted to Jakarta time (WIB). On-screen text is in Indonesian.

API endpoint:

```
https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m
```

## Features

- Current temperature, with a sun or moon that follows the time of day in Jakarta
- Today's lowest and highest temperature
- Day picker for all 7 days, showing each day's high
- Hourly list with a bar for each hour, colored indigo (cooler) or vermilion (hotter)
- Light and dark theme, following the system setting until changed, then remembered
- Pull to refresh, a loading state, and an error message with a retry button
- Bento layout: 2 columns on phones, 4 on wide screens

## Tech stack

- [Ionic 9](https://ionicframework.com/) with [Vue 3](https://vuejs.org/) and TypeScript
- [VueUse](https://vueuse.org/) for the theme toggle, shared state and the clock
- [Vite](https://vite.dev/) for development and builds
- [Bun](https://bun.sh/) as package manager and script runner
- [Vitest](https://vitest.dev/) for unit tests, [Playwright](https://playwright.dev/) for end-to-end tests

## Getting started

Requires [Bun](https://bun.sh/) 1.x.

```sh
bun install
bun run dev
```

Then open the URL Vite prints (by default http://localhost:5173).

### Preview a time of day

The sun and moon change with the current Jakarta time. To see another hour, add `?hour=` to the URL:

```
http://localhost:5173/home?hour=5.5    dawn
http://localhost:5173/home?hour=12     midday
http://localhost:5173/home?hour=18.3   dusk
http://localhost:5173/home?hour=22     night
```

This only changes the sun or moon. The current temperature still uses the real time.

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Start the development server |
| `bun run build` | Type-check and build to `dist/` |
| `bun run preview` | Serve the production build |
| `bun run test:unit` | Run unit tests |
| `bun run test:e2e` | Run end-to-end tests |
| `bun run lint` | Run ESLint, the e2e type check and Prettier |

## Project structure

```
src/
├── lib/
│   ├── pages/home/          Home page: wires the store and composables into components
│   ├── components/          One folder per component, each with its .vue and .css
│   │   ├── HeroTile/        Current temperature
│   │   ├── SkyDisc/         Sun or moon for the current time of day
│   │   ├── TodayTile/       Today's lowest and highest
│   │   ├── LocationTile/    Coordinates
│   │   ├── DayPicker/       Day buttons
│   │   ├── HourlyList/      Hourly temperatures
│   │   └── ThemeToggle/     Light/dark switch
│   ├── stores/              Shared state (forecast data, fetched once)
│   ├── composables/         Reusable logic (page view model, theme)
│   ├── weather.ts           API fetch, time conversion, formatting, daily stats
│   ├── sky.ts               Time-of-day phases
│   └── heat.ts              Cool-to-hot scale for coloring temperatures
├── theme/
│   ├── variables.css        Colors and fonts, light and dark
│   └── base/global.css      Shared base styles
├── router/                  Routes
└── main.ts                  App entry
tests/
├── unit/                    Vitest
└── e2e/                     Playwright
```

## Design

Clean, modern Japanese style:

- **Colors:** off-white paper (washi), ink (sumi), indigo (ai) for cooler temperatures, vermilion (shu) for hotter ones
- **Fonts:** Shippori Mincho for headings and numbers, Zen Kaku Gothic New for body text
- **Light decoration:** a small red seal mark, a vertical Japanese caption, and a seigaiha wave pattern on the location tile

## Data source

Weather data from [Open-Meteo](https://open-meteo.com/), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). No API key needed.
