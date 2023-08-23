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

            <div class="seon">

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

                                    <div v-for="tiket in tiketData" :key="tiket.nombre_producto">
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
                        <notifi capture class="bt transferencia" notifi="Transferencia" title="Transfer..." @click="declararTransferencia"/>
                        <btn id="black" title="Terminar" @click="terminar" />
                      </div>
                    </div>
                </div>
            </div>

            <div class="opciones">
                <div class="status">
                  <div class="btns d-flex justify-content-center">
                    <btn id="black" title="Limpiar" @click="reload" />
                    <btn id="red" title="Cancelar" @click="cancelarCompra" />
                  </div>
                  <successAlert :name="mensaje_success" v-if="mostrarSuccess"/>
                  <errorAlert :name="mensaje_error" v-if="mostrarAlerta"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import producto from '../../components/compras/RowProdCompras.vue'
import btn from '../../components/controlesindividuales/BotonConEstilo.vue'
import search from '../../components/controlesindividuales/searchInput.vue'
import notifi from '../../components/controlesindividuales/BtnConNotificacion.vue'
import { ref } from 'vue'
import { useStore } from '@/stores/counter.js'
import axios from 'axios'
import {idProducto} from "@/stores/counter.js";
import {cantProducto, deleteProduct} from "@/stores/counter.js";
import errorAlert from '../../components/Mensajes/BarAlertError.vue'
import successAlert from '../../components/Mensajes/BarAlertSuccess.vue'
import row_tiket_producto from '../../components/compras/RowTiketProd.vue'



const productoEliminado = deleteProduct()
const deleteProd = ref();

const id_producto = idProducto();
const idProd = ref();
const mostrarAlerta = ref(false)
const mostrarSuccess = ref(false)
const mensaje_error = ref('')
const mensaje_success = ref('')
let funcionEjecutada = false;

// CALL venta_productos('efectivo', '[ [1, 3], [2,4], [3,4]]');
const metodo_pago_total = ref('');
const productos_compra = ref([])

const cantidad = cantProducto();
const recibirCantidad = ref(0)
const cantidadesPorID = ref({});

// Función para incrementar la cantidad del producto específico
const sumarCant = (id) => {
  recibirCantidad.value = cantidad.state.variable
  deleteProd.value = productoEliminado.state.variable
  quitarProducto(id)
  const producto = productosEnPantalla.value.find(item => item[0].id === id);
  if (producto) {
    // producto.cantidad++;
    if (!cantidadesPorID.value[id]) {
      cantidadesPorID.value[id] = recibirCantidad.value 

    } else {
      cantidadesPorID.value[id] = recibirCantidad.value 
    }
  }
}

const quitarProducto = (id) => {

  if (deleteProd.value === 1) {
    productosEnPantalla.value = productosEnPantalla.value.filter(item => item[0].id !== id);

    deleteProd.value = 0;
        
    cantidadesPorID.value[id] = 0;
    productoEliminado.setVariable(deleteProd.value);
  }
}




//const imprimir = () =>{
//  recibirCantidad.value = cantidad.state.variable
//}
//setInterval(imprimir, 1000)

const store = useStore()
const productosEnPantalla = ref([])
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

const agregar = () => {
  const newProduct = store.state.variable;
  newProduct.cantidad = recibirCantidad.value; // Agregar la cantidad al objeto del producto
  productosEnPantalla.value.push(newProduct);

  productos_comprados.value++;
  idProd.value = id_producto.state.variable;

}

const tiketData = ref([]);
let productosInfo = [];
const arregloProductos = [];
let productosString = '';

const reload = () => {
  
  productosEnPantalla.value = [];
  tiketData.value = [];
  productosInfo = [];
  arregloProductos.length = 0;
  productosString = ''; 
  metodo_pago.value = ''; 
  productos_comprados.value = 0;
  mostrarAlerta.value = false;
  mostrarSuccess.value = false;
  mensaje_error.value = '';
  mensaje_success.value = '';
  funcionEjecutada = false;
  recibirCantidad.value = 0;
  cantidadesPorID.value = {};
};

const construirArregloProductos = () => {
  for (const id in cantidadesPorID.value) {
    arregloProductos.push([parseInt(id), cantidadesPorID.value[id]]);
  }
  return arregloProductos;
};


const terminar = async () => {
  productosInfo = construirArregloProductos().filter(([id, cantidad]) => cantidad !== 0);
  productosString = productosInfo
    .map(([id, cantidad]) => `[${id}, ${cantidad}]`)
    .join(', ');

    const jsonData = {
    metodo_pago: metodo_pago.value,
    productos: `[${productosString}]`,
  };
  
  if (jsonData.metodo_pago === '') {
    mensaje_error.value = 'Seleccione un tipo de pago';
    mostrarAlerta.value = true;
    setTimeout(() => {
      mostrarAlerta.value = false;
    }, 2000);
  } else if (productosInfo.length === 0) {
    mensaje_error.value = 'No hay nada para vender';
    mostrarAlerta.value = true;
    
    setTimeout(() => {
      mostrarAlerta.value = false;
    }, 2000);
  } else if (funcionEjecutada) {
    mensaje_error.value = 'Limpiar antes de realizar otra venta';
    mostrarAlerta.value = true;
    setTimeout(() => {
      mostrarAlerta.value = false;
    }, 2000);
  } else {
    try {
      const response = await axios.post(
        'http://backend.vetcachorros.one/venta',
        jsonData
      );

    } catch (error) {
      console.log(error);
    }

    try {
      const GenerarTiket = await axios.get(
        'http://backend.vetcachorros.one/GenerarTiket'
      );
      
      tiketData.value = GenerarTiket.data.data;

    } catch (error) {
      console.log(error);
    }
    mensaje_success.value = 'Compra realizada'
    mostrarSuccess.value = true;
    setTimeout(() => {
      mostrarSuccess.value = false;
    }, 2000);
    funcionEjecutada = true;
  }
};



let cancelando = false;

const cancelarCompra = async () => {
  if (cancelando) {
    mensaje_error.value = 'No se puede cancelar la venta';
    mostrarAlerta.value = true;
    setTimeout(() => {
      mostrarAlerta.value = false;
    }, 2000);
    return;
  }

  cancelando = true;

  const productosInfo = construirArregloProductos().filter(([id, cantidad]) => cantidad !== 0);

  if (productosInfo.length === 0) {
    mensaje_error.value = 'No se puede cancelar la venta';
    mostrarAlerta.value = true;
    setTimeout(() => {
      mostrarAlerta.value = false;
      cancelando = false;
    }, 2000);
  } else {
    try {
      const response = await axios.post('http://backend.vetcachorros.one/CancelarCompra');
      tiketData.value = [];
      productosEnPantalla.value = [];
      mensaje_success.value = 'Venta cancelada';
      mostrarSuccess.value = true;

      setTimeout(() => {
        mostrarSuccess.value = false;
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
};



const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const fechaActual = new Date();

// Obtener el día y el mes de la fecha actual
const diaActual = fechaActual.getDate();
const mesActual = monthNames[fechaActual.getMonth()];

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
.Añadir{
  position: fixed;
  z-index: 9;
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
    max-height: 40em;

}
#red{
  color: #f85149;
  background-color: #32302f;
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
    gap: 20px;
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