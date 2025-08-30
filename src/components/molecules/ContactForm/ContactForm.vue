<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as emailjs from '@emailjs/browser'

const formData = reactive({
  name: '',
  email: '',
  message: '',
})

const isSending = ref(false)
const hasSent = ref(false)
const errorMsg = ref<string | null>(null)

async function sendForm() {
  isSending.value = true
  hasSent.value = false
  errorMsg.value = null

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
    )
    hasSent.value = true
    Object.assign(formData, { name: '', email: '', message: '' })
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMsg.value = err.message
    } else {
      errorMsg.value = 'Une erreur est survenue.'
    }
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <form @submit.prevent="sendForm" class="flex flex-col gap-4 w-full p-4 sm:p-8">
    <label for="name" class="text-white">Nom</label>
    <input
      id="name"
      name="from_name"
      v-model="formData.name"
      type="text"
      required
      class="bg-transparent border-b border-white text-white px-2 py-1 focus:outline-none"
    />

    <label for="email" class="text-white">Email</label>
    <input
      id="email"
      name="reply_to"
      v-model="formData.email"
      type="email"
      required
      class="bg-transparent border-b border-white text-white px-2 py-1 focus:outline-none"
    />

    <label for="message" class="text-white">Message</label>
    <textarea
      id="message"
      name="message"
      v-model="formData.message"
      required
      class="bg-transparent border-b border-white text-white px-2 py-1 min-h-[120px] resize-none focus:outline-none"
    />

    <button
      type="submit"
      :disabled="isSending"
      class="w-1/2 sm:w-1/3 self-center mt-4 px-4 py-2 rounded-full border border-tertiary text-white bg-tertiary hover:scale-105 transition disabled:opacity-50"
    >
      {{ isSending ? 'Envoi…' : 'Envoyer' }}
    </button>

    <p v-if="hasSent" class="text-green-400 text-center text-sm">Message envoyé ✅</p>
    <p v-if="errorMsg" class="text-red-500 text-center text-sm">{{ errorMsg }}</p>
  </form>
</template>
