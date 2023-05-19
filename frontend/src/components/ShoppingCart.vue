<script setup>
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const cart = computed(() => {
    return cartStore.cart
})

const open = computed(() => {
    return cartStore.isShoppingCartOpen;
})

const close = () => {
    cartStore.openShoppingCart()
}

const subTotal = computed(() => {
    return cartStore.subTotal
})

const incQuantity = (prodId) => {
    cartStore.incQuantity(prodId)
}

const decQuantity = (prodId) => {
    cartStore.decQuantity(prodId)
}

const removeProdFromCart = (prodId) => {
    cartStore.removeProdFromCart(prodId)
}
</script>

<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-40" @close="close">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                            leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-lg font-medium text-gray-900">{{  cart.length > 0 ? 'Shopping cart' : 'Cart Is Empty' }}
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    @click="close">
                                                    <span class="sr-only">Close panel</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div v-if="cart.length > 0" class="mt-8">
                                            <div class="flow-root">
                                                <ul role="list" class="-my-6 divide-y divide-gray-200">
                                                    <li v-for="product in cart" :key="product.id" class="flex py-6">
                                                        <div
                                                            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img :src="product.prodImg" :alt="product.title"
                                                                class="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div class="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                    <h3>
                                                                        <a href="">{{ product.title }}</a>
                                                                    </h3>
                                                                    <p class="text-indigo-700 font-bold">Ksh {{ product.price }}</p>
                                                            </div>
                                                            <div class="flex flex-1 items-end justify-between text-sm">
                                                                <p class="text-gray-500 flex items-center justify-between space-x-5">
                                                                    <button @click="decQuantity(product.id)" class="block bg-red-600 py-1 rounded-lg px-3 text-white">-</button>
                                                                    <span class="block">Qty {{ product.quantity }}</span>
                                                                    <button @click="incQuantity(product.id)" class="block bg-indigo-600 py-1 rounded-lg px-3 text-white">+</button>
                                                                </p>

                                                                <div class="flex">
                                                                    <button @click="removeProdFromCart(product.id)" type="button"
                                                                        class="font-medium text-red-600 hover:text-red-500 cursor-pointer">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <img v-else src="../assets/images/empty-cart.png" alt="empty-cart" class="" />
                                    </div>

                                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div v-if="cart.length > 0">
                                            <div class="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p class="text-indigo-600 font-bold">Ksh {{ subTotal }}</p>
                                            </div>
                                            <div class="mt-6">
                                                <RouterLink to="/checkout" @click="close"
                                                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</RouterLink>
                                            </div>
                                        </div>
                                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or
                                                <button type="button"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                    @click="close">
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </div>
    </Dialog>
</TransitionRoot></template>
