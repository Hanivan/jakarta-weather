<template>
  <section class="tile week">
    <h2 class="label">Pilih hari</h2>
    <div class="days">
      <button
        v-for="d in days"
        :key="d.key"
        type="button"
        class="day"
        :aria-pressed="d.key === selected"
        @click="selected = d.key"
      >
        <span class="day-name">{{ fmt(fromDayKey(d.key), { weekday: 'short' }) }}</span>
        <span class="day-date">{{ fmt(fromDayKey(d.key), { day: 'numeric' }) }}</span>
        <span class="day-max" :style="{ '--p': heat(d.max) }">{{ deg(d.max) }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { deg, fmt, fromDayKey } from '@/lib/weather';

defineProps<{ days: { key: string; max: number }[]; heat: (temp: number) => number }>();
const selected = defineModel<string>({ required: true });
</script>

<style src="./DayPicker.css"></style>
