# Jakarta Weather

Hourly temperature forecast for Jakarta, built with Ionic Vue. Shows `time` and `temperature_2m` from the [Open-Meteo API](https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m), in Jakarta time (WIB).

## Run

```sh
bun install
bun run dev
```

Open http://localhost:5173. Add `?hour=18.3` to the URL to preview another time of day.

## Test

```sh
bun run test:unit
```

## Structure

```
src/lib/
├── pages/        pages
├── components/   UI components, one folder each
├── stores/       shared state
└── composables/  reusable logic
```

Weather data by [Open-Meteo](https://open-meteo.com/) (CC BY 4.0).
