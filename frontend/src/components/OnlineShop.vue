<script setup>
import { AdjustmentsHorizontalIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline'
import ShopWrapper from './ShopWrapper.vue'
import { computed } from 'vue'

const props = defineProps({
    products: Array,
    setSelectedCategory: Function,
    categorySelect: String
})

const products = computed(() => {
    return props?.products
})

const categorySelect = computed(() => {
    return props.categorySelect
})

const selectedCategory = (category) => {
    props.setSelectedCategory(category)
}
</script>

<template>
    <section class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl space-y-3 my-4">
        <h1 class="text-3xl font-bold text-gray-900 leading-tight text-center lg:text-left">Shop 🛒</h1>
        <div class="sm:flex space-x-3 relative">
            <div class="bg-white hidden lg:block rounded-md w-[15rem] max-h-96 sticky top-0">
                <h2 class="flex items-center space-x-2 border-b p-2 border-gray-300">
                    <AdjustmentsHorizontalIcon class="w-4 text-gray-400" />
                    <span class="text-gray-900 block">Filters</span>
                </h2>
                <div class="p-3 my-2 space-y-3">
                    <div>
                        <p class="text-lg font-bold text-gray-900 leading-tight">Category</p>
                        <ul class="p-2 space-y-3">
                            <li @click="selectedCategory('all')" class="flex items-center justify-between group cursor-pointer">
                                <span :class="categorySelect === 'all' ? 'block text-primary font-bold': 'block group-hover:text-primary group-hover:font-bold'">All</span>
                                <ChevronDoubleRightIcon class="w-4 group-hover:text-primary" />
                            </li>
                            <li @click="selectedCategory('electronics')" class="flex items-center justify-between group cursor-pointer">
                                <span :class="categorySelect === 'electronics' ? 'block text-primary font-bold': 'block group-hover:text-primary group-hover:font-bold'">Electronics</span>
                                <ChevronDoubleRightIcon class="w-4 group-hover:text-primary" />
                            </li>
                            <li @click="selectedCategory('jewellery')" class="flex items-center justify-between group cursor-pointer">
                                <span :class="categorySelect === 'jewellery' ? 'block text-primary font-bold': 'block group-hover:text-primary group-hover:font-bold'">Jewelery</span>
                                <ChevronDoubleRightIcon class="w-4 group-hover:text-primary" />
                            </li>
                            <li @click="selectedCategory('mens-clothing')" class="flex items-center justify-between group cursor-pointer">
                                <span :class="categorySelect === 'mens-clothing' ? 'block text-primary font-bold': 'block group-hover:text-primary group-hover:font-bold'">Men's Clothing</span>
                                <ChevronDoubleRightIcon class="w-4 group-hover:text-primary" />
                            </li>
                            <li @click="selectedCategory('womens-clothing')" class="flex items-center justify-between group cursor-pointer">
                                <span :class="categorySelect === 'womens-clothing' ? 'block text-primary font-bold': 'block group-hover:text-primary group-hover:font-bold'">Women's Clothing</span>
                                <ChevronDoubleRightIcon class="w-4 group-hover:text-primary" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="products">
                <ShopWrapper :products="products" />
            </div>
        </div>
    </section>
</template>
