<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import btn from '../../components/ControlesIndividuales/BotonBlanco.vue';
import btn2 from '../../components/ControlesIndividuales/BotonAntho.vue';


let ordenes = ref([]);
const columna = ref(1);
const fecha1 = ref('');
const fecha2 = ref('');
const fechadesac = ref(false);
const showModal = ref(false);
const detal = ref(false);

watch(columna, () => {
  if(columna.value === 1 || columna.value === 2)
  {
    fechadesac.value = false;
  }else if(columna.value === 3 || columna.value === 4)
  {
    fechadesac.value = true;
  }
});

const activar= async () => {
  if(showModal.value === false)
  {
    showModal.value = true;
  } else if (showModal.value === true)
  {
    showModal.value = false;
    location.reload();
  }
}
const buscar = async () => {
  if(columna.value === 1 || columna.value === 2)
  {
   await buscarOrdenesPorFecha();
  } else if (columna.value === 3 || columna.value === 4)
  {
    await buscarOrdenesPorEstado();
  }
}


const obtenerOrdenesPendientes = async () => {
    try {
        const response = await axios.get('http://18.223.116.149/api/orden/pendientes')
        if (Array.isArray(response.data.data)) {
            ordenes.value = response.data.data;
        } else {
            ordenes.value = [response.data.data];
        }
    } catch (error) {
        console.error(error)
    }
}

// Llamar a la función al iniciar el componente
onMounted(obtenerOrdenesPendientes)

async function buscarOrdenesPorFecha() {
  ordenes.value = [];
  try {
    const data = {
      columna: columna.value,
      fecha1: fecha1.value,
      fecha2: fecha2.value
    };
    const response = await axios.post('http://18.223.116.149/api/orden/porfecha', data);
    if (Array.isArray(response.data.data)) {
            ordenes.value = response.data.data;
        } else {
            ordenes.value = [response.data.data];
        }
  } catch (error) {
    console.error('Hubo un error al realizar la búsqueda:', error);
  }
}


async function buscarOrdenesPorEstado() {
  ordenes.value = [];
  try {
    const data = {
      columna: columna.value
    };

    const response = await axios.post('http://18.223.116.149/api/orden/porestado', data);
    if (Array.isArray(response.data.data)) {
            ordenes.value = response.data.data;
        } else {
            ordenes.value = [response.data.data];
        }
  } catch (error) {
    console.error('Hubo un error al realizar la búsqueda:', error);
  }
}


</script>

<template>
  <div class="container">
    <transition name="fade">
    <div v-if="showModal" class="modal">
    </div>
</transition>
<div class="modal-content" v-if="showModal">
        <genord @close="activar"/>
      </div>
      <div class="modal-content" v-if="detal"> 
          <detaform/>
        </div>
        <transition name="fade">
    <div v-if="detal" class="modal">
    </div>
</transition>
    <div class="divi">
      <div class="titu">
         <h3>
          Ordenes de Compra
         </h3>
      </div>
      <div class="controls">
        <div class="tituor">
          <h4 class="tit">Buscar Orden</h4>
        </div>
        <div class="busca">
          <input class="search-box" type="date" id="payment-date" v-model="fecha1" :disabled="fechadesac"/>
          <h6></h6>
          <h6>a:</h6>
        <input class="search-box" type="date" id="payment-date" v-model="fecha2" :disabled="fechadesac"/>
          <btn class="btn" title="Buscar" @click="buscar"></btn>
           Por:
           <select class="search-box" id="filterBy" v-model="columna">
            <option :value=1>Fecha Compra</option>
            <option :value=2>Fecha Pago</option>
            <option :value=3>Pendiente</option>
            <option :value=4>Pagado</option>
          </select>
        </div>
        <div class="genor">
            <btn2 class="btn" title="Generar" @click="activar"></btn2>
          </div>
          <div class="titor">
            <h5>Generar Nueva Orden</h5>
          </div>
      </div>
      <span>Aquí se mostrarán todas las ordenes de compra pendientes por entregar:</span>
      <div class="pendien">
        <div class="columns">
          <div class="file">
            <h5>
              Fecha de compra
            </h5>
          </div>
          <div class="file">
            <h5>
              Fecha de pago
            </h5>
          </div>
          <div class="file">
            <h5>
              Proveedor
            </h5>
          </div>
          <div class="file">
            <h5>
              Estado de pago
            </h5>
          </div>
          <div class="file">
            <h5>
              Gestión
            </h5>
          </div>
        </div>
        <div class="regis">
          <ord 
        v-for="orden in ordenes"
        :FechaCompra="orden.fecha_compra"
        :FechaPago="orden.fecha_pago"
        :Proveedor="orden.proveedor"
        :Estado="orden.estado_pago"
        :key="orden.id"
        />
        </div>

      </div>
    </div>
  </div>
 
  </template>
  
  <style scoped>

  .deta{
    z-index: 110;
  }

.modal-content {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.modal {
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: center;
  z-index: 98;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* fondo negro semi-transparente */
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

 

  .file{
    display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-column: span 1;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0rem 4rem rgba(132, 139, 200, 0.18);
  }

  .columns{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    height: 8vh;
  }
  .tit{
    grid-column-start: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .filtra{
    grid-column-start: 3;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-around;
  }

  .titor{
    display: flex;
    align-items: flex-end;
    justify-content:flex-end;
    grid-row-start: 2;
    grid-column-start: 4;
  }
  
  .genor{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row-start: 3;
    grid-column-start: 4;
  }
  .tituor{
    display: grid;
    grid-template-columns: 50% 20% 30%;
    width: 100%;
    height: 100%;
    grid-column-start: 2;
    grid-row-start: 2;

  }

  .busca{
    grid-column-start: 2;
    grid-row-start: 3;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
      .search-box{
    font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  height: 3em;
  width: 11em;
  margin-right: -2rem;
  text-align: center;
  }
  .divi{
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 10% 25% 5% 55% 5%;

  }
   .container{
      display: flex;
      width: 100%;
      height: 100vh;
    }

    .controls{
      display: grid;
      grid-template-columns: 5% 65% 5% 20% 5%;
      grid-template-rows: 25% 20% 30% 25%;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      box-shadow: 0 1rem 4rem rgba(132, 139, 200, 0.18);
    }

    .regis{
      width: 100%;
      height: 100%;
      overflow:auto;
    }
    .regis::-webkit-scrollbar {
  width: 20px;
}

.regis::-webkit-scrollbar-track {
  background-color: white;
}

.regis::-webkit-scrollbar-thumb {
  background: #cfcfcf;
}
    .pendien{
      display: flex;
      grid-row-start: 4;
      border-radius: 15px;
      overflow:auto;
      box-shadow: 0 1rem 4rem rgba(132, 139, 200, 0.18);
      width: 100%;
      height: 100%;
      flex-direction: column;
      row-gap: 5%;
    }

    .titu{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .h4{
      align-items: center;
      justify-content: center;
    }
  </style>
  