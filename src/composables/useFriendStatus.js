import { computed, onScopeDispose, ref, toValue } from 'vue'

const STORAGE_KEY = 'vue-userlist-friend-ids'

function loadIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

function saveIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* quota / private mode */
  }
}

/**
 * Persisted friend flag per user UUID (localStorage).
 * @param {import('vue').MaybeRefOrGetter<string | null | undefined>} uuidSource
 */
export function useFriendStatus(uuidSource) {
  const friendIds = ref(loadIds())

  const isFriend = computed(() => {
    const id = toValue(uuidSource)
    return Boolean(id && friendIds.value.includes(id))
  })

  function toggleFriend() {
    const id = toValue(uuidSource)
    if (!id) return

    const next = [...friendIds.value]
    const idx = next.indexOf(id)
    if (idx >= 0) next.splice(idx, 1)
    else next.push(id)

    friendIds.value = next
    saveIds(next)
  }

  function onStorage(e) {
    if (e.key === STORAGE_KEY) friendIds.value = loadIds()
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage)
    onScopeDispose(() => {
      window.removeEventListener('storage', onStorage)
    })
  }

  return {
    isFriend,
    toggleFriend
  }
}
