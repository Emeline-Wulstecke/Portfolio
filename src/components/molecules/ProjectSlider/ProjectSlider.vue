<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import projectData from '@/assets/data/data.json'
import type { ProjectCardProps } from './BaseCard.types'
import BaseCard from './BaseCard.vue'

const projects = projectData.portfolio as ProjectCardProps['project'][]
const positionOffset = ref(0)
const flippedIndex = ref<number | null>(null)

const slideNext = async () => {
  if (flippedIndex.value !== null) return
  positionOffset.value = (positionOffset.value + 1) % projects.length
  await focusCurrentCard()
}

const slidePrev = async () => {
  if (flippedIndex.value !== null) return
  positionOffset.value = (positionOffset.value - 1 + projects.length) % projects.length
  await focusCurrentCard()
}

const getCardPosition = (index: number): number => {
  const diff = index - positionOffset.value
  const half = Math.floor(projects.length / 2)
  if (diff > half) return diff - projects.length
  if (diff < -half) return diff + projects.length
  return diff
}

const toggleFlip = (index: number) => {
  flippedIndex.value = flippedIndex.value === index ? null : index
}

const focusCard = (index: number) => {
  const pos = getCardPosition(index)
  if (flippedIndex.value !== null && flippedIndex.value !== index) {
    flippedIndex.value = null
  }
  if (pos !== 0) {
    positionOffset.value = index
  }
}

const focusCurrentCard = async () => {
  await nextTick()
  const focusedCard = document.querySelector(
    '[aria-roledescription="carousel"][tabindex="0"]',
  ) as HTMLElement
  focusedCard?.focus()
}

const handleArrowKeys = (e: KeyboardEvent) => {
  if (flippedIndex.value !== null) return
  if (e.key === 'ArrowLeft') slidePrev()
  if (e.key === 'ArrowRight') slideNext()
}

onMounted(() => window.addEventListener('keydown', handleArrowKeys))
onBeforeUnmount(() => window.removeEventListener('keydown', handleArrowKeys))
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
      <!-- Flèche gauche -->
      <button
        @click="slidePrev"
        :disabled="flippedIndex !== null"
        :aria-disabled="flippedIndex !== null"
        aria-label="Projet précédent"
        aria-keyshortcuts="ArrowLeft"
        class="absolute left-4 z-20 bg-[var(--secondary-color)] text-white min-w-[44px] min-h-[44px] md:w-14 md:h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span aria-hidden="true" class="text-xl md:text-2xl">←</span>
      </button>

      <!-- Carrousel -->
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
            'cursor-pointer': getCardPosition(index) !== 0,
          }"
          @click="focusCard(index)"
          @keydown.enter.space.prevent="focusCard(index)"
          role="button"
          aria-roledescription="carousel"
          :tabindex="getCardPosition(index) === 0 ? 0 : -1"
          :aria-label="`Recentre ${project.name}`"
        >
          <BaseCard
            :project="project"
            :isFlipped="flippedIndex === index"
            @toggle-flip="toggleFlip(index)"
          />
        </div>
      </div>

      <!-- Flèche droite -->
      <button
        @click="slideNext"
        :disabled="flippedIndex !== null"
        :aria-disabled="flippedIndex !== null"
        aria-label="Projet suivant"
        aria-keyshortcuts="ArrowRight"
        class="absolute right-4 z-20 bg-[var(--secondary-color)] text-white min-w-[44px] min-h-[44px] md:w-14 md:h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span aria-hidden="true" class="text-xl md:text-2xl">→</span>
      </button>
    </div>
  </section>
</template>
