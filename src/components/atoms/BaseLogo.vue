<script setup lang="ts">
import logoUrl from '@/assets/images/logo.webp'

const props = defineProps<{
  src?: string // optionnel : tu peux passer une autre image si besoin
  alt?: string // texte alternatif accessible
}>()

// Valeurs par défaut
const src = props.src ?? logoUrl
const alt = props.alt ?? 'Logo écrit Emeline Wulstecke'
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    loading="lazy"
    decoding="async"
    class="self-center pl-[10px] object-contain w-40 h-40 md:h-[190px] xl:h-[200px]"
  />
</template>
