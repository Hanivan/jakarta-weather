<template>
  <span class="sky-disc" :data-phase="sky.phase" :style="{ '--alt': sky.altitude }" aria-hidden="true"></span>
</template>

<script setup lang="ts">
import { useIntervalFn, useNow } from '@vueuse/core';
import { computed } from 'vue';

import { jakartaHour, skyAt } from '@/lib/sky';

// ?hour=18.5 previews a given hour, handy for showing every phase in the demo video.
const preview = new URLSearchParams(location.search).get('hour');
const now = useNow({ scheduler: (cb) => useIntervalFn(cb, 60_000) });
const sky = computed(() => skyAt(preview ? Number(preview) % 24 : jakartaHour(now.value)));
</script>

<style src="./SkyDisc.css"></style>
