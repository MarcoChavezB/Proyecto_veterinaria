
<template>
  <button class="button" type="button" @click="toggleCheckbox">
    <span class="button__text">{{ title }}</span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';
 
defineProps({
    title:{
        type: String,
    }
})

</script>



<style scoped>
.button {
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    position: relative;
    margin-left: 50px;
    width: 150px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    border-radius: 30px;
    overflow: hidden;
    border: 2px;
    border-color: black;
    box-shadow: 0 0 1em #00000013;
    font-size: 15px;
    transition: 0.2s;
    text-align: center;
    color: rgb(0, 0, 0);
    
}

.button:hover{
  box-shadow: 0 0 2em #00000013;
  transform: scale(1.03);
  background-color: rgb(8, 114, 163);
  color: white;
  box-shadow: 0 2rem 3rem rgba(96, 101, 146, 0.18);
}
.button__text {
    transition: all 0.3s;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}


</style>