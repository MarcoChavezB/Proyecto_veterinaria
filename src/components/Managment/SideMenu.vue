<template>
    <div class="containerNorm">
        <aside class="controls">
            <div class="top">
                <div class="logo">
                    <span class="material-symbols-outlined">sound_detection_dog_barking</span>
                    <p>Administrador</p>
                </div>
                <div class="close" id="close-btn">
                    <span class="material-symbols-outlined">close</span>
                </div>
            </div>
            <div class="sidebar">
                <div class="general">
                    <div class="admin">
                    <router-link :to="{ name: 'control' }">
                        <span class="material-symbols-outlined">space_dashboard</span>
                        <h4>Dashboard</h4>
                    </router-link>

                    <router-link :to="{ name: 'productos' }">
                        <span class="material-symbols-outlined">inventory</span>
                        <h4>Productos</h4>
                    </router-link>

                      <router-link :to="{ name: 'citasTotales' }">
                        <span class="material-symbols-outlined">description</span>
                        <h4>Citas</h4>
                      </router-link>
                </div>

                <div class="com">
                    <router-link :to="{ name: 'compras' }">
                        <span class="material-symbols-outlined">insights</span>
                        <h4>Ventas</h4>
                    </router-link>

                    <router-link :to="{ name: 'GestionUsuarios' }">
                        <span class="material-symbols-outlined">person</span>
                        <h4>Usuarios</h4>
                    </router-link>
                </div>

                <div class="reportes">
                    <router-link :to="{ name: 'consultas' }">
                        <span class="material-symbols-outlined">clinical_notes</span>
                        <h4>Consultas</h4>
                    </router-link>

                    <router-link :to="{ name: 'AdminServicios' }">
                        <span class="material-symbols-outlined">medical_services</span>
                        <h4>Servicios</h4>
                    </router-link>

                    <a href="#">
                        <span class="material-symbols-outlined">summarize</span>
                        <select v-model="selectedOption" class="sidebar-select" @change="onReportChange">
                            <option value="" disabled selected>Reportes</option>
                            <option value="reportehistorialmedico">Historial medico.</option>
                            <option value="reportconsultasrealizadas">Consultas realizadas.</option>
                            <option value="reportconsultasrechazadas">Citas rechazadas.</option>
                            <option value="reportordenescompra">Ordenes de compra.</option>
                            <option value="reporteventas">Productos vendidos.</option>
                        </select>
                    </a>
                </div>

                </div>
                <router-link :to="{ name: 'login' }" id="salir" @click="salir">
                  <span class="material-symbols-outlined">logout</span>
                  <h4>Salir</h4>
                </router-link>

            </div>
        </aside>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import {logout} from "@/stores/counter.js"
import { useRouter } from 'vue-router';
const router = useRouter();
var varSalir = logout()
var mandarVariable = ref(false);
const selectedOption = ref('');

const resetSelect = () => {
    selectedOption.value = '';
}

const onReportChange = (event) => {
    const selectedReport = event.target.value;
    router.push({ name: selectedReport }).then(() => {
        resetSelect();
    })
}

const salir = () =>{
  if (mandarVariable.value === true){
    mandarVariable.value = false;
    console.log(mandarVariable)
    varSalir.setVariable(mandarVariable.value);
  }else if (mandarVariable.value === false ){
    mandarVariable.value = true;
    varSalir.setVariable(mandarVariable.value);
  }
}


</script>



<style scoped>

.controls{
    display: grid;
    grid-template-rows: 10% 80%;
}
* {
    margin: 0;
    padding: 0;
    outline: 0;
    appearance: none;
    border: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
  color: black;
}


h1,
h2,
h4,
h4,
h5,
h6,
select {
    font-family: 'Comfortaa', cursive;
}

html {
    font-size: 14px;
}

#salir{
  width: 20%;
  margin-left: 40px;
  margin-bottom: 40px;
  cursor: pointer;
  gap: 10px;
  display: flex;
}

body {
    width: 100vw;
    height: 100vh;
    font-size: 0.88rem;
    background-color: #202237;
    user-select: none;
    overflow-x: hidden;
    color: whitesmoke;
}


option {
    background-color: #202237;
}

a {
    color: white;
}

img {
    display: block;
    width: 100%;
}

h1 {
    font-weight: 800;
    font-size: 1.8rem;
}

h2 {
    font-size: 1.4;
}

h4 {
    color: white;
    font-size: 1rem;
}

span{
  color: white;
}

h5 {
    font-size: 0.77rem;
}

smal {
    font-size: 0.75rem;
}

b {
    color: white;
}
p{
  color: white;

}
.containerNorm {
    position: relative;
    display: grid;
    width: 21.8em;
    margin: 0 auto;
    gap: 1.8rem;
    grid-template-columns: 15rem 1fr;
    position: fixed;
    margin-left: -24px;
    backdrop-filter: blur(20px);
    border-radius: 10px;
    background-color: #0f0f0f;
}


aside {
    height: 100vh;
    width: 123%;

}

aside .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.4rem;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
    height: 45px;
    padding: 1rem;
    transition: all 300ms ease;
      border-bottom: 1px solid rgba(132, 139, 200, 0.18);
}

aside .logo img {
    width: 2rem;
    height: 2rem;
}

aside .close {
    display: none;

}

/*======================side bar===========================*/


aside .sidebar a {
    display: flex;
    color: white;
    margin-left: 2rem;
    gap: 1rem;
    align-items: center;
    position: relative;
    height: 3.7rem;
    transition: all 300ms ease;
}

aside .sidebar a span {
    font-size: 1.6rem;
    transition: all 300ms ease;
}

#salir {
    position: absolute;
    bottom: 2rem;
    width: 100%;
}

aside .sidebar a:hover {
    color: #7380ec;
}

aside .sidebar a:hover span {
    margin-left: 1rem;
}

aside .sidebar {
    color: white;
    padding: 2px 24px;
    font-size: 11px;
    border-radius: 0.4rem;
}

.sidebar-select {
    display: flex;
    color: white;
    gap: 1rem;
    align-items: center;
    position: relative;
    height: 3.7rem;
    transition: all 300ms ease;
    font-size: 16px;
    background-color: transparent;
}

.sidebar-select:hover {
    color: #7380ec;
}

.admin{
    padding: 1rem;
  border-radius: .7rem;
  transition: all ease .3s;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);

}

.com{
    padding: 1rem;
  border-radius: .7rem;
  transition: all ease .3s;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
}

.reportes{
    padding: 1rem;
  border-radius: .7rem;
  transition: all ease .3s;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);

}

.general{
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 73vh;

}

</style>
