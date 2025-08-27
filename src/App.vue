<script setup lang="ts">
import NavBar from './components/organisms/NavBar/NavBar.vue'
import IntroBanner from './components/molecules/IntroBanner/IntroBanner.vue'
</script>

<template>
  <div class="min-h-dvh bg-white text-gray-900">
    <NavBar />
    <main>
      <IntroBanner
        title="Welcome to My Portfolio"
        subtitle="By Emeline"
        image="/src/assets/images/banner.webp"
      />
    </main>
  </div>
</template>
