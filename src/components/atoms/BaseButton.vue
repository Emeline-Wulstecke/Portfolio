<script setup lang="ts">
const props = defineProps<{
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const handleClick = (ev: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', ev)
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled || undefined"
    :aria-busy="loading || undefined"
    @click="handleClick"
    class="inline-flex items-center justify-center h-11 w-[150px] max-w-full mb-[30px] rounded-xl border border-black bg-[var(--primary-color)] text-[var(--secondary-color)] transition hover:opacity-90 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus-visible:ring-offset-[var(--primary-color)]"
  >
    <span v-if="!loading">{{ text }}</span>
    <span v-else class="sr-only">Chargement…</span>

    <svg
      v-if="loading"
      class="ml-2 animate-spin"
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
