<template>
  <div class="first-container">
    <div class="parametros">
      <div class="Titulo">
        <span class="material-symbols-outlined">shopping_cart</span><h2>Servicios</h2>
      </div>
      <div class="filtro">
        <ComboBox v-model="selectedOption" title="Filtrar por:" :options="[{ text: 'General', value: 'opcion1' },{ text: 'Pagadas', value: 'opcion2' }]"/>
      </div>
    </div>

    <div class="pantalla">
      <div class="table-container">
      <div class="responsive-table" v-if="selectedOption === 'opcion1' && General.length > 0">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th>Fecha de compra</th>
              <th>Fecha de pago</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in General" :key="item.Motivo">
              <td id="Fecha">{{ item.Fecha_Compra }}</td>
              <td>{{ item.Fecha_Pago }}</td>
              <td>{{ item.Nombre }}</td>
              <td>{{ item.Cantidad }}</td>
              <td>{{ item.Precio }}</td>
              <td>{{ item.Estado }}</td>
              <td>{{ item.Proveedor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="selectedOption === 'opcion1'">No hay datos disponibles.</p>

      <div class="responsive-table" v-if="selectedOption === 'opcion2' && Pagadas.length > 0">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th>Fecha de compra</th>
              <th>Fecha de pago</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Proveedor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Pagadas" :key="item.Motivo">
              <td id="Fecha">{{ item.Fecha_Compra }}</td>
              <td>{{ item.Fecha_Pago }}</td>
              <td>{{ item.Nombre }}</td>
              <td>{{ item.Cantidad }}</td>
              <td>{{ item.Precio }}</td>
              <td>{{ item.Estado }}</td>
              <td>{{ item.Proveedor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="selectedOption === 'opcion2'">No hay datos disponibles.</p>
    </div>
  </div>
</div>
</template>

<script setup>
 import { ref, watch, onMounted } from 'vue';
   import axios from 'axios';
   import ComboBox from '../../components/ControlesSencillos/ComboBox.vue'

const selectedOption = ref('opcion1');
const status1 = ref(true);
const status3 = ref(false);

watch(selectedOption, (newValue) => {
  if (newValue === 'opcion1') {
    status1.value = true;
    status3.value = false;
  } else if (newValue === 'opcion2') {
    status1.value = false;
    status3.value = true;
  } 
});

const General = ref([]);
const ReporteGeneralOrdenesCompra = async () => {
  try {
    const response = await axios.post('http://backend.vetcachorros.one/ReporteGeneralOrdenesCompra');
    General.value = response.data.data;
    
  } catch (error) {
    console.error("Error al obtener el reporte ", error);
  }
};
onMounted(ReporteGeneralOrdenesCompra);

const Pagadas = ref([]);
const ReporteGeneralOrdenesCompraPagadas = async () => {
  try {
    const response = await axios.post('http://backend.vetcachorros.one/ReporteGeneralOrdenesCompraPagadas');
    Pagadas.value = response.data.data;
    
  } catch (error) {
    console.error("Error al obtener el reporte", error);
  }
};
onMounted(ReporteGeneralOrdenesCompraPagadas);
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
      /* Estilos personalizados para la tabla */
      .custom-table {
    font-size: 0.9rem;
  }
  .custom-table thead th {
    font-weight: bold;
    background-color: white;
  }
  .custom-table td,
  .custom-table th {
    border: 1px solid #dee2e6;
  }

  .table-container {
    height: 500px;
    overflow: auto;
  }

  @media (max-width: 767px) {
    .custom-table thead {
      display: none;
    }
    .custom-table td {
      display: block;
      text-align: right;
    }
    .custom-table td:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    #Fecha {
    font-weight: bold;
  }
  }
  </style>
  