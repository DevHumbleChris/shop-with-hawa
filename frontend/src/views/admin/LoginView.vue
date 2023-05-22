<script setup>
import { instance } from '@/utils/axiosConfig'
import { ref } from 'vue'
import { toast } from 'vue3-toastify';
import { ClipLoader } from 'vue3-spinner'
import { useHead } from 'unhead'

useHead({
  title: 'Shop With Hawa | Admin | Login '
})

const formDetails = ref({
    email: '',
    password: ''
})
const isAuthenticating = ref(false)

const handleSubmit = async () => {
    isAuthenticating.value = !isAuthenticating.value
    try {
        const response = await instance.post('auth/signin', formDetails.value)
        console.log(response)
    } catch (err) {
        isAuthenticating.value = !isAuthenticating.value
        toast.error(err.message, {
            theme: 'auto'
        })
    }
}
</script>

<template>
    <div class="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div class="mx-auto h-full sm:max-w-xs">
            <div class="m-auto  py-12">
                <div class="mt-12 rounded-3xl border bg-gray-50 -mx-6 sm:-mx-10 p-8 sm:p-10">
                    <h3 class="text-2xl font-semibold text-gray-700 text-center">Login to your account</h3>

                    <form @submit.prevent="handleSubmit" class="mt-10 space-y-8">
                        <div
                            class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 before:transition before:duration-300">
                            <input v-model="formDetails.email" id="email" type="text" placeholder="email address"
                                class="w-full bg-transparent pb-3 border-b-2 border-t-0 border-r-0 border-l-0 focus:outline-none outline-none transition" required>
                        </div>

                        <div
                            class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 before:transition before:duration-300">
                            <input v-model="formDetails.password" id="password" type="password" placeholder="enter your password"
                                class="w-full bg-transparent pb-3 border-b-2 border-t-0 border-r-0 border-l-0 focus:outline-none outline-none transition" required>
                        </div>

                        <div>
                            <button type="submit"
                                class="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800 text-white">
                                <ClipLoader v-if="isAuthenticating" color="#fff" size="20px" />
                                <span :class="isAuthenticating ? 'block text-lg animate-pulse' : 'block text-lg'">{{
                                    isAuthenticating ? 'Authenticating' : 'Sign in' }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
