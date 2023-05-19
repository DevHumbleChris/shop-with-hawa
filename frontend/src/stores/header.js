import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeaderStore = defineStore("header", () => {
  const isSidebarOpen = ref(false);
  const userInfo = ref(null);

  const openSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  const setUserInfo = (payload) => {
    userInfo.value = payload
  }

  return {
    isSidebarOpen,
    openSidebar,
    userInfo,
    setUserInfo
  };
});
