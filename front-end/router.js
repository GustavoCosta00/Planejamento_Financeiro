import { createRouter, createWebHistory } from 'vue-router';
import Home from './src/views/Home.vue';
import Inicio from './src/views/Inicio.vue'

const routes = [
    { path: '/', component: Home },
    {path: '/admin', component: Inicio}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
