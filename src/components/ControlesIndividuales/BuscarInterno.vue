<template>
    <div class="search">
      <input v-model="nombre" type="text" class="search__input" placeholder="Buscar producto">
      <button class="search__button" @click="fetchData">
        <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
          </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { ref, watch} from 'vue'
  import {StoreProdPublics} from '@/stores/counter.js'
  const prodPublico = StoreProdPublics();
  const productos = ref([])


  const nombre = ref('');

  const fetchData = async () =>{
    try{
     // productos.value = response.data.data;
      const response = await axios.post('http://18.223.116.149/api/buscar', {nombre: nombre.value});
      productos.value = response.data.data
      prodPublico.setVariable(productos.value)
    
    } catch(error){
      console.log(error)
    }
  }

  watch(nombre, () => {
    fetchData()
  });

  
  </script>
  
  
  <style scoped>
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }
  
  .search__input {
    font-family: inherit;
    font-size: inherit;
    box-shadow: 0 0 1em #00000013;
    border: none;
    color: #646464;
    padding: 0.7rem 1rem;
    border-radius: 30px;
    width: 25em;
    transition: all ease-in-out .5s;
    margin-right: -2rem;
  }
  
  .search__input:hover, .search__input:focus {
    box-shadow: 0 0 1em #00000013;
  }
  
  .search__input:focus {
    outline: none;
    background-color: #f0eeee;
  }
  
  .search__input::-webkit-input-placeholder {
    font-weight: 100;
    color: #ccc;
  }
  
  .search__input:focus + .search__button {
      background-color: transparent;
  }
  
  .search__button {
    border: none;
    background-color: transparent;
    margin-top: .1em;
  }
  
  .search__button:hover {
    cursor: pointer;
  }
  
  .search__icon {
    height: 1.3em;
    width: 1.3em;
    fill: #b4b4b4;
  }
  </style>