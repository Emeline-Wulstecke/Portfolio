<script setup lang="ts">
// COMPONENTS
import NavBar from './components/organisms/NavBar/NavBar.vue'
import IntroBanner from './components/molecules/IntroBanner/IntroBanner.vue'
import AboutMe from './components/organisms/AboutMe/AboutMe.vue'
</script>

<template>
  <div class="min-h-dvh bg-white text-gray-900">
    <NavBar />
    <main>
      <IntroBanner
        title="Welcome to My Portfolio"
        subtitle="By Emeline"
        image="/src/assets/images/banner.png"
      />

      <AboutMe title="About Me" aboutImg="/src/assets/images/about.png" buttonText="Learn More" />
    </main>
  </div>
</template>
