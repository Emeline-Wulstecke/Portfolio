<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseTooltip from '../../atoms/BaseTooltip.vue'
import type { Skill } from './Skill.types'

const { skills } = defineProps<{ skills: Skill[] }>()

const scrollerRef = ref<HTMLDivElement | null>(null)
const isPaused = ref(false)
const animationFrameId = ref(0)
const scrollSpeed = 0.5

// Auto défilement infini
const loopScroll = () => {
  const el = scrollerRef.value
  if (!el || isPaused.value) {
    animationFrameId.value = requestAnimationFrame(loopScroll)
    return
  }

  el.scrollLeft += scrollSpeed
  if (el.scrollLeft >= el.scrollWidth / 2) {
    el.scrollLeft = 0
  }

  animationFrameId.value = requestAnimationFrame(loopScroll)
}

// Défilement souris (direction)
const scrollDirection = (dir: 'left' | 'right') => {
  if (!scrollerRef.value) return
  const amount = dir === 'left' ? -2 : 2
  scrollerRef.value.scrollLeft += amount
}

let hoverScrollInterval: number | null = null
const startDirectionalScroll = (dir: 'left' | 'right') => {
  hoverScrollInterval = setInterval(() => scrollDirection(dir), 10)
}
const stopDirectionalScroll = () => {
  if (hoverScrollInterval) {
    clearInterval(hoverScrollInterval)
    hoverScrollInterval = null
  }
}

onMounted(() => {
  animationFrameId.value = requestAnimationFrame(loopScroll)
})
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId.value)
  stopDirectionalScroll()
})
</script>

<template>
  <div
    class="relative bg-white py-10 overflow-hidden"
    aria-label="Liste des compétences"
    role="region"
  >
    <!-- Zones de hover gauche/droite -->
    <div
      class="absolute left-0 top-0 w-10 h-full z-10"
      @mouseenter="startDirectionalScroll('left')"
      @mouseleave="stopDirectionalScroll"
    />
    <div
      class="absolute right-0 top-0 w-10 h-full z-10"
      @mouseenter="startDirectionalScroll('right')"
      @mouseleave="stopDirectionalScroll"
    />

    <!-- Liste -->
    <div
      ref="scrollerRef"
      class="flex gap-8 overflow-x-hidden whitespace-nowrap px-4 pb-10"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <template v-for="(_, loopIndex) in 2" :key="loopIndex">
        <div
          v-for="(skill, index) in skills"
          :key="`${loopIndex}-${index}`"
          class="relative group w-16 h-16 shrink-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          tabindex="0"
          role="img"
          :aria-label="skill.name"
        >
          <img :src="skill.img" :alt="skill.alt" class="w-full h-full object-contain" />
          <BaseTooltip :content="skill.name" placement="bottom" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
