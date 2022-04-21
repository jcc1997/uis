<script setup lang="ts">
import { useBoolToTernary } from '~/neu/composables'

const el = ref<HTMLDivElement | undefined>()
const { pressed } = useMousePressed({ target: el })

const duration = 200 // ms

const ternary = useBoolToTernary(pressed, duration)

</script>

<template>
  <button
    ref="el" p-2 rounded-2 w-70 flex flex-col justify-center items-center transition-shadow duration-100
    :class="{ 'neu-concave-sharp': ternary === -1, 'neu-convex-sharp': ternary === 1 }"
  >
    neu button
  </button>
</template>

<style>
</style>
