<script setup>
import { HomeIcon } from '@heroicons/vue/24/outline'
import { useHead } from 'unhead'
import { ref, computed } from 'vue'
import { ClipLoader } from 'vue3-spinner';
import { instance } from '@/utils/axiosConfig'
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth'

useHead({
    title: 'Shop With Hawa | Admin | Settings'
})

const authStore = useAuthStore()

const formDetails = ref({
    newPassword: '',
    confirmPassword: ''
})

const adminDetails = ref({
    email: '',
    password: ''
})

const isChangingPassword = ref(false)
const isCreatingAdmin = ref(false)

const user = computed(() => {
    return authStore?.user
})

const handleChangePassword = async () => {
    isChangingPassword.value = !isChangingPassword.value
    try {
        if (formDetails.value.newPassword === formDetails.value.confirmPassword) {
            const token = localStorage.getItem('token')
            const resp = await instance.post(`users/${user?.value?._id}/update-password`, {
                password: formDetails.value.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (resp.data) {
                isChangingPassword.value = !isChangingPassword.value
                formDetails.value = {
                    newPassword: '',
                    confirmPassword: ''
                }
                toast.info(resp.data.message, {
                    theme: 'colored'
                })
            }
        } else {
            isChangingPassword.value = !isChangingPassword.value
            toast.error('Password Doesn\'t Match, Please re-confirm?', {
                theme: 'colored'
            })
        }
    } catch (err) {
        isChangingPassword.value = !isChangingPassword.value
        if (err?.response?.data?.message) {
            toast.error(err.response.data.message, {
                theme: 'auto'
            })
        } else {
            toast.error(err?.message, {
                theme: 'auto'
            })
        }
    }
}
</script>

<template>
    <section>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-indigo-600 font-bold">Account Settings</h1>
            <div class="flex items-center space-x-1 text-gray-500">
                <HomeIcon class="w-6" />
                <span>></span>
                <span class="block text-indigo-600">settings</span>
            </div>
        </div>

        <div class="mx-auto max-w-3xl my-10 space-y-12">

            <div class="space-y-3">
                <h2 class="font-bold text-indigo-600 text-lg">Change Password</h2>
                <form @submit.prevent="handleChangePassword" class="space-y-4">
                    <div class="space-y-2">
                        <label for="newPassword" class="block font-medium leading-6 text-gray-900">New Password</label>
                        <input v-model="formDetails.newPassword" type="password" id="newPassword"
                            class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required />
                    </div>
                    <div class="space-y-2">
                        <label for="confirmPassword" class="block font-medium leading-6 text-gray-900">Confirm
                            Password</label>
                        <input v-model="formDetails.confirmPassword" type="text" id="confirmPassword"
                            class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required />
                    </div>
                    <button type="submit"
                        class="w-full rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex space-x-1 justify-center items-center">
                        <ClipLoader v-if="isChangingPassword" color="#fff" size="27px" />
                        <span class="relative block text-base font-semibold">
                            {{ isChangingPassword ? "Processing" : "Change Password" }}
                        </span>
                    </button>
                </form>
            </div>

            <div class="space-y-3">
                <h2 class="font-bold text-indigo-600 text-lg">Create User</h2>
                <form class="space-y-4">
                    <div class="space-y-2">
                        <label for="email" class="block font-medium leading-6 text-gray-900">Email</label>
                        <input v-model="adminDetails.email" type="text" id="email"
                            class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required />
                    </div>
                    <div class="space-y-2">
                        <label for="password" class="block font-medium leading-6 text-gray-900">Password</label>
                        <input v-model="adminDetails.password" type="password" id="password"
                            class="mt-2 block w-full rounded-md border-0 3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required />
                    </div>
                    <button type="submit"
                        class="w-full rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 flex space-x-1 justify-center items-center">
                        <ClipLoader v-if="isCreatingAdmin" color="#fff" size="27px" />
                        <span class="relative block text-base font-semibold">
                            {{ isCreatingAdmin ? "Processing" : "Create New Admin" }}
                        </span>
                    </button>
                </form>
            </div>
        </div>


    </section>
</template>
