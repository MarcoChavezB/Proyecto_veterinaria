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
const productos = ref({});
const tipo_producto = ref('');
const mostrar_precio = ref(true);
const mostrar_preview = ref(true);
const categorias = ref([]);
const mostrar_success = ref(false)
const mostrar_error = ref(false)
const mostrar_advertencia = ref(false)
const mensaje_error = ref('')
var estiloBoton = ref()

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
            
      } else {
            fetchData();
            
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
        console.log(response.data.data)

            if (response.data.data.data === true) {
                  try {
                        const responseAgregar = await axios.post('http://backend.vetcachorros.one/agregarProducto', data);
                        console.log(responseAgregar.data)
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