<script setup lang="ts">
// COMPONENTS
import NavBar from './components/organisms/NavBar/NavBar.vue'
import IntroBanner from './components/molecules/IntroBanner/IntroBanner.vue'
import AboutMe from './components/organisms/AboutMe/AboutMe.vue'
import ProjectSlider from './components/molecules/ProjectSlider/ProjectSlider.vue'
import SkillsSelection from './components/molecules/SkillSelection/SkillSelection.vue'
import ContactSection from './components/organisms/ContactSection/ContactSection.vue'
import ScrollToTop from './components/atoms/ScrollToTop.vue'
import FooterSection from './components/organisms/Footer/FooterSection.vue'
</script>

<template>
  <div class="min-h-dvh bg-white text-gray-900">
    <NavBar />
    <main>
      <IntroBanner
        title="Welcome to My Portfolio"
        subtitle="By Emeline"
        image="/images/banner.webp"
      />

      <AboutMe title="About Me" aboutImg="/images/about.webp" buttonText="Learn More" />
      <ProjectSlider />
      <SkillsSelection />
      <ContactSection />
      <ScrollToTop />
    </main>
    <FooterSection />
  </div>
</template>
