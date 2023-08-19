<template>
    <div class="app">
      <div class="column">
        <p> {{ name }}</p>
        <p id="stock">{{ status }}</p>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { defineProps} from 'vue';
  
  defineProps({
    name: { type: String }, 
    status: { type: String }
  })
  
  
  </script>
    
  <style scoped>
  .app{
    display: flex;
    flex-direction: column;
    height: auto;
    
  }

  .column{
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in;
    position: relative;
  z-index: 99999;
  }

  </style>
    