<script setup lang="ts">
import Color from 'color'
import { loadNeuCss } from '../neu/neu'
import '../neu/neu2'

const color = new Color('#f0f0f0')
loadNeuCss({
  color,
})
</script>

<template>
  <div p-2 h-80 w-100 rounded-2 flex flex-col justify-evenly relative items-center class="glass glass-bg-white">
    <NeuButton3 />
  </div>
  <div p-2 h-80 w-100 rounded-2 flex flex-col justify-evenly relative items-center class="neu-app">
    <NeuButton />
    <!-- <NeuButton2 /> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: ui
</route>

<style>
body {
    background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100');
    /* background-color: #5e5e5e; */
    background-position: center;
}

.glass {
    backdrop-filter: blur(16px) saturate(180%);
    box-shadow:
        inset 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.5),
        inset -0.0625rem -0.0625rem 0.125rem rgba(0, 0, 0, 0.5);
}

.glass-bg-dark {
    background-color: rgba(0, 0, 0, 0.25);
}

.glass-bg-white {
    background-color: rgba(255, 255, 255, 0.25);
}

.sharp {
    background: rgb(240, 240, 240);
    box-shadow:
    rgb(204, 204, 204) 5px 5px 10px,
    rgb(255, 255, 255) -5px -5px 10px;
}

</style>
