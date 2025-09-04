<script setup lang="ts">
import { ref } from 'vue'
import BaseLogo from '@/components/atoms/BaseLogo.vue'
import data from '@/assets/data/data.json'
import type { InternalLink, SocialLink } from './NavBar.type'

const internalLinks: InternalLink[] = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const links = data.links as SocialLink[]

function iconFor(name: string): [string, string] {
  const key = name.toLowerCase()
  if (key.includes('linkedin')) return ['fab', 'linkedin']
  if (key.includes('github')) return ['fab', 'github']
  return ['far', 'circle']
}

const open = ref(false)
const toggle = () => (open.value = !open.value)
</script>

<template>
  <header class="relative z-30 bg-white/80 backdrop-blur">
    <nav
      class="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4"
      aria-label="Navigation principale"
    >
      <!-- Mobile Top Bar -->
      <div class="w-full flex items-center justify-between lg:hidden">
        <RouterLink to="/" class="flex justify-center items-center gap-3 mx-auto">
          <BaseLogo />
          <span class="sr-only">Retour à l'accueil</span>
        </RouterLink>

        <button
          type="button"
          class="p-2 rounded-lg ring-1 ring-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="mobile-menu"
          @click="toggle"
        >
          <span class="sr-only">Ouvrir le menu</span>
          ☰
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:grid lg:grid-cols-3 lg:items-center lg:w-full">
        <!-- Liens internes -->
        <ul class="flex flex-row gap-6 justify-start">
          <li v-for="item in internalLinks" :key="item.href">
            <a
              :href="item.href"
              class="inline-block text-xl text-black transition-transform duration-200 hover:scale-110 hover:text-[var(--tertiary-color)]"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Logo -->
        <div class="flex justify-center">
          <RouterLink to="/" class="flex items-center gap-3">
            <BaseLogo />
            <span class="sr-only">Retour à l'accueil</span>
          </RouterLink>
        </div>

        <!-- Liens sociaux -->
        <ul class="flex flex-row gap-6 justify-end">
          <li v-for="(link, idx) in links" :key="idx">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="link.name"
              class="inline-block text-xl text-black transition-transform duration-200 hover:scale-110 hover:text-[var(--tertiary-color)]"
            >
              <font-awesome-icon :icon="iconFor(link.name)" class="text-xl" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Menu mobile déroulant -->
    <transition name="fade">
      <section v-if="open" id="mobile-menu" class="lg:hidden px-4 pb-4 space-y-4">
        <ul class="flex flex-col items-center gap-3 text-black">
          <li v-for="item in internalLinks" :key="item.href">
            <a
              :href="item.href"
              class="block py-2 transition hover:font-semibold hover:text-[var(--tertiary-color)]"
              @click="open = false"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <ul class="flex justify-center gap-6 text-black">
          <li v-for="(link, idx) in links" :key="idx">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="link.name"
              class="inline-block transition-transform duration-200 text-black hover:scale-110 hover:text-[var(--tertiary-color)]"
              @click="open = false"
            >
              <font-awesome-icon :icon="iconFor(link.name)" class="text-xl" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </section>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
