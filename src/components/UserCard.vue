<template>
  <div
    @click="$emit('click')"
    class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-400 transform hover:-translate-y-2 group"
  >
    <div class="p-6">
      <!-- Avatar -->
      <div class="flex justify-center mb-5">
        <div class="relative">
          <img
            :src="user.picture.large"
            :alt="`${user.name.first} ${user.name.last}`"
            class="w-28 h-28 rounded-full border-4 border-gray-100 object-cover group-hover:border-blue-200 transition-colors shadow-md"
          />
          <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
      </div>

      <!-- User Info -->
      <div class="text-center">
        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {{ user.name.first }} {{ user.name.last }}
        </h3>
        <p class="text-sm text-gray-500 mb-3 flex items-center justify-center gap-1.5 truncate">
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="truncate">{{ user.email }}</span>
        </p>
        <p class="text-sm text-gray-600 flex items-center justify-center gap-1.5">
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{{ user.location.city }}, {{ user.location.country }}</span>
        </p>
      </div>

      <!-- Click Hint -->
      <div class="mt-5 pt-4 border-t border-gray-100">
        <p class="text-xs text-blue-600 text-center font-semibold uppercase tracking-wide group-hover:text-blue-700 transition-colors">
          View Details →
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

