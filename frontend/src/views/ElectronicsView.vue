<script setup>
import ShopWrapper from '../components/ShopWrapper.vue'
import { watchEffect, ref } from 'vue'
import { db } from '@/utils/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const products = ref(null)

watchEffect(() => {
  const q = query(collection(db, "products", "categories", "electronics"), orderBy("timestamp", "desc"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const prods = []
    querySnapshot.forEach(doc => {
      prods.push({ ...doc.data(), id: doc.id })
    })
    products.value = prods
  })
  return () => unsub()
})
</script>

<template>
  <section class="relative py-4 overflow-hidden bg-gray-100 sm:py-16 lg:py-20 xl:py-10">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="grid lg:grid-cols-2 items-center space-y-4">
        <div class="max-w-md mx-auto text-center xl:max-w-lg lg:mx-0 lg:text-left space-y-12">
          <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:leading-tight xl:text-6xl">Experience the
            future at your fingertips - Explore our high-tech electronics today!
            ✨😎</h1>
        </div>

        <img src="../assets/images/electronics.png" alt="electronics" class="object-fit" />
      </div>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 leading-tight text-center my-3">Electronics Shop 🛒</h1>
    <div v-if="products">
      <ShopWrapper :products="products" />
    </div>
  </section>
</template>
