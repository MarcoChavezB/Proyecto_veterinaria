<template>
    <div class="app">
        <div class="column">
            <p>{{id}}</p>
            <p>{{ name }}</p>
            <p>{{ precio }} <span>$</span></p>
            <p>{{numero}}</p>
            <div class="btns">
                <button @click="mandarTrue(1)">
                    <span class="material-symbols-outlined">
                        add
                    </span>
                </button>

            </div>
        </div>
    </div>
</template>
  
  
<script setup>
import { defineProps, ref } from 'vue';
import { StorePublics } from '@/stores/counter.js'
import {quitarProd} from '@/stores/counter.js'
import {cantProducto} from '@/stores/counter.js'
const cantidad = cantProducto()
const mandarCant = ref();

const quitar = quitarProd()
const productoR = ref();



defineProps({
    name: { type: String },
    precio: { type: Number },
    img: { type: String },
    cant:{ type: Number},
    id:{type: Number},

})

const store = StorePublics();
var numero = ref(0)


const mandarTrue =  (a) =>{
  if (a === 1){
    numero.value ++;

  }else{
    mandarCant.value = numero.value
    store.setVariable(numero)
    cantidad.setVariable(mandarCant.value)
  }
}



const mandarFalse =  () =>{
  if (numero.value >= 2){
    numero.value --;
    mandarCant.value = numero.value
    store.setVariable(numero)
    cantidad.setVariable(mandarCant.value)
  } else {
    return numero.value
  }
}



setInterval(mandarTrue, 1000)

</script>
    
<style scoped>
.app {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid rgba(132, 139, 200, 0.18);
      color: #677483;
      max-height: 3em !important;
      margin-top: 30px;
  }

  .column {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;

  }

  p {
      display: flex;
      height: 40px;
      align-items: center;
      width: 100%;
      margin-left: 100px;
      text-align: center;
  }


  /* BOTONES */
  .btns{
    display: flex;
    gap: 10px;
  }

  .btns button:first-child{
    display: flex;
    border: none;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: 5px;
    color: white;
  }

</style>
    