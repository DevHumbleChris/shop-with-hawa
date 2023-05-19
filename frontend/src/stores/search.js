import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
    const isSearchBoxOpen = ref(false)
    const searchString = ref('')

    const openSearchBox = () => {
        isSearchBoxOpen.value = !isSearchBoxOpen.value
    }

    const updateSearchString = (payload) => {
        searchString.value = payload
    }

    return {
        isSearchBoxOpen,
        openSearchBox,
        searchString,
        updateSearchString
    }
})
