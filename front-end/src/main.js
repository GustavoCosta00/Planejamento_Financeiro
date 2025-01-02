import './assets/main.css';
import axios from 'axios';
import App from './App.vue';
import router from '../router';

import { createApp } from 'vue';

// Define a URL base para o Axios
axios.defaults.baseURL = 'http://localhost:5000';

// Cria a aplicação
const app = createApp(App);

// Usa o Vue Router
app.use(router);

// Monta a aplicação
app.mount('#app');
