export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateMessage = (message: string) => {
  if (message.length === 0) return ''
  const hasSpecialChars = /[^a-zA-ZÀ-ÿ0-9 .,;:!?'"()\n\r-]/.test(message)
  const isTooLong = message.length > 3000
  const isTooShort = message.length < 5

  if (hasSpecialChars) return 'Le message contient des caractères non autorisés.'
  if (isTooLong) return 'Le message ne doit pas dépasser 3000 caractères.'
  if (isTooShort) return 'Le message est trop court.'
  return ''
}
