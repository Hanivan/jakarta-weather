<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-pressed="isDark"
    :title="isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
    @click="toggle()"
  >
    <span class="moon" aria-hidden="true"></span>
    <span class="text">{{ isDark ? 'Gelap' : 'Terang' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/lib/composables/useTheme';

const { isDark, toggle } = useTheme();
</script>

<style src="./ThemeToggle.css"></style>
