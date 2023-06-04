<script setup>
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from '@firebase/firestore';
import { HomeIcon } from '@heroicons/vue/24/outline'
import { useHead } from 'unhead'
import { watchEffect, ref } from 'vue';
import { db } from '@/utils/firebaseConfig'
import { toast } from 'vue3-toastify'

useHead({
    title: 'Shop With Hawa | Admin | Orders'
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

const confirmPayment = async (orderID) => {
    try {
        await updateDoc(doc(db, 'orders', orderID), {
            isOrderPaid: true
        })
        toast.info('Confirmed Payment On Order', {
            theme: 'colored'
        })
    } catch (err) {
        toast.error(err.message, {
            theme: 'colored'
        })
    }
}
</script>

<template>
    <section>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-indigo-600 font-bold">Orders</h1>
            <div class="flex items-center space-x-1 text-gray-500">
                <HomeIcon class="w-6" />
                <span>></span>
                <span class="block text-indigo-600">orders</span>
            </div>
        </div>

        <div class="relative overflow-x-auto my-12">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Bill Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ order?.billAddress }}
                        </th>
                        <td class="px-6 py-4">
                            {{ order?.email }}
                        </td>
                        <td class="px-6 py-4">
                            {{ order?.phoneNo }}
                        </td>
                        <td class="px-6 py-4">
                            <p v-if="order.isOrderPaid" class="text-green-700">Order Paid</p>
                            <button @click="confirmPayment(order.id)" v-else
                                class="bg-indigo-600 text-white p-3 rounded-md">
                                Confirm Payment
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
