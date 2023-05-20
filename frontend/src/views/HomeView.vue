<script setup>
import OnlineShop from '@/components/OnlineShop.vue';
import { ShoppingBagIcon } from '@heroicons/vue/20/solid'
import { watchEffect, ref, watch, computed } from 'vue'
import { db } from '@/utils/firebaseConfig'
import { collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useHead } from 'unhead'

useHead({
  title: 'Shop With Hawa'
})

const cartStore = useCartStore()
const featuredProducts = ref(null)
const selectedCategory = ref('all')
const router = useRouter()
const searchStore = useSearchStore()

const searchString = computed(() => {
  return searchStore.searchString
})

watch(searchString, (textSearch) => {
  if (textSearch) {
    const allProducts = [...menClothing.value, ...womenClothing.value, ...jewellery.value, ...electronics.value]
    const prod = allProducts.filter(obj => {
      obj.title = obj.title.toLowerCase()
      return obj.title.includes(textSearch.toLocaleLowerCase())
    })
    products.value = prod
  }
})

watchEffect(() => {
  let categories = ['jewellery', 'mens-clothing', 'womens-clothing', 'electronics']
  let selectedCategory = categories[Math.floor(Math.random() * categories.length)]
  const q = query(collection(db, "products", "categories", `${selectedCategory}`), orderBy("timestamp", "desc"), limit(2));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const myTweets = []
    querySnapshot.forEach(doc => {
      myTweets.push({ ...doc.data(), id: doc.id })
    })
    featuredProducts.value = myTweets
  })
  return () => unsub()
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
  switch (selectedCategory.value) {
    case 'all':
      products.value = [...menClothing.value, ...womenClothing.value, ...jewellery.value, ...electronics.value]
      break;
    case 'jewellery':
      products.value = [...jewellery.value]
      break;
    case 'mens-clothing':
      products.value = [...menClothing.value]
      break;
    case 'womens-clothing':
      products.value = [...womenClothing.value]
      break;
    case 'electronics':
      products.value = [...electronics.value]
      break;
    default:
      products.value = []
  }

})

const addToCart = (prod) => {
  cartStore.addToCart(prod)
}

const setSelectedCategory = (category) => {
  selectedCategory.value = category
}

const bookNow = (prod) => {
  cartStore.addToCart(prod)
  router.push({ path: '/checkout' })
}
</script>

<template>
  <section>
    <div class="relative py-4 overflow-hidden bg-gray-100 sm:py-16 lg:py-20 xl:py-10">
      <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid lg:grid-cols-2 space-y-4">
          <div class="max-w-md mx-auto text-center xl:max-w-lg lg:mx-0 lg:text-left space-y-12">
            <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:leading-tight xl:text-6xl">Bringing
              products more closer to you
              ✨😎</h1>
            <div class="grid md:grid-cols-2 gap-4">
              <img src="../assets/images/illustration-two.png" alt="illustration-two">
              <div class="space-y-3 text-center">
                <p class="text-lg font-medium text-gray-900">Shop like you mean it, buy & also add products to
                  your wishlist.</p>

                <div>
                  <a href="#" title=""
                    class="inline-flex items-center justify-center px-8 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600 rounded-lg"
                    role="button">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-if="featuredProducts" class="grid sm:grid-cols-2 gap-2">
            <div v-for="product in featuredProducts" :key="product.id"
              class="mx-auto max-w-xs bg-white rounded shadow-xl whitespace-nowrap">
              <div class="aspect-w-4 aspect-h-3">
                <img class="object-cover w-full h-full rounded-t" :src="product.prodImg" :alt="product.title" />
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
          </div>
        </div>
      </div>
    </div>
    <div v-if="products">
      <OnlineShop :products="products" :setSelectedCategory="setSelectedCategory" :categorySelect="selectedCategory" />
    </div>
  </section>
</template>
