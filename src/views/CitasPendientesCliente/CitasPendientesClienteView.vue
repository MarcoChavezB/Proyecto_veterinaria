<template>
  <div class="first-container">
    <div class="Titulo">
      <span class="material-symbols-outlined">respiratory_rate</span><h2>Tus citas</h2>
    </div>
    <div class="opciones">
      <input type="radio" v-model="citaSeleccionada" value="pendientes"  >Citas pendientes
      <input type="radio" v-model="citaSeleccionada" value="rechazadas"  >Citas rechazadas
    </div>
    <br><br>
    <div class="second-container" v-show="ShowFirstCard">
      <div class="carta">
        <Circulos />
      </div>
      <div class="carta" v-for="cita in citas">
        <div class="decoracion">
        </div>
        <ul>
          <li id="li1"><label class="labels" for="li1">Mascota:</label> {{cita.Nombre}}</li>
          <li id="li2"><label class="labels" for="li2">Fecha:</label> {{cita.Fecha}}</li>
          <div class="motivo">
            <li id="li3"><label class="labels" for="li3">Motivo:</label> {{cita.Motivo}}</li>
          </div>
          <li id="li4"><label class="labels" for="li4">Estatus:</label>
            <span :style="{
                            'background-color': cita.Estatus === 'Aceptada' ? 'green' : (cita.Estatus === 'Pendiente' ? 'grey' : 'transparent'),
                            'color': cita.Estatus === 'Aceptada' || cita.Estatus === 'Pendiente' ? 'white' : 'black'
                          }">
                  {{ cita.Estatus }}
            </span>
          </li>
          <br>
          <li id="li5"><label class="labels" for="li5">En caso de que quieras cancelar tu cita, contáctanos. +52 1 871 103 4602</label></li>
        </ul>
      </div>

    </div>

    <div class="third-container" v-show="ShowSecondCard" >
      <div class="carta">
        <Circulos />
      </div>
      <div class="carta" v-for="cita in citasR">
        <ul>
          <li id="li1"><label class="labels" for="li1">Mascota:</label> {{cita.Nombre}}</li>
          <li id="li2"><label class="labels" for="li2">Fecha:</label> {{cita.Fecha}}</li>
          <div class="motivo">
            <li id="li3"><label class="labels" for="li3">Motivo:</label> {{cita.Motivo}}</li>
          </div>
          <li id="li4"><label class="labels" for="li4">Estatus:</label>
            <span  class="status" :style="{
                            'background-color': cita.Estatus === 'Rechazada' ? 'red' : 'transparent',
                            'color': cita.Estatus === 'Rechazada' ? 'white' : 'black'
                          }">
                  {{ cita.Estatus }}
            </span>
          </li>
          <div class="motivo">
            <li id="li6"><label class="labels" for="li6">Motivo Rechazo:</label>{{cita.MotivoRechazo}}</li>
          </div>
          <br>
          <li id="li5"><label class="labels" for="li5">Si quieres conocer mas detalles, contactanos. +52 1 871 103 4602</label></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import axios from "axios";
import {useUsuarioStore} from "@/stores/UsuariosStore";
import Circulos from "@/components/BolitasCitas/Circulos.vue";

let usuarioStore = useUsuarioStore();

const id_cliente = ref(usuarioStore.usuario.usuario.id);
const citas = ref([]);
const citaSeleccionada = ref("");
const ShowSecondCard = ref(false);
const ShowFirstCard = ref(true);

const citasR = ref("");
const citaRechazadas = async () => {
  ShowSecondCard.value = true;
  ShowFirstCard.value = false;
  try {
    const response = await axios.post('http://18.223.116.149/api/CitasRechazadasCliente', {id_cliente: id_cliente.value} )
    citasR.value = response.data.data;
  }catch (error) {
    console.error(error);
  }
};

const citaPendientes = async () => {
  ShowFirstCard.value = true;
  ShowSecondCard.value = false;
  try {
    const response = await axios.post('http://18.223.116.149/api/CitasPendientesCliente', {id_cliente: id_cliente.value} )
    citas.value = response.data.data;
  }catch (error) {
    console.error(error);
  }
};

onMounted(citaPendientes);

watch(citaSeleccionada, (newValue) => {
  if (newValue === 'pendientes') {
    citaPendientes();
  } else if (newValue === 'rechazadas') {
    citaRechazadas();
  }
});

</script>

<style scoped>
* {
  box-sizing: border-box;
}



.motivo::-webkit-scrollbar{
  display: none;
}

.first-container {
  font-family: 'Comfortaa';
  width: 100%;
  height: 100%;
}

.status{
  border-radius: 10px;
}

.second-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3em;
  justify-content: center;
}

.third-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}


.carta{
  border-radius: 15px;
  flex-direction: column;
  width: 395px;
  height: 265px;
  box-shadow: 0px 0px 2em rgba(0, 0, 0, 0.4);
  overflow: hidden; 
  background: linear-gradient(rgb(255, 253, 234), rgb(255, 255, 255));
}
.labels{
  font-weight: bold;
}


.Titulo {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.Titulo span {
  margin-right: 1px;
  margin-top: 5px;
}

.motivo{
  width: 300px;
  height: 100px;
  overflow: auto;
}

.opciones{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .first-container {
    margin-top: 85px;
  }
}


@media (max-width: 480px) {
  .first-container {
    margin-top: 85px;
  }
}

@media (max-width: 1024px) {
  .first-container {
    margin-top: 85px;
  }
}


@media (max-width: 1076px) {
  .first-container {
    margin-top: 85px;
  }
}

@media (max-width: 1092px) {
  .first-container {
    margin-top: 85px;
  }
}

@media (max-width: 1204px) {
  .first-container {
    margin-top: 85px;
  }
}

@media (max-width: 1486px) {
  .first-container {
    margin-top: 80px;
  }
}

</style>