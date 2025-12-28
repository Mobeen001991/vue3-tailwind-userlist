<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Profile Banner -->
    <ProfileBanner :user="selectedUser || users[0]" />

    <!-- Main Content -->
    <div class="px-6 py-6 md:mt-20 mt-4">
      <!-- Container for Search and Rows -->
      <div class="container mx-auto view-container">
        <!-- Search and Refresh -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 md:items-center items-end justify-between">
        <div class="relative flex-1 w-full sm:max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="w-full px-4 py-2.5 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-blue focus:border-theme-blue outline-none transition-all bg-white text-gray-900 placeholder-gray-400"
          />
          <svg
            class="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          @click="refreshUsers"
          :disabled="loading"
          class="px-6 sm:py-2.5 sm:text-lg text-sm py-2 bg-theme-blue text-white rounded-lg hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 whitespace-nowrap font-medium"
        >
          <svg
            v-if="!loading"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <svg
            v-else
            class="animate-spin w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
        </div>

          <!-- Loading State -->
        <div v-if="loading && users.length === 0" class="flex justify-center items-center py-20">
          <div class="text-center">
            <svg
              class="animate-spin h-12 text-theme-blue w-12 mx-auto mb-4"
             
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="text-gray-600">Loading users...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p class="font-semibold">Error loading users</p>
          <p class="text-sm">{{ error }}</p>
          <button
            @click="refreshUsers"
            class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- User List Header -->
        <div v-if="filteredUsers.length > 0" class="mb-3 px-8">
          <div class="grid grid-cols-4 gap-4 text-xs font-medium text-gray-400">
            <div>Date</div>
            <div>Name</div>
            <div>Gender</div>
            <div>Country</div>
          </div>
        </div>

        <!-- User Cards List -->
        <div v-if="filteredUsers.length > 0" class="space-y-3  ">
        <div
          v-for="user in filteredUsers"
          :key="user.login.uuid"
          @click="openModal(user)"
          class="bg-white rounded-lg shadow-md hover:shadow-lg border-2 border-transparent hover:border-theme-blue transition-all cursor-pointer md:px-8 md:py-5 px-4 py-3 group"
        >
          <div class="grid grid-cols-4 gap-4 items-center">
            <!-- Date -->
            <div class="md:text-base text-sm text-text-light">
              {{ formatDate(user.registered.date) }}
            </div>
            
            <!-- Name -->
            <div class="md:text-base  text-sm font-medium transition-colors text-text-dark group-hover:text-theme-blue">
              {{ user.name.first }} {{ user.name.last }}
            </div>
            
            <!-- Gender -->
            <div class="md:text-base text-sm capitalize text-text-light">
              {{ user.gender }}
            </div>
            
            <!-- Country -->
            <div class="md:text-base text-sm text-text-dark">
              {{ user.location.country }}
            </div>
          </div>
        </div>
        </div>

          <!-- No Results -->
        <div v-else class="text-center py-20">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-gray-600 text-lg">No users found matching your search</p>
        <p class="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
        </div>
      </div>
    </div>

    <!-- User Modal -->
    <UserModal
      v-if="selectedUser && showModal"
      :user="selectedUser"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchUsers } from '../services/api'
import NavigationBar from './NavigationBar.vue'
import ProfileBanner from './ProfileBanner.vue'
import UserModal from './UserModal.vue'

const users = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedUser = ref(null)
const showModal = ref(false)

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value
  }

  const query = searchQuery.value.toLowerCase()
  return users.value.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
    const email = user.email.toLowerCase()
    const country = user.location.country.toLowerCase()
    
    return (
      fullName.includes(query) ||
      email.includes(query) ||
      country.includes(query)
    )
  })
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

const loadUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const data = await fetchUsers()
    users.value = data
  } catch (err) {
    error.value = err.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

const refreshUsers = () => {
  loadUsers()
}

const updateBanner = (user) => {
  selectedUser.value = user
}

const openModal = (user) => {
  selectedUser.value = user
  showModal.value = true
  // Also update the banner
  updateBanner(user)
}

const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  loadUsers()
})
</script>
