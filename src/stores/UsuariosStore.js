import { defineStore } from 'pinia';

export const useUsuarioStore = defineStore('UsuarioStore', {
    state: () => ({
        usuario: null, 
        token: null, 
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        closeSession() {
            this.usuario = null;
            this.token = null;
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
        },
        setUser(data) {
            this.usuario = data;
            localStorage.setItem('usuario', JSON.stringify(data));
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'usuario',
                storage: window.localStorage,
                paths: ['usuario', 'token'], 
            },
        ],
    },
});
