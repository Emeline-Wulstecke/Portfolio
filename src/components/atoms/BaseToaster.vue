<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  message: string
  type?: 'success' | 'error'
}>()

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, 3000)
})
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed top-4 right-4 z-50 px-6 py-3 rounded shadow-lg text-white transition-all duration-300 animate-fade-in-right"
    :class="{
      'bg-green-600': type === 'success' || !type,
      'bg-red-600': type === 'error',
    }"
    role="status"
    aria-live="polite"
  >
    {{ message }}
  </div>
</template>

<style scoped>
@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-in-right {
  animation: fade-in-right 0.4s ease-out;
}
</style>
