<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title><span class="mark" aria-hidden="true"></span>Jakarta Weather</ion-title>
        <ThemeToggle slot="end" />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ion-refresh="refresh">
        <ion-refresher-content />
      </ion-refresher>

      <div v-if="!rows && !error" class="state">
        <ion-spinner name="crescent" />
        <p>Memuat prakiraan cuaca…</p>
      </div>

      <div v-else-if="!rows" class="state" role="alert">
        <p>Data cuaca tidak bisa dimuat. Periksa koneksi internet, lalu coba lagi.</p>
        <ion-button fill="outline" @click="retry">Coba lagi</ion-button>
      </div>

      <main v-else-if="current" class="bento">
        <HeroTile :row="current" />
        <TodayTile v-bind="today ?? { min: current.temp, max: current.temp }" />
        <LocationTile :count="rows.length" />
        <DayPicker v-model="selectedDay" :days="days" :heat="heat" />
        <HourlyList :day="selectedDay" :rows="dayRows" :current="current" :heat="heat" />
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  type RefresherCustomEvent,
} from '@ionic/vue';

import DayPicker from '@/lib/components/DayPicker/DayPicker.vue';
import HeroTile from '@/lib/components/HeroTile/HeroTile.vue';
import HourlyList from '@/lib/components/HourlyList/HourlyList.vue';
import LocationTile from '@/lib/components/LocationTile/LocationTile.vue';
import ThemeToggle from '@/lib/components/ThemeToggle/ThemeToggle.vue';
import TodayTile from '@/lib/components/TodayTile/TodayTile.vue';
import { useForecastView } from '@/lib/composables/useForecastView';
import { useForecastStore } from '@/lib/stores/forecast';

const { rows, error, load, retry } = useForecastStore();
const { days, today, selectedDay, dayRows, current, heat } = useForecastView();

const refresh = (e: RefresherCustomEvent) => load().finally(() => e.detail.complete());
</script>

<style src="./HomePage.css"></style>
