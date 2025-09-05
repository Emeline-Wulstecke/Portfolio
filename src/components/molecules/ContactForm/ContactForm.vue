<script setup lang="ts">
// VUE
import { ref, watch, computed, nextTick } from 'vue'

// COMPONENTS
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseToaster from '@/components/atoms/BaseToaster.vue'
import FormSuccess from '@/components/molecules/ContactForm/FormSuccess.vue'
import BaseTooltip from '@/components/atoms/BaseTooltip.vue'

// Helpers & types
import { validateEmail, validateMessage } from '@/helpers/useValidation'
import type { ContactFormData } from './ContactForm.types'

// ---------- FormSubmit ----------
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/emeline.wulstecke@gmail.com'

const form = ref<ContactFormData>({
  name: '',
  email: '',
  message: '',
  _honey: '', // champ invisible anti-bot
})

const isSubmitting = ref(false)
const messageSent = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('error')

const emailError = ref('')
const messageError = ref('')

const nameInputRef = ref<HTMLInputElement | null>(null)
const emailInputRef = ref<HTMLInputElement | null>(null)
const messageTextareaRef = ref<HTMLTextAreaElement | null>(null)

const isHoveringButton = ref(false)
const isFocusingButton = ref(false)

const isFormInvalid = computed(() => {
  const isEmailFilled = form.value.email.trim() !== ''
  const isMessageFilled = form.value.message.trim() !== ''
  const isNameFilled = form.value.name.trim().length >= 2
  return (
    isSubmitting.value ||
    !isEmailFilled ||
    !isMessageFilled ||
    !isNameFilled ||
    emailError.value !== '' ||
    messageError.value !== ''
  )
})

const showTooltip = computed(
  () => isFormInvalid.value && (isHoveringButton.value || isFocusingButton.value),
)
const messageLength = computed(() => form.value.message.length)

watch(
  () => form.value.email,
  (val) => {
    const trimmed = val.trim()
    if (trimmed === '') {
      emailError.value = ''
      return
    }
    if (!trimmed.includes('@')) {
      emailError.value = 'Veuillez saisir une adresse e-mail valide.'
      return
    }
    emailError.value = validateEmail(trimmed) ? '' : 'Veuillez entrer une adresse e-mail valide.'
  },
)
watch(
  () => form.value.message,
  (val) => {
    messageError.value = validateMessage(val)
  },
)

const resetForm = () => {
  form.value = { name: '', email: '', message: '', _honey: '' }
  emailError.value = ''
  messageError.value = ''
}
const resetToForm = () => {
  messageSent.value = false
  nextTick(() => nameInputRef.value?.focus())
}

const handleSubmit = async () => {
  // validations finales
  const emailTrimmed = form.value.email.trim()
  if (emailTrimmed === '' || !emailTrimmed.includes('@')) {
    emailError.value = 'Veuillez saisir une adresse e-mail valide.'
  } else {
    emailError.value = validateEmail(emailTrimmed)
      ? ''
      : 'Veuillez entrer une adresse e-mail valide.'
  }
  messageError.value = validateMessage(form.value.message)

  if (isFormInvalid.value) {
    toastMessage.value = 'Veuillez remplir tous les champs correctement.'
    toastType.value = 'error'
    showToast.value = true
    await nextTick(() => {
      if (!form.value.name.trim()) nameInputRef.value?.focus()
      else if (emailError.value) emailInputRef.value?.focus()
      else if (messageError.value) messageTextareaRef.value?.focus()
    })
    return
  }

  // anti-bot: si le honeypot est rempli, on "réussit" silencieusement
  if (form.value._honey) {
    messageSent.value = true
    resetForm()
    return
  }

  isSubmitting.value = true
  try {
    // payload accepté par FormSubmit en JSON
    const payload = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,

      // options FormSubmit
      _subject: `Nouveau message portfolio — ${form.value.name}`,
      _template: 'table',
      _captcha: 'false',
      _url: window.location.href, // page source
    }

    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const txt = await res.text()
      throw new Error(txt || 'FormSubmit error')
    }

    messageSent.value = true
    resetForm()
  } catch (error) {
    console.error(error)
    toastMessage.value = "Une erreur s'est produite lors de l'envoi."
    toastType.value = 'error'
    showToast.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="space-y-4 w-full">
    <Transition name="fade" mode="out-in">
      <form v-if="!messageSent" @submit.prevent="handleSubmit" class="space-y-4" key="form">
        <h2 class="text-xl md:text-2xl font-bold text-[var(--secondary-color)] mb-4 text-center">
          Me contacter
        </h2>

        <!-- Anti-bot: si rempli par un robot, cela ignore la soumission -->
        <input
          type="text"
          name="_honey"
          v-model="(form as any)._honey"
          style="display: none"
          tabindex="-1"
          autocomplete="off"
        />

        <!-- Nom -->
        <div>
          <label
            for="name"
            class="block text-sm md:text-lg font-bold text-[var(--secondary-color)]"
          >
            Nom
          </label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            ref="nameInputRef"
            required
            minlength="2"
            class="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm md:text-lg font-bold text-[var(--secondary-color)]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            ref="emailInputRef"
            required
            class="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:ring focus:ring-indigo-500"
            :aria-invalid="!!emailError"
            :aria-describedby="emailError ? 'email-error' : undefined"
          />
          <p v-if="emailError" id="email-error" class="text-red-600 text-sm mt-1" role="alert">
            {{ emailError }}
          </p>
        </div>

        <!-- Message -->
        <div>
          <label
            for="message"
            class="block text-sm md:text-lg font-bold text-[var(--secondary-color)]"
          >
            Message
          </label>
          <textarea
            id="message"
            v-model="form.message"
            ref="messageTextareaRef"
            required
            minlength="5"
            maxlength="3000"
            rows="4"
            class="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:ring focus:ring-indigo-500"
            :aria-invalid="!!messageError"
            :aria-describedby="messageError ? 'message-error' : undefined"
          />
          <div class="flex justify-between items-center mt-1">
            <p v-if="messageError" id="message-error" class="text-red-600 text-sm" role="alert">
              {{ messageError }}
            </p>
            <span class="text-xs text-gray-500 ml-auto">{{ messageLength }} / 3000</span>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="relative group">
            <BaseButton
              type="submit"
              text="Envoyer"
              size="medium"
              :loading="isSubmitting"
              :disabled="isFormInvalid"
              class="mt-4"
              @mouseenter="isHoveringButton = true"
              @mouseleave="isHoveringButton = false"
              @focus="isFocusingButton = true"
              @blur="isFocusingButton = false"
            />

            <BaseTooltip
              v-if="showTooltip"
              content="Veuillez remplir tous les champs"
              placement="top"
            />
          </div>
        </div>

        <!-- Toaster erreurs -->
        <BaseToaster
          v-if="showToast && toastType === 'error'"
          :message="toastMessage"
          :type="toastType"
          position="top-right"
        />
      </form>

      <FormSuccess v-else key="confirmation" @back="resetToForm" />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
