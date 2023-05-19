import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const isShoppingCartOpen = ref(false);
  const cart = ref([]);

  const openShoppingCart = () => {
    isShoppingCartOpen.value = !isShoppingCartOpen.value;
  };

  const addToCart = (payload) => {
    const filteredCart = cart.value.filter((prod) => prod.id !== payload.id);
    const newCart = [...filteredCart, { ...payload, quantity: 1 }];
    cart.value = newCart;
  };

  const noOfItemsInCart = computed(() => {
    return cart?.value?.length;
  });

  const incQuantity = (payload) => {
    cart.value.map((prod) => {
      if (prod.id === payload) {
        prod.quantity = prod.quantity + 1;
      }
    });
  };

  const decQuantity = (payload) => {
    cart.value.map((prod) => {
      if (prod.id === payload) {
        if (prod.quantity === 1) {
          prod.quantity = 1;
        } else {
          prod.quantity = prod.quantity - 1;
        }
      }
    });
  };

  const removeProdFromCart = (payload) => {
    const newCart = cart.value.filter((prod) => prod.id !== payload);
    cart.value = newCart;
  };

  const subTotal = computed(() => {
    return cart?.value?.reduce((total, prod) => {
      let prodTotal = prod?.quantity * prod?.price;
      return (total = total + prodTotal);
    }, 0);
  });

  return {
    isShoppingCartOpen,
    openShoppingCart,
    cart,
    addToCart,
    noOfItemsInCart,
    incQuantity,
    decQuantity,
    removeProdFromCart,
    subTotal,
  };
});
