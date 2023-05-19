<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const props = defineProps({
    product: Object
})

const product = computed(() => {
    return props?.product
})

const addToCart = (prod) => {
    cartStore.addToCart(prod)
}

const bookNow = (prod) => {
    cartStore.addToCart(prod)
    router.push({ path: '/checkout'})
}
</script>

<template>
    <div class="mx-auto max-w-xs bg-white rounded shadow-xl whitespace-nowrap">
        <div class="aspect-w-4 aspect-h-3">
            <img class="object-cover w-full h-full rounded-t"
                :src="product.prodImg"
                :alt="product.title" />
        </div>
        <div class="p-4 space-y-2">
            <p class="text-lg font-bold text-gray-900">{{ product.title }}</p>
            <p class="text-lg font-bold text-gray-900">Ksh {{ product.price }}</p>
            <div class="grid grid-cols-2 gap-x-4">
                <button @click="addToCart(product)"
                    class="inline-flex space-x-2 items-center justify-center p-3 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 rounded-lg hover:border-primary group"
                    role="button">
                    <ShoppingBagIcon class="w-5 group-hover:text-primary" />
                    <span class="group-hover:text-primary">Add To Cart</span>
                </button>
                <button @click="bookNow(product)"
                    class="inline-flex items-center justify-center p-3 text-sm font-bold text-white transition-all duration-200 bg-primary border border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary hover:bg-secondary rounded-lg hover:text-gray-900"
                    role="button">
                    Buy Now
            </button>
            </div>
        </div>
    </div>
</template>
