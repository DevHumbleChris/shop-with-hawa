<script setup>
import { ref, onBeforeMount } from 'vue'
import { toast } from 'vue3-toastify'
import { auth, googleProvider, facebookProvider } from '@/utils/firebaseConfig'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { ClipLoader } from 'vue3-spinner'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            router.push({ name: 'checkout' })
        }
    })
})

const formDetails = ref({
    email: '',
    password: ''
})

const isAuthenticating = ref(false)
const handleSubmit = async () => {
    isAuthenticating.value = true
    await createUserWithEmailAndPassword(auth, formDetails.value.email, formDetails.value.password)
        .then(() => {
            isAuthenticating.value = false
            toast.info('Successfully Created An Account!', {
                theme: 'auto'
            })
        })
        .catch((error) => {
            isAuthenticating.value = false
            toast.error(error.message, {
                theme: 'auto'
            })
        })
}

const signInWithGoogle = async () => {
    isAuthenticating.value = true
    await signInWithPopup(auth, googleProvider)
        .then(() => {
            isAuthenticating.value = false
            toast.error('Successfully Signed In!', {
                theme: 'auto'
            })
        })
        .catch((error) => {
            isAuthenticating.value = false
            toast.error(error.message, {
                theme: 'auto'
            })
        })
}

const signInWithFacebook = async () => {
    isAuthenticating.value = true
    await signInWithPopup(auth, facebookProvider)
        .then(() => {
            isAuthenticating.value = false
            toast.error('Successfully Signed In!', {
                theme: 'auto'
            })
        })
        .catch((error) => {
            isAuthenticating.value = false
            toast.error(error.message, {
                theme: 'auto'
            })
        })
}
</script>

<template>
    <section>
        <div class="relative py-4 overflow-hidden bg-gray-100 sm:py-16 lg:py-20 xl:py-10">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl grid sm:grid-cols-2 items-center gap-2">
                <img src="../assets/images/illustration-two.png" alt="illustration-one" class="px-6 py-12 lg:px-8">
                <div
                    class="flex flex-col justify-center px-4 py-12 shadow-xl rounded-2xl shadow-slate-300 whitespace-nowrap space-y-2 bg-white">
                    <div class="space-y-3">
                        <div class="flex space-x-2 items-center justify-center">
                            <img class="h-16 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="shop-with-hawa" />
                            <span class="block text-xl sm:text-2xl font-bold text-primary">Shop With Hawa</span>
                        </div>
                        <h2 class="text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">Create
                            an Account</h2>
                    </div>

                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" @submit.prevent="handleSubmit">
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div class="mt-2">
                                    <input v-model="formDetails.email" id="email" name="email" type="email"
                                        autocomplete="email" required
                                        class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>

                            <div>
                                <label for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <input v-model="formDetails.password" id="password" name="password" type="password"
                                        autocomplete="current-password" required
                                        class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 items-center space-x-2">
                                    <ClipLoader v-if="isAuthenticating" color="#fff" size="20px" />
                                    <span :class="isAuthenticating ? 'block text-lg animate-pulse' : 'block text-lg'">{{
                                        isAuthenticating ? 'Creating Account...' : 'Register' }}</span>
                                </button>
                            </div>
                        </form>

                        <p class="mt-5 text-center text-sm text-gray-500">
                            Already a Member?
                            <RouterLink to="/signin" class="font-semibold leading-6 text-primary hover:text-indigo-600">
                                Sign in into your account.</RouterLink>
                        </p>
                        <div class="space-y-3 my-3">
                            <div class="flex space-x-2 items-center">
                                <div class="w-full h-[0.1rem] rounded bg-purple-400"></div>
                                <span class="text-lg font-bold">Or</span>
                                <div class="w-full h-[0.1rem] rounded bg-purple-400"></div>
                            </div>
                            <div class="flex flex-wrap sm:grid gap-6 grid-cols-2">
                                <button @click="signInWithGoogle"
                                    class="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 hover:border-primary">
                                    <div class="w-max mx-auto flex items-center justify-center space-x-4">
                                        <img src="https://tailus.io/sources/blocks/plus-social/preview/images/google.svg"
                                            class="w-5" alt="google" />
                                        <span class="block w-max text-sm font-semibold tracking-wide text-cyan-700">With
                                            Google</span>
                                    </div>
                                </button>
                                <button @click="signInWithFacebook"
                                    class="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 hover:border-primary">
                                    <div class="w-max mx-auto flex items-center justify-center space-x-4">
                                        <img src="../assets/images/facebook.png" class="w-5" alt="facebook" />
                                        <span class="block w-max text-sm font-semibold tracking-wide text-cyan-700">With
                                            Facebook</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
