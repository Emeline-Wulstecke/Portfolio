<script setup lang="ts">
defineProps<{
  content: string
  placement?: 'bottom' | 'top'
}>()
</script>

<template>
  <div
    class="absolute w-full flex justify-center z-50 text-xs text-white bg-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-70 group-focus:opacity-70 transition duration-100"
    :class="{
      'bottom-full mb-2 left-1/2 -translate-x-1/2': placement === 'top',
      'top-full mt-2 left-1/2 -translate-x-1/2': placement !== 'top',
    }"
    role="tooltip"
  >
    {{ content }}
    <!-- Flèche -->
    <span
      v-if="placement === 'top'"
      class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black"
    ></span>
    <span
      v-else
      class="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-black"
    ></span>
  </div>
</template>
