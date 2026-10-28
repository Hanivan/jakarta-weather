<template>
  <section class="tile hero">
    <SkyDisc />
    <span class="tategaki" aria-hidden="true">ジャカルタの気温</span>
    <p class="label">Sekarang, {{ hour(row.time) }} WIB</p>
    <p class="hero-temp">{{ deg(row.temp) }}<small>C</small></p>
    <p class="label">{{ fmt(row.time, { weekday: 'long', day: 'numeric', month: 'long' }) }}</p>
  </section>
</template>

<script setup lang="ts">
import SkyDisc from '@/lib/components/SkyDisc/SkyDisc.vue';
import { deg, fmt, hour, type HourlyRow } from '@/lib/weather';

defineProps<{ row: HourlyRow }>();
</script>

<style src="./HeroTile.css"></style>
