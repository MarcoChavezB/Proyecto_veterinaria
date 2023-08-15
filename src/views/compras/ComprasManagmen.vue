<template>
    <div class="container-fluid">
        <div class="productos">
            <div class="title">
                <p class="titulo">Products</p>
            </div>
            <div class="controles">
                <search />
                <btn title="Añadir" @click="agregar" />
            </div>
            <div class="prod">
                <div class="cont-productos">
                  <producto @click="sumarCant(productoArray[0].id)" v-for="productoArray in productosEnPantalla" :key="productoArray[0].id"
                            :id="productoArray[0].existencias"  :name="productoArray[0].nom_producto" :precio="productoArray[0].precio_venta" />
                </div>
            </div>
        </div>
        <div class="izquierdo">

            <div class="seccion">

                <div class="cuerpo">
                    <div class="tiket">
                            <div class="total-orders">
                                <div class="fecha  d-flex justify-content-center align-items-center flex-column">
                                  <h2 class="num">{{ mesActual }}</h2>
                                  <p class="day">{{ diaActual }}</p>
                                </div>
                                <div class="info_prod">
                                    <div class="id-cita d-flex gap-3">
                                     <p>Id venta: </p> <h4>{{ tiketData.length > 0 ? tiketData[0].venta_id : '--' }}</h4>
                                    </div>
                                  <div class="tipo-pago d-flex gap-3">
                                    <p>Tipo de pago: </p> <h4>{{ metodo_pago }}</h4>
                                  </div>
                                  <div class="Products ">
                                    <h3>Productos</h3>

                                    <div class=" "  v-for="tiket in tiketData" :key="tiket.nombre_producto">
                                      <row_tiket_producto
                                          :nombre="tiket.nombre_producto"
                                          :cantidad="tiket.cantidad_vendida"
                                          :precio="tiket.precio_unitario"/>
                                    </div>
                                  </div>
                                  <div class="precios d-flex gap-5 m-3">
                                    <p>Monto Total: </p><h4>{{ tiketData.length > 0 ? tiketData[0].monto_total : '$---' }}</h4>
                                  </div>
                                </div>
                            </div>
                    </div>
                    <div class="btns">
                      <div class="mtdPago">
                        <btn class="bt" title="Efectivo" @click="declararEfectivo"/>
                        <btn class="bt" title="Mixto" @click="declararMixto"/>
                      </div>
                      <div class="term">
                        <btn capture class="bt" title="Transfer..." @click="declararTransferencia"/>
                        <btn id="black" title="Terminar" @click="terminar" />
                      </div>
                    </div>
                </div>
            </div>

            <div class="opciones">
                <div class="status">
                  <btn id="black" title="Limpiar" @click="reload" />
                  <successAlert name=" compra Realizada" v-if="mostrarSuccess"/>
                  <errorAlert name="Seleccione un tipo de pago" v-if="mostrarAlerta"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import producto from '../../components/compras/RowProdCompras.vue'
import btn from '../../components/controlesindividuales/BotonConEstilo.vue'
import search from '../../components/controlesindividuales/searchInput.vue'
import { ref } from 'vue'
import { useStore } from '@/stores/counter.js'
import axios from 'axios'
import {idProducto} from "@/stores/counter.js";
import {cantProducto} from "@/stores/counter.js";
import errorAlert from '../../components/Mensajes/BarAlertError.vue'
import successAlert from '../../components/Mensajes/BarAlertSuccess.vue'
import row_tiket_producto from '../../components/compras/RowTiketProd.vue'
const id_producto = idProducto();
const idProd = ref();
const mostrarAlerta = ref(false)
const mostrarSuccess = ref(false)

// CALL venta_productos('efectivo', '[ [1, 3], [2,4], [3,4]]');
const metodo_pago_total = ref('');
const productos_compra = ref([])

const cantidad = cantProducto();
const recibirCantidad = ref()
const cantidadesPorID = ref({}); // Objeto para rastrear cantidades por ID

// Función para incrementar la cantidad del producto específico
const sumarCant = (id) => {
  const producto = productosEnPantalla.value.find(item => item[0].id === id);
  if (producto) {
    producto.cantidad++;
    if (!cantidadesPorID.value[id]) {
      cantidadesPorID.value[id] = 1;
    } else {
      cantidadesPorID.value[id]++;
    }
  }
};


//const imprimir = () =>{
//  recibirCantidad.value = cantidad.state.variable
//}
//setInterval(imprimir, 1000)

const store = useStore()
const productosEnPantalla = ref([])
const precioTotal = ref(0)
const subTotal = ref(0)
const data = ref([])
const metodo_pago = ref('')
const productos_comprados = ref(0)

// METODO DE PAGO
const declararTransferencia = ()=>{
  metodo_pago.value = 'transferencia'
}

const declararEfectivo = ()=>{
  metodo_pago.value = 'efectivo'
}

const declararMixto = () =>{
  metodo_pago.value = 'mixto'
}

const datas = {
  tipo_pago: metodo_pago.value,
  productos: productos_compra.value

}


const agregar = () => {
  const newProduct = store.state.variable;
  newProduct.cantidad = recibirCantidad.value; // Agregar la cantidad al objeto del producto
  productosEnPantalla.value.push(newProduct);

  productos_comprados.value++;
  idProd.value = id_producto.state.variable;

  calcularSubtotal();
}


