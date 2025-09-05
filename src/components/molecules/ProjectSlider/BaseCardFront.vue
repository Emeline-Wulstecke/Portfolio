<script setup lang="ts">
import type { ProjectCardProps } from './BaseCard.types'
defineProps<{ project: ProjectCardProps['project'] }>()
const emit = defineEmits<{ (e: 'open'): void }>()
</script>

<template>
  <div
    class="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-[var(--primary-color)] shadow-xl"
  >
    <img :src="project.image" :alt="project.alt" class="w-full h-[240px] object-cover" />
    <div class="flex flex-col justify-between h-[200px] p-4">
      <div class="flex flex-row justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-[var(--secondary-color)] p-0">{{ project.name }}</h3>

        <!-- Bouton + : ouvre/ferme sans recentrer (stop propagation) -->
        <button
          @click.stop="emit('open')"
          @keydown.enter.space.stop.prevent="emit('open')"
          class="w-8 h-8 rounded-full border border-[var(--secondary-color)] text-[var(--secondary-color)] bg-transparent flex items-center justify-center cursor-pointer transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          aria-label="Ouvrir les détails"
          title="Voir les détails"
          type="button"
        >
          <font-awesome-icon icon="fa-solid fa-plus" class="text-sm" />
        </button>
      </div>

      <p class="text-sm flex-grow text-justify">{{ project.texte }}</p>
      <p class="text-sm text-right">{{ project.category }}</p>
    </div>
  </div>
</template>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
</style>
