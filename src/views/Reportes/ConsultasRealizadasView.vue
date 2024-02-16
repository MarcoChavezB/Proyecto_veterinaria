<template>
  <div class="first-container">

    <div class="parametros">
        <div class="Titulo">
          <span class="material-symbols-outlined">pet_supplies</span><h2>Consultas Realizadas</h2></div>

      <div class="filtro">
        <ComboBox v-model="selectedOption" title="Filtrar por:" :options="[{ text: 'Cliente', value: 'opcion1' },{ text: 'Fecha', value: 'opcion2' }]"/>
      </div>

      <div class="filtro4" v-show="status1">
        <div class="label">
          <p class="plabel">Fecha</p>
          <InputFecha  placeholder="Formato: aaaa-mm-dd" v-model="Fecha" /><br>
          <InputFecha  placeholder="Formato: aaaa-mm-dd" v-model="Fecha2" @input="ReporteConsultasFecha" /><br>
        </div>
      </div>
      
      <div class="filtro2" v-show="status2">
        <InputCliente tittle1="Nombre(s)" tittle2="Apellido(s)" @input="ReporteConsultas" v-model:modelValue1="nomC" v-model:modelValue2="apellidos" />
        <div class="label">
          <p class="plabel">Nombre de la mascota</p>
          <Inputs placeholder="Nombre mascota" v-model="nomM" @input="ReporteConsultas"/>
        </div>
      </div>
      <br>

      <div class="pantalla">
      <div class="table-container">

      <div class="responsive-table"  v-if="selectedOption === 'opcion1' && consultas.length > 0">
        <table class="table table-hover custom-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Motivo</th>
              <th>Servicios</th>
              <th>Servicios prestados</th>
              <th>Peso</th>
              <th>Altura</th>
              <th>Edad</th>
              <th>Observaciones</th>
              <th>Medicación</th>
              <th>Cantidad</th>
              <th>Costo de los servicios ofrecidos</th>
              <th>Costo de los productos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="consulta in consultas" :key="consulta.id">
              <td id="Nombre">{{ consulta.Fecha }}</td>
              <td>{{ consulta.Motivo }}</td>
              <td>{{ consulta.Servicios }}</td>
              <td>{{ consulta.Servicio_solicitado }}</td>
              <td>{{ consulta.Peso }}</td>
              <td>{{ consulta.Altura }}</td>
              <td>{{ consulta.Edad }}</td>
              <td>{{ consulta.Observaciones }}</td>
              <td>{{ consulta.Medicacion }}</td>
              <td>{{ consulta.Cantidad }}</td>
              <td>${{consulta.costo_servicios}} + costo de la cita</td>
              <td>${{consulta.costo_productos}}</td>
            </tr>
          </tbody>
        </table>
      </div>
        <!-- -->
        <div class="responsive-table"  v-if="selectedOption === 'opcion2' && consultasF.length > 0">
          <table class="table table-hover custom-table">
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Motivo</th>
              <th>Servicios</th>
              <th>Servicios prestados</th>
              <th>Mascota</th>
              <th>Peso</th>
              <th>Altura</th>
              <th>Edad</th>
              <th>Observaciones</th>
              <th>Medicacion</th>
              <th>Cantidad</th>
              <th>Costo de los servicios ofrecidos</th>
              <th>Costo de los productos</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="consulta in consultasF" :key="consulta.id">
              <td id="Nombre">{{ consulta.Fecha }}</td>
              <td>{{ consulta.Dueño }}</td>
              <td>{{ consulta.Motivo }}</td>
              <td>{{ consulta.Servicios }}</td>
              <td>{{ consulta.Servicio_solicitado }}</td>
              <td>{{ consulta.Mascota }}</td>
              <td>{{ consulta.Peso }}</td>
              <td>{{ consulta.Altura }}</td>
              <td>{{ consulta.Edad }}</td>
              <td>{{ consulta.Observaciones }}</td>
              <td>{{ consulta.Medicacion }}</td>
              <td>{{ consulta.Cantidad }}</td>
              <td>${{consulta.costo_servicios}} + costo de la cita</td>
              <td>${{consulta.costo_productos}}</td>
            </tr>
            </tbody>
          </table>
        </div>
    </div>
    </div>
  </div>
  </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  import InputCliente from '../../components/ControlesSencillos/InputCliente.vue';
  import Inputs from "@/components/ControlesSencillos/Inputs.vue";
  import Router from "@/router";
  import router from "@/router";
  import ComboBox from "@/components/ControlesSencillos/ComboBox.vue";
  import InputFecha from "@/components/ControlesSencillos/InputFecha.vue";

 const nomC = ref("");
 const nomM = ref("");
 const apellidos = ref("");

 const consultas = ref([]);
 const selectedOption = ref('opcion1');
 const status1 = ref(false);
 const status2 = ref(true);

  watch(selectedOption, (newValue) => {
    if (newValue === 'opcion1') {
      status2.value = true;
      status1.value = false;
    } else if (newValue === 'opcion2') {
      status1.value = true;
      status2.value = false;
    }
  });

 const ReporteConsultas = async () => {
   const data = {
     nomC: nomC.value,
     apellidos: apellidos.value,
     nomM: nomM.value
   };
   try {
     const response = await axios.post('http://18.223.116.149/api/ReporteConsultas', data)
     consultas.value = response.data.data
   }catch (error){
     console.error(error)
   }
 }

  const Fecha = ref("");
  const Fecha2 = ref("");
  const consultasF = ref([]);

  const ReporteConsultasFecha = async () => {
    const data = {
      Fecha: Fecha.value,
      Fecha2: Fecha2.value
    }
    try {
      const response = await axios.post('http://18.223.116.149/api/ReporteConsultasFecha', data)
      consultasF.value = response.data.data
    }catch (error){
      console.error(error)
    }
  }

  </script>
  
  <style scoped>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .first-container, .pantalla{
    font-family: 'Comfortaa';
}
  @media (max-width: 767px) {
    .table-container::-webkit-scrollbar{ /*Oculta la barra deslizadora en navegadores como Chrome, Safari, Internet Explorer y Edge */
      display: none;
    }
  }
  .first-container{
    width: 100%;
    height: 100vh;

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
  height: 500px;
  overflow: auto;
}



.label{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.plabel{
  color: #c2c5d3;
}
  </style>
  