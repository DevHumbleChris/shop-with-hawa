<script setup>
import { RouterView } from 'vue-router'
import TheSidebar from '@/components/account/TheSidebar.vue'
import { useHead } from 'unhead'

useHead({
  title: 'Shop With Hawa | Admin | Account'
})
</script>

<template>
    <main class="sm:flex">
        <TheSidebar />
        <div class="w-full">
            <!-- <HeadWrapper /> -->
            <div class="p-4">
                <RouterView />
            </div>
        </div>
    </main>
</template>
