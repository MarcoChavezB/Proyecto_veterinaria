<template>
  <div class="first-container">
    <div class="parametros">
      <div class="Titulo"> 
        <span class="material-symbols-outlined">respiratory_rate</span><h2>Historial Médico</h2>
      </div>
      <div class="filtro">
        <div class="label">
          <p class="plabel">Nombre de la mascota</p>
          <InputsBusqueda type="search" name="animales" id="busqueda"  v-model="nomMascota" @input="generarHistorial" placeholder="Nombre" />
        </div>
        <InputCliente type="search" tittle1="Nombre(S)" tittle2="Apellidos" v-model:modelValue1="nombre"  v-model:modelValue2="apellido" @input="generarHistorial"  />
      </div>
      </div>
    <div class="pantalla">
      <div class="table-container">
      <div class="responsive-table" v-if="historialMedico.length > 0">
        <table class="table table-hover custom-table">
        <thead>
          <tr>  
            <th>Nombre</th>
            <th>Raza</th>
            <th>Género</th>
            <th>Dueño</th>
            <th>Fecha</th>
            <th>Motivo</th>
            <th>Servicio</th>
            <th>Tipo de servicio solicitado</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>Edad</th>
            <th>Observaciones médicas</th>
            <th>Medicación</th>
            <th>Dosis</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in historialMedico" :key="item.Fecha">
            <td>{{ item.Nombre }}</td>
            <td>{{ item.Raza }}</td>
            <td>{{ item.Genero }}</td>
            <td>{{ item.Dueño }}</td>
            <td>{{ item.Fecha }}</td>
            <td>{{ item.Motivo }}</td>
            <td>{{ item.Servicios }}</td>
            <td>{{ item.Servicio_solicitado }}</td>
            <td>{{ item.Peso }} Kg</td>
            <td>{{ item.Altura }} Mts</td>
            <td>{{ item.Edad }} Meses</td>
            <td>{{ item.Observaciones }}</td>
            <td>{{ item.Medicacion }}</td>
            <td>{{ item.Dosis }}</td>
            <td>{{ item.Cantidad }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="Alerta" v-else>
      <p  class="Mensaje">No hay datos disponibles.</p>
    </div>
    </div>
  </div>
  
</div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InputsBusqueda from '../../components/ControlesSencillos/InputsBusqueda.vue'
import InputCliente from '../../components/ControlesSencillos/InputCliente.vue';
const nomMascota = ref("");
const historialMedico = ref([]);

const nombre = ref("");
const apellido = ref("");

const generarHistorial = async () => {
  try {
    const response = await axios.post('http://backend.vetcachorros.one/historialMedicoCliente', { nombreMascota: nomMascota.value, nombres: nombre.value, apellidos: apellido.value });
    historialMedico.value = response.data.data;
    
  } catch (error) {
    console.error('Error al obtener el historial médico:', error);
  }
};

</script>
  
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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

 .filtro label {
    margin-right: 10px;
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

.Alerta {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.Mensaje {
  text-align: center;
}


@media (max-width: 768px) {
  .parametros {
    padding: 1rem;
  }

  .label-mascota
   {
    font-size: 1rem;
  }

}

.filtro {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 576px) {
  .filtro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }


}

.Titulo {
  display: flex;
  gap: 8px;
  justify-content: center;
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
  }

 .Titulo span {
    margin-right: 1px;
    margin-top: 5px;
  }
</style>
  