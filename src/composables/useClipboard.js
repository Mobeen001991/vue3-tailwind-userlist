import { ref, onScopeDispose } from 'vue'

/**
 * Copy text to the clipboard with transient success state (for UI / a11y).
 */
export function useClipboard(resetMs = 2000) {
  const copied = ref(false)
  const error = ref(null)
  let timer

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  async function copy(text) {
    if (text == null || text === '') return false

    error.value = null

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(String(text))
      } else {
        const ta = document.createElement('textarea')
        ta.value = String(text)
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }

      copied.value = true
      clearTimer()
      timer = window.setTimeout(() => {
        copied.value = false
      }, resetMs)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Copy failed'
      copied.value = false
      return false
    }
  }

  onScopeDispose(() => {
    clearTimer()
  })

  return { copied, error, copy }
}
