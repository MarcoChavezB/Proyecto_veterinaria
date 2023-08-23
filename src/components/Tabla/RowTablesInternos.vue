<template>
  <div class="app">
    <div class="column">
      <p>{{ name }}</p>
      <p>{{ stock }}</p>
      <p>{{ descripcion }}</p>
      <p id="stock" :class="{
        'text-red': status === 'Sin stock',
        'text-green': status === 'Stock'
      }">{{ status }}</p>
      <div id="ult">
          <router-link class="custom-link" :to="{name: 'add'}">
          <div class="edit" @click="editarProducto">
              <span class="material-symbols-outlined">
              edit_note
            </span>
            
          </div>
        </router-link>
          <div class="delete" @click="eliminar">
            <span class="material-symbols-outlined">
              delete
            </span>
          </div>
        </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  name: { type: String }, stock: { type: Number },descripcion:{type:String}, status: { type: String }
})

import axios from 'axios'
import { deleteProdInter, idProductoInterno} from '@/stores/counter.js'

const mandarSeñalEditar = idProductoInterno()
var resivirSeñalEditar = ref()
const mandarVariable = ref()
const deleteProducto = deleteProdInter()
const recibirValor = () =>{
  mandarVariable.value = deleteProducto.state.variable
}
setInterval(() => {
  recibirValor()
}, 1000);

const eliminar = async () =>{
    try{
        const response = await axios.post('http://backend.vetcachorros.one/eliminarProductoInter', {id: mandarVariable.value});
        console.log(response.data)
    } catch(error){
        console.log(error)
    }
}

const editarProducto = () =>{
  setTimeout(() => {
    resivirSeñalEditar.value = mandarSeñalEditar.state.variable;
    console.log(resivirSeñalEditar.value);
  }, 1000);
}

</script>
  
<style scoped>
.text-red{
  color: red;

}

.text-green{
  color: green;
}
.app:hover{
    background-color: #f8f8f8;
  }
.app {
  display: flex;
  justify-content: space-evenly;
  
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  color: #677483;
  max-height: 4.5em;
  height: 1em;
}
.column span{
color: green;
} 

#ult span{
color: black;
}
.column {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;

}

.material-symbols-outlined{
font-size: 26px;
}  
.column p:first-child{
  width: 200px;
}

p {
  display: flex;
  height: 40px;
  align-items: center;
  width: 14%;
  
  margin-left: 60px;
}

#ult{
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 6em;
  color: black;
  height: 10%;
}


 .edit, .delete{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 35px;
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  border: none;
  box-shadow: 0 0 1em #00000013;
  transition: all 0.3s;
  font-weight: 500;
}


.edit:hover, .delete:hover{
  background-color: black;
  color: white;
}

#ult span:hover{
  color: white;
}

</style>
  