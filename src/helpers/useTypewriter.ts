import { ref, onMounted, watch, type Ref } from 'vue'

export interface TypewriterOptions {
  enabled?: boolean
  typingSpeed?: number
  startDelay?: number
  loop?: boolean
  pauseMs?: number
  deleteSpeed?: number
}

export function useTypewriter(source: Ref<string | undefined>, opts: TypewriterOptions = {}) {
  const {
    enabled = true,
    typingSpeed = 45,
    startDelay = 250,
    loop = false,
    pauseMs = 1200,
    deleteSpeed = 30,
  } = opts

  const text = source
  const displayed = ref('')
  const finished = ref(false)
  let timer: number | null = null
  let i = 0
  let running = false

  const clear = () => {
    if (timer !== null) {
      window.clearTimeout(timer)
      timer = null
    }
  }

  const type = (content: string) => {
    if (!running) return
    if (i <= content.length) {
      displayed.value = content.slice(0, i++)
      timer = window.setTimeout(() => type(content), typingSpeed)
    } else {
      finished.value = true
      if (loop) {
        finished.value = false
        timer = window.setTimeout(() => erase(content), pauseMs)
      }
    }
  }

  const erase = (content: string) => {
    if (!running) return
    if (i >= 0) {
      displayed.value = content.slice(0, i--)
      timer = window.setTimeout(() => erase(content), deleteSpeed)
    } else {
      i = 0
      timer = window.setTimeout(start, startDelay)
    }
  }

  const start = () => {
    clear()
    const content = text.value ?? ''
    if (!enabled || !content) {
      displayed.value = content
      finished.value = true
      return
    }
    running = true
    finished.value = false
    i = 0
    timer = window.setTimeout(() => type(content), startDelay)
  }

  const stop = () => {
    running = false
    clear()
  }

  onMounted(start)
  watch(text, () => {
    stop()
    start()
  })

  return { displayed, finished, start, stop }
}

export default useTypewriter
