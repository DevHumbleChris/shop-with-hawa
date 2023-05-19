<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'
</script>

<template>
    <section>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-indigo-600 font-bold">Account Settings</h1>
            <div class="flex items-center space-x-1 text-gray-500">
                <HomeIcon class="w-6" />
                <span>></span>
                <span class="block text-indigo-600">settings</span>
            </div>
        </div>

    </section>
</template>
