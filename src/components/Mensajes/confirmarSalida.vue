<template>
  <div id="app" v-if="mostrar">
    <div class="cookie-card" >
      <span class="cookie-title">🚧Confirmar🚧</span>
      <p class="cookie-description">La sesión de administrador no se mantendrá por seguridad.</p>
      <div class="btns">
        <button @click="cancelar" class="accept-button">Cancelar</button>
        <button @click="mandarVariable" class="accept-button">Accept</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/counter.js"
import {logout} from "@/stores/counter.js"
import { useRouter } from 'vue-router'
const globalStore = useGlobalStore()
const salir = ref(true)
import { ref } from 'vue'
const log = logout()
const ocultarSalir = ref(false)
const router = useRouter()
const mostrar = ref(true)

const mandarVariable = () => {
  globalStore.setVariable(salir)
  router.push('/')
};

const cancelar = () => {
  log.setVariable(ocultarSalir.value)
  mostrar.variable = false
}

</script>



<style scoped>


.btns{
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
  width: 100%;

}
.cookie-card {
  border-radius: 15px;
  width: 320px;
  height: 200px;
  background-color: white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
}

#app{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  width: 100%;
  height: 100vh;
}
.cookie-title {
  font-size: 20px;
  position: relative;
  left: 90px;
  top: 15px;
  font-weight: bold;
  color:#2f2a2b;
}

.cookie-description {
  position: relative;
  top: 25px;
  font-size: 15px;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color:#2f2a2b;
}


.accept-button {
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  width: 85px;
  height: 35px;
  color: whitesmoke;
  background-color: #2f2a2b;
  position: relative;
}

.accept-button:hover {
  background-color: #2f2a2b;
  color:whitesmoke;
  border: rgb(31 41 55);
;
}

.accept-button:active {
  font-weight: 100;
}

</style>