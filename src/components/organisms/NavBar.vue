<script setup lang="ts">
import { ref } from 'vue'
import BaseLogo from '@/components/atoms/BaseLogo.vue'
import data from '@/assets/data/data.json'

// Liens internes (ancres one-page)
const internalLinks = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

// Liens sociaux depuis le JSON chargé
const links = data.links

// Map icônes FA par nom (data-driven, simple et robuste)
function iconFor(name: string): [string, string] {
  const key = name.toLowerCase()
  if (key.includes('linkedin')) return ['fab', 'linkedin']
  if (key.includes('github')) return ['fab', 'github']
  return ['far', 'circle'] // fallback
}

// État drawer mobile
const open = ref(false)
const toggle = () => (open.value = !open.value)
</script>

<template>
  <header class="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
    <nav
      class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between"
      aria-label="Navigation principale"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
        <BaseLogo />
        <span class="sr-only">Retour à l'accueil</span>
      </RouterLink>

      <!-- Burger (mobile-first) -->
      <button
        type="button"
        class="xl:hidden p-2 rounded-lg ring-1 ring-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus-visible:ring-offset-[var(--primary-color)]"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="'mobile-menu'"
        @click="toggle()"
        @keydown.esc="open = false"
        aria-label="Ouvrir le menu"
      >
        <span class="sr-only">Menu</span>☰
      </button>

      <!-- Desktop nav -->
      <section class="hidden xl:flex w-full items-center justify-between pl-8">
        <!-- Liens internes -->
        <ul class="flex flex-row gap-8 text-black">
          <li v-for="item in internalLinks" :key="item.href">
            <a
              :href="item.href"
              class="transition hover:font-semibold hover:text-[var(--tertiary-color)] hover:scale-110"
              >{{ item.label }}</a
            >
          </li>
        </ul>

        <!-- Liens sociaux -->
        <ul class="flex flex-row gap-6 text-black pr-4">
          <li v-for="(link, idx) in links" :key="idx" class="flex">
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
      </section>
    </nav>

    <!-- mobile -->
    <transition name="fade">
      <section v-if="open" id="mobile-menu" class="xl:hidden px-4 pb-4 space-y-4">
        <ul class="flex flex-col items-center gap-3 text-black">
          <li v-for="item in internalLinks" :key="item.href">
            <a
              :href="item.href"
              class="block py-2 transition hover:font-semibold hover:text-[var(--tertiary-color)] hover:scale-110"
              @click="open = false"
              >{{ item.label }}</a
            >
          </li>
        </ul>

        <ul class="flex justify-center gap-6 text-black">
          <li v-for="(link, idx) in links" :key="idx" class="flex">
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
