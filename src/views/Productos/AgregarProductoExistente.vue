<template>
  <div class="container-fluid">
    <div class="izquierdo">
      <div class="header">
        <p>Manage Product</p>
      </div>
      <div class="body">
        <div class="stock">
          <p>Añadir producto existente</p>
          <div class="inputs">
            <div class="inp">
              <span>NOMBRE DEL PRODUCTO</span>
              <input type="text" v-model="nombre_producto">
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
              <div class="input">
                <span>NOMBRE DEL PRODUCTO</span>
                <input type="text" v-model="nombre">
              </div>
              <div class="input">
                <span>DESCRIPCIÓN DEL PRODUCTO</span>
                <input type="text" v-model="descripcion">
              </div>
              <div class="input">
                <span>CATEGORÍA DEL PRODUCTO</span>
                <select @click="mostrar_categorias" name="categorias" id="2" v-model="categoria">
                  <option disabled selected value="">Selecciona una categorias</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.categoria">
                    {{ cat.categoria }}
                  </option>
                </select>
              </div>
              <div class="precios">
                <div class="input" v-if="mostrar_precio">
                  <span>PRECIO VENTA</span>
                  <input type="number" placeholder="$" v-model="precio_venta">
                </div>
                <div class="input">
                  <span>PRECIO COMPRA</span>
                  <input type="number" placeholder="$" v-model="precio_compra">
                </div>
                <div class="input">
                  <span>TIPO PRODUCTO</span>
                  <select @change="mostrar_tipo_producto" name="tipo" v-model="tipo_producto">
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
        </div>
        <div class="prod" v-for="prod in productos" :key="prod.id">
          <row :name="prod.nom_producto" :stock="prod.existencias" :status="prod.estado" />
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

//////////--------------MODIFICAR EL PRODUCTO-------------- ///////////

const fetchData = async () => {
  try {
    const response = await axios.get('http://backend.vetcachorros.one/productosPublicos');
    productos.value = response.data.data;
  } catch (error) {
    console.log(error)
  }
}

// verificar la existencia del producto
const verificacion = () => {
  if (nombre_producto.value === '' || cantidad_producto.value === '') {
    mensaje_error.value = 'Campos obligatorios'
    mostrarError.value = true
    setTimeout(() => {
      mostrarError.value = false
    }, 2000);

  } else {
    const verificarExistencia = async () => {
      try {
        const response = await axios.post('http://backend.vetcachorros.one/revisar_producto', { nombre_producto: nombre_producto.value });
        if (response.data.data.data === true) {
          mensaje_error.value = 'El producto no existe'
          mostrarError.value = true
          setTimeout(() => {
          mostrarError.value = false
          }, 2000);
        } else{
          
        }
      } catch (error) {
        alterCantProduct()
      }
    }
    verificarExistencia()
  }
}



const alterCantProduct = async () => {
  mensaje_success.value = `El producto ${nombre_producto.value} se actualizó`;
  mostrarSuccess.value = true
  setTimeout(() => {
    mostrarSuccess.value = false;
  }, 2000);
  const producto = ({
    nombre_producto: nombre_producto.value,
    cantidad_producto: cantidad_producto.value,
    tipo_producto: tipo_producto.value,
  })

  try {
    const response = await axios.post('http://backend.vetcachorros.one/alterProduct', producto);
    data.value = response.data.data;
    console.log(data.value);
  } catch (error) {
    console.log(error)
  }
}


const categoriasData = async () => {
  try {
    const response = await axios.get('http://backend.vetcachorros.one/categorias');
    categorias.value = response.data.data;
  }
  catch (error) {
    console.log(error)
  }
}


const prodInternos = async () => {
  try {
    const response = await axios.get('http://backend.vetcachorros.one/productosInternos');
    productos.value = response.data.data;
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
const info = ref([]);
const precio_compra = ref();

const alterProduct = async () => {
  const Alterproducto = ({
    nombre: nombre.value,
    descripcion: descripcion.value,
    categoria: categoria.value,
    precio_venta: precio_venta.value,
    precio_compra: precio_compra.value
  })
  console.log(Alterproducto);
  try {
    const response = await axios.post('http://backend.vetcachorros.one/dataProd', Alterproducto);
    info.value = response.data.data;
    console.log(Alterproducto)
  } catch (error) {
    console.log(error)
  }
}



onMounted(fetchData)
const editar = () => {

  if (nombre.value === '' || descripcion.value === '' || categoria.value === '' || precio_venta.value === '' || precio_compra.value === '') {
    mensaje_error.value = 'Campos obligatorios'
    mostrarError.value = true
    setTimeout(() => {
      mostrarError.value = false;
    }, 2000);
  } else {

    const verificarExistencia = async () => {
      try {
        const response = await axios.post('http://backend.vetcachorros.one/revisar_producto', { nombre_producto: nombre.value });
        if (response.data.data.data === true) {
          mensaje_error.value = 'El producto no existe'
          mostrarError.value = true
          setTimeout(() => {
          mostrarError.value = false
          }, 2000);
          
        } else{
          mensaje_success.value = 'El producto fue actualizado'
          mostrarSuccess.value = true;
          setTimeout(() => {
          mostrarSuccess.value = false;
          }, 2000);

          alterProduct();
        }
      } catch (error) {
        alterCantProduct()
      }
    }
    verificarExistencia()
  }
}
const mostrar_categorias = () => {
  categoriasData()
}

let intervalId;

const mostrar_tipo_producto = () => {
  clearInterval(intervalId);

  if (tipo_producto.value === 'interno') {
    mostrar_precio.value = false;

    intervalId = setInterval(prodInternos, 500);
    precio_venta.value = null;
    console.log(precio_venta.value)

  } else if (tipo_producto.value === 'venta') {
    mostrar_precio.value = true;
    intervalId = setInterval(fetchData, 500);
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
  align-items: flex-end;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  height: 4.2em;
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