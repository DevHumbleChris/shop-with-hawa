<script setup>
import { auth } from '@/utils/firebaseConfig'
import { onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

onBeforeMount(() => {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            router.push({ name: 'signin' })
        }
    })
})

const cart = computed(() => {
    return cartStore?.cart
})

const incQuantity = (prodId) => {
    cartStore.incQuantity(prodId)
}

const decQuantity = (prodId) => {
    cartStore.decQuantity(prodId)
}

const subTotal = computed(() => {
    return cartStore.subTotal
})

const removeProdFromCart = (prodId) => {
    cartStore.removeProdFromCart(prodId)
}
</script>

<template>
    <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div class="relative">
                <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                    <li class="flex items-center space-x-3 text-left sm:space-x-4">
                        <a class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                            href="#"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg></a>
                        <span class="font-semibold text-gray-900">Shop</span>
                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <li class="flex items-center space-x-3 text-left sm:space-x-4">
                        <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                            href="#">2</a>
                        <span class="font-semibold text-gray-900">Shipping</span>
                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <li class="flex items-center space-x-3 text-left sm:space-x-4">
                        <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                            href="#">3</a>
                        <span class="font-semibold text-gray-500">Payment</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
            <p class="text-xl font-medium">Order Summary</p>
            <p class="text-gray-400">Check your items before proceding to payment.</p>
            <img src="../assets/images/checkout.png" class="object-fit" alt="checkout image" />
        </div>
        <div v-if="cart.length > 0" class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <div class="">
                <div class="">
                    <div v-for="product in cart" :key="product.id" class="flex rounded-lg bg-white">
                        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" :src="product.prodImg"
                            :alt="product.title" />
                        <div class="flex w-full flex-col px-4 py-1 space-y-2">
                            <span class="font-semibold text-primary">{{ product.title }}</span>
                            <p class="text-gray-500 flex items-center justify-between space-x-5">
                                <button @click="decQuantity(product.id)"
                                    class="block bg-red-600 py-0.5 rounded-lg px-3 text-white">-</button>
                                <span class="block">Qty {{ product.quantity }}</span>
                                <button @click="incQuantity(product.id)"
                                    class="block bg-indigo-600 py-0.5 rounded-lg px-3 text-white">+</button>
                            </p>
                            <div class="flex justify-between items-center">
                                <p class="text-lg font-bold">Ksh {{ product.price }}</p>
                                <button @click="removeProdFromCart(product.id)" type="button"
                                    class="font-medium text-red-600 hover:text-red-500 cursor-pointer">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Total -->
                <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Total</p>
                    <p class="text-2xl font-semibold text-gray-900">Ksh {{ subTotal }}</p>
                </div>
            </div>
            <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
        <div v-else class="px-4 pt-8">
            <p class="text-xl font-medium">Empty Cart</p>
            <p class="text-gray-400">Add items into the cart.</p>
            <img src="../assets/images/empty-cart.png" alt="empty-cart" class="-mt-6" />
        </div>
    </div>
</template>
