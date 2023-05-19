<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import ProductItem from './ProductItem.vue';
import { computed, ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search'
const searchStore = useSearchStore()

const props = defineProps({
    products: Array
})

const products = computed(() => {
    return props?.products
})

const textSearch = ref('')

watch(textSearch, (newTextSearch) => {
    searchStore.updateSearchString(newTextSearch)
})
</script>

<template>
    <div class="space-y-3">
        <div class="relative mx-auto max-w-sm bg-white p-3 rounded-full hover:border hover:border-primary">
            <input v-model="textSearch" type="text" placeholder="Search..." class="border-0 outline-none w-full rounded-lg">
            <MagnifyingGlassIcon class="w-8 absolute top-3.5 right-2 text-primary" />
        </div>
        <div v-if="products" class="p-3 mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ProductItem v-for="product in products" :key="product.id" :product="product"/>
        </div>
    </div>
</template>
