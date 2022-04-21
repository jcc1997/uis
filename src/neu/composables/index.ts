import type { Ref } from 'vue-demi'

export function useBoolToTernary(value: Ref<boolean>, duration: number) {
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
