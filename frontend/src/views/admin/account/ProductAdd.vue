<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { ClipLoader } from 'vue3-spinner';
import { uploadString, getDownloadURL, ref as storageRef } from 'firebase/storage'
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/utils/firebaseConfig'
import { toast } from 'vue3-toastify'

const formDetails = ref({
    title: '',
    price: 0,
    description: '',
    category: 'Men\'s Clothing',
    prodImg: ''
})

const isSavingData = ref(false)
const tempProductImgPreview = ref(null)

const handleSubmit = async () => {
    isSavingData.value = !isSavingData.value
    if (tempProductImgPreview.value) {
        const docRef = await addDoc(collection(db, "products", "categories", `${formDetails.value.category}`), {
            ...formDetails.value,
            timestamp: serverTimestamp()
        })
        if (docRef) {
            const imageRef = storageRef(storage, `products/images/${formDetails.value.category}/${docRef.id}`);
            await uploadString(imageRef, tempProductImgPreview.value, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "products", "categories", `${formDetails.value.category}`, docRef.id), {
                    prodImg: downloadURL,
                });
            });
            isSavingData.value = !isSavingData.value
            formDetails.value = {
                title: '',
                price: 0,
                description: '',
                category: 'Men\'s Clothing',
                prodImg: ''
            }
            tempProductImgPreview.value = null
            toast.info('Product Added Successfully!', {
                theme: 'auto'
            })
        }
    } else {
        isSavingData.value = !isSavingData.value
        toast.error('Product Image is required', {
            theme: 'auto'
        })
    }
}

const handleChangeOnImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
        tempProductImgPreview.value = readerEvent.target.result;
    };
};
</script>

<template>
    <section>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-indigo-600 font-bold">Add Product</h1>
            <div class="flex items-center space-x-1 text-gray-500">
                <HomeIcon class="w-6" />
                <span>></span>
                <span class="block text-indigo-600">add-product</span>
            </div>
        </div>
        <form @submit.prevent="handleSubmit" class="grid my-4 mb-20 max-w-3xl mx-auto">
            <div>
                <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <label for="prod-title" class="block font-medium leading-6 text-gray-900">Title</label>
                                <input v-model="formDetails.title" type="text" id="prod-title"
                                    class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required />
                            </div>
                            <div class="grid sm:grid-cols-6 col-span-6 sm:col-span-6 gap-2">
                                <div class="sm:col-span-3">
                                    <label class="block font-medium leading-6 text-gray-900">Product Image</label>
                                    <div v-if="tempProductImgPreview == null"
                                        class="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                        <div class="space-y-1 text-center">
                                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                                viewBox="0 0 48 48" aria-hidden="true">
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="flex text-sm text-gray-600">
                                                <label for="tempProductImgPreview"
                                                    class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input @change="handleChangeOnImg" id="tempProductImgPreview"
                                                        name="tempProductImgPreview" type="file" class="sr-only" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="grid grid-cols-2 gap-2 items-center">
                                        <div
                                            class="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div class="space-y-1 text-center">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor"
                                                    fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <div class="flex text-sm text-gray-600">
                                                    <label for="prodImg"
                                                        class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Change file</span>
                                                        <input @change="handleChangeOnImg" id="prodImg" name="prodImg"
                                                            type="file" class="sr-only" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <img :src="tempProductImgPreview" :alt="formDetails.title">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-3 space-y-2">
                                    <div class="">
                                        <label for="prod-price"
                                            class="block font-medium leading-6 text-gray-900">Price</label>
                                        <input v-model="formDetails.price" type="number" id="prod-price"
                                            class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            required />
                                    </div>
                                    <div class="">
                                        <label for="category"
                                            class="block font-medium leading-6 text-gray-900">Category</label>
                                        <div class="mt-2">
                                            <select v-model="formDetails.category" id="category" name="category"
                                                autocomplete="category"
                                                class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required>
                                                <option value="mens-clothing">Men's Clothing</option>
                                                <option value="womens-clothing">Women's Clothing</option>
                                                <option value="electronics">Electronics</option>
                                                <option value="jewellery">Jewellery</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-6">
                                <div class="col-span-full">
                                    <label for="description"
                                        class="block font-medium leading-6 text-gray-900">Description</label>
                                    <div class="mt-2">
                                        <textarea v-model="formDetails.description" id="description" name="description"
                                            rows="3"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                    <p class="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about the product.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-3 w-1/2 float-right sm:px-6">
                        <button type="submit"
                            class="w-full rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex space-x-1 justify-center items-center">
                            <ClipLoader v-if="isSavingData" color="#fff" size="27px" />
                            <span class="relative block text-base font-semibold">
                                {{ isSavingData ? "Processing" : "Add Product" }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>
