<template>
  <div class="header">
    <div class="top-menu">
      <h3>Menú control</h3>
    </div>
    <div class="profile">
        <p>Administrador</p>
        <div class="perfil"></div>
    </div>
  </div>
  <div class="vista">
    <div class="panel">
      <div class="cards">
        <div class="estadisticas">
          <grafica />
        </div>
        <div class="pequenas">

          <div v-for="ventas in ventas" :key="ventas.ventas_mes_actual">
            <info_card icono="local_shipping" name="Ventas"
                          cardStyle="estilo2" :status="estilo_ventas"
                          :number="ventas.ventas_mes_actual"
                          :porcentaje="ventas.porcentaje_crecimiento"
                          :arrow="arrow_ventas"/></div>

          <div v-for="monto in montoT" :key="monto.monto_mes_actual">
            <info_card icono="payments" name="Ganancia" :porcentaje="monto.porcentaje_crecimiento"
                          cardStyle="estilo3" status="estilo-positivo"
                          :number="monto.monto_mes_actual"/></div>

          <div v-for="citas in citasR" :key="citas.citas_mes_actual">
            <info_card icono="pets" name="Citas tot." :porcentaje="citas.porcentaje_crecimiento"
                          cardStyle="estilo1" :status="estilo_citas"
                          :number="citas.citas_mes_actual"
                          :arrow="arrow_citas"/></div>
        </div>
      </div>
      <div class="tabla">
        <div class="table">
          <TablaComp />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="cont">
        <div class="title">
          <h1>Citas Próximas</h1>
        </div>
        <div class="citas" v-for="cita in citas" :key="cita.id">
          <router-link class="custom-link" :to="{name: 'citasTotales'}">
            <Notificaciones  class="not"
                           :fecha="cita.fecha_cita" :descripcion="cita.motivo" />
          </router-link>
        </div>
      </div>
      <div class="estadisticas-aside" >
        <div v-for="prod in productos" :key="prod.id"><estadisticas
            :nombre="prod.nom_producto" :stock="prod.existencias"/>
        </div>
      </div>
      <div class="mensajes">
        <successAlert :name="citasMensaje" v-if="mostrarMensaje"/>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import {useGlobalStore} from "@/stores/counter.js";
import axios from 'axios'
import {logout} from "@/stores/counter.js"
import Notificaciones from '../../components/Managment/Notificaciones.vue'
import TablaComp from '../../components/Managment/TablaComp.vue'
import grafica from '../../components/managment/grafica.vue'
import estadisticas from '../../components/Managment/estadisticas.vue'
import info_card from '../../components/Managment/InfoCard.vue'
import successAlert from '../../components/Mensajes/BarAlert.vue'

const globalStore = useGlobalStore();
const valorAlmacenado = globalStore.state.variable;
var log = logout()
var mostrar = ref()
const mostrarMensaje = ref(false)
const citasMensaje = ref()
const total_citas = ref()

const intervalMessage = () =>{
  mostrar.value = log.state.variable;
}

setInterval(intervalMessage,100)


const citas = ref([])

const fetchData = async () => {
  try {
    // retorna las citas proximas en un plazo de dos dias 

    const response = await axios.get('http://18.223.116.149/api/citas/getCitasProximas');
    citas.value = response.data.citas;
    test()
  } catch(error) {                   
    console.log(error)
  }
}


const test = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/test/sanctum');
    console.log(response)
  } catch(error) {                   
    console.log(error)
  }
}

const totalCitasHoy = async () => {
  try {
    // retorna un mensaje de alerta si se tiene una cita pendiendo de hoy

    //! Falta implementar numero en notificacion
    const response = await axios.get('http://18.223.116.149/api/citas/citasTotalHoy');
    const totCitas = response.data.citas; 
    mostrarMensaje.value = true
    citasMensaje.value = `Tiene ${totCitas} citas por atender hoy`;
  } catch (error) {
    console.log(error);
  }
};



onMounted(totalCitasHoy)

const productos = ref([])
const bajaProd = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/citas/getProductos/pocasExistencias');
    productos.value = response.data.productos;
  } catch(error) {
    console.log(error)
  }
}


