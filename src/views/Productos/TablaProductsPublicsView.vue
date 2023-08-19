<template>
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
                <precios tittle1="$min" tittle2="$max" />
            </div>
            <div class="izquierdo">
                <div class="btns"></div>
                <btn2 @click="filtrar" title="Aplicar"/><btn2  id="black" @click="fetchData" title="Limpiar"/>
            </div>
        </div>
        <div class="table">
            <div class="headerTable">
                <h4>Nombre</h4>
                <h4>Stock</h4>
                <h4>Precio v</h4>
                <h4>IVA</h4>
                <h4>Status</h4>
            </div>
            <div class="cont-table">
                <div v-for="productos in productos" :key="productos.id">
                    <Rows :name="productos.nom_producto" :stock="productos.existencias" :priceV="productos.precio_venta" 
                     :iva="productos.iva"
                    :status="productos.estado" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Rows from '../../components/Tabla/RowTablesProducts.vue';
import search from '../../components/ControlesIndividuales/BuscarInterno.vue'
import encabezado from '../../components/Tabla/header.vue'
import add from '../../components/ControlesIndividuales/ingresar.vue'
// import btn2 from '../../components/ControlesIndividuales/BotonConEstilo.vue'
import precios from '../../components/ControlesIndividuales/RangoPrecioPublicos.vue'
import axios from 'axios'
import { ref, onMounted} from 'vue';
import {productosPublicosR} from '@/stores/counter.js'
import {StoreProdPublics} from '@/stores/counter.js'

const prodPublico = StoreProdPublics();
const productoPublico = productosPublicosR();
const productos = ref([])
const nombre = ref('');


const fetchData = async () =>{
    try{
        const response = await axios.get('http://web.backend.com/productosPublicos');
        productos.value = response.data.data;
        nombre.value =  response.data.data;

    } catch(error){
        console.log(error)
    }
}
onMounted(fetchData);


const filtrar = () =>{
    productos.value = productoPublico.state.variable
}
const onInput = () =>{
  productos.value = prodPublico.state.variable;
}


// Agregar un watcher para la variable "nombre"
// watch(nombre, (newValue) => {
//   buscar()
//   fetchData()
// });

</script>



<style scoped>
    

.btns{
    display: flex;
}

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
.izquierdo {
    display: flex;
    align-items: flex-end;
}

#black {
  background-color: black;
  color: white;
}

.rango {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.botones {
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

}


</style>
