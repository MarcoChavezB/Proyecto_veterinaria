<template>
  <div class="container-fluid">
    <div class="izquierdo">
      <div class="header">
        <router-link class="custom-link" :to="{path: '/AgregarProducto'}">
        <span class="material-symbols-outlined">
          keyboard_backspace
        </span>
      </router-link>
        <p class="ti d-flex">Manage Product</p>
      </div>
      <div class="body">
        <div class="stock">
          <p>Añadir producto existente</p>
          <div class="inputs">
            <div class="inp">
              <span>NOMBRE DEL PRODUCTO</span>
              <input disabled type="text" v-model="nombre_producto">
            </div>
            <div class="inp">
              <span>CANTIDAD A AGREGAR</span>
              <input type="number" v-model="cantidad_producto">
            </div>
            <button @click="verificacion"><span>Agregar existencias</span></button>
          </div>
        </div>
        <div class="alter-product">
          <div class="top">
            <p>Alternar producto</p>
          </div>
          <div class="formulario">
            <div class="detalle-productos">
              <div class="input disabled-input">
                <span>NOMBRE DEL PRODUCTO</span>
                <input disabled type="text" v-model="nombre">
              </div>
              <div class="input">
                <span>DESCRIPCIÓN DEL PRODUCTO</span>
                <input type="text" v-model="descripcion" :placeholder="placeHolderDescripcion">
              </div>
              <div class="input">
                <span>CATEGORÍA DEL PRODUCTO</span>
                <select @click="categoriasData" name="categorias" id="2" v-model="categoria">
                  <option disabled selected value="">{{ categoria }}</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.categoria">
                    {{ cat.categoria }}
                  </option>
                </select>
              </div>
              <div class="precios">
                <div class="input" v-if="mostrar_precio">
                  <span>PRECIO VENTA</span>
                  <input type="number" :placeholder="placeHolderVenta" v-model="precio_venta">
                </div>
                <div class="input">
                  <span>PRECIO COMPRA</span>
                  <input type="number" :placeholder="placeHolderCompra" v-model="precio_compra">
                </div>
                <div class="input">
                  <span>TIPO PRODUCTO</span>
                  <select @change="mostrar_tipo_producto" name="tipo" v-model="tipo_producto" :placeholder="placeHolderTipo_producto">
                    <option value="venta">Venta</option>
                    <option value="interno">Interno</option>
                  </select>
                </div>
              </div>
              <button @click="editar"><span>Modificar producto</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="derecho">
      <div class="card-prod">
        <div class="title">
          <h3>Productos</h3>
        </div>
        <div class="header-table">
          <p>Nombre</p>
          <p>Stock</p>
          <p>Status</p>
          <p>Editar</p>
        </div>
        <div class="prod" v-for="prod in productos" :key="prod.id">
          <row @click="edit(prod.id)" :name="prod.nom_producto" :stock="prod.existencias" :status="prod.estado" />
        </div>
      </div>
      <div class="alertas">
        <barSuccess :name="mensaje_success" v-if="mostrarSuccess" />
        <barError :name="mensaje_error" v-if="mostrarError" />
      </div>
    </div>
  </div>
</template>

<script setup>
import row from '../../components/tabla/RowTablesProduct.vue'
import barSuccess from '../../components/Mensajes/BarAlertSuccess.vue'
import barError from '../../components/Mensajes/BarAlertError.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import {idProductoPublico, idProductoInterno} from '@/stores/counter.js'

const mandarSeñalEditar = idProductoPublico()
var resivirSeñalEditar = ref()
const mandarSeñarInterno = idProductoInterno()
var resivirSeñarInterno = ref()
const mostrarSuccess = ref(false)
const mostrarError = ref(false)
const mensaje_error = ref('')
const mensaje_success = ref('')
// MOSTRAR PRODUCTOS LATERAL
const productos = ref([])
const categorias = ref([])
const tipo_producto = ref();
const mostrar_precio = ref(true);
const nombre_producto = ref('');
const cantidad_producto = ref('');
const data = ref([]);
const placeHolderName = ref('')
const placeHolderDescripcion = ref('')
const placeHolderVenta = ref('$')
const placeHolderCompra = ref('$')
const placeHolderAlterProd = ref('')
const id_producto = ref()
//////////--------------MODIFICAR EL PRODUCTO-------------- ///////////

const editarProducto = () =>{
    resivirSeñalEditar.value = mandarSeñalEditar.state.variable;
    resivirSeñalEditar.value = mandarSeñarInterno.state.variable;
}

setInterval(() => {
  editarProducto()
}, 1000);

setTimeout(() => {
  productosPorID()
}, 1000);

const fetchData = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/productos/productosPublicos/index');
    productos.value = response.data.productos;
  } catch (error) {
    console.log(error)
  }
}


const edit = (id) =>{
  id_producto.value = id
  console.log(id_producto.value)
  editarProd()
}


// ! Editar producto 

const editarProd = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/productos/getProductoById/' + id_producto.value);
    const producto = response.data.producto
    const categoria = response.data.categoria

    // inicializar los placeHolders del producto en respuesta
    nombre.value = producto.nom_producto;
    nombre_producto.value = producto.nom_producto;
    placeHolderDescripcion.value = producto.descripcion;
    placeHolderVenta.value = producto.precio_venta;
    placeHolderCompra.value = producto.precio_compra;
    tipo_producto.value = producto.tipo_producto;
    placeHolderAlterProd.value = producto.nom_producto;  
    categoria.value = categoria.categoria;

  
  } catch (error) {
    console.log(error)
  }
}

// ejecucion del metodo al seleccionar editar desde la tabla general productos

