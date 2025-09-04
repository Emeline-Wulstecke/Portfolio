<script setup lang="ts">
// DATA
import data from '@/assets/data/data.json'

// COMPONENTS
import Link from '@/components/atoms/BaseLink.vue'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    id="footer"
    class="flex flex-col items-center gap-4 py-10 bg-[var(--tertiary-color)] text-center"
  >
    <h3 class="text-lg font-semibold text-black">Emeline Wulstecke</h3>

    <ul class="flex flex-row gap-6" role="list">
      <!-- Email -->
      <li>
        <Link :url="data.email.url" :aria-label="data.email.alt">
          <FontAwesomeIcon
            :icon="data.email.icon"
            class="text-xl text-black hover:text-[var(--primary-color)] transition-transform duration-200 hover:scale-110"
          />
        </Link>
      </li>

      <!-- Liens sociaux -->
      <li v-for="(link, index) in data.links" :key="index">
        <Link :url="link.url" :aria-label="link.alt">
          <FontAwesomeIcon
            :icon="link.icon"
            class="text-xl text-black hover:text-[var(--primary-color)] transition-transform duration-200 hover:scale-110"
          />
          <span class="sr-only">{{ link.alt }}</span>
        </Link>
      </li>
    </ul>

    <p class="text-sm text-black">© {{ currentYear }} — Tous droits réservés</p>
  </footer>
</template>
