<template>
  <a
    :href="url"
    v-bind="isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
    :aria-label="ariaLabel || undefined"
    class="text-[var(--secondary-color)] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus-visible:ring-offset-[var(--primary-color)]"
  >
    <slot>{{ content }}</slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  url: string
  content?: string
  ariaLabel?: string
}>()

const isExternal = computed(() => /^https?:\/\//i.test(props.url))
</script>
