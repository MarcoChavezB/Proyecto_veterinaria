<template>
  <div class="first-container">
    <div class="parametros">
      <div class="Titulo">
        <span class="material-symbols-outlined">paid</span><h2>Ventas Realizadas.</h2>
      </div>
      <div class="filtro">
        <ComboBox v-model="selectedOption" title="Filtrar por:" :options="[{ text: 'General', value: 'opcion1' },{ text: 'Fecha', value: 'opcion2' }]"/>
      </div>

      <div class="filtro3" v-if="selectedOption === 'opcion2'">
        <div class="label">
          <p class="plabel">Fecha</p>
          <InputsBusqueda  placeholder="Formato: aaaa-mm-dd" v-model="FechaVenta" @input="ReporteFechaVentas" /><br>
        </div>
      </div>
    </div>

    <div class="pantalla">
      <div class="table-container">
      <div class="responsive-table" v-if="selectedOption === 'opcion1' && gralVenta.length > 0">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Tipo de pago</th>
              <th>Monto pagado</th>
              <th>Nombre del producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in gralVenta" :key="item.Fecha">
              <td id="Fecha">{{ item.Fecha }}</td>
              <td>{{ item.Cliente }}</td>
              <td>{{ item.Tipo_pago }}</td>
              <td>{{ item.Monto_pagado }}</td>
              <td>{{ item.Nombre_producto }}</td>
              <td>{{ item.Cantidad }}</td>
              <td>{{ item.Precio_unitario }}</td>
              <td>{{ item.Total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="selectedOption === 'opcion1'">No hay datos disponibles.</p>

      <div class="responsive-table" v-if="selectedOption === 'opcion2' && ventaFecha.length > 0">
        <table class="table table-hover custom-table">
        <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Tipo de pago</th>
              <th>Monto pagado</th>
              <th>Nombre del producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ventaFecha" :key="item.Fecha">
              <td id="Fecha">{{ item.Fecha }}</td>
              <td>{{ item.Cliente }}</td>
              <td>{{ item.Tipo_pago }}</td>
              <td>{{ item.Monto_pagado }}</td>
              <td>{{ item.Nombre_producto }}</td>
              <td>{{ item.Cantidad }}</td>
              <td>{{ item.Precio_unitario }}</td>
              <td>{{ item.Total }}</td>
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
import InputsBusqueda from '../../components/ControlesSencillos/InputsBusqueda.vue';
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

const FechaVenta = ref("");
const ventaFecha = ref([]);
const ReporteFechaVentas = async () => {
  try {
    const response = await axios.post('http://backend.vetcachorros.one/ReporteFechaVentas', { Fecha: FechaVenta.value });
    ventaFecha.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error al obtener el reporte de inventario", error);
  }
};

const gralVenta = ref("");
const ReporteGralVentas = async () => {
  try {
    const response = await axios.post('http://backend.vetcachorros.one/ReporteGralVentas');
    gralVenta.value = response.data.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error al obtener el reporte de inventario", error);
  }
};
onMounted(ReporteGralVentas);
</script>

<style scoped>
/* Estilos generales y estilos para tamaños de pantalla más pequeños ... */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .first-container, .pantalla{
    font-family: 'Comfortaa';
  }
.first-container {
  width: 100%;
  height: 100vh;
}
.pantalla {
  display: flex;
  justify-content: center;

  height: 85vh;
  font-size: 1.2rem;
}

/* Estilos para tablas responsivas */
.responsive-table {
  overflow-x: auto;
}

@media (max-width: 768px) {
  .parametros {
    padding: 1rem;
  }
  .responsive-table table {
    font-size: 0.9rem;
  }
}

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
  .label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.plabel{
    color: #c2c5d3;
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
</style>
