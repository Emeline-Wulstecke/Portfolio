<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from './BaseCard/BaseCard.vue'
import type { ProjectCardProps } from './BaseCard/BaseCard.types'
import projectData from '@/assets/data/data.json'

const projects = projectData.portfolio as ProjectCardProps['project'][]
const positionOffset = ref(0)

const slideNext = () => {
  positionOffset.value = (positionOffset.value + 1) % projects.length
}

const slidePrev = () => {
  positionOffset.value = (positionOffset.value - 1 + projects.length) % projects.length
}

function getCardPosition(index: number): number {
  const diff = index - positionOffset.value
  const half = Math.floor(projects.length / 2)
  if (diff > half) return diff - projects.length
  if (diff < -half) return diff + projects.length
  return diff
}

// Swipe (mobile)
let touchStartX = 0
let touchEndX = 0

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}
const onTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  const deltaX = touchEndX - touchStartX
  if (deltaX > 50) slidePrev()
  else if (deltaX < -50) slideNext()
}
</script>

<template>
  <section
    aria-labelledby="project-carousel-title"
    class="w-full bg-[var(--tertiary-color)] py-10 md:py-16 px-4 flex flex-col items-center"
  >
    <h2 id="project-carousel-title" class="text-2xl md:text-3xl font-bold mb-10 text-center">
      Mes projets
    </h2>

    <div
      class="relative w-full flex items-center justify-center min-h-[500px] overflow-hidden"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <!-- Flèche gauche -->
      <button
        @click="slidePrev"
        aria-label="Projet précédent"
        class="absolute left-4 z-20 bg-[var(--secondary-color)] text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
      >
        ←
      </button>

      <!-- Cartes -->
      <div
        class="relative w-full h-[500px] max-w-[360px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] mx-auto perspective-[2000px]"
      >
        <BaseCard
          v-for="(project, index) in projects"
          :key="project.id || index"
          :project="project"
          class="absolute top-0 left-1/2 transform transition-all duration-700 ease-in-out origin-center"
          :class="{
            'z-10 translate-x-[-50%] scale-100 rotate-y-0 shadow-xl': getCardPosition(index) === 0,
            'z-5 translate-x-[-150%] scale-90 -rotate-y-45 opacity-80':
              getCardPosition(index) === -1,
            'z-5 translate-x-[50%] scale-90 rotate-y-45 opacity-80': getCardPosition(index) === 1,
            'z-0 translate-x-[-250%] scale-75 opacity-0': getCardPosition(index) <= -2,
            'z-0 translate-x-[150%] scale-75 opacity-0': getCardPosition(index) >= 2,
          }"
        />
      </div>

      <!-- Flèche droite -->
      <button
        @click="slideNext"
        aria-label="Projet suivant"
        class="absolute right-0 z-20 bg-[var(--secondary-color)] text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black md:right-3"
      >
        →
      </button>
    </div>
  </section>
</template>
