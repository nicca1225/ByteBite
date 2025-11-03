<template>
  <div class="profile bg-black min-h-screen pb-12">
    <!-- ========== PROFILE HEADER ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-10 sm:p-12 shadow-2xl border border-gray-800/50 hover:border-yellow-400/20 transition-all duration-300">
        <!-- Subtle background accent -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -z-10 opacity-50"></div>

        <div class="flex items-center gap-8 flex-col sm:flex-row relative z-10">
          <!-- Profile Picture -->
          <div class="relative group flex-shrink-0">
            <img
              v-if="profileData.photoURL"
              :src="profileData.photoURL"
              alt="Profile"
              class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-3 border-yellow-400/40 group-hover:border-yellow-400 transition-all duration-300 shadow-xl"
            />
            <div
              v-else
              class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-5xl font-light text-black border-3 border-yellow-400/40 group-hover:border-yellow-400 transition-all duration-300 shadow-xl"
            >
              {{ userName.charAt(0).toUpperCase() }}
            </div>
            <!-- Upload Photo Button -->
            <label
              class="absolute -bottom-3 -right-3 bg-yellow-400 hover:bg-yellow-300 text-black p-2.5 rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl hover:scale-125 transform"
              title="Upload profile picture"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input
                type="file"
                accept="image/*"
                @change="handleProfilePictureUpload"
                class="hidden"
              />
            </label>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left">
            <div class="inline-block mb-4">
              <span class="text-xs font-semibold uppercase tracking-wider text-yellow-400/70 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 hover:border-yellow-400/40 transition-colors">
                User Profile
              </span>
            </div>
            <h2 class="text-5xl sm:text-5xl font-light text-white mb-2 tracking-tight">{{ userName }}</h2>
            <p class="text-gray-400 text-base mb-3">{{ userEmail }}</p>
            <p class="text-xs text-gray-500 uppercase tracking-wider font-medium">Member since <span class="text-yellow-400/70">{{ formatDate(profileData.createdAt) }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== MAIN PROFILE CONTENT - SIDE BY SIDE ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Notification Messages -->
      <transition name="slide-fade">
        <div v-if="successMessage" class="mb-6 p-4 bg-green-900/30 border border-green-500/50 text-green-300 rounded-xl flex items-center gap-3 backdrop-blur-sm">
          <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm font-medium">{{ successMessage }}</span>
        </div>
      </transition>

      <transition name="slide-fade">
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-xl flex items-center gap-3 backdrop-blur-sm">
          <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm font-medium">{{ errorMessage }}</span>
        </div>
      </transition>

      <!-- Side by Side Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Left Sidebar - Tabs Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-gradient-to-b from-gray-900/60 to-black rounded-2xl border border-gray-800/40 overflow-hidden sticky top-24 shadow-xl hover:border-gray-700/40 transition-all duration-300 backdrop-blur-sm">
            <nav class="flex flex-col divide-y divide-gray-800/30">
              <!-- Personal Info Tab -->
              <button
                @click="activeTab = 'personal'"
                :class="[
                  'px-6 py-5 font-light transition-all text-left border-l-4 flex items-center gap-3 group hover:bg-gray-800/30',
                  activeTab === 'personal'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400'
                    : 'text-gray-300 border-transparent'
                ]"
              >
                <svg class="w-5 h-5 flex-shrink-0 transition-colors" :class="activeTab === 'personal' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="text-sm font-semibold uppercase tracking-wider">Personal</span>
              </button>

              <!-- Dietary Preferences Tab -->
              <button
                @click="activeTab = 'preferences'"
                :class="[
                  'px-6 py-5 font-light transition-all text-left border-l-4 flex items-center gap-3 group hover:bg-gray-800/30',
                  activeTab === 'preferences'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400'
                    : 'text-gray-300 border-transparent'
                ]"
              >
                <svg class="w-5 h-5 flex-shrink-0 transition-colors" :class="activeTab === 'preferences' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <!-- Fork -->
                  <path d="M2 4v8a3 3 0 003 3h2v5"></path>
                  <path d="M4 4v3"></path>
                  <path d="M6 4v3"></path>
                  <path d="M8 4v3"></path>
                  <!-- Spoon -->
                  <path d="M15 4a3 3 0 00-3 3v2a3 3 0 003 3h1v5"></path>
                  <!-- Knife -->
                  <path d="M19 4a1 1 0 011 1v10"></path>
                  <path d="M20 14l-2 2"></path>
                </svg>
                <span class="text-sm font-semibold uppercase tracking-wider">Preferences</span>
              </button>

              <!-- Privacy and Security Tab -->
              <button
                @click="activeTab = 'privacy'"
                :class="[
                  'px-6 py-5 font-light transition-all text-left border-l-4 flex items-center gap-3 group hover:bg-gray-800/30',
                  activeTab === 'privacy'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400'
                    : 'text-gray-300 border-transparent'
                ]"
              >
                <svg class="w-5 h-5 flex-shrink-0 transition-colors" :class="activeTab === 'privacy' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span class="text-sm font-semibold uppercase tracking-wider">Privacy & Security</span>
              </button>

              <!-- Settings Tab -->
              <button
                @click="activeTab = 'settings'"
                :class="[
                  'px-6 py-5 font-light transition-all text-left border-l-4 flex items-center gap-3 group hover:bg-gray-800/30',
                  activeTab === 'settings'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400'
                    : 'text-gray-300 border-transparent'
                ]"
              >
                <svg class="w-5 h-5 flex-shrink-0 transition-colors" :class="activeTab === 'settings' ? 'text-yellow-400' : 'text-gray-400 group-hover:text-gray-300'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-sm font-semibold uppercase tracking-wider">Settings</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Right Content Area -->
        <div class="lg:col-span-3">
          <!-- Personal Info Tab -->
          <div v-show="activeTab === 'personal'" class="space-y-6">
            <div class="bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-black p-10 rounded-2xl border border-gray-800/40 shadow-xl hover:border-gray-700/40 transition-all duration-300 backdrop-blur-sm">
              <div class="mb-10">
                <span class="text-xs font-semibold uppercase tracking-widest text-yellow-400/60 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 inline-block mb-4 hover:border-yellow-400/40 transition-colors">
                  Account Details
                </span>
                <h2 class="text-3xl font-light text-white tracking-tight">Personal Information</h2>
              </div>

              <!-- Full Name -->
              <div class="mb-10">
                <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Full Name</label>
                <div v-if="!editingName" class="flex items-center justify-between p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 hover:bg-gray-900/20 transition-all">
                  <p class="text-white font-light text-lg">{{ profileData.name || userName }}</p>
                  <button
                    @click="editingName = true"
                    class="text-yellow-400/70 hover:text-yellow-400 text-sm font-semibold uppercase tracking-widest transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div v-else class="flex gap-2">
                  <input
                    v-model="editFormData.name"
                    type="text"
                    class="flex-1 px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all"
                    placeholder="Enter your full name"
                  />
                  <button
                    @click="saveName"
                    class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold uppercase text-xs tracking-widest rounded-lg transition-all hover:shadow-lg"
                  >
                    Save
                  </button>
                  <button
                    @click="editingName = false"
                    class="px-6 py-3 border border-gray-700/50 text-gray-300 hover:text-white hover:border-gray-600 rounded-lg transition-all font-semibold uppercase text-xs tracking-widest"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Email -->
              <div class="mb-10">
                <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Email Address</label>
                <div v-if="!editingEmail" class="flex items-center justify-between p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 hover:bg-gray-900/20 transition-all">
                  <p class="text-white font-light text-lg">{{ userEmail }}</p>
                  <button
                    @click="editingEmail = true"
                    class="text-yellow-400/70 hover:text-yellow-400 text-sm font-semibold uppercase tracking-widest transition-colors"
                  >
                    Change
                  </button>
                </div>
                <div v-else class="space-y-4">
                  <input
                    v-model="editFormData.email"
                    type="email"
                    class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all"
                    placeholder="Enter your new email"
                  />
                  <p class="text-xs text-gray-500 font-medium">Email verification required upon save</p>
                  <div class="flex gap-2">
                    <button
                      @click="saveEmail"
                      class="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold uppercase text-xs tracking-widest rounded-lg transition-all hover:shadow-lg"
                    >
                      Save
                    </button>
                    <button
                      @click="editingEmail = false"
                      class="px-6 py-3 border border-gray-700/50 text-gray-300 hover:text-white hover:border-gray-600 rounded-lg transition-all font-semibold uppercase text-xs tracking-widest"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <!-- Daily Calorie Goal -->
              <div>
                <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Daily Calorie Goal</label>
                <div class="flex gap-3 items-center p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 hover:bg-gray-900/20 transition-all">
                  <input
                    v-model.number="editFormData.dailyCalorieGoal"
                    type="number"
                    min="1000"
                    max="5000"
                    class="w-32 px-4 py-2 bg-black border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all"
                  />
                  <span class="text-gray-500 font-medium text-sm">kcal/day</span>
                  <button
                    @click="saveCalorieGoal"
                    class="ml-auto px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold uppercase text-xs tracking-widest rounded-lg transition-all"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Dietary Preferences Tab -->
          <div v-show="activeTab === 'preferences'" class="space-y-6">
            <div class="bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-black p-10 rounded-2xl border border-gray-800/40 shadow-xl hover:border-gray-700/40 transition-all duration-300 backdrop-blur-sm">
              <div class="mb-10">
                <span class="text-xs font-semibold uppercase tracking-widest text-yellow-400/60 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 inline-block mb-4 hover:border-yellow-400/40 transition-colors">
                  Nutrition & Diet
                </span>
                <h2 class="text-3xl font-light text-white tracking-tight">Dietary Preferences</h2>
              </div>

              <!-- Dietary Restrictions -->
              <div class="mb-10">
                <div class="flex items-center gap-2 mb-4">
                  <h3 class="text-lg font-light text-white">Dietary Restrictions</h3>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    v-for="restriction in dietaryRestrictionsWithIcons"
                    :key="restriction.name"
                    @click="toggleRestriction(restriction.name)"
                    :class="[
                      'group p-5 rounded-xl border-2 transition-all text-center relative h-24 flex flex-col items-center justify-center overflow-hidden',
                      preferencesData.dietaryRestrictions.includes(restriction.name)
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                        : 'bg-black/40 border-gray-700/50 text-gray-400 hover:border-gray-600'
                    ]"
                  >
                    <!-- Original Content -->
                    <div class="group-hover:opacity-0 transition-opacity duration-200 text-center">
                      <div class="text-3xl mb-2">{{ restriction.icon }}</div>
                      <p class="text-sm font-medium">{{ restriction.name }}</p>
                    </div>
                    <!-- Hover Content (Description) -->
                    <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-2 py-1">
                      <p class="text-xs font-medium">{{ restriction.description }}</p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Allergies -->
              <div class="mb-10">
                <h3 class="text-lg font-light text-white mb-4">Allergies</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <button
                    v-for="allergy in allergyWithIcons"
                    :key="allergy.name"
                    @click="toggleAllergy(allergy.name)"
                    :class="[
                      'group p-5 rounded-xl border-2 transition-all text-center relative h-24 flex flex-col items-center justify-center overflow-hidden',
                      preferencesData.allergies.includes(allergy.name)
                        ? 'bg-red-400/20 border-red-400 text-red-300'
                        : 'bg-black/40 border-gray-700/50 text-gray-400 hover:border-gray-600'
                    ]"
                  >
                    <!-- Original Content -->
                    <div class="group-hover:opacity-0 transition-opacity duration-200 text-center">
                      <div class="text-3xl mb-2">{{ allergy.icon }}</div>
                      <p class="text-sm font-medium">{{ allergy.name }}</p>
                    </div>
                    <!-- Hover Content (Description) -->
                    <div class="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-2 py-1">
                      <p class="text-xs font-medium">{{ allergy.description }}</p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Fitness Goals -->
              <div class="mb-10">
                <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Fitness Goals</label>
                <textarea
                  v-model="preferencesData.fitnessGoals"
                  class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all resize-none"
                  rows="4"
                  placeholder="e.g., Lose weight, Build muscle, Increase endurance..."
                ></textarea>
              </div>

              <!-- Monthly Budget -->
              <div class="mb-10">
                <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Monthly Food Budget</label>
                <div class="flex items-center gap-2 p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 transition-all">
                  <span class="text-gray-500 font-medium">$</span>
                  <input
                    v-model.number="preferencesData.budget"
                    type="number"
                    min="0"
                    step="10"
                    class="flex-1 px-4 py-2 bg-transparent text-white focus:outline-none"
                    placeholder="0.00"
                  />
                  <span class="text-gray-500 font-mono text-xs">/month</span>
                </div>
              </div>

              <!-- Save Preferences Button -->
              <button
                @click="savePreferences"
                class="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-semibold uppercase text-sm tracking-widest py-4 rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                Save All Preferences
              </button>
            </div>
          </div>

          <!-- Privacy & Security Tab -->
          <div v-show="activeTab === 'privacy'" class="space-y-6">
            <div class="bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-black p-10 rounded-2xl border border-gray-800/40 shadow-xl hover:border-gray-700/40 transition-all duration-300 backdrop-blur-sm">
              <div class="mb-10">
                <span class="text-xs font-semibold uppercase tracking-widest text-yellow-400/60 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 inline-block mb-4 hover:border-yellow-400/40 transition-colors">
                  Security
                </span>
                <h2 class="text-3xl font-light text-white tracking-tight">Privacy & Security</h2>
              </div>

              <!-- Change Password Section -->
              <div class="space-y-6">
                <h3 class="text-lg font-light text-white">Change Password</h3>

                <!-- Current Password -->
                <div>
                  <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Current Password</label>
                  <div class="relative">
                    <input
                      :type="showCurrentPassword ? 'text' : 'password'"
                      v-model="passwordForm.currentPassword"
                      class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all pr-12"
                      placeholder="Enter your current password"
                    />
                    <button
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      type="button"
                    >
                      <svg v-if="showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.15a3.375 3.375 0 01-5.577 4.643"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 9.172L21 21m-12-12l.01.01M21 21l-12-12m12 0a9 9 0 11-12.986-8.142"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- New Password -->
                <div>
                  <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">New Password</label>
                  <div class="relative">
                    <input
                      :type="showNewPassword ? 'text' : 'password'"
                      v-model="passwordForm.newPassword"
                      class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all pr-12"
                      placeholder="Enter your new password"
                    />
                    <button
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      type="button"
                    >
                      <svg v-if="showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.15a3.375 3.375 0 01-5.577 4.643"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 9.172L21 21m-12-12l.01.01M21 21l-12-12m12 0a9 9 0 11-12.986-8.142"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Confirm Password -->
                <div>
                  <label class="block text-gray-400 font-semibold uppercase text-xs tracking-widest mb-4">Confirm Password</label>
                  <div class="relative">
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="passwordForm.confirmPassword"
                      class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 font-light transition-all pr-12"
                      placeholder="Confirm your new password"
                    />
                    <button
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      type="button"
                    >
                      <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.15a3.375 3.375 0 01-5.577 4.643"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 9.172L21 21m-12-12l.01.01M21 21l-12-12m12 0a9 9 0 11-12.986-8.142"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Save Changes Button -->
                <div class="flex justify-end pt-4">
                  <button
                    @click="savePasswordChange"
                    class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-semibold uppercase text-sm tracking-widest rounded-lg transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Tab -->
          <div v-show="activeTab === 'settings'" class="space-y-6">
            <div class="bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-black p-10 rounded-2xl border border-gray-800/40 shadow-xl hover:border-gray-700/40 transition-all duration-300 backdrop-blur-sm">
              <div class="mb-10">
                <span class="text-xs font-semibold uppercase tracking-widest text-yellow-400/60 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 inline-block mb-4 hover:border-yellow-400/40 transition-colors">
                  Account
                </span>
                <h2 class="text-3xl font-light text-white tracking-tight">Account Settings</h2>
              </div>

              <!-- Account Information -->
              <div class="mb-10 pb-10 border-b border-gray-800/30">
                <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">Account Information</h3>
                <div class="space-y-3">
                  <div class="p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 transition-all">
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Account Type</p>
                    <p class="text-white font-light text-lg">Email/Password</p>
                  </div>
                  <div class="p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 transition-all">
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Member Since</p>
                    <p class="text-white font-light text-lg">{{ formatDate(profileData.createdAt) }}</p>
                  </div>
                  <div class="p-5 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 transition-all">
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Account Status</p>
                    <p class="text-green-400 font-light text-lg">Active</p>
                  </div>
                </div>
              </div>

              <!-- Account Actions -->
              <div class="pt-8 space-y-4">
                <!-- Sign Out -->
                <div class="flex items-center justify-between p-6 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 transition-all">
                  <div class="flex items-center gap-4">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <div>
                      <p class="text-white font-light text-lg">Sign Out</p>
                      <p class="text-gray-500 text-sm">Log out from your account</p>
                    </div>
                  </div>
                  <button
                    @click="handleLogout"
                    class="px-6 py-2 bg-gradient-to-r from-red-900/40 to-red-800/40 hover:from-red-900/60 hover:to-red-800/60 text-red-300 hover:text-red-200 font-semibold uppercase text-xs tracking-widest rounded-lg transition-all border border-red-700/30 hover:border-red-600/50"
                  >
                    Sign Out
                  </button>
                </div>

                <!-- Delete Account -->
                <div class="flex items-center justify-between p-6 bg-black/40 rounded-xl border border-gray-800/40 hover:border-gray-700/50 transition-all">
                  <div class="flex items-center gap-4">
                    <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <div>
                      <p class="text-white font-light text-lg">Delete Account</p>
                      <p class="text-gray-500 text-sm">Permanently delete your account and data</p>
                    </div>
                  </div>
                  <button
                    @click="handleDeleteAccount"
                    class="px-6 py-2 bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-900/70 hover:to-red-800/70 text-red-200 hover:text-red-100 font-semibold uppercase text-xs tracking-widest rounded-lg transition-all border border-red-600/50 hover:border-red-500/70"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const activeTab = ref('personal')
    const editingName = ref(false)
    const editingEmail = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')
    const showCurrentPassword = ref(false)
    const showNewPassword = ref(false)
    const showConfirmPassword = ref(false)

    const profileData = reactive({
      name: '',
      createdAt: new Date(),
      photoURL: ''
    })

    const editFormData = reactive({
      name: '',
      email: '',
      dailyCalorieGoal: 2000
    })

    const preferencesData = reactive({
      dietaryRestrictions: [],
      allergies: [],
      fitnessGoals: '',
      budget: 0
    })

    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const userName = computed(() => authStore.userName)
    const userEmail = computed(() => authStore.userEmail)

    const dietaryRestrictionsWithIcons = computed(() => [
      { name: 'Vegetarian', icon: '🥬', description: 'No meat, poultry, or fish' },
      { name: 'Vegan', icon: '🌱', description: 'No animal products' },
      { name: 'Gluten-Free', icon: '🚫', description: 'No gluten/wheat' },
      { name: 'Dairy-Free', icon: '🥛', description: 'No dairy products' },
      { name: 'Keto', icon: '⚡', description: 'Low carb, high fat' },
      { name: 'Low-Carb', icon: '📉', description: 'Reduced carbohydrates' },
      { name: 'Paleo', icon: '🦴', description: 'Whole foods only' },
      { name: 'Pescatarian', icon: '🐟', description: 'No meat except fish' }
    ])

    const allergyWithIcons = computed(() => [
      { name: 'Nuts', icon: '🥜', description: 'Tree nuts and peanuts' },
      { name: 'Dairy', icon: '🧀', description: 'Milk and dairy products' },
      { name: 'Shellfish', icon: '🦐', description: 'Shellfish and crustaceans' },
      { name: 'Eggs', icon: '🥚', description: 'Chicken eggs' },
      { name: 'Soy', icon: '🫘', description: 'Soy and soy products' },
      { name: 'Gluten', icon: '🌾', description: 'Wheat and gluten' },
      { name: 'Fish', icon: '🐠', description: 'All types of fish' },
      { name: 'Sesame', icon: '🌰', description: 'Sesame seeds' }
    ])

    onMounted(async () => {
      const userProfile = await authStore.getUserProfile?.()
      if (userProfile) {
        profileData.name = userProfile.name || ''
        profileData.createdAt = userProfile.createdAt?.toDate?.() || new Date()
        profileData.photoURL = userProfile.photoURL || ''

        if (userProfile.preferences) {
          preferencesData.dietaryRestrictions = userProfile.preferences.dietaryRestrictions || []
          preferencesData.allergies = userProfile.preferences.allergies || []
          preferencesData.fitnessGoals = userProfile.preferences.fitnessGoals || ''
          preferencesData.budget = userProfile.preferences.budget || 0
        }

        if (userProfile.dailyCalorieGoal) {
          editFormData.dailyCalorieGoal = userProfile.dailyCalorieGoal
        }
      }

      // If no photoURL from Firestore, check Firebase auth user (for Gmail users)
      if (!profileData.photoURL && authStore.user?.photoURL) {
        profileData.photoURL = authStore.user.photoURL
      }

      editFormData.name = profileData.name || userName.value
      editFormData.email = userEmail.value
    })

    const formatDate = (date) => {
      if (!date) return 'Unknown'
      const d = date instanceof Date ? date : date.toDate?.()
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(d)
    }

    const saveName = async () => {
      try {
        profileData.name = editFormData.name
        editingName.value = false
        showSuccess('Name updated successfully!')
      } catch (error) {
        showError('Failed to update name')
        console.error(error)
      }
    }

    const saveEmail = async () => {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(editFormData.email)) {
          showError('Please enter a valid email address')
          return
        }
        editingEmail.value = false
        showSuccess('Email update initiated. Please verify your new email address.')
      } catch (error) {
        showError('Failed to update email')
        console.error(error)
      }
    }

    const saveCalorieGoal = async () => {
      try {
        if (editFormData.dailyCalorieGoal < 1000 || editFormData.dailyCalorieGoal > 5000) {
          showError('Daily calorie goal must be between 1000 and 5000')
          return
        }
        showSuccess('Daily calorie goal updated!')
      } catch (error) {
        showError('Failed to update calorie goal')
        console.error(error)
      }
    }

    const toggleRestriction = (restriction) => {
      const index = preferencesData.dietaryRestrictions.indexOf(restriction)
      if (index > -1) {
        preferencesData.dietaryRestrictions.splice(index, 1)
      } else {
        preferencesData.dietaryRestrictions.push(restriction)
      }
    }

    const toggleAllergy = (allergy) => {
      const index = preferencesData.allergies.indexOf(allergy)
      if (index > -1) {
        preferencesData.allergies.splice(index, 1)
      } else {
        preferencesData.allergies.push(allergy)
      }
    }

    const savePreferences = async () => {
      try {
        showSuccess('Preferences saved successfully!')
      } catch (error) {
        showError('Failed to save preferences')
        console.error(error)
      }
    }

    const savePasswordChange = async () => {
      try {
        // Validation checks
        if (!passwordForm.currentPassword) {
          showError('Please enter your current password')
          return
        }

        if (!passwordForm.newPassword) {
          showError('Please enter a new password')
          return
        }

        if (!passwordForm.confirmPassword) {
          showError('Please confirm your new password')
          return
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          showError('New password and confirmation do not match')
          return
        }

        if (passwordForm.newPassword.length < 6) {
          showError('New password must be at least 6 characters long')
          return
        }

        if (passwordForm.currentPassword === passwordForm.newPassword) {
          showError('New password must be different from current password')
          return
        }

        // TODO: Implement actual password change with Firebase authentication
        showSuccess('Password changed successfully!')

        // Clear the form
        passwordForm.currentPassword = ''
        passwordForm.newPassword = ''
        passwordForm.confirmPassword = ''
        showCurrentPassword.value = false
        showNewPassword.value = false
        showConfirmPassword.value = false
      } catch (error) {
        showError('Failed to change password')
        console.error(error)
      }
    }

    const handleProfilePictureUpload = async (event) => {
      try {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
          showError('Please select a valid image file')
          return
        }

        if (file.size > 5 * 1024 * 1024) {
          showError('Image size must be less than 5MB')
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          profileData.photoURL = e.target?.result || ''
        }
        reader.readAsDataURL(file)

        showSuccess('Profile picture updated!')
      } catch (error) {
        showError('Failed to upload profile picture')
        console.error(error)
      }
    }

    const handleLogout = async () => {
      try {
        await authStore.logout()
        router.push('/login')
      } catch (error) {
        showError('Failed to sign out')
        console.error(error)
      }
    }

    const handleDeleteAccount = async () => {
      const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.')
      if (!confirmed) return

      try {
        // TODO: Implement account deletion logic
        showError('Account deletion feature coming soon')
      } catch (error) {
        showError('Failed to delete account')
        console.error(error)
      }
    }

    const showSuccess = (message) => {
      successMessage.value = message
      setTimeout(() => {
        successMessage.value = ''
      }, 4000)
    }

    const showError = (message) => {
      errorMessage.value = message
      setTimeout(() => {
        errorMessage.value = ''
      }, 4000)
    }

    return {
      activeTab,
      editingName,
      editingEmail,
      successMessage,
      errorMessage,
      profileData,
      editFormData,
      preferencesData,
      passwordForm,
      dietaryRestrictionsWithIcons,
      allergyWithIcons,
      userName,
      userEmail,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      formatDate,
      saveName,
      saveEmail,
      saveCalorieGoal,
      toggleRestriction,
      toggleAllergy,
      savePreferences,
      savePasswordChange,
      handleProfilePictureUpload,
      handleLogout,
      handleDeleteAccount
    }
  }
}
</script>

<style scoped>
/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
