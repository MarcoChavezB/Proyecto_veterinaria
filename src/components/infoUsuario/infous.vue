<script setup>
import {ref, defineProps, onMounted, reactive} from 'vue';
import axios from 'axios';

const props = defineProps({
  id: {
    type: String,
    default: 0
  }
});

const { id } = props;
const emits = defineEmits(['close'])

const cerra = () => {
  emits('close');
}
let userInfo = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  telefono1: '',
  telefono2: '',
  contra: ''
});
const userinfo = async () => {
  const user = {
    id: id.value
  };
  try {
    const response = await axios.post('http://backend.vetcachorros.one/clientes/infoID', user);
    if (response.data.data) {
      Object.assign(userInfo, response.data.data);
    }    
  } catch (error) {
    console.error('Hubo un error al obtener los usuarios:', error);
  }
};
onMounted(userinfo);
</script>

<template>
    <div class="card">
        <button class="cerrar" @click="cerra" >X</button>
        <div class="grid">
            <div class="info">
                <h4>Información de usuario</h4>
                <h6>Nombre: {{ userInfo.nombre }}</h6>
                <h6>Apellido: {{ userInfo.apellido }}</h6>
                <h6>Correo: {{ userInfo.correo }}</h6>
                <h6>Telefono 1: {{ userInfo.telefono1 }}</h6>
                <h6>Telefono 2: {{ userInfo.telefono2 }}</h6>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cerrar{
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 2em #00000013;
  grid-column-start: 1;
  grid-row-start: 1;
  border: none;
  background-color: #00000000;
}
.card{
    display: flex;
    border-radius: 20px;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    width: 50%;
    height: 40%;
    font-family: comfortaa;
}
.grid{
   display: grid;
   grid-template-columns: 15% 70% 15%;
   grid-template-rows: 10% 75% 15%;
   height: 100%;
   width: 100%;
}

.info{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    flex-direction: column;
    grid-row-start: 2;
    grid-column-start: 2;
    gap: 5%;
}
</style>