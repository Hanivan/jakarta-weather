<template>
  <section class="tile wave">
    <p class="coords">6,2° LS<br />106,8° BT</p>
    <p class="label">{{ count }} jam prakiraan</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{ count: number }>();
</script>

<style src="./LocationTile.css"></style>
