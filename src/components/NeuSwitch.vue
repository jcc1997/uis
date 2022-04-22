<script setup lang="ts">
const el = ref<HTMLDivElement | undefined>()

const props = withDefaults(defineProps<{
  checked: boolean
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits(['update:checked'])

function click() {
  if (props.disabled)
    return
  emit('update:checked', !props.checked)
}
</script>

<template>
  <button
    ref="el" rounded-full w-10 h-5 flex flex-col relative class="neu-switch" :class="{
      'neu-convex-sharp': !disabled,
      'neu-switch-indicator': !disabled,
      'neu-switch__disabled': disabled
    }" @click="click"
  >
    <div
      absolute transition-transform rounded-full w-5 h-5
      class="neu-switch-handle neu-subject"
      :class="{'neu-switch__checked': checked, 'neu-concave-shadow-edge': !disabled}"
    />
  </button>
</template>

<style>
.neu-switch-handle.neu-switch__checked {
    transform: translateX(100%)
}
.neu-switch.neu-switch-indicator::before {
    content: '';
    width: 1.5rem;
    height: 0.25rem;
    margin: 0.5rem;
    border-radius: 0.125rem;
    background: linear-gradient(to left, transparent 50%, rgba(var(--success-color), 0.5) 50%, rgb(var(--success-color)));
}
.neu-switch.neu-switch__disabled {
    background-color: rgb(var(--disabled-color));
    cursor: not-allowed;
}
</style>
