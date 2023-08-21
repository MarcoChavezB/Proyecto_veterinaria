<script setup>
import {ref, onMounted, watch, computed} from 'vue'
import btnn from '@/components/ControlesIndividuales/BotonAntho.vue';
import btn from '@/components/ControlesIndividuales/BotonBlanco.vue';
import load from '../../components/loaders/loaderPrincipal.vue'
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
const usuarios = ref([]);
const usuarioSeleccionadoId = ref(0);

const mascotaSeleccionada = ref(0);
const mascotas = ref([]);

const mensaje = ref('');
const showButton = ref(false);

const fechaCita = ref('');
const motivo = ref('');
const disable = ref(false);
const COL1 = ref('');

const search = ref('');
const regiss = ref(true);
const mostrarmasco = ref(false);
const regismascot = ref(false);

const verificarmascota = ref(false);

const aniinombre = ref('');
const aniiespecie = ref('');
const aniiraza = ref('');
const aniigenero = ref('');
const loadingmasco = ref(false);
const loading = ref(false);


const emi = defineEmits(['close']);

const cerra = () =>{
  emi('close')
}

function regis(value) {
  regiss.value = value;
  limpiar();
}

const limpiar = () =>{
      aniespecie.value = ''
      anigenero.value = ''
      aniraza.value = ''
      aninombre.value = ''
      usuarioSeleccionadoId.value = 0;
      mascotaSeleccionada.value = 0;
      nombre.value = ''
      apellidos.value = ''
      telefono1.value = ''
      telefono2.value = ''
      aniiespecie.value = ''
      aniigenero.value = ''
      aniiraza.value = ''
      aniinombre.value = ''
      search.value = ''
      usuarios.value = []
}

watch(search, () => {
   if(search.value === ''){
      usuarioSeleccionadoId.value = 0;
      mascotaSeleccionada.value = 0;
   }
});

watch(usuarioSeleccionadoId, () => {
   mascotaSeleccionada.value = 0;
   mascota();
   if(usuarioSeleccionadoId.value === 0){
      mostrarmasco.value = false;
   }else if(usuarioSeleccionadoId.value !== 0){
      mostrarmasco.value = true;
   }
});

watch([regiss, nombre, apellidos, telefono1, fechaCita, motivo, aninombre, anigenero, aniespecie, aniraza, usuarioSeleccionadoId, mascotaSeleccionada, fechaCita], (newValues) => {
      const [nregiss, nnombre, napellidos, ntelefono1, nfechaCita, nmotivo, naninombre, nanigenero, naniespecie, naniraza, nusuarioSeleccionadoId, nmascotaSeleccionada, nfechaSeleccionada] = newValues;

   if(nregiss === true){
       if(nnombre === '' || napellidos === '' || ntelefono1 === '' || nfechaCita === '' || nmotivo === '' || naninombre === '' || nanigenero === '' || naniespecie === '' || naniraza === '' || nfechaSeleccionada === ''){
            showButton.value = false;
       }else{
            showButton.value = true;
       }
   }else if (nregiss === false){
      if(nfechaCita === '' || nmotivo === '' || nfechaSeleccionada === '' || nusuarioSeleccionadoId === 0 || nmascotaSeleccionada === 0){
            showButton.value = false;
      }else{
            showButton.value = true;
      }
   }
});




watch([aniinombre, aniiespecie, aniigenero, aniiraza, usuarioSeleccionadoId], (newValues) => {
    const [newAninombre, newAniespecie, newAnigenero, newAniraza, newusuarioSeleccionadoId] = newValues;
    if (newAninombre === '' || newAniespecie === '' || newAnigenero === '' || newAniraza === '' || newusuarioSeleccionadoId === 0) {
      verificarmascota.value = false;
    } else {
      verificarmascota.value = true;
    }
});

function regismasco(value) {
  regismascot.value = value;
}


const validarFecha = async () => {
      mensaje.value = '';
      const fechaSeleccionada = new Date(fechaCita.value)
      try {
            const response = await axios.post('http://Backend.vetcachorros.one/ValidacionFechas');
            const fechasValidadas = response.data.data;
            const fechasExistentes = fechasValidadas.some(cita => new Date(cita.fecha_cita).getTime() === fechaSeleccionada.getTime())
            if (fechasExistentes) {
                  mensaje.value = '¡Esta fecha ya esta ocupada!';
                  COL1.value = 'red';
                  disable.value = true;
            } else {
                  disable.value = false;
            }

      } catch (error) {
            console.error(error);
      }
}

const buscar = async () => {
  if(search.value==="") {
      usuarioSeleccionadoId.value = 0
      mascotaSeleccionada.value = 0
      usuarios.value = [];
   } else {
     usuarioSeleccionadoId.value = 0
     mascotaSeleccionada.value = 0
    await UsersCorreo();
  }
}

