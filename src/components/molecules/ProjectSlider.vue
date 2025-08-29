<script setup lang="ts">
// VUE
import { ref } from 'vue'

// TYPES
import type { ProjectCardProps } from './BaseCard/BaseCard.types'

// DATA
import projectData from '@/assets/data/data.json'

// COMPONENTS
import BaseLink from '../atoms/BaseLink.vue'

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

const toggleFlip = (index: number) => {
  flippedIndex.value = flippedIndex.value === index ? null : index
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
          }"
        >
          <div
            class="relative w-[300px] h-[440px] [transform-style:preserve-3d] transition-transform duration-700 text-[var(--secondary-color)]"
            :class="flippedIndex === index ? 'rotate-y-180' : ''"
          >
            <!-- Recto -->
            <div
              class="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-[var(--primary-color)] shadow-xl"
            >
              <img :src="project.image" :alt="project.alt" class="w-full h-[240px] object-cover" />
              <div class="flex flex-col justify-between h-[200px] p-4">
                <div class="flex flex-row justify-between items-center mb-4">
                  <h3 class="text-lg font-bold text-[var(--secondary-color)] p-0">
                    {{ project.name }}
                  </h3>
                  <div
                    @click="() => toggleFlip(index)"
                    class="w-8 h-8 rounded-full border border-[var(--secondary-color)] text-[var(--secondary-color)] bg-transparent flex items-center justify-center cursor-pointer transition hover:scale-110 focus:outline-none"
                    role="button"
                    tabindex="0"
                    aria-label="Ouvrir le projet {{ project.name }}"
                  >
                    <font-awesome-icon icon="fa-solid fa-plus" class="text-sm" />
                  </div>
                </div>
                <p class="text-sm flex-grow text-justify">{{ project.texte }}</p>
                <p class="text-sm text-right">{{ project.category }}</p>
              </div>
            </div>

            <!-- Verso -->
            <div
              class="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-auto bg-[var(--primary-color)] p-4 text-blackshadow-xl flex flex-col justify-between"
            >
              <div
                @click="() => toggleFlip(index)"
                class="w-8 h-8 rounded-full border border-[var(--secondary-color)] text-[var(--secondary-color)] bg-transparent flex items-center justify-center self-end cursor-pointer transition hover:scale-110 focus:outline-none"
                role="button"
                tabindex="0"
                aria-label="Fermer le projet {{ project.name }}"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </div>

              <div class="flex flex-col gap-4">
                <h3 class="text-xl font-bold mb-2 p-0 text--[var(--secondary-color)]">
                  {{ project.title }}
                </h3>
                <ul class="list-disc text-black list-inside text-[16px] space-y-1">
                  <li v-if="project.objectif1">{{ project.objectif1 }}</li>
                  <li v-if="project.objectif2">{{ project.objectif2 }}</li>
                  <li v-if="project.objectif3">{{ project.objectif3 }}</li>
                  <li v-if="project.objectif4">{{ project.objectif4 }}</li>
                </ul>
              </div>
              <div class="flex flex-row gap-10 justify-center font-bold">
                <BaseLink v-if="project.url" :url="project.url" content="Site" />
                <BaseLink v-if="project.github" :url="project.github" content="GitHub" />
              </div>
            </div>
          </div>
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

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
