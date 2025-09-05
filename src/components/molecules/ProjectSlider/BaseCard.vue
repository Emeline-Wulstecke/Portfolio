<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProjectCardProps } from './BaseCard.types'
import BaseCardFront from './BaseCardFront.vue'
import BaseCardBack from './BaseCardBack.vue'

const props = defineProps<{
  project: ProjectCardProps['project']
  isFlipped?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-flip'): void
}>()

// Page interne du verso (0 = problématiques, 1 = objectifs)
const backPage = ref(0)
watch(
  () => props.isFlipped,
  (open) => {
    if (open) backPage.value = 0
  },
)

const open = () => emit('toggle-flip')
const close = () => emit('toggle-flip')
const next = () => {
  backPage.value = Math.min(1, backPage.value + 1)
}
const prev = () => {
  backPage.value = Math.max(0, backPage.value - 1)
}
</script>

<template>
  <div
    class="relative w-[300px] h-[440px] [transform-style:preserve-3d] transition-transform duration-700 text-[var(--secondary-color)]"
    :class="isFlipped ? 'rotate-y-180' : ''"
  >
    <BaseCardFront :project="project" @open="open" />
    <BaseCardBack :project="project" :page="backPage" @close="close" @next="next" @prev="prev" />
  </div>
</template>

<style scoped>
.rotate-y-180 {
  transform: rotateY(180deg);
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
