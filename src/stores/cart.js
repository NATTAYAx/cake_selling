import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart', // Provide a unique id for your store
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.cartItems.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      const existingProductIndex = this.cartItems.findIndex(item => item.id === productId);
      if (existingProductIndex !== -1) {
        const existingProduct = this.cartItems[existingProductIndex];
        existingProduct.quantity--;
        if (existingProduct.quantity <= 0) {
          this.cartItems.splice(existingProductIndex, 1);
        }
      }
    },
    // Add other actions as needed
  },
  getters: {
    cartItemCount: (state) => state.cartItems.length,
    totalCartItems: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0),
  },
});

export function useCart() {
  return useCartStore();
}