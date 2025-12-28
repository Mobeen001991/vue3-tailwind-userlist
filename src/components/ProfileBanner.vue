<template>
  <div v-if="user" class="relative">
    <!-- Banner Section -->
    <div class="px-4 sm:px-6 py-2  relative bg-theme-blue">
      <div class="container mx-auto view-container flex flex-row md:flex-row items-start md:items-end gap-4 md:gap-6">
        <!-- Profile Picture - Positioned to overlap both blue banner and white section below (only on desktop) -->
        <div class="flex">
        <div class="relative top-0 md:top-[45px] z-10">
          <img
            :src="user.picture.large"
            :alt="`${user.name.first} ${user.name.last}`"
            class="w-24 h-24 sm:w-[140px] sm:h-[140px] rounded-lg object-cover border-2 border-white shadow-lg bg-white"
          />
        </div>
        </div>


        <!-- Name and Buttons Container -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto   ">
          <!-- User Info -->
          <div class="flex-1">
            <h2 class="text-xl sm:text-2xl lg:text-5xl md:text-2xl font-extrabold text-white mb-1">
              {{ user.name.first }} {{ user.name.last }}
            </h2>
            <p class="text-white text-xs sm:text-lg opacity-90">
              Last online: {{ getLastOnlineText() }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-end gap-2 sm:gap-3 w-full md:w-auto">
          <!-- Send Message Button: White background with light blue text and border, bigger size, icon rotated 30deg -->
          <button
            class="bg-white hover:bg-theme-blue hover:text-white hover:border-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-medium sm:font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md border border-theme-blue text-theme-blue flex-1 md:flex-none"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-[30deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <!-- Add Friend Button: Light blue background with white border (1px) -->
          <button
            class="hover:bg-white hover:text-theme-blue hover:border-theme-blue text-white px-4 py-2 sm:px-6 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-medium sm:font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-md border border-white bg-theme-blue flex-1 md:flex-none"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline">Add Friend</span>
            <span class="sm:hidden">Add</span>
          </button>
          </div>
        </div>
      </div>
    </div>
    <!-- White section below for profile picture overlap -->
 
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const getLastOnlineText = () => {
  if (!props.user) return 'Recently'
  // Generate a random "last online" text for demo
  const days = Math.floor(Math.random() * 7) + 1
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}
</script>

