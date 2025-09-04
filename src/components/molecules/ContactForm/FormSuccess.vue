<script setup lang="ts">
import BaseButton from '@/components/atoms/BaseButton.vue'

defineEmits(['back'])
</script>

<template>
  <div
    class="flex flex-col items-center text-center gap-4 min-h-[380px] py-10 md:py-12 px-2"
    role="region"
    aria-labelledby="success-title"
    aria-describedby="success-desc"
  >
    <svg
      class="text-green-600 w-16 h-16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>

    <h3 id="success-title" class="text-2xl font-bold text-[var(--secondary-color)]">
      Merci pour votre message !
    </h3>

    <p id="success-desc" class="text-sm md:text-base text-black/80 dark:text-gray-300">
      Je vous répondrai dans les plus brefs délais.
    </p>

    <!-- Barre d’action en bas -->
    <div class="flex justify-end w-full mt-6">
      <!-- change `justify-end` en `justify-start` si tu préfères le bouton à gauche -->
      <BaseButton
        text="Nouveau message"
        size="small"
        variant="ghost"
        class="mt-2"
        @click="$emit('back')"
      />
    </div>
  </div>
</template>
