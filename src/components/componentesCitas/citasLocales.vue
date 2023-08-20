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

const regiss = ref(true);

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
                   <br>
                    <span>Motivo</span>
                    <textarea v-model="motivo"></textarea>
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
      grid-template-rows: 3% 5% 10% 25% 5% 38% 5% 10% ;
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
.form2{
      border-radius: 10px;
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
</style>