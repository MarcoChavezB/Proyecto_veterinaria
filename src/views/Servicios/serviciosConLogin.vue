<template id="template">
      <div class="pantalla">

            <div id="imagen-services" class="imgserv" >
                  <img class="imgg" src="@\assets\img\imagen-servicios-veterinaria.png" alt="imagen-servicios">
                  <!-- <img src="../src/assets/img/imagen-servicios-veterinaria" alt="imagen-servicios"> -->
                  <h4 class="fontt">SERVICIOS</h4>
            </div>
            <div id="tipe-service-select">
                  <router-link class="link-services" to="/serviciosesteticosConLogin"><button>Estéticos</button></router-link>
                  <router-link class="link-services" to="/serviciosclinicosConLogin"><button>Clínicos</button></router-link>
            </div>
            <RouterView />

      </div>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { RouterView } from 'vue-router';

import CardService from '../../components/servicios/CardService.vue';
// import btn from '../../components/ControlesIndividuales/BotonBlanco.vue';

// var opcion1 = ref(true);
// var opcion2 = ref(false);

// function mostrartabla1()
// {
//       opcion1 == false;
// }

// function mostrartabla2()
// {
//       opcion2 == true;
// }
// -----------------------------------

const servicios = ref([]);
const obtenerservicios = async () => {
      try {
            const response = await axios.get('http://18.223.116.149/api/serviciosPEsteticos')

            
            servicios.value = response.data.data;
      } catch (error) {
            
      }
}
onMounted(obtenerservicios);

const servicioscli = ref([]);
const obtenerservicioscli = async () => {
      try {
            const response = await axios.get('http://18.223.116.149/api/serviciosPClinicos')

            
            servicioscli.value = response.data.data;
      } catch (error) {
            
      }
}
onMounted(obtenerservicioscli);
</script>
<style scoped>


.fontt {
      font:large;
}
.imgg{
      width: 100%; 
      height: auto; 
      object-fit: cover;
}
.imgserv{

     display: flex;
     width: 100%;
     height: 60vh;

}

#template {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
}

#imagen-services {
      /* width: 400px;
      height: 300px; */
      margin: 120px auto 0 auto;
      /* position: relative; */
}

#imagen-services h4 {
      position: absolute;
      font-size: 100px;
      color: #ffffff;
      top: 40%;
      left: 52%;
      transform: translate(-55%, -90%);
}

@media (max-width: 720px) {
      #imagen-services {
            width: 400px;
            height: 300px;
            margin: 120px auto 0 auto;
            /* position: relative; */
      }

      #imagen-services img {
            width: 100%;
      }

      #imagen-services h4 {
            position: absolute;
            font-size: 50px;
            color: #ffffff;
            top: 40%;
            left: 52%;
            transform: translate(-55%, -245%);
            z-index: 30px;
      }

      #tipe-service-select button {
            box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
            position: relative;
            margin-left: 25px;
            width: 140px;
            height: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(255, 255, 255);
            border-radius: 30px;
            overflow: hidden;
            border: 2px;
            border-color: #000000;
            box-shadow: 0 0 1em #00000013;
            font-size: 20px;
            transition: 0.2s;
            text-align: center;
            color: #000000;
      }
      #tipe-service-select {
            display: flex;
            width: 70%;
            flex-direction: column;
            justify-content: center;
      }
}

@media (max-width: 610px) {
      #tipe-service-select button {
            box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
            position: relative;
            margin-left: 20px;
            width: 125px;
            height: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(255, 255, 255);
            border-radius: 30px;
            overflow: hidden;
            border: 2px;
            border-color: #000000;
            box-shadow: 0 0 1em #00000013;
            font-size: 25px;
            transition: 0.2s;
            text-align: center;
            color: #000000;
      }

      #tipe-service-select {
            display: flex;
            width: 70%;
            flex-direction: column;
            justify-content: center;
      }

      .link-services {
            text-decoration: none;

            list-style: none;
      }

      #imagen-services {
            width: 300px;
            height: 200px;
            margin: 120px auto 0 auto;
            /* position: relative; */
      }

      #imagen-services img {
            width: 100%;
      }

      #imagen-services h4 
      {
            position: absolute;
            font-size: 30px;
            color: #ffffff;
            top: 40%;
            left: 52%;
            transform: translate(-55%, -255%);
            z-index: 30px;
      }
}
@media (max-width: 430px)
{
      #imagen-services h4 
      {
            position: absolute;
            font-size: 30px;
            color: #ffffff;
            top: 40%;
            left: 52%;
            transform: translate(-55%, -315%);
            z-index: 30px;
      }
}

.link-services 
{
      text-decoration: none;
      list-style: none;
}

.pantalla {
      display: flex;
      flex-direction: column;
      /* justify-content: flex-start; */
      align-items: center;
      gap: 25px;
      width: 100%;
      height: 95vh;
}

#tipe-service-select 
{
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: center;
}

#tipe-service-select button 
{
      box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
      position: relative;
      margin-left: 20px;
      width: 180px;
      height: 70px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(255, 255, 255);
      border-radius: 30px;
      overflow: hidden;
      border: 2px;
      border-color: #000000;
      box-shadow: 0 0 1em #00000013;
      font-size: 30px;
      transition: 0.2s;
      text-align: center;
      color: #000000;
}

#tipe-service-select button:hover 
{
      box-shadow: 0 0 2em #00000013;
      transform: scale(1.03);
      background-color: #0872a3;
      color: #ffffff;
      box-shadow: 0 2rem 3rem rgba(96, 101, 146, 0.18);
}

.card-services 
{
      /* border: 1px solid rgb(105, 105, 105); */
      width: 90%;
}

.card-services table 
{
      width: 100%;
      margin: auto;
}

.card-services table tr 
{
      border: 1px solid #808080;
}

#filas-servicios 
{
      font-size: 30px;
      width: 100%;
      display: flex;
      flex-direction: row;
      text-align: center;
}

#filas-servicios td 
{
      width: 84%;
}

#services-titles 
{
      width: 100%;
      font-size: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
}

.card-services table 
{
      width: 90%;
}

#services-titles table thead tr 
{
      width: 100%;
      display: flex;
      justify-content: space-around;
      border: 1px solid #000000;
}

.card-services table thead 
{
      width: 100%;
}

.tit 
{
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column-start: 3;
}

.agreg 
{
      display: flex;
      align-items: center;
      justify-content: center;
      grid-column-start: 4;
}

.titulo 
{
      display: grid;
      grid-template-columns: 10% 25% 30% 25% 10%;
      color: rgb(255, 255, 255);
      background: linear-gradient(#6844eb, #ffffff);
      border-radius: 15px;
      font-weight: bold;
}

.titulo2 
{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10%;
      color: rgb(255, 255, 255);
      background: linear-gradient(#2c87d1, rgb(255, 255, 255));
      border-radius: 15px;
      font-weight: bold;
}

.services 
{
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      gap: 5rem;
}

.content 
{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      flex-wrap: wrap-reverse;
      overflow: initial;
}

.servi 
{
      display: grid;
      grid-template-rows: 1fr 9fr;
      margin: 20px;
      box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
      border-radius: 15px;
      overflow: initial;
}

/* .header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 20rem;
      grid-row-start: 1;
      background-color: rgb(255, 255, 255);
} */

h4 
{
      font-size: 67px;
}

.body 
{
      display: flex;
      width: 100%;
      height: 100%;
      /* grid-row-start: 2; */
      flex-direction: column;
      align-items: center;
}

.service-form 
{
      margin-top: 20px;
}

.texto 
{
      text-align: center;
      text-justify: center;
}
</style>