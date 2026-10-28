import type { HourlyRow } from './weather';

/** Returns a function placing a temperature within the rows' range: 0 (coolest) to 1 (hottest). */
export function heatScale(rows: HourlyRow[]) {
  const t = rows.map((r) => r.temp);
  const min = Math.min(...t);
  const max = Math.max(...t);
  return (temp: number) => (max === min ? 0.5 : (temp - min) / (max - min));
}
