<template>
    <div class="container-fluid">
        <div class="descripcion"><p> {{name}} </p></div>
        <div class="descripcion"><p> {{correo}} </p></div>
        <div class="descripcion"><p> {{telefono}} </p></div>
        <div class="btns">
            <button @click="borrar">
                    <span class="material-symbols-outlined cambio">
                        delete
                    </span>
            </button>
        </div>
    </div>
  </template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import {deleteAdmin} from '@/stores/counter.js'
import {defineProps} from 'vue'
const useStore = deleteAdmin()
const data = ref()

const borrar = () =>{
    data.value = useStore.state.variable
    const userData = async () => {
    try {
        const response = await axios.post('http://backend.vetcachorros.one/eliminarAdmin', {id: data.value}); 
        users.value = response.data.data;
    } catch (error) {
        console.log(error)
        }
    } 
    userData()  
}


defineProps({
    name:{
        type: String,
    },
    correo:{
        type: String,
    },
    telefono:{
        type: String,
    },    
})
</script>

<style scoped>
.container-fluid{
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr 1fr 0.4fr;
  gap: 0px 0px;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  width: 90%;
  height: 100%;
}

.descripcion{
  display: flex;
  justify-content: center;
}



.btns{
    display: flex;
    gap: 10px;
  }

  .btns button{
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


  .btns button:hover{
    background-color: black;
    color: white;
  }

</style>