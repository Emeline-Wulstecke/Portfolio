<script setup lang="ts">
// VUE
import { ref } from 'vue'

// TYPES
import type { BannerProps } from './IntroBanner.type'

// HELPERS
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
  <section
    id="banner"
    class="relative flex justify-center w-full h-[38vh] md:h-[70vh] overflow-hidden mb-4"
  >
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
      class="relative w-full z-10 px-4 top-[120px] right-[90px] text-center md:top-[220px] md:right-[230px]"
    >
      <h1 class="text-xs md:text-3xl font-bold uppercase tracking-wide text-black">
        <span :class="{ 'type-cursor': !finishedTitle }">{{ displayedTitle }}</span>
      </h1>
      <p v-if="props.subtitle" class="text-sm mt-2 text-black md:text-xl md:mt-8">
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
