<script setup lang="ts">
import type { ProjectCardProps } from './BaseCard.types'
import BaseLink from '@/components/atoms/BaseLink.vue'

defineProps<{
  project: ProjectCardProps['project']
  page: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'next'): void
  (e: 'prev'): void
}>()
</script>

<template>
  <div
    class="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-auto bg-[var(--primary-color)] p-4 text-black shadow-xl flex flex-col"
  >
    <!-- Barre d'actions -->
    <div class="flex items-center justify-between mb-8">
      <button
        v-if="page === 1"
        @click="emit('prev')"
        @keydown.enter.space.prevent="emit('prev')"
        class="w-8 h-8 rounded-full border border-[var(--secondary-color)] text-[var(--secondary-color)] bg-transparent flex items-center justify-center cursor-pointer transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-label="Retour à la page précédente"
        title="Précédent"
        type="button"
      >
        ←
      </button>

      <div class="flex-1"></div>

      <button
        @click="emit('close')"
        @keydown.enter.space.prevent="emit('close')"
        class="w-8 h-8 rounded-full border border-[var(--secondary-color)] text-[var(--secondary-color)] bg-transparent flex items-center justify-center cursor-pointer transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-label="Fermer"
        title="Fermer"
        type="button"
      >
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </div>

    <!-- Page 1: Problématiques -->
    <div v-if="page === 0" class="flex flex-col justify-between h-full mb-6">
      <div>
        <h4 class="text-lg font-bold text-[var(--secondary-color)] mb-6">
          Problématiques & solutions
        </h4>
        <ul
          v-if="project.problematiques?.length"
          class="list-disc list-inside text-[16px] space-y-1"
        >
          <li v-for="(p, i) in project.problematiques" :key="i">{{ p }}</li>
        </ul>
        <p v-else class="text-sm text-gray-600">Aucune problématique renseignée.</p>
      </div>

      <div class="flex justify-end pt-3">
        <button
          @click="emit('next')"
          @keydown.enter.space.prevent="emit('next')"
          class="w-9 h-9 rounded-full border border-[var(--secondary-color)] text-[var(--secondary-color)] bg-transparent flex items-center justify-center cursor-pointer transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          aria-label="Voir la suite"
          title="Voir la suite"
          type="button"
        >
          →
        </button>
      </div>
    </div>

    <!-- Page 2: Objectifs + liens -->
    <div v-else class="flex flex-col justify-between h-full">
      <div>
        <h4 class="text-lg font-bold mb-4 mt-4 p-0 text-[var(--secondary-color)]">
          {{ project.title }}
        </h4>
        <ul class="list-disc text-black list-inside text-[16px] space-y-1">
          <li v-if="project.objectif1">{{ project.objectif1 }}</li>
          <li v-if="project.objectif2">{{ project.objectif2 }}</li>
          <li v-if="project.objectif3">{{ project.objectif3 }}</li>
          <li v-if="project.objectif4">{{ project.objectif4 }}</li>
        </ul>
      </div>

      <div class="flex flex-row gap-10 justify-center font-bold mt-4">
        <BaseLink
          v-if="project.url"
          :url="project.url"
          content="Site"
          class="text-[var(--secondary-color)]"
        />
        <BaseLink
          v-if="project.github"
          :url="project.github"
          content="GitHub"
          class="text-[var(--secondary-color)]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
