<script setup lang="ts">
import { useBoolToTernary } from '~/neu/composables'

const el = ref<HTMLDivElement | undefined>()
const { pressed } = useMousePressed({ target: el })

const duration = 200 // ms

const ternary = useBoolToTernary(pressed, duration)
</script>

<template>
  <button
    ref="el" p-2 rounded-2 w-70 relative transition-shadow duration-100 flex flex-col justify-center
    items-center class="neu-glass-button"
    :class="{ 'neu-glass-concave': ternary === -1, 'neu-glass-convex': ternary === 1 }"
  >
    neu button
  </button>
  <button
    p-2 rounded-2 w-70 relative transition-shadow duration-100 flex flex-col justify-center
    items-center class="neu-glass-button neu-glass-concave--green"
  >
    neu button
  </button>
  <button
    p-2 rounded-2 w-70 relative transition-shadow duration-100 flex flex-col justify-center
    items-center class="neu-glass-button neu-glass-convex--green"
  >
    neu button
  </button>
</template>

<style>

.neu-glass-button {
    /* background: #f0f0f0; */
    background: #10e36c;
}
</style>
