<script setup lang="ts">
const el = ref<HTMLDivElement | undefined>()

const props = defineProps<{
  progress: number
  color?: string
}>()

const style = computed(() => {
  return {
    'width': `${props.progress}%`,
    'background-color': props.color,
  }
})

</script>

<template>
  <div
    ref="el"
    rounded-full w-full h-2 flex flex-col relative
    class="neu-progress neu-subject neu-convex-sharp rounded-1/2"
  >
    <div
      absolute transition-transform rounded-full h-2 left-0
      class="neu-progress-inner rounded-1/2"
      :style="style"
    />
  </div>
</template>

<style>
.neu-progress.neu-progress__disabled {
    background-color: rgb(var(--disabled-color));
    cursor: not-allowed;
}
.neu-progress-inner {
    background-color: rgb(var(--success-color));
}
</style>
