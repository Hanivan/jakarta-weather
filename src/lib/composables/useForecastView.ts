import { computed, ref } from 'vue';

import { useClock } from '@/lib/composables/useClock';
import { heatScale } from '@/lib/heat';
import { useForecastStore } from '@/lib/stores/forecast';
import { currentRow, dailyStats, dayKey } from '@/lib/weather';

/** Everything the home page shows, derived from the forecast store. */
export function useForecastView() {
  const { rows } = useForecastStore();
  const now = useClock();
  const all = computed(() => rows.value ?? []);
  const picked = ref('');

  const days = computed(() => dailyStats(all.value));
  const today = computed(() => days.value.find((d) => d.key === dayKey(now.value)));
  const selectedDay = computed({
    get: () => picked.value || days.value[0]?.key || '',
    set: (v) => (picked.value = v),
  });
  const dayRows = computed(() => all.value.filter((r) => dayKey(r.time) === selectedDay.value));
  const current = computed(() => currentRow(all.value, +now.value));
  const heat = computed(() => heatScale(all.value));

  return { days, today, selectedDay, dayRows, current, heat };
}
