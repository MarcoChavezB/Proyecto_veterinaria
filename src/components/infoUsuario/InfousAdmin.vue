<template>
    <div class="user-card">
      <div class="user-info">
          <h5>{{ Nombre }} {{ Apellido }}</h5>
        <div class="detail-grid">
          <div class="renglon"><h6>Correo: {{ Correo }}</h6></div> 
          <div class="renglon"><h6>Teléfono 1: {{ telefono1 }}</h6></div> 
          <div class="renglon"><h6>Teléfono 2: {{ telefono2 }}</h6></div> 
          <button class="buton" @click="verperfil(Id)">Ver Usuario</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { defineProps } from 'vue';

const emits = defineEmits(['ide'])
const verperfil = (Id) => {
  emits('ide', Id);
}

const props = defineProps({
  Nombre: {
    type: String,
    default: ''
  },
  Apellido: {
    type: String,
    default: ''
  },
  Correo: {
    type: String,
    default: ''
  },
  Id: {
    type: Number,
    default: 0
  },
  telefono1: {
    type: Number
  },
  telefono2: {
    type: Number
  }
});

let { Nombre, Apellido, Correo, Id, telefono1, telefono2 } = props;
  </script>
  
  <style scoped>
  .user-card {
    display: grid;
    grid-template-columns: 1fr;
    height: 26vh;
    width: 30vh;
    border-radius: 2rem;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    padding: 1rem;
    box-sizing: border-box;
  }
  

  .renglon{
    overflow-y:auto;
    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .buton{
    height: 3vh;
    width: 100%;
    border-radius: 3px;
    border-color: rgb(255, 255, 255);
    background-color: rgb(207, 236, 255);
    border-radius: 10px;
    grid-row-start: 4;
    transition: 0.5s;
  }

  .buton:hover{
    border-color: rgb(141, 137, 137);
    background-color: rgb(52, 119, 124);
    color: rgb(255, 255, 255);
  }
  .renglon::-webkit-scrollbar {
    width: 10px;
}
.renglon::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.renglon::-webkit-scrollbar-thumb {
    background: #888;
}

  
  .user-info {
    display: grid;
    grid-template-rows: 1fr 3fr;
  }
  
  .detail-grid {
    display: grid;
    grid-template-rows: 25% 25% 12.5% 25% 12.5%;
    
  }
  </style>
  