<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">About ByteBite</h1>
      <p class="text-xl text-gray-600">Smart meal planning solution for students</p>
    </div>
    
    <div class="space-y-8">
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed mb-4">
          Students nowadays struggle to plan affordable and healthy meals, causing health issues and making it hard to attain their fitness goals. 
          ByteBite aims to provide students with greater utility to plan and make their meals with an "all-in-one" app.
        </p>
        <p class="text-gray-600 leading-relaxed">
          Our application addresses the main problem of students struggling to balance cost, health, and convenience when planning their day-to-day meals.
        </p>
      </div>
      
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">How ByteBite Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 class="font-semibold text-gray-800 mb-2">🎯 Set Your Preferences</h3>
            <p class="text-gray-600 text-sm">Configure dietary preferences, budget limits, and allergies to personalize your meal planning experience.</p>
          </div>
          <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 class="font-semibold text-gray-800 mb-2">🔍 Discover Recipes</h3>
            <p class="text-gray-600 text-sm">Find recipes via public API that match your specific requirements and constraints.</p>
          </div>
          <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 class="font-semibold text-gray-800 mb-2">📅 Plan Your Meals</h3>
            <p class="text-gray-600 text-sm">Schedule your meals for the week with our intuitive meal planning system.</p>
          </div>
          <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h3 class="font-semibold text-gray-800 mb-2">🛒 Generate Lists</h3>
            <p class="text-gray-600 text-sm">Automatically create organized shopping lists from your planned meals.</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Technology Stack</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong class="text-gray-800">Vue.js 3</strong> - Progressive JavaScript framework
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong class="text-gray-800">Vite</strong> - Next generation frontend tooling
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong class="text-gray-800">Vue Router</strong> - Official router for Vue.js
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong class="text-gray-800">Pinia</strong> - State management for Vue
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong class="text-gray-800">Tailwind CSS</strong> - Utility-first CSS framework
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <strong class="text-gray-800">Recipe APIs</strong> - External recipe data sources
          </div>
        </div>
      </div>
      
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Key Benefits</h2>
        <ul class="space-y-3 mt-4">
          <li class="flex items-center text-gray-600">
            <span class="mr-3">💰</span>
            Save money by planning meals within your budget
          </li>
          <li class="flex items-center text-gray-600">
            <span class="mr-3">🏃‍♀️</span>
            Achieve fitness goals with nutrition-focused meal planning
          </li>
          <li class="flex items-center text-gray-600">
            <span class="mr-3">⏰</span>
            Save time with automated shopping lists and meal scheduling
          </li>
          <li class="flex items-center text-gray-600">
            <span class="mr-3">🍎</span>
            Maintain healthy eating habits with personalized recommendations
          </li>
          <li class="flex items-center text-gray-600">
            <span class="mr-3">🎯</span>
            Focus on studies while ByteBite handles your meal planning
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
