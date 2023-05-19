<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/vue/20/solid'
import { useHeaderStore } from '@/stores/header'
import { computed } from 'vue'
import { auth } from '@/utils/firebaseConfig'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const headerStore = useHeaderStore()
const router = useRouter()

const user = computed(() => {
    return headerStore?.userInfo
})

const signUserOut = () => {
    signOut(auth)
        .then(() => {
            router.push({ name: 'home' })
            toast.info('Successfully Signed Out!', {
                theme: 'auto'
            })
        })
        .catch(err => {
            toast.error(err.message, {
                theme: 'auto'
            })
        })
}

</script>

<template>
    <div class="text-right">
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton
                    class="flex items-center w-full justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <img v-if="user" :src="user?.photoURL" :alt="'user-image-' + user?.email" class="h-7 w-7 object-fit rounded-full" />
                    <UserCircleIcon v-else class="w-7 flex-shrink-0 text-gray-400 hover:text-gray-500" />
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-indigo-600 hover:text-indigo-100" aria-hidden="true" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                        <MenuItem>
                        <p class="p-2 text-center">
                            {{ user?.displayName || user?.email }}
                        </p>
                        </MenuItem>
                    </div>
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                        <button @click="signUserOut" :class="[
                            active ? 'bg-indigo-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]">
                            <ArrowRightOnRectangleIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                            Signout
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>
