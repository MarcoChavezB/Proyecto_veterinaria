<template>
  <div class="pantalla">
    <div class="app">
    <div class="title">
      <encabezado /> 
    </div>
    <div class="app">
      <div class="controles">
        <div class="botones">
          <btnn title="Agendar Cita" @click="agendar"/>
        </div>
      </div>
      <div class="table">
        <div class="tableCel">
          <div class="headerTable">
            <h4>Nombre</h4>
            <h4>Teléfono</h4>
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
              <mensaje v-if="inicial"/>
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
import add from '../../components/ControlesIndividuales/ingresar.vue'
import Btnn from '@/components/ControlesIndividuales/BotonAntho.vue';
import cita from '@/components/componentesCitas/citasLocales.vue';
import axios from 'axios'
import load from '../../components/loaders/loaderPrincipal.vue'
import {ref} from 'vue'
import {useStore} from '@/stores/counter.js'
import {StoreProdInternos} from '@/stores/counter.js'
import {card, citaID} from '@/stores/counter.js'


const loading = ref(false);
const showModal = ref(true);
const carta = card()
const cita_id = citaID()
const msgID = ref()
const inicial = ref(false)
const globalShow = true
const prodInterno = StoreProdInternos();
const store = useStore()
const citas = ref([])
const nombre = ref();

const fetchData = async () => {
  try {
    const response = await axios.get('http://web.backend.com/citas_total');
    citas.value = response.data.data;
  } catch(error) {
    console.log(error)
  }
}

const seleccion = (id) => {
  msgID.value = id;

  // Cambiar el valor entre false y true
  inicial.value = true;

  cita_id.setVariable(msgID.value);
  mandarEstatus.setVariable();
  console.log('90909090',inicial.value)
};


setInterval(fetchData, 600)


const agendar =()=>{
  showModal.value = true;
}
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
