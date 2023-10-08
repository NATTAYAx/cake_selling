<template>
  <Head_tap />
  <div class="product-list">
    <div class="product-container" v-for="product in productsList" :key="product.id">
      <div class="product" @mouseover="setHover(product.id, true)" @mouseleave="setHover(product.id, false)">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-overlay" v-if="hoveredProductId === product.id">
          <button @click="addToCartHandler(product)">Add to Cart</button>
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">View</router-link>
        </div>
      </div>
      <div class="product-info">
        <h2>{{ product.name }}</h2>
        <div v-if="product.onPromotion">
          <span class="original-price">{{ product.originalPrice }}</span>
          <span class="promotion-price">{{ product.promotionPrice }}</span>
        </div>
        <div v-else>
          <span>{{ product.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head_tap from '@/components/Head_tap.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '@/stores/cart';
import { products } from '@/data/Products.js';

const route = useRoute();
const hoveredProductId = ref(null);

const { addToCart } = useCart();
const productsList = ref(products);
const cartItemCount = ref(0);

onMounted(() => {
  const productId = parseInt(route.params.id);
  const selectedProduct = productsList.value.find(p => p.id === productId);
});

const setHover = (productId, isHovered) => {
  hoveredProductId.value = isHovered ? productId : null;
};

const addToCartHandler = (product) => {
  addToCart(product);
  cartItemCount.value++; 
};

</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.tab {
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
}

.product-list {
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}

.logo {
  width: 50px;
  height: 50px;
}

.cart {
  display: flex;
  align-items: center;
}

.cart-icon {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.cart-count {
  color: black;
  font-weight: bold;
  margin-left: 2px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.product {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s;
}

.product:hover .product-overlay {
  opacity: 1;
}

.product-overlay button,
.product-overlay a {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
}

.product-info {
  text-align: center;
  margin-top: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
}

.promotion-price {
  color: #e44d26;
  font-weight: bold;
}
</style>