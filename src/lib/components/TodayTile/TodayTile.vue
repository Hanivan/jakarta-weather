<template>
  <section class="tile today">
    <h2 class="label">Hari ini</h2>
    <dl>
      <div>
        <dt>Terendah</dt>
        <dd>{{ deg(min) }}</dd>
      </div>
      <div>
        <dt>Tertinggi</dt>
        <dd class="hot">{{ deg(max) }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { deg } from '@/lib/weather';

defineProps<{ min: number; max: number }>();
</script>

<style src="./TodayTile.css"></style>
