<template>    
  <div class="precios">
    <p>Rango de citas</p>
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
import { rangoFechaCita } from '@/stores/counter.js';
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

const usarRango = rangoFechaCita()
const mandarRango = ref()
const minPrice = ref('');
const maxPrice = ref('');
const filtData = ref();

const data = async () => {
  const startDate = new Date('2023-08-01');
  const endDate = new Date('2023-08-31'); 

  const rango = {
    minPrice: startDate.toISOString().substring(0, 10),
    maxPrice: endDate.toISOString().substring(0, 10),
  };

  try {
    const response = await axios.post('http://backend.vetcachorros.one/rangoFechaCitas', rango);
    filtData.value = response.data;
    console.log(response.data);
    console.log('internos');
  } catch (error) {
    console.error(error);
  }
};

let intervalId; // Definir el intervalo aquí


onMounted(() => {
  data();
  intervalId = setInterval(data, 2000);
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