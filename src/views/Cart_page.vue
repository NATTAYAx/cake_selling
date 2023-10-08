<template>
    <Head_tap />
    <div class="cart-page">
        <h1>Your Cart</h1>
        <div v-for="(product, index) in cartItems" :key="index" class="cart-item">
            <div class="product-info">
                <img :src="product.image" :alt="product.name" class="product-image" />
                <div>
                    <p class="product-name">{{ product.name }}</p>
                </div>
            </div>
            <div class="price">{{ product.price }}</div>
            <div class="quantity">
                <button @click="decrement(product)">-</button>
                <span>{{ product.quantity }}</span>
                <button @click="increment(product)">+</button>
            </div>
            <div class="subtotal">{{ productTotalPrice(product) }}</div>
        </div>
        <div class="update-cart">
            <button @click="updateCart">Update Cart</button>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import Head_tap from '@/components/Head_tap.vue';
import products from '@/data/products.js';
import { ref } from 'vue';

const cartStore = useCartStore();
const cartItems = ref(cartStore.cartItems);

const addToCart = (product) => {
    product.price = parseFloat(product.price);
    product.quantity = parseInt(product.quantity, 10);
    cartItems.value.push(product);
    cartItems.value.push(product);
    cartStore.addToCart(product);
};
const increment = (product) => {
  product.quantity++;
  cartStore.addToCart(product); // Update the store's cart items
};

const decrement = (product) => {
  if (product.quantity > 1) {
    product.quantity--;
    cartStore.addToCart(product); // Update the store's cart items
  }
};
</script>
  
<style scoped>
.cart-page {
    width: 400%;
    margin: 0 auto;
    /* Center the cart page horizontally */
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.product-info {
    display: flex;
    align-items: center;
    width: 30%;
    /* 30% of the cart item width */
}

.product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
}

.product-name {
    font-weight: bold;
}

.quantity button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin: 0 5px;
}

.update-cart button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}
</style>