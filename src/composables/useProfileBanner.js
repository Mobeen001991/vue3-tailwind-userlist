import { computed, toValue } from 'vue'
import { useRegistrationLabel } from './useRegistrationLabel.js'

/**
 * Display and contact state for the profile banner.
 * @param {import('vue').MaybeRefOrGetter<object | null | undefined>} userSource
 */
export function useProfileBanner(userSource) {
  const user = computed(() => toValue(userSource) ?? null)

  const hasUser = computed(() => Boolean(user.value))

  const displayName = computed(() => {
    const u = user.value
    if (!u?.name) return ''
    return `${u.name.first} ${u.name.last}`.trim()
  })

  const avatarUrl = computed(() => user.value?.picture?.large ?? '')

  const initials = computed(() => {
    const u = user.value
    if (!u?.name) return '?'
    const a = (u.name.first?.[0] ?? '').toUpperCase()
    const b = (u.name.last?.[0] ?? '').toUpperCase()
    const out = `${a}${b}`.trim()
    return out || '?'
  })

  const locationLine = computed(() => {
    const loc = user.value?.location
    if (!loc) return ''
    const { city, country } = loc
    if (city && country) return `${city}, ${country}`
    return country || city || ''
  })

  const email = computed(() => user.value?.email ?? '')

  const userUuid = computed(() => user.value?.login?.uuid ?? '')

  const joinedLabel = useRegistrationLabel(user)

  const mailtoHref = computed(() => {
    const e = email.value
    if (!e) return null
    return `mailto:${encodeURIComponent(e)}`
  })

  return {
    user,
    hasUser,
    displayName,
    avatarUrl,
    initials,
    locationLine,
    email,
    userUuid,
    joinedLabel,
    mailtoHref
  }
}
