import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import CartPage from '@/views/Cart_page.vue';

const routes = [
  {
    path: '/',
    component: ProductList,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;