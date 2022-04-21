<script setup lang="ts">
import Color from 'color'
import { generateNeuCss } from '../neu/neu'

const color = new Color('#f0f0f0')
generateNeuCss({
  color,
})

const checked = ref(false)
</script>

<template>
  <div p-12 h-full w-full flex flex-col justify-evenly items-center class="neu-app">
    <div p-2 h-full w-full rounded-2 flex flex-col justify-evenly relative items-center class="neu-curtain-concave">
      <NeuButton />
      <NeuButton :disabled="true" />
      <NeuButton type="sharp" />
      <NeuSwitch v-model:checked="checked" />
      <NeuSwitch v-model:checked="checked" :disabled="true" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
</route>
