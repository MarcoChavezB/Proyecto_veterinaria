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
                <button @click="mandarFalse">
                    <span class="material-symbols-outlined">
                        remove
                    </span>
                </button>
                <button @click="quitarProducto">
                    <span class="material-symbols-outlined">
                        delete
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
import {cantProducto, deleteProduct} from '@/stores/counter.js'
const cantidad = cantProducto()
const mandarCant = ref();

const producto = deleteProduct()
const deleteProd = ref();

const quitar = quitarProd()
const productoR = ref();



defineProps({
    name: { type: String },
    precio: { type: Number },
    img: { type: String },
    cant:{ type: Number},
    id:{type: Number},

})

const store = StorePublics(0);
var numero = ref(0)


const mandarTrue =  (a) =>{
  if (a === 1){
    numero.value++;
    mandarCant.value = numero.value;
    store.setVariable(numero);
    cantidad.setVariable(mandarCant.value);
    cantidadesPorID.value[id] = mandarCant.value;
  }else{
    mandarCant.value = numero.value
    store.setVariable(numero)
    cantidad.setVariable(mandarCant.value)
  }
}



const mandarFalse =  () =>{
  if (numero.value >= 2){
    numero.value--;
    mandarCant.value = numero.value;
    cantidad.setVariable(mandarCant.value);
    cantidadesPorID.value[id] = mandarCant.value; // Agregar esta línea
  } else {
    return numero.value
  }
}

const quitarProducto = () =>{
  deleteProd.value = 1
  producto.setVariable(deleteProd.value)
}

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
    