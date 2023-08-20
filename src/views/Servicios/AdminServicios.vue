<template>
    <div class="pantalla">
      <transition name="fade">
      <div class="display2" v-if="loading">
        <load v-if=loading class="loader"/>
        <h2>Generando...</h2>
      </div>
      </transition>
      <transition name="fade">
    <div v-if="showModal" class="modal">
    </div>
</transition>
<div class="modal-content" v-if="showModal">
        <genser @close="activar"/>
      </div>
 <transition name="fade">
    <div v-if="segurar" class="modal">
    </div>
</transition>
<div class="modal-content" v-if="segurar">
  <div class="mesage">
    <div class="asegurar">
      <div class="msj">
        <h5>¿Estas segur@ de {{ valorP }} este servicio?</h5>
      </div>
      <div class="botones">
        <btn title="Cancelar" @click="cancelar"/>
      <btnverde title="Continuar" @click="continuar"/>
      </div>
    </div>
  </div>
</div>
        <div class="header">
            <h4 class="texto">
                SERVICIOS
            </h4>
        </div>
        <div class="body">
            <div class="servi">
                <div class="titulo">
                    <div class="tit">
                        NO PÚBLICOS
                    </div>
                    <div class="agreg">
                        <btn title="Agregar +" @click="activar"/>
                    </div>
                </div>
                <div class="content" ref="contentPrivate">
                    <div class="services">
                    <CardService @ide="publicar"       
                    v-for="service in services"
                    :Id="service.id"
                    :Service="service.nombre_TServicio"
                    :Type="service.id_servicio"
                    :image="service.image"
                    :Description="service.descripcion"
                    :precio="service.precio"
                    :ispublic="true"
                    />
                    </div>
                </div>
            </div>
            <div class="servi">
                <div class="titulo2">
                    PÚBLICOS
                </div>
                <div class="content" ref="contentPublic">
                    <div class="services">
                    <CardService @ide="publicar" 
                    v-for="serviceP in servicesP"
                    :Id="serviceP.id"
                    :Service="serviceP.nombre_TServicio"
                    :Type="serviceP.id_servicio"
                    :image="serviceP.image"
                    :Description="serviceP.descripcion"
                    :precio="serviceP.precio"
                    :ispublic="false"
                    />
                </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import CardService from '../../components/servicios/CardService.vue';
  import btn from '../../components/ControlesIndividuales/BotonBlanco.vue';
  import btnverde from '../../components/ControlesIndividuales/BotonAntho.vue';
  import genser from '@/components/servicios/ServiceForm.vue';
  import load from '../../components/loaders/loaderPrincipal.vue'

  const showModal = ref(false);
const segurar = ref(false);
const ispublic = ref(false);
const idd = ref(0);
const valorP = ref('');
const loading =ref(false);



  const activar= async () => {
  if(showModal.value === false)
  {
    showModal.value = true;
  } else if (showModal.value === true)
  {
    showModal.value = false;
    location.reload();
  }
}

  const services = ref([]);
  const servicesP = ref([]);

  const serviciospriv = async () => {
    try {
        const response = await axios.get('http://web.Backend.com/serviciosprivados')
        if (Array.isArray(response.data.data)) {
            services.value = response.data.data;
        } else {
            services.value = [response.data.data];
        }
    } catch (error) {
        console.error(error)
    }
}

const serviciospub = async () => {
    try {
        const response = await axios.get('http://web.Backend.com/serviciospublicos')
        if (Array.isArray(response.data.data)) {
            servicesP.value = response.data.data;
        } else {
            servicesP.value = [response.data.data];
        }
    } catch (error) {
        console.error(error)
    }
}
onMounted(serviciospriv);
onMounted(serviciospub);

const publicar = (data) =>{
  const { id, isPublic } = data;
  ispublic.value = isPublic
  idd.value = id
  segurar.value = true
  if(isPublic === true){
    valorP.value = 'publicar';
  }else if(isPublic === false){
    valorP.value = 'ocultar';
  }
}

const cancelar = () =>{
  segurar.value = false
}

const continuar = async () => {
  loading.value=true;
  try {
    const jsonData = {
      id_servicio: idd.value
    };
    const response = await axios.post('http://web.Backend.com/publicarono', jsonData);
    if(response.status === 200){
      segurar.value = false;
      location.reload();
      if(ispublic.value === true){
        msg.value = 'se publico correctamente';
      } else if (ispublic.value === false){
        msg.value = 'se despublico correctamente';
      }
    }
  } catch (error) {
    console.error(error);
  }
  loading.value=false;
};




  </script>
  
  <style scoped>

.exito{
  color: rgb(72, 255, 66);
}

.loader{
  position: relative;
    z-index: 300;
    width: 25%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.display2{
  background-color: rgba(95, 95, 95, 0.4);
  height: 100%;
  width: 100%;
  z-index: 299;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
  .botones{
    display: flex;
  justify-content: center;
  align-items: center;
  grid-row-start: 2;

  height: 100%;
  width: 100%;
  }

.msj{
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row-start: 1;
  height: 100%;
  width: 100%;
}
.mesage{
  width: 40%;
  height: 20vh;
  display: grid;
  border-radius: 30px;
  box-shadow: 0 2rem 3rem rgba(255, 255, 255, 0.363);
  background-color: rgb(241, 241, 241);
  grid-template-rows: 50% 50% ;
}
.modal-content {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 200;
}
.modal {
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: center;
  z-index: 98;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


  .tit{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-start: 3;
  }
  .agreg{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-start: 4;
  }
  .titulo{
    display: grid;
    grid-template-columns: 10% 25% 30% 25% 10%;
    color: rgb(0, 0, 0);
    border-radius: 15px;
    font-weight: bold;
    height: 20vh;
    grid-row-start: 1;
    font-size: large;
  }
  .titulo2{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    color: rgb(0, 0, 0);
    font-size: large;
    border-radius: 15px;
    font-weight: bold;
    height: 20vh;
    grid-row-start: 1;
  }

  .services{
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 5rem;
  }
  

  .content {
    flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow:scroll;
  grid-row-start: 2;
}
.servi{
    display: grid;
    grid-template-rows: 1fr 9fr;
    margin: 20px ;
    box-shadow: 1rem 0rem 3rem rgba(74, 77, 102, 0.349);
    border-radius: 15px;
    overflow:auto;
    height: 90%;
  }
  .content::-webkit-scrollbar {
  width: 20px;
}

.content::-webkit-scrollbar-track {
  background-color: white;
}
  

.content::-webkit-scrollbar-thumb {
  background: #cfcfcf;
}
  .header{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    grid-row-start: 1;
    background-color: rgb(255, 255, 255);
  }

  .body{
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-row-start: 2;
  }

  .pantalla{
    display: grid;
    width: 100%;
    height: 100vh;
    grid-template-rows: 8% 92%;
    grid-template-columns: 1fr;
    font-family: 'comfortaa';
    font-size: small;
  }


  .service-form {
    margin-top: 20px;
  }

  .texto{
    text-align: center;
    text-justify: center;
  }
  </style>
  