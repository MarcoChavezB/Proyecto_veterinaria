import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})





// pinia
// hacemos esto para cambiar la variable 
export const useStore = defineStore('store', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});


// variable de productos internos 
export const StorePublics = defineStore('stores', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

// variable de productos internos 
export const StoreSearch = defineStore('search', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});


export const StoreProdInternos = defineStore('prodInterno', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const StoreProdPublics = defineStore('prodPublico', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

// productos publicos
export const productosPublicosR = defineStore('productoPublico', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const productosInternosR = defineStore('productoInterno', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});


export const dataLog = defineStore('userData', () => {
  const state = {
    variable: {},
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const citas = defineStore('cita', () => {
  const state = {
    variable: {},
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const card = defineStore('card', () => {
  const state = {
    variable: {},
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const citaID = defineStore('cita_id', () => {
  const state = {
    variable: {},
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});



// variables booleanas
export const useGlobalStore = defineStore('global', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const logout = defineStore('global', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});



export const quitarProd = defineStore('global', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});


export const cantProducto = defineStore('global', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const idProducto = defineStore('global', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});



// estore para gestionar un boton

export const useButtonStore = defineStore('button', {
  state: () => ({
    isVisible: false,
  }),
  actions: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
});

export const deleteProduct = defineStore('product', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});

export const deleteAdmin = defineStore('admin', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});



export const mostrarCartaCita = defineStore('cita', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});


export const rangoFechaCita = defineStore('cita', () => {
  const state = {
    variable: '',
  };

  const setVariable = (newValue) => {
    state.variable = newValue;
  };

  return {
    state,
    setVariable,
  };
});



// // LOCAL STORAGE PINIA 

// export const useUsuarioStore = defineStore('UsuarioStore', () => {
//   // crea la constante usuario donde se almacena el storage
//     const usuario = ref({usuario: {correo: null}, _token: null});

//     function closeSession() {
//         window.localStorage.clear();
//         usuario.value = {usuario: {correo: null}, _token: null}
//     }

//     function setUser(user) {
//         window.localStorage.clear();
//         // unir dos objetos (...)
//         let u = {...usuario.value, ...user}
//         usuario.value = u;
//     }

//     return {usuario, closeSession, setUser}
// },
// // hacerlo persistente debemos instalar para hacerlo 
// // agregarlo npm pinia-plugin-persistentdate
// // tambien debemos importarlo en main.js
// // y sacar una intancia de pinia donde se mete el pinia.use(piniPluginPersistdate)

// // router 
// {persist: true})