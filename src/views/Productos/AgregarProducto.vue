<template>
      <div class="cont">
            <div class="header">
                  <p>Manage Product</p>
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
                                          <input type="text" v-model="nombre_producto">
                                    </div>
                                    <div class="input">
                                          <span>DESCRIPCIÓN DEL PRODUCTO</span>
                                          <input type="text" v-model="descripcion_producto">
                                    </div>
                                    <div class="input">
                                          <span>CATEGORÍA DEL PRODUCTO</span>
                                          <select @click="mostrar_categorias" name="categorias" id="2"
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
                                    <button @click="validar"><span>Agregar producto</span></button>
                              </div>
                        </div>
                  </div>
                  <!-- ------------ -->

                  <div class="container-img">
                        <div class="carta">
                              <div class="carta-image" :style="{ backgroundImage: `url('${imagenCargada}')` }">
                                    <label class="custum-file-upload" for="file" v-if="mostrar_img">
                                          <div class="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                                      <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                                                      <g stroke-linejoin="round" stroke-linecap="round"
                                                            id="SVGRepo_tracerCarrier"></g>
                                                      <g id="SVGRepo_iconCarrier">
                                                            <path fill=""
                                                                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                                                  clip-rule="evenodd" fill-rule="evenodd"></path>
                                                      </g>
                                                </svg>
                                          </div>
                                          <div class="text">
                                          </div>
                                          <input type="file" id="file" @change="cargarImagen">
                                    </label>
                              </div>
                              <div class="contenido">
                                    <h4>{{ nombre_producto ?? 'Nombre' }}</h4>
                                    <div class="caracteristicas">
                                          <span>
                                                <p>Categoría</p>
                                                <p>{{ categoria_producto ?? 'Categoría' }}</p>
                                          </span>
                                          <span>
                                                <p> Descripción</p>
                                                <p>{{ descripcion_producto ?? 'Descripción' }}</p>
                                          </span>
                                          <span>
                                                <p> Precio venta</p>
                                                <p>${{ precio_venta ?? '0' }}</p>
                                          </span>
                                    </div>
                              </div>
                        </div>
                        <AlertSucces name="Producto agregado correctamente" v-if="mostrar_success" />
                        <AlertError :name="mensaje_error" v-if="mostrar_error" />
                        <BarAlertAdvertencia name='Vaya a "Existente" para agregar un producto ya existente.'
                              v-if="mostrar_advertencia" />
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
const productos = ref({});
const tipo_producto = ref('');
const mostrar_precio = ref(true);
const mostrar_preview = ref(true);
const categorias = ref([]);
const mostrar_img = ref(true)
const mostrar_success = ref(false)
const mostrar_error = ref(false)
const mostrar_advertencia = ref(false)
const mensaje_error = ref('')
const imagenCargada = ref('');
var estiloBoton = ref()

const cargarImagen = (event) => {
      const file = event.target.files[0];
      if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                  imagenCargada.value = reader.result;
                  mostrar_img.value = false
            };
            reader.readAsDataURL(file);
      }
};

const validar = () => {
      if (
            nombre_producto.value === '' ||
            descripcion_producto.value === '' ||
            tipo_producto.value === '' ||
            cantidad_pructos.value === '' ||
            precio_venta.value === '' ||
            precio_compra.value === '' ||
            categoria_producto.value === ''
      ) {
            mensaje_error.value = 'Datos obligatorios';
            mostrar_error.value = true;
            setTimeout(() => {
                  mostrar_error.value = false;
            }, 2000);
            console.log(1);
      } else {
            fetchData();
            console.log(2);
      }
};


const fetchData = async () => {
    const data = {
        nombre_producto: nombre_producto.value,
        descripcion_producto: descripcion_producto.value,
        tipo_producto: tipo_producto.value,
        cantidad_pructos: cantidad_pructos.value,
        precio_venta: precio_venta.value,
        precio_compra: precio_compra.value,
        categoria_producto: categoria_producto.value,
    };

    try {
        const response = await axios.post('http://backend.vetcachorros.one/revisar_producto', { nombre_producto: nombre_producto.value });
        console.log(response.data);

            if (response.data.data.data === true) {
                  try {
                        const responseAgregar = await axios.post('http://backend.vetcachorros.one/agregarProducto', data);
                        productos.value = responseAgregar.data.data;
                        mostrar_success.value = true;
                        setTimeout(() => {
                              mostrar_success.value = false;
                        }, 2000);
                  } catch (error) {
                        console.log(error);
                  }
            }else {
                  mensaje_error.value = 'Producto ya existente'
                  mostrar_error.value = true;
                  setTimeout(() => {
                        mostrar_error.value = false;
                        mostrar_advertencia.value = true
                        estiloBoton.value = 'boton-normal';
                        setTimeout(() => {
                              mostrar_advertencia.value = false
                              estiloBoton.value = '';
                        }, 3000);
                  }, 3000);
            } 
            
    } catch (error) {
        console.log(error);
        mensaje_error.value = 'Error en el servidor';
            mostrar_error.value = true;
            setTimeout(() => {
                  mostrar_error.value = false;
            }, 2000);
    }
};



const categoriasData = async () => {
      try {
            const response = await axios.get('http://backend.vetcachorros.one/categorias');
            categorias.value = response.data.data;
      }
      catch (error) {
            console.log(error)
      }
}



const mostrar_categorias = () => {
      categoriasData()
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
      display: flex;
      align-items: flex-end;
      border-bottom: 1px solid rgba(132, 139, 200, 0.18);
      height: 4.2em;
}

.carta-image {
      width: 100%;
      /* Ajusta el ancho según tus necesidades */
      height: 300px;
      /* Ajusta la altura según tus necesidades */
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 10px;
      /* Otros estilos que puedas necesitar */
}

.custum-file-upload {
      height: 14rem;
      width: 100%;
      margin-bottom: 1rem;
      max-height: 14rem;
      display: flex;
      flex-direction: column;
      align-items: space-between;
      gap: 20px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border: 2px dashed #cacaca;
      background-color: rgba(255, 255, 255, 1);
      background-size: contain;
      background-repeat: no-repeat;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
}

.custum-file-upload .icon {
      display: flex;
      align-items: center;
      justify-content: center;
}

.custum-file-upload .icon svg {
      height: 80px;
      fill: rgba(75, 85, 99, 1);
}

.custum-file-upload .text {
      display: flex;
      align-items: center;
      justify-content: center;
}

.custum-file-upload .text span {
      font-weight: 400;
      color: rgba(75, 85, 99, 1);
}

.contenido {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 100%;
      height: 55%;
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