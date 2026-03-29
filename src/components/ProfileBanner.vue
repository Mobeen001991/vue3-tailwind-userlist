<template>
  <div v-if="hasUser" class="relative">
    <div class="px-4 sm:px-6 py-2 relative bg-theme-blue">
      <div
        class="container mx-auto view-container flex flex-row md:flex-row items-start md:items-end gap-4 md:gap-6"
      >
        <div class="relative top-0 md:top-[45px] z-10 shrink-0">
          <img
            v-if="!avatarFailed && avatarUrl"
            :src="avatarUrl"
            :alt="displayName"
            loading="lazy"
            decoding="async"
            class="w-24 h-24 sm:w-[140px] sm:h-[140px] rounded-lg object-cover border-2 border-white shadow-lg bg-white"
            @error="onAvatarError"
          />
          <div
            v-else
            class="w-24 h-24 sm:w-[140px] sm:h-[140px] rounded-lg border-2 border-white shadow-lg bg-white/10 flex items-center justify-center text-white text-2xl sm:text-4xl font-bold"
            aria-hidden="true"
          >
            {{ initials }}
          </div>
        </div>

        <div
          class="flex flex-col lg:flex-row md:flex-col items-start md:items-start lg:items-center gap-4 md:gap-6 w-full min-w-0 md:w-auto"
        >
          <div class="flex-1 min-w-0">
            <h2 class="text-xl sm:text-2xl lg:text-5xl md:text-2xl font-extrabold text-white mb-1">
              {{ displayName }}
            </h2>
            <p
              v-if="locationLine"
              class="text-white text-xs sm:text-base opacity-90 truncate"
            >
              {{ locationLine }}
            </p>
            <p v-if="joinedLabel" class="text-white text-xs sm:text-lg opacity-90 mt-0.5">
              Joined {{ joinedLabel }}
            </p>
            <div
              v-if="email"
              class="mt-2 flex flex-wrap items-center gap-2 text-white/95 text-xs sm:text-sm"
            >
              <a
                class="truncate underline-offset-2 hover:underline min-w-0 max-w-full sm:max-w-md"
                :href="mailtoHref ?? undefined"
              >
                {{ email }}
              </a>
              <button
                type="button"
                class="shrink-0 inline-flex items-center gap-1 rounded-md border border-white/40 bg-white/10 px-2 py-1 text-xs font-medium hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                :aria-label="copyEmailLabel"
                @click="onCopyEmail"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <p id="copy-email-status" class="sr-only" aria-live="polite">
              {{ copyStatusMessage }}
            </p>
          </div>

          <div class="flex items-end gap-2 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              v-if="mailtoHref"
              :href="mailtoHref"
              class="bg-white hover:bg-theme-blue hover:text-white hover:border-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-medium sm:font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md border border-theme-blue text-theme-blue flex-1 md:flex-none text-center"
              :aria-label="`Send email to ${displayName}`"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-[30deg] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span class="hidden sm:inline">Send Message</span>
              <span class="sm:hidden">Send</span>
            </a>
            <button
              v-else
              type="button"
              disabled
              class="bg-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-medium sm:font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 shadow-md border border-theme-blue text-theme-blue flex-1 md:flex-none text-center opacity-50 cursor-not-allowed"
              aria-label="Email unavailable"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-[30deg] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span class="hidden sm:inline">Send Message</span>
              <span class="sm:hidden">Send</span>
            </button>
            <button
              type="button"
              class="px-4 py-2 sm:px-6 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-medium sm:font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md border flex-1 md:flex-none"
              :class="
                isFriend
                  ? 'bg-emerald-600/90 border-emerald-100 text-white hover:bg-emerald-600'
                  : 'hover:bg-white hover:text-theme-blue hover:border-theme-blue text-white border-white bg-theme-blue'
              "
              :aria-pressed="isFriend"
              :aria-label="friendButtonLabel"
              @click="onToggleFriend"
            >
              <svg
                v-if="isFriend"
                class="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else
                class="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span class="hidden sm:inline">{{ isFriend ? 'Friends' : 'Add Friend' }}</span>
              <span class="sm:hidden">{{ isFriend ? 'Added' : 'Add' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useClipboard } from '../composables/useClipboard.js'
import { useFriendStatus } from '../composables/useFriendStatus.js'
import { useProfileBanner } from '../composables/useProfileBanner.js'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['friend-change'])

const userModel = computed(() => props.user)

const {
  hasUser,
  displayName,
  avatarUrl,
  initials,
  locationLine,
  email,
  userUuid,
  joinedLabel,
  mailtoHref
} = useProfileBanner(userModel)

const { isFriend, toggleFriend } = useFriendStatus(userUuid)

const { copied, copy } = useClipboard()

const avatarFailed = ref(false)

watch(userUuid, () => {
  avatarFailed.value = false
})

function onAvatarError() {
  avatarFailed.value = true
}

const copyEmailLabel = computed(() =>
  copied.value ? 'Email copied to clipboard' : 'Copy email address'
)

const copyStatusMessage = computed(() => {
  if (copied.value) return 'Email address copied to clipboard.'
  if (email.value) return ''
  return ''
})

const friendButtonLabel = computed(() =>
  isFriend.value ? `Remove ${displayName.value} from friends` : `Add ${displayName.value} as friend`
)

async function onCopyEmail() {
  await copy(email.value)
}

function onToggleFriend() {
  toggleFriend()
  emit('friend-change', {
    uuid: userUuid.value,
    isFriend: isFriend.value
  })
}
</script>
