 <template>
  <div class="search">
    <input v-model="nombre" type="text" class="search__input" placeholder="Buscar producto">
    <button class="search__button" @click="fetchData">
      <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
        </svg>
    </button>
  <div class="recomendaciones">
      <div class="producto" v-for="prod in productosBusqueda" :key="prod.id">
       <Row :name="prod.nom_producto" :stock="prod.estado"/>
  </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watch} from 'vue'
import {useStore} from '@/stores/counter.js'
import Row from '../tabla/ResultadosBusqueda.vue'
import {idProducto} from "@/stores/counter.js";

var nombre = ref('');
var productos = ref([]);
var productosBusqueda = ref([]);
const store = useStore()
const id_producto = idProducto();
const mostrar = ref(false);
const idProd = ref();


const fetchData = async () => {
  try {
    var response = await axios.get('http://18.223.116.149/api/productos/getProductos/existencias/' + nombre.value);
    productos.value = response.data.productos;
    productosBusqueda.value = response.data.productos;
    updateVariable();
  } catch (error) {
    console.log(error);
  }
}




const updateVariable = () =>{
  store.setVariable(productos)
  id_producto.setVariable(idProd)
}

// Agregar un watcher para la variable "nombre"
watch(nombre, (newValue) => {

  fetchData()
});

setInterval(() => {
    if (nombre.value === '') {
          productosBusqueda.value = '';
  } else {
    mostrar.value = true;
    productosBusqueda.value = '';
  }
}, 4000);
</script>


<style scoped>
.search {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

}
.recomendaciones{
  display: flex;
  justify-content: flex-start;
  flex-direction: column; 
  position: relative;
  z-index: 99999;
}
.search__input {
  font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 25em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;

}



.search__input:hover, .search__input:focus {
  box-shadow: 0 0 1em #00000013;
}

.search__input:focus {
  outline: none;
  background-color: #f0eeee;
}

.search__input::-webkit-input-placeholder {
  font-weight: 100;
  color: #ccc;
}

.search__input:focus + .search__button {
    background-color: transparent;
}

.search__button {
  border: none;
  background-color: transparent;
  margin-top: .1em;
}

.search__button:hover {
  cursor: pointer;
}


</style>