const ventas = ref([]);
const citasR = ref([])
const montoT = ref([])
const cantidadVentas = async () => {
  try {

    // cartitas de totales de ventas, citas y monto total

    const response = await axios.get('http://18.223.116.149/api/ventas/graph/getPorcentaje');
    ventas.value = response.data.porcentaje;

    const citasResponse = await axios.get('http://18.223.116.149/api/citas/graph/getPorcentaje');
    citasR.value = citasResponse.data.porcentaje;
    
    const montoTotal = await axios.get('http://18.223.116.149/api/ventas/graph/getPorcentaje/monto');
    montoT.value = montoTotal.data.porcentaje
  
  } catch (error) {
    console.log(error)
  }
};

const estilo_citas = ref('');
const estilo_ventas = ref('');
const arrow_citas = ref('')
const arrow_ventas = ref('')

const estadisticas_positivo_negativo = () =>{
  for (const i in citasR) {
      if (i.porcentaje_crecimiento <= 0){
        estilo_citas.value = 'estilo-positivo'
        arrow_citas.value = 'arrow_drop_up'
      } else{
        estilo_citas.value = 'estilo-negativo'
        arrow_citas.value = 'arrow_drop_down'
      }
  }

  for (const i in ventas) {
    if (i.porcentaje_crecimiento <= 0){
      estilo_ventas.value = 'estilo-negativo'
      arrow_ventas.value = 'arrow_drop_down'
    } else{
      estilo_ventas.value = 'estilo-positivo'
      arrow_ventas.value = 'arrow_drop_up'
    }
  }
}
onMounted(fetchData);
onMounted(bajaProd);
onMounted(cantidadVentas);
onMounted(estadisticas_positivo_negativo)
</script>


<style scoped>


.cont {
  margin-bottom: 10px;
  background: #fff;
  padding: 1.2rem;
  overflow-y: auto;
  border-radius: 0rem 0rem 2rem 2rem;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.1);
  transition: all 300ms ease;
  max-width: 25em;
  min-height: 30em;
  overflow-y: auto;
  max-height: 30em;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pequenas{
  display: flex;
  margin-left: 50px;
  gap: 10px;
}

.pequenas div:nth-child(2){
  width: 40%;
}
.pequenas div{
  display: flex;
  justify-content: center;
  align-items: center;
}


#confirmar{
  position: fixed;
  margin-left: 30%;
  z-index: 9999;
}
.top-menu{
  display: flex;
  align-items: center;
  height: 4em;
  max-height: 6em;
  margin-left: 10px;
}
.estadisticas-aside{
  overflow-y: scroll;
  max-height: 24.8em;
}
.header{
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 0px 0px;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
}
.profile{
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
  margin-right: 50px;
}
.profile .perfil{
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/img/profile.jpg");
}
.citas{
  max-height: 10em;
}


.tabla h1{
  font-weight: 300;
  width: 95.7%;
  display: flex;
  justify-content: center;
}
.tabla{
display: flex;
justify-content: center;
}


.table{
  max-height: 13em;
  width: 90%;
}

.top-menu h1{
  font-weight: 300;
  width: 82.4%;
  display: flex;
  justify-content: center;
}

.cards {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 1.9fr 0.5fr;
  gap: 0px 0px;
  grid-template-areas:
    "."
    ".";
  height: 100%;

}



.panel {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;

}

.estadisticas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
}

.vista {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 2.2fr 0.8fr;
  gap: 10px;
  justify-items: stretch;
  align-items: stretch;
  width: 100%;
  height: 95vh;

}

.not {
  position: relative;
}

.title{
  
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 30px;
}





@media (max-width: 680px) {
  .cont {
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }


  .top-menu h3 {
    font-size: 18px;
  }

  .vista {
    grid-template-columns: 1fr;
  }

  .pequenas {
    grid-template-columns: 1fr;
    height: auto;
  }

  .pequenas div {
    justify-content: flex-start;
  }

  .panel {
    grid-gap: 20px;
  }


  .tabla {
    
    width: 200%;
  }
}
</style>

