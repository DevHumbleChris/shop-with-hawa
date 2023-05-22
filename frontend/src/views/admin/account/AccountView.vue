<script setup>
import { RouterView } from 'vue-router'
import TheSidebar from '@/components/account/TheSidebar.vue'
import { useHead } from 'unhead'
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

useHead({
  title: 'Shop With Hawa | Admin | Account'
})

const router = useRouter()

onBeforeMount(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('authenticated'))
    if (!isAuthenticated) {
        router.push({ name: 'admin-login' })
    }
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
