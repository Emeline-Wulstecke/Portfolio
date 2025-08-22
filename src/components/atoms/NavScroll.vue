<script setup lang="ts">
// VUE
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    max?: number // px de scroll avant d’afficher le bouton
    ariaLabel?: string
  }>(),
  {
    max: 300,
    ariaLabel: 'Revenir en haut',
  },
)

const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > props.max
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // état initial
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-show="visible" class="fixed bottom-12 right-7 sm:right-5 xl:right-10 z-40">
    <button
      type="button"
      @click="scrollTop"
      :aria-label="ariaLabel"
      class="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--secondary-color)] text-white shadow ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus-visible:ring-offset-[var(--primary-color)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <font-awesome-icon :icon="['fas', 'arrow-up']" aria-hidden="true" />

      <span
        class="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 text-[13px] text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
      >
        Revenir en haut
      </span>
    </button>
  </div>
</template>
