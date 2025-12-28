<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="close"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
        @click.stop
      >
        <!-- Close Button -->
        <button
          @click="close"
          class="absolute top-5 right-5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-all z-10"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal Content -->
        <div class="p-6 md:p-8">
          <!-- Name at top -->
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pr-8">
            {{ user.name.first }} {{ user.name.last }}
          </h2>

          <!-- Details List -->
          <div class="space-y-4">
            <!-- Date -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">Date</span>
              <span class="text-sm font-medium text-gray-900">{{ formatDateShort(user.registered.date) }}</span>
            </div>

            <!-- Status -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">Status</span>
              <span class="text-sm font-medium text-gray-900">Active</span>
            </div>

            <!-- Gender -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">Gender</span>
              <span class="text-sm font-medium text-gray-900 capitalize">{{ user.gender }}</span>
            </div>

            <!-- Country -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">Country</span>
              <span class="text-sm font-medium text-gray-900">{{ user.location.country }}</span>
            </div>

            <!-- Email -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-400">Email</span>
              <span class="text-sm font-medium text-gray-900">{{ user.email }}</span>
            </div>
          </div>
        </div>
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

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}
</script>

