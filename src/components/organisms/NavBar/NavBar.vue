<script setup lang="ts">
// VUE
import { ref } from 'vue'

// COMPONENTS
import BaseLogo from '@/components/atoms/BaseLogo.vue'

// DATA
import data from '@/assets/data/data.json'

// TYPE
import type { InternalLink, SocialLink } from './NavBar.type'

// Liens internes
const internalLinks: InternalLink[] = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

// Liens sociaux depuis le JSON
const links = data.links as SocialLink[]

// Map Font Awesome par nom
function iconFor(name: string): [string, string] {
  const key = name.toLowerCase()
  if (key.includes('linkedin')) return ['fab', 'linkedin']
  if (key.includes('github')) return ['fab', 'github']
  return ['far', 'circle']
}

// État du menu mobile
const open = ref(false)
const toggle = () => (open.value = !open.value)
</script>

<template>
  <header class="relative z-30 border-b bg-white/80 backdrop-blur">
    <nav
      class="mx-auto max-w-6xl px-4 py-4 flex flex-col items-center gap-4"
      aria-label="Navigation principale"
    >
      <!-- Logo + Burger -->
      <div class="w-full flex items-center justify-between lg:justify-center">
        <!-- Logo toujours centré -->
        <RouterLink to="/" class="flex justify-center items-center gap-3 mx-auto">
          <BaseLogo />
          <span class="sr-only">Retour à l'accueil</span>
        </RouterLink>

        <!-- Burger (mobile uniquement) -->
        <button
          type="button"
          class="lg:hidden p-2 rounded-lg ring-1 ring-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="mobile-menu"
          @click="toggle"
        >
          <span class="sr-only">Ouvrir le menu</span>
          ☰
        </button>
      </div>

      <!-- Barre desktop -->
      <div class="hidden lg:flex flex-row justify-between items-center w-full">
        <!-- Liens internes -->
        <ul class="flex flex-row gap-6">
          <li v-for="item in internalLinks" :key="item.href">
            <a
              :href="item.href"
              class="transition hover:font-semibold hover:text-[var(--tertiary-color)] hover:scale-110"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Liens sociaux -->
        <ul class="flex flex-row gap-6 text-black">
          <li v-for="(link, idx) in links" :key="idx">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="transition hover:scale-110"
              :aria-label="link.name"
            >
              <font-awesome-icon :icon="iconFor(link.name)" aria-hidden="true" class="text-xl" />
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
              class="transition hover:scale-110"
              :aria-label="link.name"
              @click="open = false"
            >
              <font-awesome-icon :icon="iconFor(link.name)" aria-hidden="true" class="text-xl" />
            </a>
          </li>
        </ul>
      </section>
    </transition>
  </header>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
