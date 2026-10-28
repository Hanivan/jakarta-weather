<template>
  <section class="tile hourly">
    <h2 class="hourly-title">
      {{ fmt(fromDayKey(day), { weekday: 'long', day: 'numeric', month: 'long' }) }}
    </h2>
    <ion-list lines="none" class="hours">
      <ion-item v-for="r in rows" :key="+r.time" :class="{ 'is-now': r === current }">
        <div class="row" :style="{ '--p': heat(r.temp) }">
          <time :datetime="r.time.toISOString()">{{ hour(r.time) }}</time>
          <span class="bar" aria-hidden="true"><span /></span>
          <span class="temp">{{ deg(r.temp) }}C</span>
        </div>
      </ion-item>
    </ion-list>
    <p class="source">Data dari Open-Meteo. Waktu dalam WIB. Tarik layar ke bawah untuk memperbarui.</p>
  </section>
</template>

<script setup lang="ts">
import { IonItem, IonList } from '@ionic/vue';

import { deg, fmt, fromDayKey, hour, type HourlyRow } from '@/lib/weather';

defineProps<{ day: string; rows: HourlyRow[]; current?: HourlyRow; heat: (temp: number) => number }>();
</script>

<style src="./HourlyList.css"></style>
