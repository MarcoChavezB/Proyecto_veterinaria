<template>
      <div class="cont">
            <div class="header">
                  <router-link class="custom-link" :to="{path: '/productos'}">
        <span class="material-symbols-outlined">
          keyboard_backspace
        </span>
      </router-link>
      <p class="ti d-flex">Manage Product</p>
            </div>
            <div class="body">
                  <div class="checkout">
                        <div class="cuerpo">
                              <div class="header-check">
                                    <div class="title">
                                          <div class="g">
                                                <h3>AGREGAR PRODUCTO NUEVO</h3>
                                                <p>Se agregará un producto no existente</p>
                                          </div>
                                          <div class="more">
                                                <RouterLink :to="{ name: 'add' }" class="custom-link">
                                                      <add title="Existente" :class="estiloBoton"/>
                                                </RouterLink>
                                          </div>
                                    </div>
                              </div>
                              <div class="detalle-productos">
                                    <div class="input">
                                    <span>NOMBRE DEL PRODUCTO</span>
                                    <input type="text" v-model="nombre_producto"/>
                                    <div class="input">
                                          <span>DESCRIPCIÓN DEL PRODUCTO</span>
                                          <input type="text" v-model="descripcion_producto">
                                    </div>
                              </div>

                                    <div class="input">
                                          <span>CATEGORÍA DEL PRODUCTO</span>
                                          <select @click="categoriasData" name="categorias" id="2"
                                                v-model="categoria_producto">
                                                <option disabled selected value="">Selecciona una categoria</option>
                                                <option v-for="cat in categorias" :key="cat.id" :value="cat.categoria">
                                                      {{ cat.categoria }}
                                                </option>
                                          </select>
                                    </div>
                                    <div class="precios">
                                          <div class="input" v-if="mostrar_precio">
                                                <span>PRECIO DE VENTA</span>
                                                <input type="number" v-model="precio_venta" placeholder="$">
                                          </div>

                                          <div class="input">
                                                <span>PRECIO COMPRA</span>
                                                <input type="number" v-model="precio_compra" placeholder="$">  
                                          </div>

                                          <div class="input">
                                                <span>CANTIDAD DE PRODUCTOS</span>
                                                <input type="number" v-model="cantidad_pructos" placeholder="0">    
                                          </div>

                                          <div class="input">
                                                <span>TIPO DE PRODUCTO</span>
                                                <select @change="seleccionTipoProducto" name="tipoProducto" id="2"
                                                      v-model="tipo_producto">
                                                      <option value="venta">Producto de venta</option>
                                                      <option value="interno">Poducto Interno</option>
                                                </select>
                                          </div>
                                    </div>
                                    <button @click="verify"><span>Agregar producto</span></button>
                              </div>
                        </div>
                  </div>
                  <!-- ------------ -->
                  <div class="alertas">
                        <AlertError v-if="mostrar_error" :name="mensaje_error"/>
                        <AlertSucces v-if="mostrar_success" name="Se agrego el producto"/>
                        <BarAlertAdvertencia v-if="mostrar_advertencia"/>
                  </div>
                  <!-- ------------ -->
            </div>
      </div>
</template>

<script setup>
import add from '../../components/ControlesIndividuales/ingresar.vue'
import AlertSucces from '../../components/Mensajes/BarAlertSuccess.vue'
import AlertError from '../../components/Mensajes/BarAlertError.vue'
import BarAlertAdvertencia from '../../components/Mensajes/BarAdvertencia.vue'
import { ref } from 'vue'

import axios from 'axios'


const nombre_producto = ref('');
const descripcion_producto = ref('');
const precio_venta = ref('');
const precio_compra = ref('');
const categoria_producto = ref('');
const cantidad_pructos = ref('');
const tipo_producto = ref('');
const mostrar_precio = ref(true);
const mostrar_preview = ref(true);
const categorias = ref([]);
const mostrar_success = ref(false)
const mostrar_error = ref(false)
const mostrar_advertencia = ref(false)
const mensaje_error = ref('')
var estiloBoton = ref()
const errorMessages = ref([]);
const productoExiste = ref(false);  


const showAlert = (type, message) =>{
      if (type === 'error'){
            mostrar_error.value = true
            mensaje_error.value = message

            setTimeout(() => {
                  mostrar_error.value = false
            }, 3000)
      }else if (type === 'success'){
            mostrar_success.value = true
            mensaje_error.value = message

            setTimeout(() => {
                  mostrar_success.value = false
            }, 3000)
      }
}

const verify = async () => {
  await existProduct(); 

  console.log(productoExiste.value);
  if (productoExiste.value) {
      showAlert('error', 'El producto ya existe');
      return 
  } 

  // Campos vacíos 
  if (
    nombre_producto.value === '' ||
    descripcion_producto.value === '' ||
    precio_compra.value === '' ||
    cantidad_pructos.value === '' ||
    categoria_producto.value === '' ||
    tipo_producto.value === ''
  ) {
      showAlert('error', 'Todos los campos son requeridos');
      return
  }

//   Campos numéricos
  if (
    isNaN(precio_compra.value) ||
    isNaN(cantidad_pructos.value) ||
    isNaN(precio_venta.value)
  ) {
      showAlert('error', 'Los campos de precio y cantidad deben ser numéricos');
      return
  }

 await fetchData();
};

