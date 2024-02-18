<template>
  <div id="load" v-if="isLoading">
    <loader/>
  </div>
  <div v-if="showCard">
    <div class="detalle_cita">
      <div class="header_card">
        <div class="izquierdo_card">
          <span id="salir" @click="salir" class="material-symbols-outlined">
            arrow_back
          </span>
          <h4>Detalle de cita</h4>
          <div class="time_left">
            <p>{{formattedDate}}</p>
          </div>
        </div>
        <div class="derecho_card">
          <span class="material-symbols-outlined">description</span>
        </div>
      </div>
      <div class="time  d-flex justify-content-center align-items-center">
        <div class="tiempo-1 d-flex justify-content-center align-items-center flex-column">
          <div class="hour d-flex gap-3">
            <h2>{{formatDate(1,citasdata[0].fecha_registro) }}</h2>

          </div>
          <p>{{ formatDate(3, citasdata[0].fecha_registro) }}</p>
        </div>
        <div class="icon">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </div>
        <div class="tiempo-2 d-flex justify-content-center align-items-center flex-column">
          <div class="hour d-flex gap-5 ">
            <h2>{{formatDate(1,citasdata[0].fecha_cita) }}</h2>
          </div>
          <p>{{formatDate(3,citasdata[0].fecha_cita) }}</p>
        </div>
      </div>
      <div class="body-card">
        <div class="desc ">
          <div class="text-area d-flex flex-column">
            <div class="prop w-100">
              <p>Motivo de la cita</p>
            </div>
            <div class="ctn ">
              <div class="texto overflow-auto">
                {{ citasdata[0].motivo }}
              </div>
            </div>
          </div>
          <div class="text-area d-flex flex-column" v-if="mostrarMotivo">
            <div class="prop w-100">
              <p>Motivo del rechazo</p>
            </div>
            <textarea class="ctn" v-model="motivo"></textarea>
          </div> 
          <div class="btns">
            <div class="Rechazar d-flex justify-content-center align-items-end">
              <button class="noselect" @click="mostrarPorque">
                <span class="text">Rechazar</span>
                <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div class="Aceptar d-flex justify-content-center align-items-end">
              <button class="select" @click="respuesta(2)">
                <span class="text">Aceptar</span>
                <span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"></svg>
                  <span class="material-symbols-outlined">done</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="alertas">
      <successAlert name="Cita aceptada" v-if="mostrarAlertSuccess"/>
      <errorAlert name="Cita rechazada" v-if="mostrarAlertError"/>
      <alert :name="mensajeAlert" v-if="mostrarAlert"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { card, citaID } from '@/stores/counter.js'
import axios from 'axios'
import loader from '../loaders/loaderPrincipal.vue'
import successAlert from '../../components/Mensajes/BarAlertSuccess.vue'
import errorAlert from '../../components/Mensajes/BarAlertError.vue'
import alert from '../../components/Mensajes/BarAlert.vue'



