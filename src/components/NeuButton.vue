<script setup lang="ts">
import { useBoolToTernary } from '~/neu/composables'

const el = ref<HTMLDivElement | undefined>()
const { pressed } = useMousePressed({ target: el })

const duration = 200 // ms
const ternary = useBoolToTernary(pressed, duration)

const props = withDefaults(defineProps<{
  disabled?: boolean
  type?: 'default' | 'sharp'
}>(), {
  disabled: false,
  type: 'default',
})

const classes = computed(() => {
  if (props.type === 'default') {
    return {
      'neu-concave': ternary.value === -1 && !props.disabled,
      'neu-convex': ternary.value === 1 && !props.disabled,
    }
  }
  else {
    return {
      'neu-concave-sharp': ternary.value === -1 && !props.disabled,
      'neu-convex-sharp': ternary.value === 1 && !props.disabled,
    }
  }
})

</script>

<template>
  <button
    ref="el" p-2 rounded-2 w-70 flex flex-col justify-center items-center transition-shadow duration-100
    class="neu-subject neu-button"
    :class="{
      ...classes,
      'neu-button__disabled': disabled
    }"
  >
    neu button
  </button>
</template>

<style>
.neu-button.neu-button__disabled {
  background-color: rgb(var(--disabled-color));
  cursor: not-allowed;
}
</style>
