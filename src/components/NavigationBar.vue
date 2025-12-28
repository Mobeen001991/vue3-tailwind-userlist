<template>
  <!-- Red line at the very top -->
  <div class="h-1 bg-red-500"></div>
  <nav class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="container mx-auto view-container flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <!-- KIRATECH Logo - Orange bird icon + text -->
        <div class="flex items-center gap-2.5">
          <svg
            class="w-9 h-9"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Stylized bird/phoenix icon in orange gradient -->
            <path
              d="M20 5C12 5 6 10 6 17C6 22 9 25 12 27C14 28 16 29 18 30C19 31 20 31 20 32C20 31 21 31 22 30C24 29 26 28 28 27C31 25 34 22 34 17C34 10 28 5 20 5Z"
              fill="url(#orangeGradient)"
            />
            <path
              d="M12 20C12 20 14 18 16 18C18 18 20 20 20 20L20 25C20 25 18 23 16 23C14 23 12 25 12 25L12 20Z"
              fill="#FF8C42"
            />
            <path
              d="M20 20C20 20 22 18 24 18C26 18 28 20 28 20L28 25C28 25 26 23 24 23C22 23 20 25 20 25L20 20Z"
              fill="#FF8C42"
            />
            <defs>
              <linearGradient id="orangeGradient" x1="6" y1="5" x2="34" y2="32" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF6B35" />
                <stop offset="0.5" stop-color="#FF8C42" />
                <stop offset="1" stop-color="#F7931E" />
              </linearGradient>
            </defs>
          </svg>
          <span class="text-2xl font-bold text-gray-900 tracking-tight">KIRATECH</span>
        </div>
      </div>

      <!-- Right Icons -->
      <div class="flex items-center gap-4">
        <!-- Notification Bell -->
        <button class="text-gray-900 hover:text-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <!-- Settings Gear -->
        <button class="text-gray-900 hover:text-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <!-- Logout -->
        <button class="text-gray-900 hover:text-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

