import { computed, toValue } from 'vue'

/**
 * Relative time label for the user's registration date (API-backed).
 * @param {import('vue').MaybeRefOrGetter<object | null | undefined>} userSource
 */
export function useRegistrationLabel(userSource) {
  return computed(() => {
    const user = toValue(userSource)
    const raw = user?.registered?.date
    if (!raw) return ''

    const then = new Date(raw)
    if (Number.isNaN(then.getTime())) return ''

    const now = Date.now()
    const diffMs = now - then.getTime()
    if (diffMs < 0) return 'Recently'

    const diffDays = Math.floor(diffMs / 86_400_000)

    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

    if (diffDays < 1) return rtf.format(0, 'day')

    if (diffDays < 30) {
      return rtf.format(-diffDays, 'day')
    }

    const approxMonths = Math.floor(diffDays / 30)
    if (approxMonths < 12) {
      return rtf.format(-approxMonths, 'month')
    }

    const approxYears = Math.floor(diffDays / 365)
    return rtf.format(-approxYears, 'year')
  })
}
