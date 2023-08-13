<script setup>
  import {  ref, onMounted, watch   } from 'vue';
  import axios from 'axios';
  import btn from '../../components/ControlesIndividuales/BotonAntho.vue'
  import load from '../../components/loaders/loaderPrincipal.vue'
  const tipo = ref(1);
  const loading =ref(false);
  const productos = ref([]);
  const productosSeleccionados = ref([]);
  const detallar = ref(false);
  const nombre =ref('');
  const desc =ref('');
  const precio =ref(0);
  const search = ref('')


  const emi = defineEmits(['close']);

  const cerra = () =>{
    emi('close')
  }

  const checkCantidad = (producto) => {
    producto.puedeSeleccionar = producto.cantidad > 0;
    if (producto.cantidad <= 0) {
        producto.seleccionado = false;
        const index = productosSeleccionados.value.findIndex(p => p.id === producto.id);
        if (index !== -1) {
            productosSeleccionados.value.splice(index, 1);
        }
    }
    if (!producto.puedeSeleccionar && producto.seleccionado) {
        producto.seleccionado = false;
    }
};


  const agregarAlArray = (producto) => {
  if (producto.seleccionado) {
    productosSeleccionados.value.push({
      id: producto.id,
      cantidad: producto.cantidad
      });
  } else {
    const index = productosSeleccionados.value.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      productosSeleccionados.value.splice(index, 1);
    }
  }
  console.log(productosSeleccionados)
};



const sendPostRequest = async () => {
  loading.value=true;
  try {
    const jsonData = {
      nombre_TServicio: nombre.value,
      id_servicio: tipo.value,
      descripcion: desc.value,
      precio: precio.value,
      estado: 'no publico',
      productos: productosSeleccionados.value,
    };
    const response = await axios.post('http://web.Backend.com/agregarservicioproduct', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status === 200){
         detallar.value = true;
         productosSeleccionados.value = [];
         tipo.value = 1;
         nombre.value= "";
         desc.value="";
         precio.value= 0;
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  loading.value=false;
};

const obtenerproductos = async () => {
    try {
        const response = await axios.get('http://web.Backend.com/productos/all')
        if (Array.isArray(response.data.data)) {
            productos.value = response.data.data;
        } else {
            productos.value = [response.data.data];
        }
    } catch (error) {
        console.error(error)
    }
}

const productocadena = async () => {
    productos.value = [];
    try {
      const data = {
      cadena: search.value,
    };
        const response = await axios.post('http://web.Backend.com/productoxcadena', data)
        if (Array.isArray(response.data.data)) {
            productos.value = response.data.data;
        } else {
            productos.value = [response.data.data];
        }
    } catch (error) {
        console.error(error)
    }
}

obtenerproductos();

</script>

<template>  
    <div class="card">
      <transition name="fade">
      <div class="display2" v-if="loading">
        <load v-if=loading class="loader"/>
        <h2>Generando...</h2>
      </div>
      </transition>
      <div class="grilla" v-if=!loading>
        <button class="cerrar" @click="cerra" >X</button>
        <div class="form">
          <span v-if="detallar" class="mensaje">¡Servicio registrado correctamente!</span>
          <h2>Crear Nuevo Servicio</h2>
      <label for="payment-date" >Nombre:</label>
      <input class="search-box" type="text" v-model="nombre"/>
      <br/>
      <label>Descripcion:</label>
      <input class="search-boxx" type="text" v-model="desc"/>
      <br />
      <label>Precio:</label>
      <input type= "number" class="search-box" v-model="precio" >
      <br />
      <label for="status">Tipo de Servicio:</label>
      <select class="search-box" id="1" v-model="tipo">
        <option value="1">Clinico</option>
        <option value="2">Estetico</option>
      </select>
      <br>
      <span>Elige los productos para el servicio:</span>
      <div class="search">
    <input :type="inputType" class="search__input" v-model="search" placeholder="Buscar producto..." @input="productocadena">
    <button class="search__button" @click="buscar">
        <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
    </button>
    <br>
         </div>
        <div class="combo">
          <div class="select" v-for="producto in productos" :key="producto.id">
            <input class="he2" :disabled="!producto.puedeSeleccionar" type="checkbox" v-model="producto.seleccionado" @change="agregarAlArray(producto)" />
            <span>{{ producto.nom_producto }}</span>
            <input class="he1" type="number" v-model="producto.cantidad" placeholder="Cantidad" @input="checkCantidad(producto)" />
        </div>
      </div>
      <btn title="Crear Servicio" @click="sendPostRequest"/>
        </div>
      </div>
    </div>

</template>

<style scoped>

.he2{
  width: 3vh;
  height: 3vh;
  border: none;
  box-shadow: 0 0 1em #00000013;
border-radius: 10px;

}
.he1{
  border: none;
  border-radius: 30px;
  height: 4vh;
  width: 30vh;
  box-shadow: 0 0 1em #00000013;
  text-align: center;
}
.mensaje{
  color: rgb(0, 192, 0);
}
.cerrar{
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 2em #00000013;
  grid-column-start: 1;
  grid-row-start: 1;
  border: none;
  background-color: #00000000;
}

.loader{
  position: relative;
    z-index: 105;
    width: 25%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.display2{
  background-color: rgba(95, 95, 95, 0.4);
  height: 100%;
  width: 100%;
  z-index: 103;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.form{
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 2;
  display: grid;
  row-gap: 8px;  
}
    .grilla{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 30% 50% 20%;
      grid-template-rows: 10% 70% 20%;
    }
    .card {
      font-family: 'comfortaa';
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90vh;
      overflow-y: auto;
      overflow-x: hidden;
      width: 45%;
      box-shadow: 0 0 2em #00000013;
      border: none;
      border-radius: 20px;
    }
    .card::-webkit-scrollbar {
  width: 10px;
}

.card::-webkit-scrollbar-track {
  background-color: white;
}

.card::-webkit-scrollbar-thumb {
  background: #cfcfcf;
}
  
    @media (max-width: 950px) {
      .card{
        width: 65%;
        height: 80vh;
      }
      .grilla{
        grid-template-columns: 20% 70% 10%;
      }
    }

    .search-box{
    font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 17em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
  text-align: center;
  }

  .search-boxx{
    font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 17em;
  transition: all ease-in-out .5s;
  margin-right: -2rem;
  text-align: left;
  height: 8vh;
  }
  

  .select{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2em #00000041;
  border-radius: 20px;
  height: 20vh;
}

.combo{
  width: 100%;
  height: 35vh;
  overflow: scroll;
  box-shadow: 0 0 2em #00000015;
  display: flex;
  flex-direction: column;
  row-gap: 15%;
  border-top: 20px;
}

.combo::-webkit-scrollbar {
  width: 15px;
}

.combo::-webkit-scrollbar-track {
  background-color: white;
}

.combo::-webkit-scrollbar-thumb {
  background: #cfcfcf;
}
.search__input {
  font-family: inherit;
  font-size: inherit;
  box-shadow: 0 0 1em #00000013;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 100%;
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

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #b4b4b4;
}




</style>