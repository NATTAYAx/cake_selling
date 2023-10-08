<template>
    <Head_tap />
    <div class="product-detail" v-if="product">
        <div class="product-image">
            <img :src="product.image" :alt="product.name" class="img" />
        </div>
        <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <div class="add-to-cart">
                <button @click="addToCartHandler">Add to Cart</button>
                <div class="quantity">
                    <button @click="decrement">-</button>
                    <input type="text" :value="quantity" readonly />
                    <button @click="increment">+</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Product not found.
    </div>
</template>
  
<script setup>
import { products } from '@/data/products.js';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import Head_tap from '@/components/Head_tap.vue';

const route = useRoute();
const { addToCart } = useCartStore();
const product = ref(null);
const quantity = ref(1); // Set default quantity to 1

const increment = () => {
    quantity.value++;
};

const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

onMounted(() => {
    const productId = parseInt(route.params.id);
    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
        product.value = selectedProduct;
    } else {
        // Handle product not found, for example: redirect to a not found page
        // router.push('/not-found');
    }
});

const addToCartHandler = () => {
  addToCart(product.value); // Call addToCart with the selected product
};

</script>
  
<style scoped>
.product-detail {
    display: flex;
    margin-top: 100px;
}

.img{
    width: 500px;
    height: 500px;
}
.product-info {
    margin-left: 20px;
    text-align: left;
    padding: 20px;
    width: 500%;
}

.quantity {
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.quantity button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
}

.quantity input {
    padding: 10px;
    width: 40px;
    text-align: center;
    border: 1px solid #ddd;
    margin: 0 10px;
}

.product-info h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    width: 500%;
}

.product-info p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 20px;
    width: 500%;
}

.product-info button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
}
</style>
  