<script setup lang="ts">
// TYPES
import type { ProjectCardProps } from './BaseCard.types'

const props = defineProps<ProjectCardProps>()
const handleClick = () => props.onCardClick?.()
</script>

<template>
  <figure
    @click="handleClick"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
    class="bg-[var(--primary-color)] w-full max-w-sm h-[420px] flex flex-col justify-between m-2 md:m-4 p-2 rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
  >
    <!-- IMAGE -->
    <img
      :src="props.project.image"
      :alt="props.project.alt"
      loading="lazy"
      decoding="async"
      class="w-full h-[190px] md:h-[250px] object-cover rounded-md"
    />

    <!-- TEXTE -->
    <figcaption class="flex flex-col items-center w-full mt-4">
      <h3 class="text-lg font-semibold text-[var(--secondary-color)] text-center px-2">
        {{ props.project.name }}
      </h3>
      <p
        class="text-sm px-3 py-2 mt-2 border border-black rounded-[50%_20%_10%_40%/10%_40%_50%_20%] self-end"
      >
        {{ props.project.category }}
      </p>
    </figcaption>
  </figure>
</template>
