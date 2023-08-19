<template>
    <main>
        <div class="recent-orders">
            <br><br>
            <div class="table">
                <div class="headerTable">
                    <div>Motivo</div>
                    <div>Fecha de cita</div>
                </div>
                <div class="cont-table">
                    <recent v-for="citas in info" :key="citas.id"
                    :motivo="citas.estatus" :fecha="citas.fecha_cita"
                    class="rec" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
// import recent from '../../components/tabla/RowTablesRencent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

// CITAS
const info = ref([])
const infoCitas = async () => {
  try {
    const response = await axios.get('http://web.backend.com/citas_total');
    info.value = response.data.data;
    console.log(info.value)
  } catch(error) {
    console.log(error)
  }
}

onMounted(infoCitas);
</script>

<style scoped>


/*=================Tabla==================*/

<<<<<<< HEAD
=======
/* overflow-y: scroll; */
::-webkit-scrollbar {
  width: 0.5em;
}
>>>>>>> 5de18b826620e0b3d2211e71ac83615a867c9193

::-webkit-scrollbar-thumb {
  background-color: #888;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.table {
    background-color: #fff;

    padding: 1rem;
    text-align: center;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    transition: all 300ms ease;
    overflow-y: scroll;

    min-height: 18em;
    max-height: 18em;
}

main .recent-orders table:hover {
    box-shadow: none;
}

table {
    
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    color: #677483;
}

main table tbody tr:last-child td {
    border: none;
}

main .recent-orders a {
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: #7380ec;
}

.recent-orders h2 {
    font-size: 30px;
}

.headerTable {
    display: flex;
    justify-content: space-around;
}
</style>

