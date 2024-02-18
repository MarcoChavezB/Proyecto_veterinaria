<template>
  <div class="app">
    <div class="title">
      <encabezado />
    </div>
    <div class="app">
      <div class="controles">
        <div class="botones ">
          <btnn id="black" title="General" @click="fetchData"/>
          <btnn title="Citas proximas" @click="mostrarCitasProximas"/>
        </div>
      </div>
      <div class="table">
        <div class="headerTable">
          <h4>Nombre</h4>
          <h4>Teléfono</h4>
          <h4>Fecha cita</h4>
          <h4>Estatus</h4>
          <h4>Raza</h4>
        </div>
        <div class="cont-table">
          <div v-for="citas in citas" :key="citas.id" class="fila" >
            <Rows @click="seleccion(citas.id)" :nombre="citas.nombre" :telefono="citas.telefono1"
                  :fecha_cita="citas.fecha_cita" :estatus="citas.estatus"
                  :raza="citas.raza"/>
          </div>
          <div>
            <mensaje v-if="inicial"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Rows from '../../components/citasComp/RowTableCitas.vue'
import encabezado from '../../components/citasComp/CitasHeadre.vue'
import mensaje from '../../components/citasComp/CardAceptadas.vue'
import Btnn from '@/components/ControlesIndividuales/BotonConEstilo.vue';
import axios from 'axios'
import {onMounted, ref} from 'vue'
import {useStore} from '@/stores/counter.js'
import {showModalCardAcept} from '@/stores/counter.js'
import {card, citaID} from '@/stores/counter.js'

const showCard = showModalCardAcept()
const carta = card()
const cita_id = citaID()
const msgID = ref()
const inicial = ref(false)
const globalShow = true
const store = useStore()
const citas = ref([])
const nombre = ref();

const fetchData = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/citas/citasAceptadas');
    citas.value = response.data.citas;
  } catch(error) {
    console.log(error)
  }
}

const seleccion = (id) => {
  msgID.value = id;
  inicial.value = true;
  showCard.setVariable(inicial.value)
  cita_id.setVariable(msgID.value);
};

const mostrarCitasProximas = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/citas/citasProximas');
    citas.value = response.data.citas;
  } catch(error) {
    console.log(error)
  }
}



// const valorModal = () =>{
//   inicial.value = showCard.state.variable
// }

// setInterval(() => {
//   valorModal()
// }, 1000);


onMounted(fetchData)
</script>




<style scoped>


.controles{
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1.1fr 1.6fr 0.8fr;
  gap: 0px 0px;
  height: 100px;
  width: 94%;
  margin-left: 50px;
}

.botones{
  display: flex;
  gap: 40px;
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
</style>
