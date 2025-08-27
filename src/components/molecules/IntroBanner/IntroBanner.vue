<script setup lang="ts">
// TYPE
import type { BannerProps } from './IntroBanner.type'

const props = defineProps<BannerProps>()
</script>

<template>
  <section id="banner" aria-labelledby="banner-title" class="relative">
    <!-- Image décorative -->
    <figure class="relative m-0">
      <img
        :src="props.image"
        alt=""
        role="presentation"
        class="block w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </figure>

    <!-- Texte en overlay -->
    <div
      class="absolute top-1/3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 md:gap-5 text-center"
    >
      <h1
        id="banner-title"
        class="text-2xl md:text-5xl font-bold uppercase tracking-wide text-white drop-shadow-lg"
      >
        {{ props.title }}
      </h1>
      <p v-if="props.subtitle" class="text-xs md:text-sm text-white drop-shadow">
        {{ props.subtitle }}
      </p>
    </div>
  </section>
</template>
