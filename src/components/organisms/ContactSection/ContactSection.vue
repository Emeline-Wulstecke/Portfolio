<template>
  <section
    id="contact"
    class="relative isolate w-full min-h-screen flex items-center justify-center overflow-hidden bg-primary"
  >
    <!-- Dégradé flou artistique en fond -->
    <div
      class="absolute -z-10 w-[1600px] h-[1600px] bg-[radial-gradient(circle_at_30%_30%,_var(--primary-color),_transparent_60%)] opacity-50 blur-[120px] pointer-events-none rotate-45"
    ></div>
    <div
      class="absolute -z-20 w-[1400px] h-[1400px] bg-[radial-gradient(circle_at_70%_70%,_var(--secondary-color),_transparent_70%)] opacity-20 blur-[100px] pointer-events-none -rotate-12"
    ></div>

    <!-- Carte formulaire audacieuse -->
    <div
      class="group w-full max-w-xl mx-auto p-10 md:p-12 rounded-[2rem] shadow-2xl bg-white/60 backdrop-blur-[10px] border border-[rgba(255,255,255,0.15)] transition duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:bg-zinc-900/60 dark:border-zinc-700 hover:scale-[1.02]"
    >
      <ContactForm />
    </div>
  </section>
</template>

<script setup lang="ts">
// COMPONENTS
import ContactForm from '@/components/molecules/ContactForm/ContactForm.vue'
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
