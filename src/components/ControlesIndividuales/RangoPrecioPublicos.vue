<template>
  <div class="precios">
    <p>Rango de precios</p>
    <div class="inputGroup">
      <input type="number" autocomplete="off" v-model="minPrice" :placeholder="tittle1">
      <span class="material-symbols-outlined">
        chevron_right
      </span>
      <input type="number" autocomplete="off" v-model="maxPrice" :placeholder="tittle2">
    </div>
  </div>
</template>
<script setup>
import { productosPublicosR } from '@/stores/counter.js';
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

defineProps({
  tittle1: {
    type: String,
  },
  tittle2: {
    type: String,
  },
});

const minPrice = ref('');
const maxPrice = ref('');
const filtData = ref();
const productoPublico = productosPublicosR();

let intervalId; // Declara la variable fuera de la función

const data = async () => {
  const rango = {
    minPrice: minPrice.value,
    maxPrice: maxPrice.value
  };
  const updateVariable = () => {
    productoPublico.setVariable(filtData);
  };

  try {
    const response = await axios.post('http://18.223.116.149/api/productos/productosPublicos/rango', rango);
    filtData.value = response.data.productos;
    updateVariable();
  } catch (error) {}
};

onMounted(() => {
  data();
  intervalId = setInterval(data, 3000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>




<style scoped>

span{
    color: #999999;
}

p{
    color: #c2c5d3;
}

.precios{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inputGroup {
    margin: -0.9em 0 0em 0;
    position: relative;
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
}

.inputGroup input {
    font-size: 100%;
    padding: 0.8em;
    outline: none;
    box-shadow: 0 0 1em #00000013;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    width: 90px;
    height: 40px;
    text-align: center;
}

input::placeholder {
    color: #999999;
}

.inputGroup label {
    font-size: 100%;
    position: absolute;
    left: 0;
    padding: 0.8em;
    margin-left: 0.5em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: rgb(100, 100, 100);
}


</style>