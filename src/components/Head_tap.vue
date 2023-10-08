<template>
    <div class="cart-tab">
        <img src="https://t4.ftcdn.net/jpg/04/50/35/33/360_F_450353376_69Lp5NmR674oWG82ReeTU7JCsEqIpNH5.jpg" alt="Logo"
            class="logo" />
        <div class="cart" @click="goToCartPage">
            <router-link to="/cart" class="logo-link">
                <img src="https://img.icons8.com/?size=256&id=v2xcJsdCOidU&format=png" alt="Cart" class="cart-icon" />
            </router-link>
            <span class="cart-count">{{ cartItemCount }}</span>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const cartItemCount = cartStore.cartItemCount;
const router = useRouter();

const goToCartPage = () => {
    router.push({ name: 'CartPage' }); // Replace 'CartPage' with the correct route name
};
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    /* Add padding to both left and right sides */
}

.cart-tab {
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    /* Ensure it's above other content */
}

.product-list {
    margin-top: 60px;
    /* Adjust this margin to leave space for the fixed tab */
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* Display 4 columns */
    gap: 20px;
    padding: 20px;
    justify-content: center;
    width: 100%;
    /* Take full width of the container */
    max-width: 1200px;
    /* Limit the maximum width */
}

.logo-link {
    text-decoration: none;
    cursor: pointer;
}

.logo {
    width: 50px;
    height: 50px;
    /* Add styles for the logo image */
}

.cart {
    display: flex;
    align-items: center;
    /* Add styles for the cart container */
}

.cart-icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    /* Add styles for the cart icon image */
}

.cart-count {
    color: black;
    /* Set the color to black */
    font-weight: bold;
    /* Make the text bold for better visibility */
    margin-left: 2px;
}
</style>