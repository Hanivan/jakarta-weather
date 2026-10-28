import { createGlobalState } from '@vueuse/core';
import { ref, shallowRef } from 'vue';

import { fetchForecast, type HourlyRow } from '@/lib/weather';

/**
 * App-wide forecast data: one fetch shared by every component that calls useForecastStore().
 * Uses VueUse createGlobalState; Pinia would suit a larger app with many stores.
 */
export const useForecastStore = createGlobalState(() => {
  const rows = shallowRef<HourlyRow[] | null>(null);
  const error = ref(false);

  const load = () =>
    fetchForecast().then(
      (r) => {
        rows.value = r;
        error.value = false;
      },
      () => (error.value = true),
    );

  const retry = () => {
    error.value = false;
    return load();
  };

  load();
  return { rows, error, load, retry };
});
  