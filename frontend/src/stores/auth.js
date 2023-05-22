import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const user = ref(null)

    const setAuthenticated = (payload) => {
        isAuthenticated.value = true
        localStorage.setItem('authenticated', isAuthenticated.value)
        localStorage.setItem('token', payload.token)
    }

    const logOut = () => {
        isAuthenticated.value = false
        localStorage.removeItem('authenticated')
        localStorage.removeItem('token')
    }

    const setUser = (payload) => {
        user.value = {
            email: payload.email,
            _id: payload._id
        }
        localStorage.setItem('user', JSON.stringify(payload))
    }

    const removeUser = () => {
        user.value = null
        localStorage.removeItem('user')
    }

    return {
        isAuthenticated,
        setAuthenticated,
        logOut,
        user,
        setUser,
        removeUser
    }
})
