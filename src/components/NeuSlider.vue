<script setup lang="ts">
const el = ref<HTMLDivElement | undefined>()
const handle = ref<HTMLDivElement | undefined>()

const props = withDefaults(defineProps<{
  disabled?: boolean
  percent: number
  color?: string
}>(), {
  disabled: false,
})

const emit = defineEmits(['update:percent'])

const style = computed(() => {
  return {
    'width': `${props.percent}%`,
    'background-color': props.color,
  }
})

const { pressed } = useMousePressed({
  target: handle,
})

const { elementX, elementWidth } = useMouseInElement(el)
let beforeX = 0
const diff = ref(0)
watch(elementX, (v) => {
  if (beforeX)
    diff.value = v - beforeX

  beforeX = v
})

watchEffect(() => {
  const p = Math.round(diff.value / elementWidth.value * 10000) / 100
  diff.value = 0
  if (pressed.value)
    emit('update:percent', props.percent + p)
})

</script>

<template>
  <div
    ref="el" rounded-full w-full h-2 flex flex-col relative class="neu-slider neu-subject rounded-1/2" :class="{
      'neu-convex-sharp': !disabled,
      'neu-slider__disabled': disabled
    }"
  >
    <div
      absolute transition-transform rounded-full h-2 left-0
      class="neu-slider-inner rounded-1/2"
      :class="{'neu-slider-inner__inner': disabled}"
      :style="style"
    >
      <button
        v-if="!disabled"
        ref="handle"
        absolute right-0
        h-3 w-3 class="neu-slider-handle neu-subject rounded-1/2 top-1/2 -translate-y-1/2 neu-concave-shadow-edge"
      />
    </div>
  </div>
</template>

<style>
.neu-slider.neu-slider__disabled {
    background-color: rgb(var(--disabled-color));
    cursor: not-allowed;
}
.neu-slider-inner {
    background-color: rgb(var(--primary-color));
}
</style>
