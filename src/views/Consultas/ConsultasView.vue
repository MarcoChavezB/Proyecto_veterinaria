<template>
  <div class="first-container">

    <div class="parametros">
        <div class="Titulo">
          <span class="material-symbols-outlined">local_hospital</span><h2>Generar Consultas</h2>
        </div>
      <div class="filtro">
        <ComboBox v-model="selectedOption" title="Filtrar por:" :options="[{ text: 'Cliente', value: 'opcion1' },{ text: 'General', value: 'opcion3' }]"/>
      </div>
      <div class="filtro2" v-show="status1">
        <InputCliente tittle1="Nombres(S)" tittle2="Apellidos" v-model:modelValue1="Nombres" v-model:modelValue2="Apellidos" @input="GenerarConsultasCliente" />
      </div>

    </div>
  
    <div class="pantalla">
      <div class="table-container">
        <div class="responsive-table" v-if="selectedOption === 'opcion3' && General.length > 0">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th></th>
              <th>Mascota</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Género</th>
              <th>Dueño</th>
              <th>Fecha</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="item in General" :key="item.id">
              <td><span class="material-symbols-outlined" id="Boton" @click="TServicios(item.id)">local_hospital</span></td>
              <td id="Nombre">{{ item.Nombre }}</td>
              <td>{{ item.Especie }}</td>
              <td>{{ item.Raza }}</td>
              <td>{{ item.Genero }}</td>
              <td>{{ item.Dueño }}</td>
              <td>{{ item.Fecha }}</td>
              <td>{{ item.Motivo }}</td>
            </tr>
          </tbody>
        </table>
      </div>


      <!-- Tabla de consultas por cliente -->
      <div class="responsive-table" v-if="selectedOption === 'opcion1' && constCliente.length > 0">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th></th>
              <th>Mascota</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Género</th>
              <th>Dueño</th>
              <th>Fecha</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in constCliente" :key="item.id">
              <td><span class="material-symbols-outlined" id="Boton" @click="TServicios(item.id)">local_hospital</span></td>
              <td id="Nombre">{{ item.Nombre }}</td>
              <td>{{ item.Especie }}</td>
              <td>{{ item.Raza }}</td>
              <td>{{ item.Genero }}</td>
              <td>{{ item.Dueño }}</td>
              <td>{{ item.Fecha }}</td>
              <td>{{ item.Motivo }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    </div>
  </div>
  <div v-if="showRegistrarMascota" class="overlay">
    <div class="floating-form">
      <form @submit.prevent="ValidarCampos">
        <span class="material-symbols-outlined" id="Atras" @click="Atras">close</span>
        <label for="observaciones">Observaciones médicas:</label>
          <textarea id="observaciones" v-model="observaciones"></textarea>
          <label for="peso">Peso (kg):</label>
          <input type="text" id="peso" v-model="peso"> 
          <label for="altura">Altura (mts):</label>
          <input type="text" id="altura" v-model="altura"> 
          <label for="edad">Edad (meses):</label>
          <input type="text" id="edad" v-model="edad">
          <br>
          <div class="table-container2">
            <div class="responsive-table">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th></th>
              <th>Servicios</th>
              <th><Inputs placeholder="Servicios" v-model="search" @input="SearchServices" /></th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="servicio in servicios">
              <td><input type="checkbox"  v-model="services"  :value="servicio.id" :key="servicio.id"  /></td> 
              <td>{{ servicio.nombre_TServicio }}</td>
              <td></td>
              </tr>
          </tbody>
        </table>
      </div>
          </div>
        <br>
        <div v-for="costos in costosPS">
          <p>Costo Servicios:  ${{costos.costo_servicios_total}}</p>
          <p>Costo Articulos:  ${{costos.costo_productos_total}}</p>
          <p>Total:  ${{costos.costo_total}}</p>
        </div>
        <br>
        <div class="enviar"><Btnn type="submit" title="Guardar consulta"/><br></div>
      </form>
    </div>
    <BarAlertError
        :name="VoidInputsMessage"
        v-if="VoidInputs" />
    <BarAlertSuccess
        :name="SuccesMessage"
        v-if="ShowSucces" />
  </div>

  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import InputCliente from '../../components/ControlesSencillos/InputCliente.vue';
  import ComboBox from '../../components/ControlesSencillos/ComboBox.vue'
  import InputFecha from '../../components/ControlesSencillos/InputFecha.vue';
  import router from "@/router";
  import { useRouter } from 'vue-router';
  import Inputs from "@/components/ControlesSencillos/Inputs.vue";
  import Btnn from '@/components/ControlesIndividuales/BotonAntho.vue';
  import BarAlertError from "@/components/Mensajes/BarAlertError.vue";
  import BarAlertSuccess from "@/components/Mensajes/BarAlertSuccess.vue";


  const selectedOption = ref('opcion3');
  const status1 = ref(false);
  const status2 = ref(true);
  const status3 = ref(false);

  const VoidInputsMessage = ref("Error. Campos vacíos.")
  const VoidInputs = ref(false);

  const SuccesMessage = ref("Consulta generada con exito.")
  const ShowSucces = ref(false);

  const observaciones = ref('');
  const peso = ref('');
  const altura = ref('');
  const edad = ref('');
  const id_cita = ref('');
  const services = ref([]);
  const search = ref('');
  const filter = ref(true);

  const SearchServices = async () => {
    if (search.value === ""){
      await TServicios();
    }else if(search.value !== ""){
      await Services();
    }
  }


  const servicios = ref([]);
  const TServicios = async (id) => {
   id_cita.value = id;
  try {
  const response = await axios.get('http://18.223.116.149/api/consultas/tServicios')
  servicios.value = response.data.data;
  FormFlotante();
  } catch (error) {
  console.error(error);
  }
  };



  const Services = async () => {
    const data = {
      nombre: search.value
    };

    try {
      const response = await axios.post('http://18.223.116.149/api/consultas/buscarServicios', data);
      servicios.value = response.data.servicios;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  watch(services, async (newValue) => {
    await CalcularCostoDetallado();
  });


  const ValidarCampos = () => {
    if(
        id_cita.value === '' ||
        observaciones.value === '' ||
        peso.value === '' ||
        altura.value === '' ||
        edad.value === '' ||
        services.value.length === 0
    ){
      VoidInputs.value = true;
      setTimeout(() =>{
        VoidInputs.value = false;
      }, 2000)
    }else {
      RegistroConsulta();
    }
  }

  const RegistroConsulta = async () => {
  const Consulta = {
    id_cita: id_cita.value,
    observaciones: observaciones.value,
    peso_kg: peso.value,
    altura_mts: altura.value,
    edad_meses: edad.value,
    servicios_id: services.value
  }
    try {
      const response = await axios.post(
        'http://18.223.116.149/api/consultas/store',
        Consulta
      );
        costosPS.value = [];
        ShowSucces.value = true;
        setTimeout(() => {
          ShowSucces.value = false;
        }, 2000)
        setTimeout(() => {
          Atras();
          GenerarConsultas();
        }, 2000)
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    id_cita.value = '';
    observaciones.value = '';
    peso.value = '';
    altura.value = '';
    edad.value = '';
    services.value = [];
    search.value = '';
  };


  const costosPS = ref("");
  const CalcularCostoDetallado = async () => {
    try{
      const response = await axios.post('http://18.223.116.149/api/consultas/calcularCostoDetallado', {services: services.value});
      costosPS.value = response.data.data;
    }catch (error) {
      console.error(error);

    }
  };

  const showRegistrarMascota = ref(false);
  const FormFlotante = () => {
    showRegistrarMascota.value = true;
    
  };
  const Atras = () => {
    costosPS.value = [];
    showRegistrarMascota.value = false;
    resetForm();
  };
  
  watch(selectedOption, (newValue) => {
    if (newValue === 'opcion1') {
      status1.value = true;
      status2.value = false;
      status3.value = false;
    } else if (newValue === 'opcion2') {
      status1.value = false;
      status2.value = false;
      status3.value = true;
    } else {
      status1.value = false;
      status2.value = true;
      status3.value = false;
    }
  });
  const General = ref([]);
const GenerarConsultas = async () => {
 try {
 const response = await axios.get('http://18.223.116.149/api/consultas/generarConsultas')
 General.value = response.data.data;
} catch (error) {
 console.error(error);
}
};
onMounted(GenerarConsultas);


const Nombres = ref("");
const Apellidos = ref("");  
const constCliente = ref([]);
const GenerarConsultasCliente = async () => {

  const data = {
    Nombre: Nombres.value,
    Apellido: Apellidos.value
  }
try {
  const response = await axios.post('http://18.223.116.149/api/consultas/generarConsultasCliente', data)
  constCliente.value = response.data.data;
} catch (error) {
  console.error("Error al obtener el reporte de inventario", error);
}
};

</script>
  
  <style scoped>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


  .first-container{
    width: 100%;
    height: 100vh;
    font-family: 'Comfortaa';
  }

  .enviar {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pantalla {
    display: flex;
    justify-content: center;
 
    height: 85vh;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    .parametros {
      padding: 1rem;
    }
  }
  
  @media (max-width: 576px) {
    .filtro {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
  .Titulo{
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  .Titulo span {
    margin-right: 1px;
    margin-top: 5px;
  }
    .custom-table {
    font-size: 0.9rem;
  }
  .custom-table thead th {
    font-weight: bold;
    background-color: white;
  }
  
  .table-container {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .table-container2 {
    height: 200px;
    width: 100%;
    overflow: auto;
  }

  @media (max-width: 767px) {
    .table-container::-webkit-scrollbar{
    display: none;
  }
  }
  #Boton{
    color: rgb(132, 202, 26);
  }
  #Boton:hover{
    color: green;
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  width: 550px;
}

#Atras:hover{

    cursor: pointer;
  }
  
  #Atras{
    color: red;
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
    border-radius: 10px;
    border: none;
    box-shadow: 0 0rem 1rem rgba(124, 125, 136, 0.384);
    height: 4vh;
  }

  </style>
  