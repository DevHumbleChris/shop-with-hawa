<script setup>
import { Squares2X2Icon, ArrowRightOnRectangleIcon, Cog6ToothIcon, CircleStackIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const selectedRoute = ref('dashboard')
const authStore = useAuthStore()
const router = useRouter()

const logOut = () => {
    authStore.logOut()
    authStore.removeUser()
    router.push({ name: 'admin-login' })
    toast.info('Signed Out Successfully!', {
        theme: 'colored'
    })
}
</script>

<template>
    <aside
        class="fixed z-50 p-2 flex items-center bg-primary md:flex-col md:sticky bottom-0 md:top-0 md:h-screen w-full md:w-[17rem] space-x-2 md:py-20 text-white">
        <ul
            class="md:p-3 p-2 flex items-center justify-between md:flex-col md:items-start md:justify-evenly md:space-y-8 sm:mt-0 group w-full">
            <li class="md:w-full">
                <RouterLink to="/admin/account/dashboard" class="flex items-center space-x-2">
                    <Squares2X2Icon class="w-auto h-6 sm:h-8" />
                    <p :class="selectedRoute === 'add-product' ? 'text-xs md:text-lg' : 'hidden md:block md:text-lg'">
                        Dashboard
                    </p>
                </RouterLink>
            </li>
            <li class="md:w-full">
                <RouterLink to="/admin/account/add-product" class="flex items-center space-x-2">
                    <CircleStackIcon class="w-auto h-6 sm:h-8" />
                    <p :class="selectedRoute === 'add-product' ? 'text-xs md:text-lg' : 'hidden md:block md:text-lg'">
                        Add Product
                    </p>
                </RouterLink>
            </li>
            <li class="md:w-full">
                <RouterLink to="/admin/account/orders" class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-auto h-6 sm:h-8" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2">
                            <path d="m7 10l5-6l5 6m4 0l-2 8a2 2.5 0 0 1-2 2H7a2 2.5 0 0 1-2-2l-2-8z" />
                            <path d="M10 15a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
                        </g>
                    </svg>
                    <p :class="selectedRoute === 'orders' ? 'text-xs md:text-lg' : 'hidden md:block md:text-lg'">
                        Orders
                    </p>
                </RouterLink>
            </li>
            <li class="md:w-full">
                <RouterLink to="/admin/account/settings" class="flex items-center space-x-2">
                    <Cog6ToothIcon class="w-auto h-6 sm:h-8" />
                    <p :class="selectedRoute === 'settings' ? 'text-xs md:text-lg' : 'hidden md:block md:text-lg'">
                        Settings
                    </p>
                </RouterLink>
            </li>
        </ul>
        <button @click="logOut"
            class="text-white hidden absolute bottom-4 left-5 md:flex justify-center items-center space-x-3">
        <ArrowRightOnRectangleIcon class="w-auto h-8 sm:h-8" />
        <p class="text-lg hidden md:block">Logout</p>
    </button>
</aside></template>
