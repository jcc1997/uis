<script setup lang="ts">
import Color from 'color'
import { importNeuCss } from '../neu/neu'

const isDark = useDark({
  valueDark: '#2f3136',
  valueLight: '#f0f0f0',
})

console.log(isDark.value)

const color = new Color('#f0f0f0')
// const color = new Color('#2f3136')
importNeuCss({
  color,
})

const checked = ref(false)
const progress = ref(50)
</script>

<template>
  <div p-12 h-full w-full flex flex-col justify-evenly items-center class="neu-app">
    <div p-2 h-full w-full rounded-2 flex flex-col justify-evenly relative items-center class="neu-curtain-concave">
      <NeuButton />
      <NeuButton :disabled="true" />
      <NeuButton type="sharp" />
      <NeuSwitch v-model:checked="checked" />
      <NeuSwitch v-model:checked="checked" :disabled="true" />
      <NeuProgress :progress="progress" />
      <NeuSlider v-model:percent="progress" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: app
</route>
