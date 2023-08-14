<template>
    <div class="pantalla">

    <div class="container">
      <div class="grid">
        <div class="column1">
      </div>
        <div class="column2">
          <div class="row1 fil">
             <h3>! Hola  {{ userInfo.nombre }} !</h3>
          </div>
        </div>
        <div class="column3"></div>
      </div>
    </div>
    <div class="informacion">
      <div class="info">
        <div class="text-field">
          <div class="input-wrapper">
            <div class="inputs">
              <label>Nombre:</label>
    <label>Apellido:</label>
    <label>Correo:</label>
            </div>
<div class="inputss">
  <input type="text" v-model="userInfo.nombre" :disabled="!isEditing" />
      <input type="text" v-model="userInfo.apellido" :disabled="!isEditing" />
      <input type="text" v-model="userInfo.correo" :disabled="!isEditing" />
</div>

    </div>
    <div class="input-wrapper">
      <div class="inputs">
        <label>Telefono 1:</label>
    <label>Telefono 2:</label>
    <label>contraseña:</label>
      </div>
      <div class="inputss">     
       <input type="text" v-model="userInfo.telefono1" :disabled="!isEditing" />
      <input type="text" v-model="userInfo.telefono2" :disabled="!isEditing" />
      <input type="password" v-model="userInfo.contra" :disabled="!isEditing" />
      </div>
    </div>
     </div>
    <div class="botons">
      <button v-show=!loading class="button" @click="editInformation" v-if="!isEditing">Editar mi información</button>
    <button v-show=!loading class="button" @click="saveInformation" v-if="isEditing">Guardar</button>
    <div v-show=loading class="loader"></div>
    <div v-if="correct">
      <h5 class="tit">¡Se ha actualizado correctamente su información!</h5>
    </div>
    </div>
      </div>

    </div>
    <div>

    </div>
    <div>

    </div>
</div>

  </template>
  
  <script setup>

  import axios from 'axios';
  import { ref, reactive, onMounted } from 'vue'
  import {useUsuarioStore} from "@/stores/UsuariosStore";

  const id_cliente = ref(useUsuarioStore().usuario.usuario.id);
  const correct = ref(false);

  let updatedUserInfo = ref(null);
const loading =ref(false);

let userInfo = reactive({
  nombre: '',
  apellido: '',
  correo: '',
  telefono1: '',
  telefono2: '',
  contra: ''
});

let isEditing = ref(false);

function editInformation() {
  isEditing.value = true;
}


async function updateUser() {
  try {
    const userUpdate = {
  id: id_cliente.value,
  nombre: userInfo.nombre,
  correo: userInfo.correo,
  apellido: userInfo.apellido,
  telefono1: userInfo.telefono1,
  telefono2: userInfo.telefono2,
  contra: userInfo.contra
  };
    loading.value = true;
    const response = await axios.post('http://web.Backend.com/clientes/actualizar', userUpdate);
    updatedUserInfo.value = response.data;
    if(response.status === 200) {
        userinfo();
        correct.value = true;
    } else {
     console.error('error al actualizar');
    }
  } catch (error) {
    console.error('Hubo un error al actualizar los datos del usuario:', error);
  }
  loading.value = false;
}

const userinfo = async () => {
  resetUserInfo();
  const user = {
    id: id_cliente.value
  };
  try {
    const response = await axios.post('http://web.Backend.com/clientes/infoID', user);
    if (response.data.data) {
      Object.assign(userInfo, response.data.data);
    }    
  } catch (error) {
    console.error('Hubo un error al obtener los usuarios:', error);
  }
};
function resetUserInfo() {
  Object.assign(userInfo, {
    nombre: '',
    apellido: '',
    correo: '',
    telefono1: '',
    telefono2: '',
    contra: ''
  });
}


onMounted(userinfo);

function saveInformation() {
  updateUser();
  isEditing.value = false;
}

  </script>
  
  <style scoped>

.tit{
  color: rgb(39, 168, 0);
}
  .inputs{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20%;
    justify-content: space-evenly;
    align-items:flex-end;
  }
  .inputss{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 20%;
    justify-content: space-evenly;
    margin-left: 5%;
    align-items: flex-start;
  }
.input-wrapper {
  display: grid;
  gap: 10px;
  height: 100%;
  width: 100%;
  grid-template-columns: 25% 75%;
}


    .text-field {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
}


.text-field input {
  border: none;
  border-radius: 20px;
  width: 100%vh;
  height: 5vh;
  padding: 10px;
  box-shadow: 0 0 1rem #0000008a;
}





    .informacion{
      grid-row-start: 4;
      height: 100%;
      width: 100%;
      border-radius: 15px;
      display:grid;
      grid-template-columns:20% 60% 20%;
      grid-template-rows: 100%;
    }

    .info{
  gap: 3%;
  grid-column-start: 2;
  display: grid;
  grid-template-rows: 80% 20%;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 0 60px #00000034;
}

  .pantalla{
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction: column;
    gap:5%;
    margin-top: 2%;
    font-family: comfortaa;
  }
  .container {
    grid-row-start: 2;
    width: 90%;
    height: 15vh;
    background:linear-gradient(70deg, rgb(221, 240, 255), #fffacf);
    display: flex;
    justify-content: center;
    align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 60px #00000034;
  }
  
  .grid {
    display: grid;
    grid-template-columns: 25% 45% 30%;
    grid-template-rows: 1;
    height: 100%;
    width: 100%;
    gap: 1em;
  }
  
  .column2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .fil{
display: flex;
align-items: center;
justify-content: center;
  }

  .fill2{
    display: flex;
align-items: center;
justify-content: start;
  }
  
  .row1 {
    border-radius: 15px;
    grid-row-start: 2;
  }
  .row2 {
    border-radius: 15px;
    grid-row-start: 3;
  }
  .row3 {
    border-radius: 15px;
    grid-row-start: 4;
  }
  .row4 {
    border-radius: 15px;
    grid-row-start: 5;
  }
  .image{
    height: 70%;
    width: 70%;
    align-items: center;
    justify-content: center;
    justify-items: center;

  }
  .column1{
    display: flex;
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    align-items: center;
    justify-content: center;
  }

 .botons{
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row-start: 2;
  flex-direction: column;
 }

 .button {
 display: inline-block;
 padding: 12px 24px;
 border: 1px solid #4f4f4f;
 border-radius: 4px;
 transition: all 0.2s ease-in;
 position: relative;
 overflow: hidden;
 font-size: 19px;
 color: black;
 z-index: 1;
}

.button:before {
 content: "";
 position: absolute;
 left: 50%;
 transform: translateX(-50%) scaleY(1) scaleX(1.25);
 top: 100%;
 width: 140%;
 height: 180%;
 background-color: rgba(0, 0, 0, 0.05);
 border-radius: 50%;
 display: block;
 transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
 z-index: -1;
}

.button:after {
 content: "";
 position: absolute;
 left: 55%;
 transform: translateX(-50%) scaleY(1) scaleX(1.45);
 top: 180%;
 width: 160%;
 height: 190%;
 background-color: #39bda7;
 border-radius: 50%;
 display: block;
 transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
 z-index: -1;
}

.button:hover {
 color: #ffffff;
 border: 1px solid #39bda7;
}

.button:hover:before {
 top: -35%;
 background-color: #39bda7;
 transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button:hover:after {
 top: -45%;
 background-color: #39bda7;
 transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}
.loader {
  display: block;
  --height-of-loader: 4px;
  --loader-color: #0071e2;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0,0,0,0.2);
  position: relative;
}

.loader::before {
  content: "";
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: moving 1s ease-in-out infinite;
  ;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}
  </style>
  