const calcularSubtotal = () => {
    let subtotal = 0;
    let iva = 0;
    let totalSinIva = 0;

    for (const productoArray of productosEnPantalla.value) {
        const precioVenta = parseFloat(productoArray[0].precio_venta);
        subtotal += isNaN(precioVenta) ? 0 : precioVenta;
    }

    iva = subtotal * 0.16;
    totalSinIva = subtotal - iva;
    subTotal.value = totalSinIva;
}
const tiketData = ref([])

const construirArregloProductos = () => {
  const arregloProductos = [];
  for (const id in cantidadesPorID.value) {
    arregloProductos.push([parseInt(id), cantidadesPorID.value[id]]);
  }
  return arregloProductos;
};

const reload = () =>{
  location.reload()
}
const terminar = async () => {
  console.log(cantidadesPorID.value);

  const productosInfo = construirArregloProductos();

  const productosString = productosInfo.map(([id, cantidad]) => `[${id}, ${cantidad}]`).join(', ');

  const jsonData = {
    metodo_pago: metodo_pago.value,
    productos: `[${productosString}]`
  };
  console.log(jsonData)

  if (jsonData.metodo_pago === ''){
    mostrarAlerta.value = true
    setTimeout(() => {
      mostrarAlerta.value = false;
    }, 4000);
  } else {

    try {
      const response = await axios.post('http://web.backend.com/venta', jsonData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    try {
      const GenerarTiket = await axios.get('http://web.backend.com/GenerarTiket');
      tiketData.value = GenerarTiket.data.data;
    } catch (error) {
      console.log(error);
    }
    mostrarSuccess.value = true
    setTimeout(() => {
      mostrarSuccess.value = false;
    }, 4000);
  }
};

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const fechaActual = new Date();

// Obtener el día y el mes de la fecha actual
const diaActual = fechaActual.getDate();
const mesActual = monthNames[fechaActual.getMonth()];

// 1 horas y minutos formato
// 2 solo año formato
// 3 mes con dia formato
// 4 solo dia
// 5 solo mes
const formatDate = (id, dateTimeString) => {
  if (!dateTimeString) {
    return '--';
  }
  switch (id) {
    case 1:
      const dateTime = new Date(dateTimeString);
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    case 2:
      const year = new Date(dateTimeString).getFullYear();
      return year.toString();
    case 3:
      const dateTimeMonth = new Date(dateTimeString);
      const month = dateTimeMonth.getMonth();
      const day = dateTimeMonth.getDate() + 1 ;

      const formattedDate = `${monthNames[month]}, ${day}`;
      return formattedDate;
    case 4:
      const dayOnly = new Date(dateTimeString).getDate() + 1;
      return dayOnly.toString();
    case 5:
      const monthOnly = new Date(dateTimeString).getMonth();
      return monthNames[monthOnly];
    default:
      return ' ';
  }
}


</script>



<style scoped>
/*  GENERAL */
.container-fluid {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1.1fr 0.5fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
}

h4 {
    font-size: 20px;
}
.id-cita{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.id-cita h4{
  color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 4em;
}

.Products{
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid rgba(132, 139, 200, 0.18);;
  height: 75%;
}

.Products h3{
  border-bottom: 1px dashed rgba(132, 139, 200, 0.18);;
  display: flex;
  justify-content: center;
}

.precios{
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed rgba(132, 139, 200, 0.18);;
  border-top: 1px dashed rgba(132, 139, 200, 0.18);;
}

.term{

  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}


/*  BODY */
.izquierdo {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1.1fr;
    grid-template-rows: 1.6fr 0.4fr;
    gap: 0px 0px;
    grid-template-areas:
        "."
        ".";
}


.controles {
    display: flex;
    gap: 100px;
    justify-content: center;
    align-items: center;
}

.title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    margin: 20px 0px 20px 0px;
    max-height: 3em;
}

.prod {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.cont-productos {
    width: 90%;
    max-height: 66em;
  overflow-y: auto;
    height: 90%;
}

.titulo {
    font-size: 20px;
}


/* IZQUIERDO */
.fecha{
  border: 1px solid rgba(132, 139, 200, 0.18);;
  border-radius: 20px;
}

.izquierdo {
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
}

.btns {
    width: 90%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.mtdPago{
  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}


#black {
    background-color: black;
    color: white;
}

.seccion {
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
}

.sec-titulo {
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
}


.cuerpo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tiket {
    width: 80%;
    height: 70%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

}

.total-orders {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 1fr 5fr;
  gap: 0px 0px;
  width: 100%;
  height: 35em;
}

/* Nombre */

.status {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 90%;
}

.input-container {
    position: relative;
}

.input {
    font-size: 1em;
    padding: 0.6em 1em;
    border: none;
    border-radius: 6px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    color: #333;
}

.input:hover {
    background-color: #f2f2f2;
}

.input:focus {
    outline: none;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input::placeholder {
    color: #999;
}

.highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #6c63ff;
    transition: width 0.3s ease;
}

.input:focus+.highlight {
    width: 100%;
}

/* Optional: Animation on focus */
@keyframes input-focus {
    from {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    }

    to {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}

/* Media query para tamaños pequeños (max-width: 680px) */
@media (max-width: 680px) {
  .container-fluid {
    grid-template-rows: 1fr 0.5fr;
    grid-template-columns: 1fr;
  }

  .productos {
    padding: 0.5rem;
  }

  .controles {
    flex-direction: row;
    justify-content: space-between;
  }

  .prod {
    margin-top: 1rem;
  }
}




</style>