const fetchData = async () => {
      console.log("entro")
 
  if (!mostrar_error.value) {

    const data = {
      nom_producto: nombre_producto.value,
      descripcion: descripcion_producto.value,
      tipo_producto: tipo_producto.value,
      existencias: cantidad_pructos.value,
      precio_venta: precio_venta.value,
      precio_compra: precio_compra.value,
      categoria_producto: categoria_producto.value,
    };

    try {
      const response = await axios.post('http://18.223.116.149/api/productos/store', data);
      console.log(response.data);
      showAlert('success', 'Se agrego el producto');
      resetErrors();
    } catch (error) {
      console.log(error);
    }
  }
};

const existProduct = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/productos/existe/' + nombre_producto.value);
    productoExiste.value = response.data.exist;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const categoriasData = async () => {
      try {
            const response = await axios.get('http://18.223.116.149/api/productos/getCategorias');
            categorias.value = response.data.categorias;
      }
      catch (error) {
            console.log(error.data.errors)
      }
}

const seleccionTipoProducto = () => {
      if (tipo_producto.value === 'interno') {
            mostrar_precio.value = false
            mostrar_preview.value = false
      } else if (tipo_producto.value === 'venta') {
            mostrar_precio.value = true
            mostrar_preview.value = true
      }
}
</script>

<style scoped>

.boton-normal {
    background-color: black;
    color: white;
    animation: parpadeo 1s infinite;
  }

  @keyframes parpadeo {
    0%, 100% {
      background-color: black;
    }
    50% {
      background-color: white;
    }
  }

.cont {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-rows: 0.0fr 1.9fr;
      gap: 0px 0px;
      width: 100%;
      height: 100vh;
}


.body {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-columns: 1.3fr 0.7fr;
      grid-template-rows: 1.7fr;
      gap: 0px 0px;
      grid-template-areas:
            ". .";
}

.header {
      margin-left: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  height: 4.2em;
}

.header span{
  cursor: pointer;
}

.custum-file-upload input {
      display: none;
}

.header p {
      font-size: 20px;
      margin-left: 17px;
}

/* IZQUIERDO */

.checkout {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
}

.carta {
      padding: 20px;
      width: 90%;
      min-height: 370px;
      border-radius: 20px;
      background: whitesmoke;
      transition: 0.4s;
}

.carta:hover {
      translate: 0 -10px;
}

.carta-title {
      font-size: 18px;
      font-weight: 600;
      color: #b2eccf;
      margin: 15px 0 0 10px;
}



.carta-body {
      margin: 13px 0 0 10px;
      color: rgb(184, 184, 184);
      font-size: 15px;
}

.footer {
      float: right;
      margin: 28px 0 0 18px;
      font-size: 13px;
      color: #b3b3b3;
}

.by-name {
      font-weight: 700;
}

.more {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
}


.title h3 {
      margin-bottom: 20px;
}

.caracteristicas span {
      display: flex;
      justify-content: space-between;
}

.carta {
      height: 60%;
}

.title {
      margin-bottom: 20px;
}

.header-check .title {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 0px 0px;
}

.cuerpo {
      width: 70%;
      height: 90%;
}

.header-check {
      display: flex;
      border-bottom: 1px solid rgba(132, 139, 200, 0.18);
      width: 100%;
      margin-bottom: 30px;
}
.ti{
  height: 70%;
  justify-content: center;
  align-items: flex-end;
}
.data {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1.7fr;
      gap: 0px 0px;
      grid-template-areas:
            ". .";
      margin-top: 20px;
}

.precios {
      display: grid;
      grid-auto-columns: 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1.7fr;
      gap: 0px 20px;
      grid-template-areas:
            ". .";
      width: 100%;
}

.precios input {
      width: 100%;
}

.input {
      display: flex;
      flex-direction: column;
}

.precios input {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: 1px solid #ccc;
      padding: 8px;
      font-size: 14px;
      width: 100%;
      margin-bottom: 20px;
      border-radius: 5px;
}

.detalle-productos input {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: 1px solid #ccc;
      padding: 8px;
      font-size: 14px;
      width: 100%;
      margin-bottom: 20px;
      border-radius: 5px;
}

.input span {
      font-size: 13px;
      color: #898c8f;
}


button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: none;
      padding: 14px 20px;
      font-size: 16px;
      background-color: #4cb8a8;
      color: #333;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 20px;
}

button span {
      font-size: 15px;
      color: white;
}


select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: 1px solid #ccc;
      padding: 8px;
      font-size: 14px;
      background-color: white;
      color: #333;
      cursor: pointer;
      margin-bottom: 10px;
}


.container-img {
      display: flex;
      align-items: center;
      width: 100%;
      height: 90vh;
}
</style>