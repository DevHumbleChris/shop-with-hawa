<script setup>
import { RouterView } from 'vue-router'
import TheSidebar from '@/components/account/TheSidebar.vue'
import { useHead } from 'unhead'
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

useHead({
  title: 'Shop With Hawa | Admin | Account'
})

const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('authenticated'))
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    if (!isAuthenticated) {
        router.push({ name: 'admin-login' })
    }
    if (user && token) {
        authStore.setUser(user)
        authStore.setAuthenticated({ token })
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