const productosPorID = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/productos/getProductoById/' + resivirSeñalEditar.value);
    const producto = response.data.producto
    const categoria = response.data.categoria

    // inicializar los placeHolders del producto en respuesta
    nombre.value = producto.nom_producto;
    nombre_producto.value = producto.nom_producto;
    placeHolderDescripcion.value = producto.descripcion;
    placeHolderVenta.value = producto.precio_venta;
    placeHolderCompra.value = producto.precio_compra;
    tipo_producto.value = producto.tipo_producto;
    placeHolderAlterProd.value = producto.nom_producto;  
    categoria.value = categoria.categoria;
} catch (error) {
  console.log(error);
}
  
};



// verificar la existencia del producto
const verificacion = async () => {
  if (nombre_producto.value === '' || cantidad_producto.value === '') {
    mensaje_error.value = 'Cantidad minima a agregar: 1'
    mostrarError.value = true
    setTimeout(() => {
      mostrarError.value = false
    }, 2000);

  } else {
      try {
        const response = await axios.get('http://18.223.116.149/api/productos/existe/' + nombre.value)
        console.log(response.data.exist)
        if (response.data.exist === false) {

          mensaje_error.value = 'El producto no existe'
          mostrarError.value = true
          setTimeout(() => {
          mostrarError.value = false
          }, 2000);
        } else{
          alterCantProduct();
        }
      } catch (error) {
        console.log(error)
      }
    }
  }




const alterCantProduct = async () => {
  const producto = ({
    nombre_producto: nombre_producto.value,
    cantidad_producto: cantidad_producto.value,
  })
  try {
    const response = await axios.post('http://18.223.116.149/api/productos/update/one', producto);
    data.value = response.data.message;
    mensaje_success.value = `El producto ${nombre_producto.value} se actualizó`;
    mostrarSuccess.value = true
    setTimeout(() => {
      mostrarSuccess.value = false;
    }, 2000);

  } catch (error) {
    console.log(error)
  }
}


const categoriasData = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/productos/getCategorias');
    categorias.value = response.data.categorias;
  }
  catch (error) {
    console.log(error)
  }
}


//////////-------------- Seleccionar el tipo de producto a un costado-------------- ///////////

const prodInternos = async () => {
  try {
    const response = await axios.get('http://18.223.116.149/api/productos/productosInternos/index');
    productos.value = response.data.productos;
  }
  catch (error) {
    console.log(error)
  }
}


//////////--------------MODIFICAR EL PRODUCTO Existente-------------- ///////////

const nombre = ref();
const descripcion = ref();
const categoria = ref('');
const precio_venta = ref();
const precio_compra = ref();

const alterProduct = async () => {
  const infoAlter = ({
    nombre: nombre.value,
    descripcion: descripcion.value,
    categoria: categoria.value,
    precio_venta: precio_venta.value,
    precio_compra: precio_compra.value,
    tipo_producto: tipo_producto.value,
  })

  try {
    const response = await axios.put('http://18.223.116.149/api/productos/update', infoAlter)
    showAlert('success', response.data.message)
  } catch (error) {
    showAlert('error', error.response.data.message)
  }
}



onMounted(fetchData)

const editar = async () => {
    try {
        const response = await axios.get('http://18.223.116.149/api/productos/existe/' + nombre.value)
        // no existe el producto
        if (response.data.exist === false) {
          showAlert('error', 'El producto no existe')

          // Existe el producto
        } else {
          alterProduct()
        } 
    } catch (error) {
      
    }
}



let intervalId;

const mostrar_tipo_producto = () => {
  clearInterval(intervalId);

  if (tipo_producto.value === 'interno') {
    mostrar_precio.value = false;

    intervalId = setInterval(prodInternos, 500);
    precio_venta.value = null;
    

  } else if (tipo_producto.value === 'venta') {
    mostrar_precio.value = true;
    intervalId = setInterval(fetchData, 500);
  }
}




const showAlert = (type, message) =>{
  if (type === 'success') {
    mensaje_success.value = message
    mostrarSuccess.value = true
    setTimeout(() => {
      mostrarSuccess.value = false
    }, 2000);
  } else if (type === 'error'){
    mensaje_error.value = message
    mostrarError.value = true
    setTimeout(() => {
      mostrarError.value = false
    }, 2000);
  }
}
</script>

<style scoped>
.container-fluid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1.4fr 1fr;
  gap: 0px 0px;
}

.prod {
  height: 5em;
}

.izquierdo {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 0px 0px;
  grid-template-areas:
    "."
    ".";
  height: 82%;
}

.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  height: 4.2em;
}

.header span{
  cursor: pointer;
}

.header p {
  font-size: 20px;
  margin-left: 17px;
}

.card-prod {
  width: 100%;
  height: 100vh;
  border-radius: 15px 0px 0px 15px;
  overflow-y: auto;
}

.disabled-input input{
  cursor: not-allowed;
}

.title {
  height: 4.12em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  background-color: white;
}


.header-table {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.formulario {
  height: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detalle-productos {
  width: 80%;
}

.body {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 0.6fr 1.4fr;
  gap: 0px 0px;
  grid-template-areas:
    "."
    ".";
}

.stock p:first-child {
  margin-top: 2em;
  width: 100%;

}

.stock {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
}

.inputs {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 80%;

}


.inputs .inp:nth-child(2) input {
  width: 50%;
}

.inputs .inp:first-child input {
  cursor: not-allowed;
}



input {
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

.inp {
  display: flex;
  flex-direction: column;
}

.ti{
  height: 70%;
  justify-content: center;
  align-items: flex-end;
}

.inp span,
.input span {
  font-size: 13px;
  color: #898c8f;
}

.input {
  display: flex;
  flex-direction: column;
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


select option {
  font-size: 14px;
  color: #333;
}</style>