const UsersCorreo = async () => {
    usuarios.value = [];
    const userUpdate = {
     cadena: search.value
    };
  try {
    const response = await axios.post('http://backend.vetcachorros.one/clientes/infoCorreo', userUpdate);
    if (Array.isArray(response.data.data)) {
  usuarios.value = response.data.data;
   } else {
    usuarios.value = [response.data.data];
   }  
  } catch (error) {
    console.error('Hubo un error al obtener los usuarios:', error);
  }
};

const mascota = async () => {
    mascotas.value = [];
    const userUpdate = {
     id_cliente: usuarioSeleccionadoId.value
    };
  try {
    const response = await axios.post('http://backend.vetcachorros.one/MascotasUsuario', userUpdate);
    if (Array.isArray(response.data.data)) {
  mascotas.value = response.data.data;
   } else {
    mascotas.value = [response.data.data];
   }  
  } catch (error) {
    console.error('Hubo un error al obtener los usuarios:', error);
  }
};


async function citalocal() {
      loading.value = true;
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
    const response = await axios.post('http://backend.vetcachorros.one/citalocal', dataToSend);
    if (response.status === 200) {
      limpiar();
      mensaje.value = '¡Cita local registrada correctamente!';
      COL1.value = 'green';
    }
  } catch (error) {
    console.error("Hubo un error enviando la petición:", error);
  }
  loading.value = false;
}

const validatePhoneInput = (event) => {
  event.target.value = event.target.value.replace(/[^0-9\-]/g, '');
  telefono1.value = event.target.value; 
}

const validatePhoneInputt = (event) => {
  event.target.value = event.target.value.replace(/[^0-9\-]/g, '');
  telefono2.value = event.target.value; 
}


const registrarMascota = async () => {
      loadingmasco.value = true;
      const mascotaa = {
            nombre_: aniinombre.value,
            propietario_: usuarioSeleccionadoId.value,
            especie_: aniiespecie.value,
            raza_: aniiraza.value,
            genero_: aniigenero.value,
      };
      try {
            const response = await axios.post(
                  'http://backend.vetcachorros.one/registrarMascota',
                  mascotaa
            );
            
            if (response.status === 200){
            await mascota();
            aniinombre.value = ''
            aniiespecie.value = ''
            aniiraza.value = ''
            aniigenero.value = ''
            regismasco(false);
            }
            loadingmasco.value = false;

      } catch (error) {
            console.error(error);
      }
};

const agendar = () =>{
      if(regiss.value === true){
            citalocal()
      }else if(regiss.value === false){
            citasweb()
      }
}

const citasweb = async () => {
      loading.value = true;
      const cita = {
            user_regis: userregis.value,
            fechaCita: fechaCita.value,
            estatus: 'Aceptada',
            motivo: motivo.value,
            id_mascota: mascotaSeleccionada.value
      };
      
      try {
            const response = await axios.post(
                  'http://backend.vetcachorros.one/agendarcita',
                  cita
            );
            if(response.status === 200){
              limpiar()
              mensaje.value = '¡Cita local registrada correctamente!';
              COL1.value = 'green';
            }
      } catch (error) {
            console.error(error);
      }
      loading.value = false;
};


</script>

<template>
      <div class="flow">
            <transition name="fade">
      <div class="display2" v-if="loading">
        <load v-if=loading class="loader"/>
        <h2>Generando...</h2>
      </div>
      </transition>
        <div class="cite" v-if="!loading">
            <button class="cerrar" @click="cerra" >X</button>
                  <div class="tit">
                  <h3>AGENDAR CITA</h3>
             </div>
             <div class="regisono">
                   <btn title="Sin registrar" @click= "regis(true)"  />
                   <btn title="registrado" @click= "regis(false)" />
             </div> 
             <h6 class="msg" :style="{ color: COL1 }">{{ mensaje }}</h6>
      <div class="form-cita">
                   <label for="fechaCita">Fecha de la cita:</label>
                   <input type="datetime-local" v-model="fechaCita" @input="validarFecha" />
                   <br> 
                    <span>Motivo</span>
                    <textarea v-model="motivo"></textarea>
           </div>

           <div class="sinregis" v-if="!regiss">
            <span>Busca por telefono, correo o nombre:</span>
      <div class="search">
    <input :type="inputType" class="search__input" v-model="search" placeholder="Buscar usuario..." @input="buscar">
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
          <div class="select" v-for="usuario in usuarios" :key="usuario.id">
            <input class="he2" 
             type="radio" 
             :value="usuario.id" 
             v-model="usuarioSeleccionadoId" 
             name="usuario-radio" />
            <span>{{ usuario.nombre }} {{ usuario.apellido }}</span>
            <span>{{ usuario.correo }}</span>
            <span>{{ usuario.telefono1 }}</span>
            <span>{{ usuario.telefono2 }}</span>
        </div>
      </div>
