<script setup>
import DashboardPic from '@/assets/images/dashboard.webp'
import { HomeIcon, UsersIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'
import { ref, watchEffect } from 'vue'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/utils/firebaseConfig'

const menClothing = ref([])
watchEffect(() => {
  const q = query(collection(db, "products", "categories", "mens-clothing"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const prods = []
    querySnapshot.forEach(doc => {
      prods.push({ ...doc.data(), id: doc.id })
    })
    menClothing.value = prods
  })
  return () => unsub()
})

const womenClothing = ref([])
watchEffect(() => {
  const q = query(collection(db, "products", "categories", "womens-clothing"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const prods = []
    querySnapshot.forEach(doc => {
      prods.push({ ...doc.data(), id: doc.id })
    })
    womenClothing.value = prods
  })
  return () => unsub()
})

const jewellery = ref([])
watchEffect(() => {
  const q = query(collection(db, "products", "categories", "jewellery"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const prods = []
    querySnapshot.forEach(doc => {
      prods.push({ ...doc.data(), id: doc.id })
    })
    jewellery.value = prods
  })
  return () => unsub()
})

const electronics = ref([])
watchEffect(() => {
  const q = query(collection(db, "products", "categories", "electronics"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const prods = []
    querySnapshot.forEach(doc => {
      prods.push({ ...doc.data(), id: doc.id })
    })
    electronics.value = prods
  })
  return () => unsub()
})

const products = ref([])
watchEffect(() => {
  products.value = [...menClothing.value, ...womenClothing.value, ...jewellery.value, ...electronics.value]
})
</script>

<template>
    <section>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-indigo-600 font-bold">Dashboard</h1>
            <div class="flex items-center space-x-1 text-gray-500">
                <HomeIcon class="w-6" />
                <span>></span>
                <span class="block text-indigo-600">dashboard</span>
            </div>
        </div>
        <div class="grid items-center sm:grid-cols-2 gap-3">
            <img :src="DashboardPic" alt="dashboard-pic" />
            <div class="space-y-6 mb-20 md:mb-0">
                <div class="border border-gray-300 px-3 py-4 rounded-xl shadow-lg space-y-3">
                    <p class="text-indigo-600 font-bold">Total Number Of Users</p>
                    <div class="flex justify-between items-center">
                        <UsersIcon class="w-12 text-gray-500" />
                        <p class="text-5xl text-primary">34</p>
                    </div>
                </div>
                <div class="border border-gray-300 px-3 py-4 rounded-xl shadow-lg space-y-3">
                    <p class="text-indigo-600 font-bold">Total Number Of Products</p>
                    <div class="flex justify-between items-center">
                        <Squares2X2Icon class="w-12 text-gray-500" />
                        <p class="text-5xl text-primary">{{ products.length }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
