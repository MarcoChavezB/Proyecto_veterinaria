<template>
      <div class="container">
            
            <h1> <span class="material-symbols-outlined" style="font-size: 60px; padding:15px ;">
                        sound_detection_dog_barking
                  </span>Catálogo de productos </h1>
            <br>
            <br>
            <div>
                  <div class="control">
                        <input v-model="search" type="text" @input="productocadena">
                  </div>
            </div>
            <br>
            <div class="row">
                  <div class="col-lg-4" id="contenedor" v-for="producto in productos" :key="productos.id">
                        <div id="card-total">
                              <div id="card-body">
                                    <h5 class="card-title"> {{ producto.nom_producto }}</h5>
                                    <div id="imagen">
                                          <img :src="producto.imagen" alt="imagen">
                                    </div>
                                    <p class="card-text">{{ producto.descripcion }}</p>
                                    <p class="card-text" id="precio-producto">Precio: ${{ producto.precio_venta }}</p>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
      <!-- <footer></footer> -->
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import footer from '@\components\cliente\menuComponents\footer.vue';
const productos =ref([]);
const search = ref([]);
const obtenerproductos = async () => 
{
      productos.value = [];
    try 
    {
        const response = await axios.get('http://web.Backend.com/productosPublicos')
         if (Array.isArray(response.data.data)) {
             productos.value = response.data.data;
             console.log(response.data.data);
         } 
         else {
             productos.value = [response.data.data];
         }
      productos.value = response.data.data;
    } catch (error) {
        console.error(error)
    }
}
onMounted(obtenerproductos);


const productocadena = async () => {
    productos.value = [];
    try {
      const data = {
      cadena: search.value,
    };
        const response = await axios.post('http://web.Backend.com/productopublicoporcadena', data)
        if (Array.isArray(response.data.data)) {
            productos.value = response.data.data;
        } else {
            productos.value = [response.data.data];
        }
        console.log(productos.value)
    } catch (error) {
        console.error(error)
    }
}
</script>
  
<style scoped>
#imagen
{
      margin-top: 20px;
      width: 210px;
      height: 210px;
      border: 2px solid gray;
      overflow: hidden;
}
#imagen img
{
      width: 100%;
      height: 100%;
}
.control
{
      padding: 10px;
      font-size: 40px;
}
.row
{
      width: 100%;
      display: grid;
      margin: auto;
      grid-template-columns: auto auto auto auto;
}

@media (max-width: 1440px)
{
      .row
      {
            width: 100%;
            display: grid;
            margin: auto;
            grid-template-columns: auto auto auto;
      }
}

@media (max-width: 1050px)
{
      .row
      {
            width: 100%;
            display: grid;
            margin: auto;
            grid-template-columns: auto auto;
      }
}

@media (max-width: 720px)
{
      .row
      {
            width: 100%;
            display: grid;
            margin: auto;
            justify-content: center;
            grid-template-columns: auto;
      }
}
#card-total
{
      width: 80%;
}
#card-body
{
      width: 16rem;
      height: 25rem;
      border: 1px solid rgb(119, 119, 119);
      border-radius: 12px;
      font-size: 19px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 18px;
      margin-bottom: 30px;
}
#card-body img
{
      width: 90%;
}

#card-body:hover
{
      transform: translateY(-20px);
      transition: all 0.3s;
      box-shadow: 5px 5px 3px black;
      font-size: 26px;
      background-color: rgb(230, 230, 230);
}


#card-body #precio-producto:hover
{
      color: #008000;
}
.card-title
{
      font-size: 27px
}


.container
{
      width: 90%;
      height: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
}
h1 
{
      margin-top: 120px;
}

.card.card-small 
{
      width: 30%;
      height: 30%;
}

.custom-image 
{
      width: 220px;
      height: 145px;
}

.image-container 
{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      margin: 2px;
}

.image-container img mx-2 
{
      max-width: 100%;
      max-height: 100%;
}
</style>
  