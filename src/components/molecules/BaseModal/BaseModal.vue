<script setup lang="ts">
// VUE
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

// PROPS & EMITS
const props = defineProps<{ isOpen: boolean; onClose: () => void }>()
const emit = defineEmits(['update:isOpen'])

// REF
const modalRef = ref<HTMLElement | null>(null)
const previouslyFocused = ref<HTMLElement | null>(null)

function getFocusable(root: HTMLElement) {
  const selectors = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')
  return Array.from(root.querySelectorAll<HTMLElement>(selectors))
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) closeModal()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
  if (e.key === 'Tab' && modalRef.value) {
    const focusables = getFocusable(modalRef.value).filter((el) => !el.hasAttribute('disabled'))
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

function closeModal() {
  emit('update:isOpen', false)
  props.onClose()
}

watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      previouslyFocused.value = document.activeElement as HTMLElement
      await nextTick()
      modalRef.value?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      previouslyFocused.value?.focus()
    }
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      @click="onBackdropClick"
      aria-hidden="false"
    >
      <div
        ref="modalRef"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 md:p-8 shadow-xl focus:outline-none"
      >
        <button
          class="absolute top-3 right-4 text-lg font-bold text-gray-500 hover:text-black focus:outline-none"
          @click="closeModal"
          aria-label="Fermer la modale"
        >
          ✕
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
