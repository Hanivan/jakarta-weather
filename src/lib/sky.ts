export type SkyPhase = 'night' | 'dawn' | 'morning' | 'midday' | 'afternoon' | 'dusk';

// Jakarta sits near the equator, so sunrise (~05.30) and sunset (~17.50) barely move through the year.
// Fixed hours, not computed from solar position. Swap in a sunrise/sunset calc if the app ever shows other cities.
const PHASES: [until: number, phase: SkyPhase][] = [
  [4.5, 'night'],
  [6, 'dawn'],
  [10, 'morning'],
  [15, 'midday'],
  [17.5, 'afternoon'],
  [19, 'dusk'],
  [24, 'night'],
];

/** Hour of day in Jakarta as a fraction, e.g. 13.5 for 13.30 WIB. */
export function jakartaHour(d: Date): number {
  const [h, m] = d
    .toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .split(':')
    .map(Number);
  return h + m / 60;
}

export function skyAt(hour: number) {
  const phase = PHASES.find(([until]) => hour < until)![1];
  // 0 at the horizon (06.00 and 18.00), 1 at noon. Night stays at 1 so the moon sits high.
  const altitude = hour >= 6 && hour <= 18 ? Math.sin((Math.PI * (hour - 6)) / 12) : 1;
  return { phase, altitude };
}
