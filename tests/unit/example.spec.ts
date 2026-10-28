import { describe, expect, test } from 'vitest';

import { dayKey, deg, hour, toRows } from '@/lib/weather';

describe('weather helpers', () => {
  const rows = toRows({ hourly: { time: ['2026-10-28T00:00', '2026-10-28T17:00'], temperature_2m: [26.4, 30] } });

  test('converts GMT API times to WIB', () => {
    expect(hour(rows[0].time)).toBe('07.00');
    expect(dayKey(rows[1].time)).toBe('2026-10-29');
  });

  test('formats temperature with Indonesian decimal comma', () => {
    expect(deg(rows[0].temp)).toBe('26,4°');
    expect(deg(rows[1].temp)).toBe('30,0°');
  });
});

describe('sky phase', () => {
  test('follows Jakarta time of day', async () => {
    const { skyAt, jakartaHour } = await import('@/lib/sky');
    expect(jakartaHour(new Date('2026-10-28T06:30:00Z'))).toBe(13.5);
    expect(skyAt(5).phase).toBe('dawn');
    expect(skyAt(12).phase).toBe('midday');
    expect(skyAt(12).altitude).toBe(1);
    expect(skyAt(18).phase).toBe('dusk');
    expect(skyAt(23).phase).toBe('night');
  });
});

describe('forecast helpers', () => {
  test('groups rows into Jakarta days and finds the current hour', async () => {
    const { dailyStats, currentRow } = await import('@/lib/weather');
    const rows = toRows({
      hourly: { time: ['2026-10-28T16:00', '2026-10-28T17:00', '2026-10-28T18:00'], temperature_2m: [27, 25, 26] },
    });
    expect(dailyStats(rows)).toEqual([
      { key: '2026-10-28', min: 27, max: 27 },
      { key: '2026-10-29', min: 25, max: 26 },
    ]);
    expect(currentRow(rows, Date.parse('2026-10-28T17:30:00Z'))).toBe(rows[1]);
  });
});
