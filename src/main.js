

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@popperjs/core';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'
import axios from 'axios';
import { useUsuarioStore } from "@/stores/UsuariosStore";

axios.interceptors.response.use(response => {
    return response; 
}, error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const userStore = useUsuarioStore();
      userStore.closeSession(); 
      router.push('/login');
    }
    return Promise.reject(error);
});


const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

// 
