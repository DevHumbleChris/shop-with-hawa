<script setup>
import { computed, onBeforeMount, watchEffect } from 'vue'
import ShoppingCart from './ShoppingCart.vue'
import SearchBox from './SearchBox.vue'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useHeaderStore } from '@/stores/header'
import { RouterLink } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { auth } from '@/utils/firebaseConfig'
import TheUser from './TheUser.vue'

const searchStore = useSearchStore()
const cartStore = useCartStore()
const headerStore = useHeaderStore()

onBeforeMount(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            headerStore.setUserInfo({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            })
        }
    })
})
watchEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            headerStore.setUserInfo(null)
        }
    })
})

const userInfo = computed(() => {
    return headerStore?.userInfo
})

const openCart = () => {
    cartStore.openShoppingCart()
}

const openSearchBox = () => {
    searchStore.openSearchBox()
}

const open = computed(() => {
    return headerStore.isSidebarOpen
})

const openSidebar = () => {
    headerStore.openSidebar()
}

const noOfItemsInCart = computed(() => {
    return cartStore?.noOfItemsInCart
})
</script>
<template>
    <div class="bg-white sticky z-40 w-full top-0 right-0 left-0">
        <!-- Mobile menu -->
        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="openSidebar">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel
                            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                            <div class="flex relative px-4 pb-2 pt-5">
                                <!-- Logo -->
                                <div class="ml-4 flex lg:ml-0">
                                    <a class="flex space-x-2 items-center">
                                        <img class="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt="shop-with-hawa" />
                                        <span class="block text-lg font-bold text-primary">Shop With Hawa</span>
                                    </a>
                                </div>
                                <button type="button"
                                    class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 absolute top-3 right-2"
                                    @click="openSidebar">
                                    <span class="sr-only">Close menu</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                                <div class="flow-root space-y-6">
                                    <RouterLink to="/" @click="openSidebar"
                                        class="-m-2 block p-2 font-medium text-gray-900">
                                        Online Shop
                                    </RouterLink>
                                    <RouterLink to="/jewellery" @click="openSidebar"
                                        class="-m-2 block p-2 font-medium text-gray-900">
                                        Jewellery
                                    </RouterLink>
                                    <RouterLink to="/electronics" @click="openSidebar"
                                        class="-m-2 block p-2 font-medium text-gray-900">
                                        Electronics
                                    </RouterLink>
                                    <RouterLink to="/mens-clothing" @click="openSidebar"
                                        class="-m-2 block p-2 font-medium text-gray-900">
                                        Men's Clothing
                                    </RouterLink>
                                    <RouterLink to="/womens-clothing" @click="openSidebar"
                                        class="-m-2 block p-2 font-medium text-gray-900">
                                        Women's Clothing
                                    </RouterLink>
                                </div>
                            </div>

                            <div v-if="!userInfo" class="space-y-6 border-t border-gray-200 px-4 py-6">
                                <div class="flow-root">
                                    <RouterLink to="/signin" class="-m-2 block p-2 font-medium text-gray-900">Sign in
                                    </RouterLink>
                                </div>
                                <div class="flow-root">
                                    <RouterLink to="/signup" class="-m-2 block p-2 font-medium text-gray-900">Create account
                                    </RouterLink>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <header class="relative bg-white">
            <p
                class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                Your one stop, online shop 😍👌.
            </p>

            <nav aria-label="Top" class="mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div class="border-b border-gray-200">
                    <div class="flex h-16 items-center">
                        <button type="button" class="rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="openSidebar">
                            <span class="sr-only">Open menu</span>
                            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <!-- Logo -->
                        <div class="ml-4 flex lg:ml-0">
                            <a class="flex space-x-2 items-center">
                                <img class="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="shop-with-hawa" />
                                <span class="block text-lg font-bold text-primary">Shop With Hawa</span>
                            </a>
                        </div>

                        <!-- Flyout menus -->
                        <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div class="flex h-full space-x-8">
                                <RouterLink to="/"
                                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Online Shop
                                </RouterLink>
                                <RouterLink to="/jewellery"
                                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Jewellery
                                </RouterLink>
                                <RouterLink to="/electronics"
                                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Electronics
                                </RouterLink>
                                <RouterLink to="/mens-clothing"
                                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Men's Clothing
                                </RouterLink>
                                <RouterLink to="/womens-clothing"
                                    class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Women's Clothing
                                </RouterLink>
                            </div>
                        </PopoverGroup>

                        <div class="ml-auto flex items-center">
                            <div v-if="!userInfo"
                                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <RouterLink to="/signin"
                                    class="block text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Sign
                                    in</RouterLink>
                                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                                <RouterLink to="/signup" class="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Create account</RouterLink>
                            </div>

                            <!-- Search -->
                            <div class="flex lg:ml-6">
                                <button @click="openSearchBox" class="p-2 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Search</span>
                                    <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <SearchBox />

                            <!-- Cart -->
                            <div class="ml-4 flow-root lg:ml-6">
                                <button @click="openCart" class="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true" />
                                    <span v-if="noOfItemsInCart > 0"
                                        class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{
                                            noOfItemsInCart }}</span>
                                    <span class="sr-only">items in cart, view bag</span>
                                </button>
                            </div>
                            <ShoppingCart />
                            <TheUser v-if="userInfo" />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
</div></template>

