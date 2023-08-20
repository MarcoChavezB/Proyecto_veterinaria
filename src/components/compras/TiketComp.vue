<template>
  <div>
    <template v-if="loading">
      <loader/>
    </template>
    <template v-else>
      <div class="container">
        <div class="item  ">
          <div class="item-right">
            <h2 class="num">{{ formatDate (4,tiketData[0].fecha_venta) }}</h2>
            <p class="day">{{ formatDate (5,tiketData[0].fecha_venta) }}</p>
            <span class="up-border"></span>
            <span class="down-border"></span>
          </div> <!-- end item-right -->

          <div class="item-left">
            <p class="event">ID: {{ tiketData[0].venta_id }}</p>
            <h2 class="title">{{ tiketData[0].tipo_pago }}</h2>

            <div class="sec">
              <div class="sce">
                <div class="icon">
                  <i class="fa fa-table"></i>
                </div>
                <p>Productos</p>
              </div>

              <div class="productos  d-flex">
                <div class="prod  w-100" >
                    <div class="" v-for="tiket in tiketData" :key="tiket.nombre_producto">
                      <row :name="tiket.nombre_producto" :cantidad="tiket.cantidad_vendida"  :precio="tiket.precio_unitario"/>
                    </div>
                </div>
              </div>
            </div>
            <div class="final">
              <button class="tickets">Tickets</button>
            </div>
          </div> <!-- end item-right -->
        </div>
      </div>

    </template>
  </div>
</template>


<script setup>
import { defineProps, ref, onMounted } from 'vue';
import loader from '../../components/loaders/loaderPrincipal.vue'
import row from '../../components/compras/RowProdCompras.vue'

import axios from 'axios';
const montoTotal = ref(0);
defineProps({
  ventaID: Number,
  fecha_venta: String,
  tipo_pago: String,
  nombre_producto: String,
  cantidad_vendida: Number,
  precio_unitario: Number,
  monto_total: Number
});

const tiketData = ref([]);
const loading = ref(true);

const GenerarTiket = async () => {
  try {
    const response = await axios.get('http://backend.vetcachorros.one/GenerarTiket');
    tiketData.value = response.data.data;

    montoTotal.value = 0;

    for (const tiket of tiketData.value) {
      montoTotal.value += parseFloat(tiket.monto_total);
    }

    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// 1 horas y minutos formato
// 2 solo año formato
// 3 mes con dia formato
// 4 solo dia
// 5 solo mes
const formatDate = (id, dateTimeString) => {
  if (!dateTimeString) {
    return 'No hay datos';
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
      return 'Invalid ID';
  }
}


onMounted(GenerarTiket);
setInterval(GenerarTiket, 10000);
</script>



<style scoped>

* {
  box-sizing: border-box;
  margin:0;
  padding:0;
}
.sec{
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1.8fr;
  gap: 0px 0px;
  grid-template-areas:
    "."
    ".";
}

div.container {
  overflow: hidden;
}


.container .item {
  width: 48%;
  float: left;
  padding: 0 20px;
  background: #fff;
  overflow: hidden;
  margin: 10px
}
.container .item-right, .container .item-left {
  float: left;
  padding: 20px
}
.container .item-right {
  padding: 79px 50px;
  margin-right: 20px;
  width: 25%;
  position: relative;
  height: 286px
}
.container .item-right .up-border, .container .item-right .down-border {
  padding: 14px 15px;
  background-color: #ddd;
  border-radius: 50%;
  position: absolute
}
.container .item-right .up-border {
  top: -8px;
  right: -35px;
}
.container .item-right .down-border {
  bottom: -13px;
  right: -35px;
}
.container .item-right .num {
  font-size: 60px;
  text-align: center;
  color: #111
}
.container .item-right .day, .container .item-left .event {
  color: #555;
  font-size: 20px;
  margin-bottom: 9px;
}
.container .item-right .day {
  text-align: center;
  font-size: 25px;
}
.container .item-left {
  width: 71%;
  padding: 34px 0px 19px 46px;
  border-left: 3px dotted #999;
}
.container .item-left .title {
  color: #111;
  font-size: 34px;
  margin-bottom: 12px
}
.container .item-left .sce {
  margin-top: 5px;
  display: block
}
.container .item-left .sce .icon, .container .item-left .sce p,
.container .item-left .loc .icon, .container .item-left .loc p{
  float: left;
  word-spacing: 5px;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: 10px;
}
.container .item-left .sce .icon, .container .item-left .loc .icon {
  margin-right: 10px;
  font-size: 20px;
  color: #666
}
.container .item-left .loc {display: block}
.fix {clear: both}
.container .item .tickets, .booked, .cancel{
  color: #fff;
  padding: 6px 14px;
  margin-top: 10px;
  font-size: 18px;
  float: right;
  border: none;
  cursor: pointer
}
.container .item .tickets {background: #777}
.container .item .booked {background: #3D71E9}
.container .item .cancel {background: #DF5454}
.linethrough {text-decoration: line-through}
@media only screen and (max-width: 1150px) {
  .container .item {
    width: 100%;
    margin-right: 20px
  }
  div.container {
    margin: 0 20px auto
  }
}

</style>
