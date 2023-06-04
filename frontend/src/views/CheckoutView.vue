<script setup>
import { auth } from '@/utils/firebaseConfig'
import { onBeforeMount, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useHead } from 'unhead'
import { toast } from 'vue3-toastify';
import { ClipLoader } from 'vue3-spinner'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '@/utils/firebaseConfig'
import { useHeaderStore } from '@/stores/header'

useHead({
    title: 'Shop With Hawa | Checkout'
})

const cartStore = useCartStore()
const headStore = useHeaderStore()
const router = useRouter()
const isPlacingOrder = ref(false)
const user = computed(() => {
    return headStore?.userInfo
})
const formDetails = ref({
    email: '',
    phoneNo: '',
    billAddress: ''
})

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

const handleSubmit = async () => {
    isPlacingOrder.value = !isPlacingOrder.value
    if (formDetails.value.email && formDetails.value.billAddress && formDetails.value.phoneNo) {
        const docref = await addDoc(collection(db,"orders"), {
            user: user?.value,
            ...formDetails?.value,
            cart: cart?.value,
            subTotal: subTotal?.value,
            isOrderConfirmed: true,
            isOrderPaid: false,
            timestamp: serverTimestamp()
        })
        if (docref) {
            setTimeout(() => {
                isPlacingOrder.value = !isPlacingOrder.value
                formDetails.value = {
                    email: '',
                    phoneNo: '',
                    billAddress: ''
                }
                cartStore.clearCart()
                toast.info('Order Placed', {
                    theme: 'auto'
                })
            }, 3000)
        }
    }
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

            <div v-if="cart.length > 0" class="my-3">
                <div class="">
                    <div v-for="product in cart" :key="product.id" class="flex rounded-lg">
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
        </div>
        <form @submit.prevent="handleSubmit" v-if="cart.length > 0" class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p class="text-xl font-medium">Payment Details</p>
                <p class="text-gray-400">Complete your order by providing your payment details.</p>
                <div class="">
                    <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
                    <div class="relative">
                        <input v-model="formDetails.email" type="text" id="email" name="email"
                            class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="your.email@gmail.com" required />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                    </div>
                    <label for="phone-no" class="mt-4 mb-2 block text-sm font-medium">Phone No</label>
                    <div class="relative">
                        <input v-model="formDetails.phoneNo" required type="text" id="phone-no" name="phone-no"
                            class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="07x-xxxx-xxx" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                            </svg>
                        </div>
                    </div>
                    <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                    <div class="relative">
                        <input v-model="formDetails.billAddress" required type="text" id="street-address" name="card-holder"
                            class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Street Address" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <img class="h-4 w-4 object-contain"
                                src="https://icons.iconarchive.com/icons/wikipedia/flags/256/KE-Kenya-Flag-icon.png"
                                alt="kenyan-flag" />
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit"
                class="flex space-x-2 items-center justify-center mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                <ClipLoader v-if="isPlacingOrder" color="#fff" size="20px" />
                <span :class="isPlacingOrder ? 'block text-lg animate-pulse' : 'block text-lg'">{{
                    isPlacingOrder ? 'Processing' : 'Place Order' }}</span>
            </button>
        </form>
        <div v-else class="px-4 pt-8">
            <p class="text-xl font-medium">Empty Cart</p>
            <p class="text-gray-400">Add items into the cart.</p>
            <img src="../assets/images/empty-cart.png" alt="empty-cart" class="-mt-6" />
        </div>
    </div>
</template>
