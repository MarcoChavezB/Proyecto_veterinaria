
<template>
<div class="wrapper">
     <li class="icon black">
        <span class="tooltip">{{ notifi }}</span>
        <button class="button" type="button" @click="toggleCheckbox">
            <p class="button__text">{{ title }}</p>
        </button>
    </li>
</div>

  </template>
  
  <script setup>
  import { defineProps } from 'vue';
   
  defineProps({
      title:{
          type: String,
      },
      
      notifi:{
        type: String,
      }
  })
  
  </script>
  
  
  
  <style scoped>
  
  .button {
    position: relative;
    width: 150px;
    height: 40px;
    display: felx;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    border: none;
    box-shadow: 0 0 1em #00000013;
    transition: all 0.3s;
    font-weight: 500;
}

.button:hover{
  box-shadow: 0 0 2em #00000013;
  transform: scale(1.03);
  color: whitesmoke;
  background-color: black;
  font-weight: 600;
}

.wrapper .icon {
  position: relative;
  width: 150px;
    height: 40px;
    font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
font-size: 14px;
width: 7em;
border-radius: 5px;
opacity: 0;
pointer-events: none;
transition: all 0.2s ease-out;
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  
}



.wrapper span:hover,
.wrapper svg:hover,
.wrapper .black:hover,
.wrapper .black:hover .tooltip,
.wrapper .black:hover .tooltip::before {
color: white;
fill: white;
}
.tooltip {
    background-color: #262626;
    height: 2em;
}

  </style>