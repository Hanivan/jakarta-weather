import { createGlobalState, useIntervalFn, useNow } from '@vueuse/core';

/** One shared clock for the app. Ticks every second so minute changes show without lag. */
export const useClock = createGlobalState(() => useNow({ scheduler: (cb) => useIntervalFn(cb, 1000) }));
