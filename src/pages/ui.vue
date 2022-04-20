<script setup lang="ts">
const color = '#F0F0F0'

// function colorLuminance(hex: string, lum: number) {
//   // validate hex string
//   hex = String(hex).replace(/[^0-9a-f]/gi, '')
//   if (hex.length < 6)
//     hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]

//   lum = lum || 0

//   // convert to decimal and change luminosity
//   let rgb = '#'
//   let c
//   let i
//   for (i = 0; i < 3; i++) {
//     c = parseInt(hex.substr(i * 2, 2), 16)
//     c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
//     rgb += (`00${c}`).substr(c.length)
//   }

//   return rgb
// }

// const intensity = 0.15

// const lightSideColor = colorLuminance(color, intensity)
// const darkSideColor = colorLuminance(color, intensity * -1)
// const distance = 5
// const blur = 10

// const [positionX, positionY] = [distance, distance]

// const boxShadowPosition: 'inset' | '' = ''
// const firstBoxShadow = `${boxShadowPosition} ${positionX}px ${positionY}px ${blur}px ${darkSideColor}`
// const secondBoxShadow = `${boxShadowPosition} ${positionX * -1}px ${positionY * -1
// }px ${blur}px ${lightSideColor};`
// const neu_shadow = `${firstBoxShadow}, ${secondBoxShadow}`
// const { t } = useI18n()
</script>

<template>
  <div p-4 rounded-2 class="app app-bg-white">
    Glassmorphism
  </div>
  <div p-2 h-100 w-100 rounded-2 flex flex-col justify-evenly relative items-center :style="{ 'background-color': color }">
    <NeuButton />
    <!-- <div p-2 rounded-2 :style="`background-color: ${color};box-shadow: ${neu_shadow};`">
      Neumorphism
    </div> -->
    <div p-2 rounded-2 class="up">
      Neumorphism
    </div>
    <div p-2 rounded-2 class="down">
      Neumorphism
    </div>

    <div p-2 rounded-2 class="color-board">
      Neumorphism
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: ui
</route>

<style>
body {
    background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100');
    background-position: center;
}

.app {
    backdrop-filter: blur(16px) saturate(180%);
}

.app-bg-dark {
    background-color: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.125);
}

.app-bg-white {
    background-color: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(209, 213, 219, 0.3);
}

.sharp {
    background: rgb(240, 240, 240);
    box-shadow:
    rgb(204, 204, 204) 5px 5px 10px,
    rgb(255, 255, 255) -5px -5px 10px;
}

.up {
    background: #F0F0F0;
    /* background: rgb(240, 240, 240); */
    box-shadow:
        -5px 5px 10px rgba(216, 216, 216, 0.2),
        5px -5px 10px rgba(216, 216, 216, 0.2),
        -5px -5px 10px rgba(255, 255, 255, 0.9),
        5px 5px 10px rgba(216, 216, 216, 0.9),
        inset 1px 1px 2px rgba(255, 255, 255, 0.3),
        inset -1px -1px 2px rgba(216, 216, 216, 0.5)
        ;
    border-radius: 10px;
}

.down {
    background: #f0f0f0;
    /* background: rgb(240, 240, 240); */
    box-shadow:
        1px 1px 2px rgba(255, 255, 255, 0.3),
        -1px -1px 2px rgba(216, 216, 216, 0.5),
        inset -5px 5px 10px rgba(216, 216, 216, 0.2),
        inset 5px -5px 10px rgba(216, 216, 216, 0.2),
        inset -5px -5px 10px rgba(255, 255, 255, 0.9),
        inset 5px 5px 10px rgba(216, 216, 216, 0.9);
    border-radius: 10px;
}

/* .color-board {
    background: rgba(255, 255, 255, 0.3);
    background: rgb(245, 245, 245);
    background: rgba(255, 255, 255, 0.9);
    background: rgb(254, 254, 254);

    background: rgba(216, 216, 216, 0.2);
    background: rgb(235, 235, 235);
    background: rgba(216, 216, 216, 0.5);
    background: rgb(228, 228, 228);
    background: rgba(216, 216, 216, 0.9);
    background: rgb(219, 219, 219);
} */
</style>
