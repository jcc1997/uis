<script setup lang="ts">
import type { Ref } from 'vue-demi'
import Color from 'color'
import { loadNeuCss } from './utils/neu'

const color = new Color('#f0f0f0')

loadNeuCss({
  color,
  light_pos: 'br',
})

// function Math_between(min: number, input: number, max: number) {
//   return Math.max(min, Math.min(input, max))
// }

// function luminance(color: RGB, lum: number, a: number) {
//   const [r, g, b] = color
//   const af = (c: number) => Math.round(Math_between(0, c + c * lum, 255))
//   return `rgba(${af(r)}, ${af(g)}, ${af(b)}, ${a * 100}%)`
// }

// const lum = 0.1
// const main = 0.8
// const secondary = 0.2
// const shadow_distance = 1 / 4
// const shadow_blur = shadow_distance * 2

// const edge_light_blur = 0.5
// const edge_dark_blur = 0.5
// // const edge = 0.5
// const edge_radius = 1 / 16
// const edge_blur = edge_radius * 2
// const unit = 'rem'
// const concave: ('concave' | 'convex') = 'concave'

// const light_pos: 'tl' | 'tr' | 'br' | 'bl' = 'tl'

// const getLumFactory = (light_pos: 'tl' | 'tr' | 'br' | 'bl') => (position: 'tl' | 'tr' | 'br' | 'bl') => {
//   const poss = ['tl', 'tr', 'br', 'bl']
//   const x = poss.indexOf(light_pos)
//   const y = poss.indexOf(position)
//   const lum_matrix = [
//     [1, -1, -1, -1],
//     [-1, 1, -1, -1],
//     [-1, -1, 1, -1],
//     [-1, -1, -1, 1],
//   ]
//   return lum_matrix[x][y]
// }

// const lumFactor = getLumFactory(light_pos)

// const getBlurFactory = (light_pos: 'tl' | 'tr' | 'br' | 'bl') => (position: 'tl' | 'tr' | 'br' | 'bl') => {
//   const poss = ['tl', 'tr', 'br', 'bl']
//   const x = poss.indexOf(light_pos)
//   const y = poss.indexOf(position)
//   const m = main
//   const s = secondary
//   const lum_matrix = [
//     [m, s, m, s],
//     [s, m, s, m],
//     [m, s, m, s],
//     [s, m, s, m],
//   ]
//   return lum_matrix[x][y]
// }

// const getBlur = getBlurFactory(light_pos)

// const getEdgeFactors = (light_pos: 'tl' | 'tr' | 'br' | 'bl') => {
//   const poss = ['tl', 'tr', 'br', 'bl']
//   const x = poss.indexOf(light_pos)
//   const matrix = [
//     [-1, -1, 1, 1],
//     [1, 1, -1, -1],
//     [-1, 1, 1, -1],
//     [1, -1, -1, 1],
//   ]
//   return matrix[x]
// }

// const ef = getEdgeFactors(light_pos) // edgeFactors

// const shadow_prop = `${[
//   `-${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('bl') * lum, getBlur('bl'))}`,
//   `${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('tr') * lum, getBlur('tr'))}`,
//   `-${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('tl') * lum, getBlur('tl'))}`,
//   `${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('br') * lum, getBlur('br'))}`,
// ].map(v => concave === 'concave' ? v : `inset ${v}`).concat(
//   [
//     `${ef[0] * edge_radius + unit} ${ef[1] * edge_radius + unit} ${edge_blur + unit} ${luminance(color, -lum, edge_dark_blur)}`,
//     `${ef[2] * edge_radius + unit} ${ef[3] * edge_radius + unit} ${edge_blur + unit} ${luminance(color, lum, edge_light_blur)}`,
//   ].map(v => concave === 'concave' ? `inset ${v}` : v),
// ).join(', ')};`

// up
// background: rgb(240, 240, 240);
// box-shadow:
//   -5px 5px 10px rgb(235, 235, 235), // shadow top-right Secondary 2
//   5px -5px 10px rgb(235, 235, 235), // shadow bottom-left Secondary 2
//   -5px -5px 10px rgb(254, 254, 254), // shadow top-left 6
//   5px 5px 10px rgb(219, 219, 219), // shadow bottom-right 8.75
//   inset 1px 1px 2px rgb(245, 245, 245), // edge-sharpness top-left 2
//   inset -1px -1px 2px rgb(228, 228, 228) // edge-sharpness bottom-right 5
//   ;

// down
// background: rgb(240, 240, 240);
// box-shadow:
//   inset -5px 5px 10px rgb(235, 235, 235),
//   inset 5px -5px 10px rgb(235, 235, 235),
//   inset -5px -5px 10px rgb(254, 254, 254),
//   inset 5px 5px 10px rgb(219, 219, 219),
//   1px 1px 2px rgb(245, 245, 245),
//   -1px -1px 2px rgb(228, 228, 228)
//   ;
const el = ref<HTMLDivElement | undefined>()
const { pressed } = useMousePressed({ target: el })

const duration = 100 // ms

function useButtonPressedWithDuration(value: Ref<boolean>, duration: number) {
  const ternary = ref(value.value ? 1 : -1)
  let timeout: NodeJS.Timeout
  watch(value, (v) => {
    ternary.value = 0
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(() => {
      ternary.value = v ? 1 : -1
    }, duration / 2)
  })
  return ternary
}

const ternary = useButtonPressedWithDuration(pressed, duration)

</script>

<template>
  <div
    ref="el" p-2 rounded-2 w-70 flex flex-col justify-center items-center transition-shadow duration-50
    :class="{ concave: ternary === -1, convex: ternary === 1 }"
  >
    neu button
  </div>
</template>

<style>
/* .concave {
  box-shadow:
    -0.25rem 0.25rem 0.5rem rgba(216, 216, 216, 0.2),
    0.25rem -0.25rem 0.5rem rgba(216, 216, 216, 0.2),
    -0.25rem -0.25rem 0.5rem rgba(255, 255, 255, 0.8),
    0.25rem 0.25rem 0.5rem rgba(216, 216, 216, 0.8),
    inset -0.0625rem -0.0625rem 0.125rem rgba(216, 216, 216, 0.5),
    inset 0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.5);
}

.convex {
  box-shadow:
    inset -0.25rem 0.25rem 0.5rem rgba(216, 216, 216, 0.2),
    inset 0.25rem -0.25rem 0.5rem rgba(216, 216, 216, 0.2),
    inset -0.25rem -0.25rem 0.5rem rgba(255, 255, 255, 0.8),
    inset 0.25rem 0.25rem 0.5rem rgba(216, 216, 216, 0.8),
    -0.0625rem -0.0625rem 0.125rem rgba(216, 216, 216, 0.5),
    0.0625rem 0.0625rem 0.125rem rgba(255, 255, 255, 0.5);
} */

.app {
  background: rgb(240, 240, 240)
}
</style>
