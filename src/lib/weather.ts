export const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m';
const TZ = 'Asia/Jakarta';

export interface HourlyRow {
  time: Date;
  temp: number;
}

interface ForecastResponse {
  hourly: { time: string[]; temperature_2m: number[] };
}

// API returns GMT times without a suffix; append "Z" so Date parses them as UTC.
export function toRows({ hourly }: ForecastResponse): HourlyRow[] {
  return hourly.time.map((t, i) => ({ time: new Date(`${t}Z`), temp: hourly.temperature_2m[i] }));
}

export async function fetchForecast(): Promise<HourlyRow[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return toRows(await res.json());
}

/** YYYY-MM-DD in Jakarta time, used to group hours into days. */
export const dayKey = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: TZ });

export const fmt = (d: Date, o: Intl.DateTimeFormatOptions) =>
  d.toLocaleString('id-ID', { timeZone: TZ, ...o });

export const hour = (d: Date) => fmt(d, { hour: '2-digit', minute: '2-digit' });

export const deg = (n: number) =>
  `${n.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}°`;

/** Noon of a dayKey in Jakarta, safe for weekday/date formatting. */
export const fromDayKey = (k: string) => new Date(`${k}T12:00:00+07:00`);

export interface DayStats {
  key: string;
  min: number;
  max: number;
}

/** Min/max per Jakarta day, in date order. */
export function dailyStats(rows: HourlyRow[]): DayStats[] {
  const byDay = new Map<string, DayStats>();
  for (const r of rows) {
    const key = dayKey(r.time);
    const d = byDay.get(key) ?? { key, min: r.temp, max: r.temp };
    d.min = Math.min(d.min, r.temp);
    d.max = Math.max(d.max, r.temp);
    byDay.set(key, d);
  }
  return [...byDay.values()];
}

/** The row whose hour contains `now`, falling back to the first row. */
export const currentRow = (rows: HourlyRow[], now = Date.now()) =>
  rows.find((r) => now >= +r.time && now < +r.time + 3600e3) ?? rows[0];
