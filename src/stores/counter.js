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
export const StorePublics = defineStore('store', () => {
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



export const useCheckboxStore = defineStore('checkbox', () => {
  const state = {
    isChecked: false,
  };

  const setCheckboxChecked = () => {
    state.isChecked = true;
  };

  const setCheckboxUnchecked = () => {
    state.isChecked = false;
  };

  return { state, setCheckboxChecked, setCheckboxUnchecked };
});




