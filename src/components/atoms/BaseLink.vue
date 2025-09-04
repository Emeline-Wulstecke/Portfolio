<script setup lang="ts">
// VUE
import { computed } from 'vue'

const props = defineProps<{
  url: string
  content?: string
  ariaLabel?: string
}>()

const isExternal = computed(() => /^https?:\/\//i.test(props.url))
</script>

<template>
  <a
    :href="url"
    v-bind="isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
    :aria-label="ariaLabel || undefined"
    class="inline-block transition duration-300 ease-in-out hover:scale-110 focus:scale-110"
  >
    <slot>{{ content }}</slot>
  </a>
</template>
