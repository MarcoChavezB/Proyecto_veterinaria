<template>
    <div class="app">
      <div class="column">
        <p>{{ name }}</p>
        <p>{{stock}}</p>
        <p id="stock" :class="{
          'text-red': status === 'Sin stock',
          'text-green': status === 'Stock'
        }">{{ status }}</p>
        <div id="ult">
          <div class="edit" @click="editarProducto">
              <span class="material-symbols-outlined">
              edit_note
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
import {defineProps} from 'vue'

defineProps({
  name:{type:String}, stock:{type:Number},status:{type:String}
})

</script>

  <style scoped>

  .text-red{
    color: red;
    border-bottom: 1px solid red;
  }

  .edit:hover, .delete:hover{
    background-color: black;
    color: white;
  }
  .text-green{
    color: green;
  }
  .app {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    color: #677483;
    max-height: 3em !important;
    
  }
span{
  color: green;
}  
  .column {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;

  }

  #ult{
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 6em;
    color: black;
    height: 10%;
  }

  #ult span:hover{
    color: white;
  }

  #ult span{
    color: black;
  }

  .edit{
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
  

  p {
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  </style>
  