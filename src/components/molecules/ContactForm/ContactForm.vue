<script setup lang="ts">
import emailjs from '@emailjs/browser'
import { ref } from 'vue'
import BaseToaster from '@/components/atoms/BaseToaster.vue'
import type { ContactFormData } from './ContactForm.types'

const form = ref<ContactFormData>({
  name: '',
  email: '',
  message: '',
})

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

const resetForm = () => {
  form.value = { name: '', email: '', message: '' }
}

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubmit = async () => {
  const { name, email, message } = form.value

  if (name.trim().length < 2 || !validateEmail(email) || message.trim().length < 5) {
    toastMessage.value = 'Veuillez remplir tous les champs correctement.'
    toastType.value = 'error'
    showToast.value = true
    return
  }

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.value,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )

    toastMessage.value = 'Message envoyé avec succès !'
    toastType.value = 'success'
    showToast.value = true
    resetForm()
  } catch (error) {
    toastMessage.value = "Une erreur s'est produite."
    toastType.value = 'error'
    showToast.value = true
    console.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-xl mx-auto w-full px-4 md:px-0">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
      <input
        id="name"
        type="text"
        v-model="form.name"
        required
        minlength="2"
        class="w-full border-b border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 bg-transparent"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        type="email"
        v-model="form.email"
        required
        class="w-full border-b border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 bg-transparent"
      />
    </div>

    <div>
      <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        required
        minlength="5"
        rows="4"
        class="w-full border-b border-gray-300 focus:outline-none focus:ring focus:ring-indigo-500 bg-transparent"
      />
    </div>

    <button
      type="submit"
      class="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
    >
      Envoyer
    </button>

    <BaseToaster v-if="showToast" :message="toastMessage" :type="toastType" position="top-right" />
  </form>
</template>
