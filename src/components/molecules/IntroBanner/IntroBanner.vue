<script setup lang="ts">
import { ref } from 'vue'
import type { BannerProps } from './IntroBanner.type'
import { useTypewriter } from '@/helpers/useTypewriter'

const props = defineProps<BannerProps>()

const title = ref(props.title)
const subtitle = ref(props.subtitle ?? '')

const { displayed: displayedTitle, finished: finishedTitle } = useTypewriter(title, {
  typingSpeed: 70,
  startDelay: 200,
  loop: false,
})
const { displayed: displayedSubtitle } = useTypewriter(subtitle, {
  typingSpeed: 60,
  startDelay: 2500,
  loop: false,
})
</script>

<template>
  <!-- NEW: hauteur contrôlée + overflow-hidden -->
  <section
    id="banner"
    class="relative flex justify-center w-full h-[38vh] md:h-[70vh] overflow-hidden"
  >
    <!-- NEW: image en position absolue pour “cover” -->
    <figure class="absolute inset-0 m-0">
      <img
        :src="props.image"
        alt=""
        role="presentation"
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </figure>

    <div
      class="relative z-10 flex flex-col items-center gap-1 md:gap-[40px] text-center w-full h-full justify-center px-4"
    >
      <h1 class="text-1xl md:text-3xl ml-[60px] font-bold uppercase tracking-wide text-black">
        <span :class="{ 'type-cursor': !finishedTitle }">{{ displayedTitle }}</span>
      </h1>
      <p v-if="props.subtitle" class="text-sm md:text-xl text-black">
        <span class="type-cursor">{{ displayedSubtitle }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.type-cursor::after {
  content: '|';
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s step-start infinite;
}
</style>
