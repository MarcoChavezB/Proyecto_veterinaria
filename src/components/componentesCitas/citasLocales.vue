<script setup>
import {ref, onMounted} from 'vue'
import btnn from '@/components/ControlesIndividuales/BotonAntho.vue';
import btn from '@/components/ControlesIndividuales/BotonBlanco.vue';

import {useUsuarioStore} from "@/stores/UsuariosStore";
import axios from 'axios'

const userregis = ref(useUsuarioStore().usuario.usuario.id);
const nombre = ref('');
const apellidos = ref('');
const telefono1 = ref();
const telefono2 = ref();
const aninombre = ref('');
const aniespecie = ref('');
const aniraza = ref('');
const anigenero = ref('');

const showFechaOcupada = ref(false);
const showButton = ref(true);

const fechaCita = ref('');
const motivo = ref('');

const regiss = ref(false);

function regis(value) {
  regiss.value = value;
}

const validarFecha = async () => {
      const fechaSeleccionada = new Date(fechaCita.value)
      try {
            const response = await axios.post('http://web.Backend.com/ValidacionFechas');
            const fechasValidadas = response.data.data;
            const fechasExistentes = fechasValidadas.some(cita => new Date(cita.fecha_cita).getTime() === fechaSeleccionada.getTime())
            console.log(fechasExistentes);

            if (fechasExistentes) {
                  showFechaOcupada.value = true;
                  showButton.value = false;
            } else {
                  showFechaOcupada.value = false;
                  showButton.value = true;
            }

      } catch (error) {
            console.error(error);
      }
}



async function citalocal() {
  const dataToSend = {
    userregis: userregis.value,
    nombre: nombre.value,
    apellido: apellidos.value,
    telefono1: telefono1.value,
    telefono2: telefono2.value,
    nombre_animal: aninombre.value,
    especie: aniespecie.value,
    raza: aniraza.value,
    genero: anigenero.value,
    fecha_cita: fechaCita.value,
    estatus: 'Aceptada',
    motivo: motivo.value
  };

  try {
    const response = await axios.post('http://web.Backend.com/citalocal', dataToSend);
    if (response.status === 200) {
    }
  } catch (error) {
    console.error("Hubo un error enviando la petición:", error);
  }
}
</script>
<template>
      <div class="cite" >
             <div class="tit">
                  <h3>AGENDAR CITA</h3>
             </div>
             <div class="regisono">
                   <btn title="Sin registrar" @click= "regis(true)" />
                   <btn title="registrado" @click= "regis(false)" />
             </div> 
      <div class="form-cita">
                   <label for="fechaCita">Fecha de la cita:</label>
                   <input type="datetime-local" v-model="fechaCita" @input="validarFecha" />
                    <span>Motivo</span>
                    <textarea v-model="motivo"></textarea>
           </div>

           <div class="sinregis">
            <span>Elige los productos para el servicio:</span>
      <div class="search">
    <input :type="inputType" class="search__input" v-model="search" placeholder="Buscar producto..." @input="productocadena">
    <button class="search__button" @click="buscar">
        <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
    </button>
    <br>
         </div>
        <div class="combo">
          <div class="select" v-for="producto in productos" :key="producto.id">
            <input class="he2" :disabled="!producto.puedeSeleccionar" type="checkbox" v-model="producto.seleccionado" @change="agregarAlArray(producto)" />
            <span>{{ producto.nom_producto }}</span>
            <input class="he1" type="number" v-model="producto.cantidad" placeholder="Cantidad" @input="checkCantidad(producto)" />
        </div>
      </div>


           </div>
       <div class="form2" v-if="regiss" >
                <div class="form-cliente">
                      <h5>Datos del Cliente</h5> 
                 <div class="input">
                     <span>Nombre:</span>
                     <input type="text" v-model="nombre">
                  </div>
                 <div class="input">
                       <span>Apellidos:</span>
                       <input type="text" v-model="apellidos">
                    </div>
                  <div class="input">
                       <span>Telefono 1:</span>
                       <input type="Number" v-model="telefono1">
                   </div>
                <div class="input">
                       <span>Telefono 2:</span>
                       <input type="Number" v-model="telefono2">
                </div>
         </div>
         <br>
             <div class="form-mascota">
                <h5>Datos de la Mascota</h5>
           <div class="input">
                <span>Nombre:</span>
                <input type="text" v-model="aninombre">
         </div>
           <div class="input">
                   <span>Especie:</span>
                <input type="text" v-model="aniespecie">
                 </div>
                 <div class="input">
                <span>Raza:</span>
              <input type="text" v-model="aniraza">
     </div>
           <div class="input">
           <span>Genero:</span>
           <input type="text" v-model="anigenero">
            </div>
      </div>
         </div>
         <div class="but">
            <btnn title="Agendar Cita" @click="agendar" v-show="showButton"/>
         </div>
        </div>
</template>
<style scoped>

.regisono{
      display: flex;
      grid-row-start: 3;
      grid-column-start: 2;
      width: 100%;
      height: 100%;

}
.cite{
      background-color: white;
      width: 40%;
      height: 80%;
      border-radius: 20px;
      box-shadow: 0 2rem 3rem rgba(255, 255, 255, 0.363);
      font-family: comfortaa;
      display: grid;
      grid-template-columns: 15% 70% 15%;
      grid-template-rows: 3% 5% 8% 25% 7% 38% 5% 10% ;
}

.tit{
      display: flex;
      grid-row-start: 2;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      grid-column-start: 2;
      row-gap: 5px;
}


.form-cita{
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      grid-row-start: 4;
      grid-column-start: 2;
}

.sinregis{
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      grid-row-start: 6;
      grid-column-start: 2;
}
.form2{
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      grid-row-start: 6;
      grid-column-start: 2;
}

.form-cliente{
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      row-gap: 5px;
}
.form-mascota{
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      row-gap: 5px;
}

.input{
      display: grid;
      grid-template-columns: 30% 70%;
      height: 100%;
      width: 100%;
}

.but{
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content:center;
      grid-column-start: 2;
      grid-row-start: 8;
}

input{
      border-radius: 10px;
      border: none;
      box-shadow: 0 0rem 1rem rgba(75, 66, 66, 0.363);
      text-align: center;
}

textarea{
      border-radius: 10px;
      border: none;
      box-shadow: 0 0rem 1rem rgba(75, 66, 66, 0.363);
      text-align: center;
      height: 60%;
      width: 100%;
      resize: none;
}

.search-box{
    font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 17em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
  text-align: center;
  }

  .search-boxx{
    font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 17em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
  text-align: left;
  height: 8vh;
  }
  

  .select{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2em #00000041;
  border-radius: 20px;
  height: 20vh;
}

.combo{
  width: 100%;
  height: 35vh;
  overflow: scroll;
  box-shadow: 0 0 2em #00000015;
  display: flex;
  flex-direction: column;
  row-gap: 15%;
  border-top: 20px;
}

.combo::-webkit-scrollbar {
  width: 15px;
}

.combo::-webkit-scrollbar-track {
  background-color: white;
}

.combo::-webkit-scrollbar-thumb {
  background: #cfcfcf;
}
.search__input {
  font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 100%;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
}
.he2{
  width: 3vh;
  height: 3vh;
  border: none;
  box-shadow: 0 0 1em #00000013;
border-radius: 10px;

}
.he1{
  border: none;
  border-radius: 30px;
  height: 4vh;
  width: 30vh;
  box-shadow: 0 0 1em #00000013;
  text-align: center;
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