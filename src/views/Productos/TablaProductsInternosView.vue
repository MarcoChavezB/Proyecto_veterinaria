<template>
  <div class="app">
    <div class="title">
      <encabezado />
    </div>
    <div class="app">
      <div class="controles">
        <div class="botones">
          <!-- Cada btn individual tiene su propia función stockLogic o sinStockLogic -->
          <search @input="onInput"/>
        <RouterLink :to="{name: 'AgregarProducto'}" class="custom-link">
            <add title="Add Item"/>
        </RouterLink>
        </div>
        <div class="rango">
          
        </div>
        <div class="izquierdo">
          <div class="btns"></div>
                <btn2 @click="filtrar" title="Aplicar"/> 
                <btn2 id="black"  @click="fetchData" title="Limpiar"/>
          </div>
      </div>
      <div class="table">
        <div class="headerTable">
          <h4>Nombre</h4>
          <h4>Stock</h4>
          <h4>Descripción</h4>
          <h4>Status</h4>
          <h4>Editar</h4>
        </div>
        <div class="cont-table">
          <div v-for="producto in productos" :key="producto.id" class="fila">
            <!-- Pasa las propiedades únicas a Rows -->
            <Rows @click="eliminarProd(producto.id)" :name="producto.nom_producto" :stock="producto.existencias" 
            :descripcion="producto.descripcion" 
             :status="producto.estado"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Rows from '../../components/Tabla/RowTablesInternos.vue'
import encabezado from '../../components/Tabla/header.vue'
import search from '../../components/ControlesIndividuales/BuscarPublicos.vue'
import add from '../../components/ControlesIndividuales/ingresar.vue'
// import btn2 from '../../components/ControlesIndividuales/BotonConEstilo.vue'
import axios from 'axios'
import {ref, onMounted} from 'vue'
import {useStore} from '@/stores/counter.js'
import {StoreProdInternos, deleteProdInter} from '@/stores/counter.js'

const prodInterno = StoreProdInternos();
const deleteProducto = deleteProdInter()
const store = useStore()
const productos = ref([])
const nombre = ref();


const fetchData = async () => {
  try {
    const response = await axios.get('http://backend.vetcachorros.one/productosInternos');
    productos.value = response.data.data;
     nombre.value =  response.data.data;
  } catch(error) {
    console.log(error)
  }
}

onMounted(fetchData);

const filtrar = () =>{
    productos.value = store.state.variable
}
const buscar = () =>{
  productos.value = prodInterno.state.variable;
  
}

const onInput = () =>{
    buscar();
}

const eliminarProd = (id) => {
    deleteProducto.setVariable(id)
    
};



</script>




<style scoped>


.izquierdo{
  display: flex;
  gap: 20px;
  margin-right: 100px;
}

.controles{
    display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1.1fr 1.6fr 0.8fr; 
  gap: 0px 0px; 
  height: 100px;
  width: 94%;
  margin-left: 50px;
}

.izquierdo{
    display: flex;
    align-items: flex-end;
}

.rango{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.botones{
    display: flex;
    gap: 40px;
    align-items: flex-end;
}

.headerTable {
    display: flex;
    justify-content: space-around;
    margin-top: 3em;
    margin-bottom: 2em;
    
}
span {
    color: #ffd800;
    
}

.app {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-rows: 1fr 5fr;
    gap: 0px 0px;
    width: 100%;
    height: 100vh;
}

#black{
  background-color: black;
  color: white;
}

.header {
    display: flex;
    justify-content: center;
    gap: 7em;
    margin-top: 3em;
}

h4 {
    font-size: 20px;
    cursor: pointer;
}


h3 {
    font-family: 'Comfortaa', cursive;
    font-size: 1.3em;
    color: #c2c5ce;
    margin-bottom: 1em;
    cursor: pointer;
}

strong {
    color: #818694;
    border-bottom: 3px solid #ffd800;
}

@media (max-width: 680px) {

  h3 {
    font-size: 1em;
    margin-bottom: 0.5em;
  }

  .controles {
    grid-template-columns: 1fr 1fr;
    gap: 10px 0;
    height: auto;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding: 0 10px;
  }


  #black {
    background-color: black;
    color: white;
  }

  .rango {
    justify-content: flex-start;
  }

  .botones {
    flex-direction: column;
    gap: 10px 0;
    align-items: flex-start;
  }

  .headerTable {
    justify-content: space-evenly;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .table{
    width: 40em;
  }

  /* .fila{

  } */
}


</style>
