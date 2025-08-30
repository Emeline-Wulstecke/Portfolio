<script setup lang="ts">
defineProps<{
  content: string
  placement?: 'bottom' | 'top'
}>()
</script>

<template>
  <div
    class="absolute z-50 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition"
    :class="{
      'top-full mt-2 left-1/2 -translate-x-1/2': placement === 'bottom',
      'bottom-full mb-2 left-1/2 -translate-x-1/2': placement !== 'bottom',
    }"
    role="tooltip"
  >
    {{ content }}
  </div>
</template>
