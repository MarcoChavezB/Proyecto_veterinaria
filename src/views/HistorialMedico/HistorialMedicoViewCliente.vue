<template>
  <div class="first-container">
            <div class="Titulo"> 
          <span class="material-symbols-outlined">respiratory_rate</span><h2>Mascotas</h2>
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
        <span class="material-symbols-outlined" id="Atras" @click="CloseWindow">close</span>
        <div class="table-container2">
          <div class="responsive-table" v-show="ShowTable1">
            <table class="table table-hover custom-table table-sm">
              <thead>
              <tr>
                <th><p>Fecha</p></th>
                <th><p>Motivo</p></th>
                <th><p>Servicios</p></th>
                <th><p>Peso</p></th>
                <th><p>Altura</p></th>
                <th><p>Edad</p></th>
                <th><p>Observaciones</p></th>
                <th><p>Productos</p></th>
                <th><p>Cantidad</p></th>
                <th><p>Costo Servicios</p></th>
                <th><p>Costo Productos</p></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="datos in HistorialM2">
                <td>{{datos.Fecha}}</td>
                <td>{{datos.Motivo}}</td>
                <td>{{datos.Servicios}}</td>
                <td>{{datos.Peso}} kg</td>
                <td>{{datos.Altura}} mts</td>
                <td>{{datos.Edad}} meses</td>
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
      </form>
    </div>
  </div>
  </template>
    
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import {useUsuarioStore} from "@/stores/UsuariosStore";

  let usuarioStore = useUsuarioStore();

  const id_cliente = ref(usuarioStore.usuario.id);

  const ShowTable1 = ref(true);
  const ShowWindow = ref(false);

  const DisplayWindow = async (id) => {
    id_animal.value = id;
    await HistorialMedicoIDMascota();
    if (HistorialM2.value.length <= 0){
      ShowWindow.value = false;
    }
    else{
      ShowWindow.value = true;
    }
  };
  const CloseWindow = () => {
    ShowWindow.value = false;
    HistorialM2.value = [];
  };


  const Mascotas = ref([]);
  const FiltroMascotas = async () => {
    try {
      const response = await axios.get(
        'http://18.223.116.149/api/usuario/getPets/' + id_cliente.value
      );
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
      const response = await axios.post('http://18.223.116.149/api/consultas/historialMascota/' + id_animal.value )
      HistorialM2.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }



  </script>
    
  <style scoped>
  * {
    box-sizing: border-box;
  }

  .table-container::-webkit-scrollbar{
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
    width: 150px;
    background-color: #F8FBFE;
    border-radius: 20px;
    transition: transform 0.2s;
    margin: 2rem;
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
  table {
    border-collapse: collapse;
  }

  thead {
    border: 1px solid #d1d8e5;
  }

  th, td {
    font-size: 0.8em;
  }

  th {
    background-color: #f8f9fa;
    color: #495057;
  }

  td {
    background-color: #ffffff;
  }



  #Atras {
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #495057;
    background-color: #f8f9fa;
    padding: 2px;
  }

  @media (max-width: 767px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container{
      margin-top: 85px;
    }
  }


  @media (max-width: 768px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 85px;
    }
  }


  @media (max-width: 480px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 85px;
    }
  }

  @media (max-width: 1024px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 85px;
    }
  }


  @media (max-width: 1076px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 85px;
    }
  }

  @media (max-width: 1092px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 85px;
    }
  }

  @media (max-width: 1204px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 85px;
    }
  }

  @media (max-width: 1486px) {
    .table-container2::-webkit-scrollbar{
      display: none;
    }
    .first-container {
      margin-top: 80px;
    }
  }

  </style>
    