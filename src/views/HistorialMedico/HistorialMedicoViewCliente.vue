<template>
  <div class="first-container">
            <div class="Titulo"> 
          <span class="material-symbols-outlined">respiratory_rate</span><h2>Hisotorial Médico</h2>
        </div>
        <div class="second-container">
          <div class="carta" v-for="mascota in Mascotas" :key="mascota.id" @click="DisplayWindow(mascota.id)">
    <span class="material-symbols-outlined" id="icono">pets</span>
      {{ mascota.nombre }}
      </div>
        </div>
  </div>
  <div v-if="ShowWindow" class="overlay">
    <div class="floating-form">
      <form>
        <div class="table-container2">
          <div class="responsive-table" v-show="ShowTable1">
            <table class="table table-hover custom-table">
              <thead>
              <tr>
                <th>Fecha</th>
                <th>Motivo por el cual se agendo la cita</th>
                <th>Servicios ofrecidos</th>
                <th>Peso</th>
                <th>Altura</th>
                <th>Edad</th>
                <th>Observaciones</th>
                <th>Productos usados</th>
                <th>Cantidad</th>
                <th>Costo de los servicios ofrecidos</th>
                <th>Costo de los productos</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="datos in HistorialM2">
                <td>{{datos.Fecha}}</td>
                <td>{{datos.Motivo}}</td>
                <td>{{datos.Servicios}}</td>
                <td>{{datos.Peso}}</td>
                <td>{{datos.Altura}}</td>
                <td>{{datos.Edad}}</td>
                <td>{{datos.Observaciones}}</td>
                <td>{{datos.Medicacion}}</td>
                <td>{{datos.Cantidad}}</td>
                <td>${{datos.costo_servicios}} + costo de la cita</td>
                <td>${{datos.costo_productos}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br><br>
        <p id="Atras" @click="CloseWindow">Salir</p>
      </form>
    </div>
  </div>
  </template>
    
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import {useUsuarioStore} from "@/stores/UsuariosStore";

  let usuarioStore = useUsuarioStore();

  const id_cliente = ref(usuarioStore.usuario.usuario.id);

  const ShowTable1 = ref(true);
  const ShowWindow = ref(false);

  const DisplayWindow = (id) => {
    id_animal.value = id;
    ShowWindow.value = true;
    console.log(id_animal.value)
    HistorialMedicoIDMascota();
  };
  const CloseWindow = () => {
    ShowWindow.value = false;
  };


  const Mascotas = ref([]);
  const FiltroMascotas = async () => {
    try {
      const response = await axios.post(
        'http://web.Backend.com/MascotasUsuario',
        { id_cliente: id_cliente.value }
      );
      console.log(response.data);
      Mascotas.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  onMounted(FiltroMascotas);

  const id_animal = ref("");


  const HistorialM2 = ref([]);
  const HistorialMedicoIDMascota = async () => {
    try {
      const response = await axios.post('http://web.Backend.com/HistorialIDMascota', {id_mascota: id_animal.value} )
      HistorialM2.value = response.data.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }



  </script>
    
  <style scoped>
  * {
    box-sizing: border-box;
  }

  .table-container::-webkit-scrollbar{ /*Oculta la barra deslizadora en navegadores como Chrome, Safari, Internet Explorer y Edge */
    display: none;
  }
  
  .first-container {
    font-family: 'Comfortaa';
    width: 100%;
    height: 100%;
  
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

    .carta {
  display: flex;
  justify-content: center;
  border: 1px solid #cccccc;
  padding: 10px;
  margin: 10px;
  width: 250px;
  background-color: #F8FBFE;
  border-radius: 8px;
  transition: transform 0.2s;
}

.second-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.carta:hover{
  background-color: #dfb704;
  color: #ffffff;
  transform: translateY(-4px); 
  border-color: #dfb704;
  cursor: pointer;
}
  .overlay {
    font-family: 'Comfortaa';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .floating-form {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    height: 50%;
    width: 80%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form div {
    margin-bottom: 10px;
  }

  form label {
    display: block;
    margin-bottom: 5px;
  }

  form input,
  form select,
  form textarea {
    width: 100%;
  }
  .table-container2 {
    height: 300px;
    overflow: auto;
  }
th{
  background-color: #f3ae23;
  color: #ffffff;
}

#Atras{
  cursor: pointer;
  color: red;
}

  @media (max-width: 767px) {
    .table-container2::-webkit-scrollbar{ /*Oculta la barra deslizadora en navegadores como Chrome, Safari, Internet Explorer y Edge */
      display: none;
    }
  }
  </style>
    