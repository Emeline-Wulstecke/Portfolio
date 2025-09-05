<script setup lang="ts">
import { ref } from 'vue'
import projectData from '@/assets/data/data.json'
import type { ProjectCardProps } from './BaseCard.types'
import BaseCard from './BaseCard.vue'

const projects = projectData.portfolio as ProjectCardProps['project'][]
const positionOffset = ref(0)
const flippedIndex = ref<number | null>(null)

const slideNext = () => {
  if (flippedIndex.value !== null) return
  positionOffset.value = (positionOffset.value + 1) % projects.length
}

const slidePrev = () => {
  if (flippedIndex.value !== null) return
  positionOffset.value = (positionOffset.value - 1 + projects.length) % projects.length
}

function getCardPosition(index: number): number {
  const diff = index - positionOffset.value
  const half = Math.floor(projects.length / 2)
  if (diff > half) return diff - projects.length
  if (diff < -half) return diff + projects.length
  return diff
}

// Ouvre/ferme la carte via le bouton +
const toggleFlip = (index: number) => {
  flippedIndex.value = flippedIndex.value === index ? null : index
}

/**
 * Clic sur une slide :
 * si une autre carte est ouverte : on la ferme
 * on recentre la carte cliquée si nécessaire
 * on n’ouvre pas la nouvelle
 */
const focusCard = (index: number) => {
  const pos = getCardPosition(index)

  if (flippedIndex.value !== null && flippedIndex.value !== index) {
    // fermer la carte actuellement ouverte
    flippedIndex.value = null
  }

  if (pos !== 0) {
    // recentrer la carte cliquée
    positionOffset.value = index
  }
}
</script>

<template>
  <section
    id="portfolio"
    aria-labelledby="project-carousel-title"
    class="w-full bg-[var(--tertiary-color)] py-10 md:py-16 px-4 flex flex-col items-center"
  >
    <h2 id="project-carousel-title" class="text-2xl md:text-3xl font-bold mb-10 text-center">
      Mes projets
    </h2>

    <div class="relative w-full flex items-center justify-center min-h-[500px] overflow-hidden">
      <button
        @click="slidePrev"
        aria-label="Projet précédent"
        class="absolute left-4 z-20 bg-[var(--secondary-color)] text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
      >
        ←
      </button>

      <div
        class="relative w-full h-[500px] max-w-[360px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] mx-auto perspective-[2000px]"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.id || index"
          class="absolute top-0 left-1/2 transform transition-all duration-700 ease-in-out origin-center"
          :class="{
            'translate-x-[-50%] z-10 scale-100 rotate-y-0': getCardPosition(index) === 0,
            'translate-x-[-150%] z-5 scale-90 -rotate-y-45 opacity-80':
              getCardPosition(index) === -1,
            'translate-x-[50%] z-5 scale-90 rotate-y-45 opacity-80': getCardPosition(index) === 1,
            'translate-x-[-250%] z-0 scale-75 opacity-0': getCardPosition(index) <= -2,
            'translate-x-[150%] z-0 scale-75 opacity-0': getCardPosition(index) >= 2,
            'cursor-pointer': getCardPosition(index) !== 0, // pointer si pas au centre
          }"
          @click="focusCard(index)"
          @keydown.enter.space.prevent="focusCard(index)"
          role="button"
          tabindex="0"
          :aria-label="`Recentre ${project.name}`"
        >
          <BaseCard
            :project="project"
            :isFlipped="flippedIndex === index"
            @toggle-flip="toggleFlip(index)"
          />
        </div>
      </div>

      <button
        @click="slideNext"
        aria-label="Projet suivant"
        class="absolute right-4 z-20 bg-[var(--secondary-color)] text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
      >
        →
      </button>
    </div>
  </section>
</template>