<br>
      <div class="mascotas" v-if="mostrarmasco">
            <h5>Mascotas</h5>
            <transition name="fade">
      <div class="display2" v-if="loadingmasco">
        <load v-if=loadingmasco class="loader"/>
        <h2>Registrando...</h2>
      </div>
      </transition>
       <div class="combo" v-if="!loadingmasco">
          <div class="select" v-for="mascota in mascotas" :key="mascota.id" v-if="!regismascot">
            <input class="he2" 
             type="radio" 
             :value="mascota.id" 
             v-model="mascotaSeleccionada" 
             name="mascota-radio"
             />
            <span>{{ mascota.nombre }}</span>
            <span>{{ mascota.especie }}</span>
            <span>{{ mascota.raza }}</span>
            <span>{{ mascota.genero }}</span>
        </div>
        <div class="select2" v-if="!regismascot" @click="regismasco(true)">
            <h2 class="sumar">+</h2>
            <h5 class="sumar">Agregar Mascota</h5>
        </div>
        <div class="select" v-if="regismascot">
            <br>
            <h5>Registrar Mascota</h5>
            <br>
            <div class="input">
                <span>Nombre:</span>
                <input type="text" v-model="aniinombre">
         </div>
         <br>
           <div class="input">
                   <span>Especie:</span>
                   <select v-model="aniiespecie">
                        <option>Perro</option>
                        <option>Gato</option>
                  </select>                 
                  </div>
                  <br>
                 <div class="input">
                <span>Raza:</span>
              <input type="text" v-model="aniiraza">
              </div>
              <br>
           <div class="input">
           <span>Genero:</span>
           <select v-model="aniigenero">
              <option>Macho</option>
              <option>Hembra</option>
          </select>
          </div>
          <br>
          <div class="botomas">
            <btn title="Cancelar" @click= "regismasco(false)" />
            <btnn title="crear mascota" @click="registrarMascota" v-show="verificarmascota"/>
          </div>
          <br>
        </div>
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
                       <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" @input="validatePhoneInput" placeholder="123-456-7890" v-model="telefono1">
                   </div>
                <div class="input">
                       <span>Telefono 2:</span>
                       <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" @input="validatePhoneInputt" placeholder="123-456-7890" v-model="telefono2">
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
                   <select v-model="aniespecie">
                        <option>Perro</option>
                        <option>Gato</option>
                  </select>                 
                  </div>
                 <div class="input">
                <span>Raza:</span>
              <input type="text" v-model="aniraza">
     </div>
           <div class="input">
           <span>Genero:</span>
           <select v-model="anigenero">
              <option>Macho</option>
              <option>Hembra</option>
          </select>        
          </div>
      </div>
         </div>
         <div class="but">
            <btnn title="Agendar Cita" @click="agendar" v-show="showButton" :disabledd="disable"/>
            <br>
            <br>
            <br>
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
.msg{
      grid-column-start: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      grid-row-start: 5;

}
.loader{
  position: relative;
    z-index: 105;
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
  z-index: 103;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.botomas{
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
}
.mascotas{

      display: flex;
      flex-direction: column;
      height: 70%;
      width: 100%;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

}
.flow{
      display: flex;
      overflow: auto;
      width: 40%;
      height: 90%;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2rem 3rem rgba(255, 255, 255, 0.363);
      background-color: white;
      border-radius: 20px;

}
.flow::-webkit-scrollbar {
  width: 15px;
}

.flow::-webkit-scrollbar-track {
  background-color: white;
}

.flow::-webkit-scrollbar-thumb {
  background: #cfcfcf;
}

.cite{
      width: 100%;
      height: 100%;
      font-family: comfortaa;
      display: grid;
      grid-template-columns: 15% 70% 15%;
      row-gap: 3%;
}
.regisono{
      display: flex;
      grid-row-start: 3;
      grid-column-start: 2;
      width: 100%;
      height: 100%;

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
      width: 90%;
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
      height: 10vh;
      width: 100%;
      resize: none;
}

select{
      border-radius: 10px;
      border: none;
      box-shadow: 0 0rem 1rem rgba(75, 66, 66, 0.363);
      text-align: center;
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
  height: auto;
  box-sizing: border-box;
  width: 100%;

}


.select2{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2em #00000041;
  border-radius: 20px;
  height: 18vh;
  box-sizing: border-box;
  width: 100%;
  background-color: rgb(89, 148, 73);
  cursor: pointer;
}

.sumar{
      color: white;
}

.combo{
      
      display: flex;
  width: 100%;
  height: 40vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 2em #00000015;
  flex-direction: column;
  row-gap: 2em;
  justify-content: space-between;
  padding: 1rem 0; 

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