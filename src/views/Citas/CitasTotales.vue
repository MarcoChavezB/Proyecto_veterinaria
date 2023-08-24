<template>
  <div class="pantalla">
    <transition name="fade">
    <div v-if="showModal" class="modal">
    </div>
    </transition>
      <div class="modal-content" v-if="showModal">
       <cita @close="agendar"/>
      </div>
    <div class="app">
    <div class="title">
      <encabezado /> 
    </div>
    <div class="app">
      <div class="controles">
        <div class="botones ">
          <btnn id="black" title="Agendar Cita" @click="agendar"/>
          <btnn title="Citas hoy" @click="citasHoy"/>
          <btnn title="General" @click="fetchData"/>
        </div>
      </div>
      <div class="table">
        <div class="tableCel">
          <div class="headerTable">
            <h4>Nombre</h4>
            <h4>Telefono</h4>
            <h4>Fecha cita</h4>
            <h4>Estatus</h4>
            <h4>Raza</h4>
          </div>
          <div class="cont-table">
            <div v-for="citas in citas" :key="citas.id" class="fila" >
              <!-- Pasa las propiedades únicas a Rows -->
              <Rows @click="seleccion(citas.id)" :nombre="citas.nombre" :telefono="citas.telefono1"
                    :fecha_cita="citas.fecha_cita" :estatus="citas.estatus"
                    :raza="citas.raza"/>
            </div>
            <div>
              <mensaje v-if="inicial" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup>
import Rows from '../../components/citasComp/RowTableCitas.vue'
import encabezado from '../../components/citasComp/CitasHeadre.vue'
import mensaje from '@/components/citasComp/AceptacionCard.vue'
import Btnn from '@/components/ControlesIndividuales/BotonConEstilo.vue';
import cita from '@/components/componentesCitas/citasLocales.vue';
import {showModalCard } from '@/stores/counter.js';

import axios from 'axios'
import {ref, onMounted} from 'vue'
import {citaID} from '@/stores/counter.js'



const showCard = showModalCard()
const showModal = ref(false);
const cita_id = citaID()
const msgID = ref()
const inicial = ref(false)
const citas = ref([])


const fetchData = async () => {
  try {
    const response = await axios.get('http://backend.vetcachorros.one/citas_total');
    citas.value = response.data.data;
    
  } catch(error) {
    console.log(error)
  }
}

const citasHoy = async () =>{
  try {
    const response = await axios.get('http://backend.vetcachorros.one/citasActuales');
    citas.value = response.data.data;

  } catch(error) {
    console.log(error)
  }
}

const valorModal = () =>{
  inicial.value = showCard.state.variable
}

setInterval(() => {
  valorModal()
}, 100);


const seleccion = (id) => {
  msgID.value = id;
  inicial.value = true;
  showCard.setVariable(inicial.value)
  cita_id.setVariable(msgID.value);
};

const closeModal = () =>{
  inicial.value = true;
}

const agendar =()=>{
  if(showModal.value === false){
    showModal.value = true;
  }else if (showModal.value === true){
    showModal.value = false;
  }
}
onMounted(fetchData, closeModal)

</script>




<style scoped>

.pantalla{
  display: flex;
  height: 100vh;
  width: 100%;
}

.loader{
  position: relative;
    z-index: 300;
    width: 25%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.display2{
  background-color: rgba(95, 95, 95, 0.4);
  height: 100%;
  width: 100%;
  z-index: 299;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.modal-content {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 200;
}
.modal {
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: center;
  z-index: 98;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.controles{
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 0px 0px;
  height: 100px;
  width: 94%;
  margin-left: 50px;
  
}

.botones{
  display: flex;
  gap: 40px;
  width: 100%;
  align-items: flex-end;
}

.headerTable {
  display: flex;
  justify-content: space-around;
  margin-top: 3em;
  margin-bottom: 2em;
}

#black{
  background-color: black;
  color: white;
}

.app {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 1fr 5fr;
  gap: 0px 0px;
  width: 100%;
  height: 100vh;
}
h4 {
  font-size: 20px;
  cursor: pointer;
}


h3 {
  font-family: 'Comfortaa', cursive;
  font-size: 1.3em;
  color: #c2c5ce;
  margin-bottom: 1em;
  cursor: pointer;
}

strong {
  color: #818694;
  border-bottom: 3px solid #ffd800;
}

button:focus {
  outline: none;
}

button:active .icon svg {
  transform: scale(0.8);
}



@media (max-width: 680px) {
  .controles {
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
    align-items: center;
  }
  .headerTable {
    width: 40em;

  }

 .tableCel{
   width: 80em;
   background-color: green;
 }

  .fila {

    padding: 0.5rem;
  }
}
</style>
