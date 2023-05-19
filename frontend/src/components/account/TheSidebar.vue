<script setup>
import { Squares2X2Icon, ArrowRightOnRectangleIcon, Cog6ToothIcon, CircleStackIcon, CloudArrowUpIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const selectedRoute = ref('dashboard')
</script>

<template>
    <aside
        class="fixed z-50 p-2 flex items-center bg-primary md:flex-col md:sticky bottom-0 md:top-0 md:h-screen w-full md:w-[17rem] space-x-2 py-20">
        <ul
            class="md:p-3 p-2 flex items-center justify-between md:flex-col md:items-start md:justify-evenly md:space-y-8 sm:mt-0 group w-full">
            <li class="md:w-full">
                <RouterLink to="/admin/account/dashboard" class="flex items-center space-x-2">
                    <Squares2X2Icon class="w-auto h-6 sm:h-8" />
                    <p :class="selectedRoute === 'dashboard' ? 'text-xs md:text-lg' : 'hidden md:block md:text-lg'">
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
                <RouterLink to="/admin/account/dashboard" class="flex items-center space-x-1">
                    <CloudArrowUpIcon class="w-auto h-6 sm:h-8" />
                    <p :class="selectedRoute === 'update-product' ? 'text-xs md:text-lg' : 'hidden md:block md:text-lg'">
                        Update Product
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
        <button class="text-white hidden absolute bottom-4 left-5 md:flex justify-center items-center space-x-3">
            <ArrowRightOnRectangleIcon class="w-auto h-8 sm:h-8" />
            <p class="text-lg hidden md:block">Logout</p>
        </button>
    </aside>
</template>
