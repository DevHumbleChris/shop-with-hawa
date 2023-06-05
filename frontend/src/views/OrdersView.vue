<script setup>
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useHead } from "unhead";
import { ref, watchEffect, computed, onBeforeMount } from "vue";
import { db } from "@/utils/firebaseConfig";
import { useHeaderStore } from "@/stores/header";
import { auth } from "@/utils/firebaseConfig";
import { useRouter } from "vue-router";

useHead({
  title: "Shop With Hawa | Orders",
});
const router = useRouter();

onBeforeMount(() => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push({ name: "signin" });
    }
  });
});

const headStore = useHeaderStore();
const user = computed(() => {
  return headStore?.userInfo;
});

const userOrders = ref([]);
watchEffect(() => {
  const q = query(collection(db, "orders"), orderBy("timestamp"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const allOrders = [];
    querySnapshot.forEach((doc) => {
      allOrders.push({ ...doc.data(), id: doc.id });
    });
    userOrders.value = allOrders;
    userOrders.value = userOrders?.value?.filter(
      (order) => order?.user?.uid === user?.value?.uid
    );
  });
  return () => unsub();
});
</script>

<template>
  <section class="p-4">
    <div>
      <h1 class="text-xl font-medium">Orders Summary</h1>
      <p class="text-gray-400">Here is your list of all the orders placed.</p>
    </div>
    <div class="grid gap-3 md:grid-cols-2">
      <img src="@/assets/images/orders.png" alt="orders" />
      <div class="space-y-3">
        <h2 class="text-xl font-medium">Orders Placed.</h2>
        <div v-if="userOrders?.length <= 0">No Orders Placed.</div>
        <div v-else class="space-y-2">
          <div
            v-for="order in userOrders"
            :key="order.id"
            class="flex items-center space-x-2 border rounded-lg hover:drop-shadow-lg p-2 hover:shadow-lg hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-20 h-auto text-gray-500"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path
                  d="m7 10l5-6l5 6m4 0l-2 8a2 2.5 0 0 1-2 2H7a2 2.5 0 0 1-2-2l-2-8z"
                />
                <path d="M10 15a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
              </g>
            </svg>
            <div class="text-sm">
              <p><span class="font-bold">Order ID:</span> {{ order.id }}</p>
              <p>
                <span class="font-bold">Order Status: </span
                >{{
                  order.isOrderConfirmed ? "Order Received" : "Not Received"
                }}
              </p>
              <p>
                <span class="font-bold">Payment Status:</span>
                <span
                  :class="
                    order?.isOrderPaid ? 'text-green-600' : 'text-red-600'
                  "
                  >{{ order?.isOrderPaid ? "Paid" : "Not Paid" }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
