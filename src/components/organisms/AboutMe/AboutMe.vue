<script setup lang="ts">
// TYPES
import type { AboutProps } from './AboutMe.types'

// COMPONENTS
import Link from '@/components/atoms/BaseLink.vue'

const props = defineProps<AboutProps>()
</script>

<template>
  <section id="about" class="w-full py-12 md:py-20">
    <div
      class="max-w-[1200px] mx-auto flex flex-col items-center justify-between md:flex-row md:items-start gap-10 px-4 md:px-8 animate-fade-up"
    >
      <!-- IMAGE -->
      <figure class="relative w-72 sm:w-96 md:w-[500px] aspect-square rounded-xl">
        <img
          :src="props.aboutImg"
          alt="image détourée d'Emeline"
          class="absolute inset-0 w-full h-full object-contain z-10 bg-[var(--primary-color)]"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <!-- TEXTE -->
      <div
        class="max-w-xl text-sm bg-[var(--primary-color)] shadow-xl p-5 md:text-base leading-relaxed text-justify"
      >
        <h2 class="text-2xl md:text-3xl font-semibold mb-4">Qui suis-je ?</h2>
        <p>
          Hello moi c'est Emeline et je réside à Lille, je suis une passionnée de voyages! À l'âge
          de 32 ans, j'ai entrepris une nouvelle aventure en plongeant dans le monde du
          développement web. Pour moi, chaque ligne de code représente une nouvelle destination à
          explorer, une nouvelle histoire à écrire. J'ai commencé une formation en alternance avec
          <Link url="https://openclassrooms.com/fr/"
            ><span class="font-bold">OpenClassrooms</span></Link
          >.
        </p>

        <p class="mt-4">
          Après un an d’alternance chez
          <Link url="https://www.assessfirst.com"
            ><span class="font-bold underline">AssessFirst</span></Link
          >, j’ai appris à maîtriser Vue.js,Tailwind et TypeScript. J’ai surtout énormément appris,
          grâce à une équipe qui m’a fait confiance, m’a laissée tester, rater, recommencer et
          évoluer. Aujourd’hui, je suis fière de signer mon <strong>CDI</strong> — une belle preuve
          que tout est possible avec de la motivation, un bon mindset et des personnes qui croient
          en toi, on peut clairement se dépasser et se surprendre soi-même.
        </p>

        <p class="mt-4">
          Je cherche désormais à continuer à progresser, apprendre, expérimenter et créer au sein
          d’une équipe bienveillante et stimulante ✨
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.8s ease-out both;
}
</style>
