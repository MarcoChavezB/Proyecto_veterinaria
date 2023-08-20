<template>
  <div class="container">
    <div class="inner-container">
      <div class="form-container">
        <div class="card">
          <form @submit.prevent="RegistroProveedor">
            <span class="material-symbols-outlined">store</span><label for="empresa">Empresa:</label>
            <inputs type="text" id="empresa" name="empresa" v-model="empresa" placeholder="Empresa" /><br><br>
            <span class="material-symbols-outlined">contacts</span><label for="name">Nombre:</label>
            <inputs type="text" id="name" name="name" v-model="nombre" placeholder="Nombre" /><br><br>
            <span class="material-symbols-outlined">map</span><label for="address">Dirección:</label>
            <inputs type="text" id="address" name="address" v-model="direccion"  placeholder="Localizacion"/><br><br>
            <span class="material-symbols-outlined">contact_phone</span><label for="phone1">Teléfono 1:</label>
            <inputs type="text" id="phone1" name="phone1" placeholder="Obligatorio" v-model="phone" /><br><br>
            <span class="material-symbols-outlined">contact_phone</span><label for="phone2">Teléfono 2:</label>
            <inputs type="text" id="phone2" name="phone2" v-model="phone2" placeholder="Telefono 2" /><br><br>
            <Buttons  title="Registrar proveedor" />
          </form> 
        </div>
      </div>
      <div class="container2">
        <div class="table-container">
          <div class="responsive-table">
            <table class="table table-hover custom-table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th><span class="material-symbols-outlined">fingerprint</span>Id</th>
                  <th><span class="material-symbols-outlined">store</span>Empresa</th>
                  <th><span class="material-symbols-outlined">contacts</span>Proveedor</th>
                  <th> <span class="material-symbols-outlined">map</span>Dirección</th>
                  <th><span class="material-symbols-outlined">contact_phone</span>Teléfono 1</th>
                  <th><span class="material-symbols-outlined">contact_phone</span>Teléfono 2</th>
                </tr>
              </thead>
              <tbody> 
                <tr v-for="item in proveedores" :key="item.id">
                  <td><span class="material-symbols-outlined" id="delete">delete</span></td>
                  <td><span class="material-symbols-outlined" id="Boton" @click="FormFlotante">edit_square</span></td>
                  <td>{{ item.id }}</td>
                  <td>{{ item.empresa }}</td>
                  <td id="Nombre">{{ item.proveedor }}</td>
                  <td>{{ item.direccion }}</td>
                  <td>{{ item.telefono1 }}</td>
                  <td>{{ item.telefono2 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showRegistrarMascota" class="overlay">
    <div class="floating-form">
      <form @submit.prevent="">
        <span class="material-symbols-outlined">store</span><label for="empresa">Empresa:</label>
            <inputs type="text" id="empresa" name="empresa" v-model="empresa" placeholder="Empresa" /><br><br>
            <span class="material-symbols-outlined">contacts</span><label for="name">Nombre:</label>
            <inputs type="text" id="name" name="name" v-model="nombre" placeholder="Nombre" /><br><br>
            <span class="material-symbols-outlined">map</span><label for="address">Dirección:</label>
            <inputs type="text" id="address" name="address" v-model="direccion"  placeholder="Localizacion"/><br><br>
            <span class="material-symbols-outlined">contact_phone</span><label for="phone1">Teléfono 1:</label>
            <inputs type="text" id="phone1" name="phone1" placeholder="Telefono 1" v-model="phone" /><br><br>
            <span class="material-symbols-outlined">contact_phone</span><label for="phone2">Teléfono 2:</label>
            <inputs type="text" id="phone2" name="phone2" v-model="phone2" placeholder="Telefono 2" /><br><br>
            <Buttons  title="Actualizar" />
            <br>
        <p id="Atras" @click="leave">Salir</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
  z-index: 999; /* Asegúrate de que el índice z sea mayor que el de otros elementos para que aparezca en frente */
}

.floating-form {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
  
  }
  .inner-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
  }
  .form-container {
    padding: 1%;
    flex: 1;
    max-width: 40%;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card {
    padding: 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    width: 93%;
    max-width: 500px;
  }
  form label {
    margin-right: 10px;
  }
  form input {
    margin-bottom: 10px;
  }
  form span {
    vertical-align: middle;
    margin-right: 5px;
  }
  th span {
    vertical-align: middle;
    margin-right: 5px;
  }
  .container2 {
    flex: 1;
    max-width: 70%;

  }
  
  .table-container {
    height: 500px;
    overflow: auto;
    -ms-overflow-style: none; /*La oculta en Internet E. y Edge */
    scrollbar-width: none; /* Oculta la barra deslizadora en Firefox */
  }
  .custom-table {
    
    font-size: 0.9rem;
  }
  .custom-table thead th {
    font-weight: bold;
    background-color: white;
  }


  @media (max-width: 767px) {
  .inner-container {
    flex-direction: column;
  }
  .form-container,
  .container2 {
    max-width: 100%;
  }

  .form-container::-webkit-scrollbar{ /*Oculta la barra deslizadora en navegadores como Chrome, Safari, Internet Explorer y Edge */
    display: none;
  }

  .table-container::-webkit-scrollbar{ /*Oculta la barra deslizadora en navegadores como Chrome, Safari, Internet Explorer y Edge */
    display: none;
  }
}
  #Boton:hover{
    color: rgb(7, 135, 255);
  }

  #delete:hover{
    color: red;
  }

  .floating-form form {
    display: flex;
    flex-direction: column;
  }
  
  .floating-form form div {
    margin-bottom: 10px;
  }
  
  .floating-form form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .floating-form form input,
  form select,
  form textarea {
    width: 100%;
  }
</style>

<script setup>
import Inputs from '../../components/ControlesSencillos/Inputs.vue'
import Buttons from '../../components/ControlesSencillos/Buttons.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const empresa = ref("");
const nombre = ref ("");
const phone = ref("");
const phone2 = ref("");
const direccion = ref("");

const showRegistrarMascota = ref(false);
  const FormFlotante = () => {
    showEditarProveedor.value = true;
  empresa.value = item.empresa;
  nombre.value = item.proveedor;
  direccion.value = item.direccion;
  phone.value = item.telefono1;
  phone2.value = item.telefono2;
    
  };
  const leave = () => {
    showRegistrarMascota.value = false;
  }

const RegistroProveedor = async () => {
    const Proveedor = {
      empresa: empresa.value,
      nombre: nombre.value,
      direccion: direccion.value,
      telefono1: phone.value,
      telefono2: phone2.value
    };
    try {
      const response = await axios.post('http://backend.vetcachorros.one/registrarProveedor',Proveedor);
      console.log(response.data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const proveedores = ref([]);
  const TablaProveedor = async () => {
  try {
  const response = await axios.post('http://backend.vetcachorros.one/TablaProveedor')
  proveedores.value = response.data.data;
  console.log(response.data);
  } catch (error) {
  console.error("Error al obtener el reporte de inventario", error);
  }
  };
  onMounted(TablaProveedor);
</script>


