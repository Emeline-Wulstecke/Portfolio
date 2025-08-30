<script setup lang="ts">
import ContactForm from '@/components/molecules/ContactForm/ContactForm.vue'
</script>

<template>
  <section id="contact" class="w-full flex flex-col lg:flex-row bg-primary shadow-lg mb-12">
    <img
      src="../../../assets/images/info.webp"
      alt="illustration contact"
      class="w-full lg:w-1/2 object-cover max-h-[600px]"
    />s
    <div class="w-full lg:w-1/2 flex flex-col">
      <h2 class="text-white text-2xl text-center pt-6 sm:pt-12">Me contacter</h2>
      <ContactForm />
    </div>
  </section>
</template>