const monthNames = [
'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const mostrarAlert = ref(false)
const mensajeAlert = ref()
const recibirShow = card()
const today = new Date();
const currentMonth = monthNames[today.getMonth()];
const currentDay = today.getDate();
const formattedDate = `${currentMonth}, ${currentDay}`;
var show = recibirShow.state.variable
var citaid = citaID()
var id = citaid.state.variable
var mostrarAlertSuccess= ref(false);
var mostrarAlertError = ref(false);
const citasdata = ref([])
const mostrarMotivo = ref(false)
const motivo = ref('')
const isLoading = ref(true)
const showCard = ref(false)

const cita_id = {
cita_id: id
}

const pause = (milliseconds) => {
return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const dataCita = async () => {

try {
  const response = await axios.get('http://18.223.116.149/api/citas/index/cita/' + cita_id.cita_id);
  citasdata.value = response.data.cita;
  isLoading.value = false;
  setTimeout(() => {
    showCard.value = true;
    console.log(showCard.value)
  }, 1000);

} catch (error) {
  console.log(error);
  isLoading.value = false;
}
};


let funcionEjecutada = false;

const mostrarPorque = () => {
if (!funcionEjecutada) {
  mensajeAlert.value = 'Ingrese el motivo';
  mostrarMotivo.value = true;
  mostrarAlert.value = true;

  setTimeout(() => {
    mostrarAlert.value = false;
  }, 2000);

  funcionEjecutada = true;

} else {

  if (motivo.value === '') {
    mensajeAlert.value = 'El motivo no puede estar vacío';
    mostrarAlert.value = true
    mostrarMotivo.value = true;
    setTimeout(() => {
      mostrarAlert.value = false;
    }, 2000);
  } else {
    mensajeAlert.value = 'Se registró el motivo';
    mostrarAlert.value = true
    mostrarMotivo.value = true;
    setTimeout(() => {
      mostrarAlert.value = false;
    }, 2000);
    respuesta(1)
  }
}
}


var CitaResponse = ref();
const respuesta = (seleccion) =>{
CitaResponse.value = seleccion;
CitaResponse.value = CitaResponse.value === 1 ? '2' : CitaResponse.value === 2 ? '1' : 'otro_valor';
citaResponse();
}

const citaResponse = async () => {
const data = {
    cita_id: id,
    cita_respuesta: CitaResponse.value,
    motivo: motivo.value,
  }
try {
  const response = await axios.put('http://18.223.116.149/api/citas/update/status', data)
  showAlert('success', response.data.message);

} catch (error) {
  console.log(error)
}
}




// 1 horas y minutos formato
// 2 solo año formato
// 3 mes con dia formato
// 4 solo dia
// 5 solo mes
const formatDate = (id, dateTimeString) => {
if (!dateTimeString) {
  return 'No hay datos';
}
switch (id) {
  case 1:
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  case 2:
    const year = new Date(dateTimeString).getFullYear();
    return year.toString();
  case 3:
    const dateTimeMonth = new Date(dateTimeString);
    const month = dateTimeMonth.getMonth();
    const day = dateTimeMonth.getDate();

    const formattedDate = `${monthNames[month]}, ${day}`;
    return formattedDate;
  default:
    return 'Invalid ID';
}
}

onMounted(async () => {
await dataCita()
})


const showAlert = (type, message) => {
if (type === 'success') {
  mostrarAlertSuccess.value = true;
  setTimeout(() => {
    mostrarAlertSuccess.value = false;
  }, 2000);
} else if (type === 'error') {
  mostrarAlertError.value = true;
  setTimeout(() => {
    mostrarAlertError.value = false;
  }, 2000);
}
}

</script>


<style scoped>
.detalle_cita{
position: fixed;
top: 50%;
left: 50%;
width: 30em;
height: 40em;
z-index: 9;
border-radius: 20px;
background-color: white;
box-shadow: 0 5px 20px 0 #00000026;
padding-top: 30px;
padding-left: 30px;
padding-right: 30px;
transform: translate(-20%, -50%);
}

#load{
position: fixed;
top: 50%;
left: 50%;
width: 30em;
height: 40em;
z-index: 90;
transform: translate(20%, -10%);
}

#salir{
cursor:pointer;
}
.desc{
display: grid;
grid-auto-columns: 1fr;
grid-template-rows: 1.2fr 0.8fr;
gap: 0px 0px;

height: 100%;
}
.ctn{
border-style: none;
width: 90%;
height: 100%;
border-radius: 10px;
border: 1px solid rgba(132, 139, 200, 0.09);
display: flex;
justify-content: center;
}
textarea:focus {
  outline: none;
}
.texto{
display: flex;
flex-wrap: wrap;
word-break: break-all;
max-width: 90%;
}
.btns{
display: grid;
grid-auto-columns: 1fr;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr;
gap: 0px 0px;
grid-template-areas:
  ". .";
width: 100%;
}
.btn-1:hover{
background-color: #ebebeb;
}
.txt{
display: flex;
justify-content: center;
align-items: center;
height: 100%;
}

.alertas{
z-index: 9999;
position: fixed;
width: 83%;
}

.body-card{
height: 65%;
}
.text-area{
width: 100%;
height: 80%;
display: flex;
}
.icon{
display: flex;
justify-content: center;
align-items: center;

}
.time{
display: grid;
grid-auto-columns: 1fr;
grid-template-columns: 1.2fr 1.2fr 0.6fr;
grid-template-rows: 1fr;
gap: 0px 0px;
grid-template-areas:
  ". . .";
border-bottom: 1px solid rgba(132, 139, 200, 0.09);
}
.header_card{
display: flex;
justify-content: space-between;
border-bottom: 1px solid rgba(132, 139, 200, 0.18);
align-items: center;
}
.izquierdo_card{
display: flex;
gap: 20px;
}
.time_left{
display: flex;
justify-content: center;
background-color: rgba(132, 139, 200, 0.18);
height: 25px;
width: 70px;
border-radius: 20px;
}
.noselect {
width: 150px;
height: 50px;
cursor: pointer;
display: flex;
align-items: center;
background: red;
border: none;
border-radius: 5px;
box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
background: #e62222;
}
.select {
width: 150px;
height: 50px;
cursor: pointer;
display: flex;
align-items: center;
background: green;
border: none;
border-radius: 5px;
box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
background: green;
}

button, button span {
transition: 200ms;
}

button .text {
transform: translateX(35px);
color: white;
font-weight: bold;
}

button .icon {
position: absolute;
border-left: 1px solid #c41b1b;
transform: translateX(110px);
height: 40px;
width: 40px;
display: flex;
align-items: center;
justify-content: center;
}
.noselect:hover {
background: #ff3636;
}

.select:hover {
background: green;
}
button:hover .text {
color: transparent;
}

button:hover .icon {
width: 150px;
border-left: none;
transform: translateX(0);
}
button svg {
width: 15px;
fill: #eee;
}
.select span{
color: whitesmoke;
}
</style>