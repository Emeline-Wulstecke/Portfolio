<script setup lang="ts">
// VUE
import { computed } from 'vue'

const props = defineProps<{
  text?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: string
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'outline' | 'soft' | 'ghost'
}>()

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()
const handleClick = (ev: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', ev)
}

const sizeClasses = computed(() => {
  switch (props.size ?? 'medium') {
    case 'small':
      return 'h-9 px-4 text-sm rounded-xl'
    case 'large':
      return 'h-12 px-8 text-lg rounded-2xl'
    default:
      return 'h-11 px-6 text-base rounded-2xl'
  }
})

const variantClasses = computed(() => {
  switch (props.variant ?? 'soft') {
    case 'primary':
      return [
        'bg-[var(--secondary-color)] text-white',
        'hover:opacity-90',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--secondary-color)] focus-visible:ring-offset-[var(--primary-color)]',
        'shadow-sm hover:shadow-md',
      ].join(' ')
    case 'outline':
      return [
        'bg-transparent text-[var(--secondary-color)] border border-[var(--secondary-color)]',
        'hover:bg-[color-mix(in_lch,var(--secondary-color)_8%,white)]',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--secondary-color)] focus-visible:ring-offset-[var(--primary-color)]',
      ].join(' ')
    case 'ghost':
      return [
        'bg-transparent text-[var(--secondary-color)]',
        'hover:bg-[color-mix(in_lch,var(--secondary-color)_8%,white)]',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--secondary-color)] focus-visible:ring-offset-[var(--primary-color)]',
      ].join(' ')
    default: // 'soft'
      return [
        'text-[var(--secondary-color)]',
        'bg-[color-mix(in_lch,var(--tertiary-color)_35%,white)]',
        'border border-[color-mix(in_lch,var(--secondary-color)_18%,white)]',
        'hover:bg-[color-mix(in_lch,var(--tertiary-color)_45%,white)]',
        'shadow-[0_1px_0_rgba(0,0,0,.05)] hover:shadow-[0_4px_18px_rgba(0,0,0,.08)]',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--secondary-color)] focus-visible:ring-offset-[var(--primary-color)]',
      ].join(' ')
  }
})
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    :aria-disabled="disabled || undefined"
    :aria-busy="loading || undefined"
    @click="handleClick"
    :data-variant="variant || 'soft'"
    class="inline-flex items-center justify-center gap-2 transition-colors cursor-pointer duration-200 disabled:opacity-60 disabled:cursor-not-allowed select-none"
    :class="[sizeClasses, variantClasses]"
  >
    <span v-if="!loading">{{ text }}</span>
    <span v-else class="sr-only">Chargement…</span>

    <svg
      v-if="loading"
      class="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
        opacity=".25"
      />
      <path d="M22 12a10 10 0 0 1-10 10" fill="currentColor" />
    </svg>
  </button>
</template>
