<script setup lang="ts">
import SkillScroller from './SkillScroller.vue'
import data from '@/assets/data/data.json'

const skills = data.skills
</script>

<template>
  <section id="skills" class="relative bg-white py-10 overflow-hidden">
    <h2 class="text-2xl font-bold text-center">Skills</h2>
    <SkillScroller :skills="skills" />
  </section>
</template>
