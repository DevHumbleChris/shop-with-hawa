<script setup>
import DashboardPic from '@/assets/images/dashboard.webp'
import { HomeIcon, UsersIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'
import { ref, watchEffect, onBeforeMount, computed } from 'vue'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/utils/firebaseConfig'
import { useHead } from 'unhead'
import { instance } from '@/utils/axiosConfig'

useHead({
  title: 'Shop With Hawa | Admin | Dashboard'
})

const users = ref([])
onBeforeMount(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const resp = await instance.get('users/get-users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    users.value = resp.data.users
  }
})

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

const orders = ref([])
watchEffect(() => {
  const q = query(collection(db, "orders"), orderBy('timestamp'));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const allOrders = []
    querySnapshot.forEach(doc => {
        allOrders.push({ ...doc.data(), id: doc.id })
    })
    orders.value = allOrders
  })
  return () => unsub()
})
const noOfOrders = computed(() => {
  return orders?.value?.length
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
                        <p class="text-5xl text-primary">{{ users.length }}</p>
                    </div>
                </div>
                <div class="border border-gray-300 px-3 py-4 rounded-xl shadow-lg space-y-3">
                    <p class="text-indigo-600 font-bold">Total Number Of Products</p>
                    <div class="flex justify-between items-center">
                        <Squares2X2Icon class="w-12 text-gray-500" />
                        <p class="text-5xl text-primary">{{ products.length }}</p>
                    </div>
                </div>
                <div class="border border-gray-300 px-3 py-4 rounded-xl shadow-lg space-y-3">
                  <p class="text-indigo-600 font-bold">Total Number Of Orders</p>
                  <div class="flex justify-between items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-12 text-gray-500" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2">
                          <path d="m7 10l5-6l5 6m4 0l-2 8a2 2.5 0 0 1-2 2H7a2 2.5 0 0 1-2-2l-2-8z" />
                          <path d="M10 15a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
                      </g>
                  </svg>
                      <p class="text-5xl text-primary">{{ noOfOrders }}</p>
                  </div>
              </div>
            </div>
        </div>
    </section>
</template>
