<script setup>
import {ref, defineProps, watch, computed, toRefs, onMounted} from 'vue';
import BotonConEstilo from '../ControlesIndividuales/BotonAntho.vue';
// import RangoPrecioPublicos from '../ControlesIndividuales/RangoPrecioPublicos.vue';
const props = defineProps({
  Service: {
    type: String,
    default: ''
  },
  Description: {
    type: String,
    default: ''
  },
  Type: {
    type: Number,
    default: 1
  },
  Id: {
    type: Number,
    default: 1
  },
  Foto: {
    type: String,
    default: '../src/assets/img/FotosServicios/estetico1.jpeg'
  },
  precio: {
    type: Number,
    default: 0
  },
  ispublic: {
    type: Boolean
  }
});

let { Description, Service, Foto } = props;
const emits = defineEmits(['ide'])
const { Type } = toRefs(props);
const computedType = computed(() => {
    switch(Type.value) {
        case 1:
            return 'Clínico';
        case 2:
            return 'Estético';
    }
});
const editService = (id, isPublic) => {
  emits('ide', { id, isPublic });
}

const { ispublic, Id } = toRefs(props);

</script>


<template>
    <div class="carta">
        <div class="service-image" :style="{ backgroundImage: `url(${Foto})` }" ></div>
        <div class="info">
            <div class="texto">
                <h3 class="grilla" >{{ Service }}</h3>
            </div>
            <div class="texto">
                <p class="text">Servicio: {{ computedType }}</p>
            </div>
            <div class="texto">
                <p class="text">Descripción: {{ Description }}</p>
            </div>
            <div class="texto">
                <p class="text">Precio: $ {{ precio }}</p>
            </div>
            <div  class="boton">
                <BotonConEstilo @click="editService(Id, ispublic)" title="Publicar" v-show="ispublic" />
                <BotonConEstilo @click="editService(Id, ispublic)" title="Despublicar" v-show="!ispublic" />
            </div>
      </div>
    </div>
</template>

<style scoped>

.text{
    grid-column-start: 2;
}
.texto{
    display: grid;
    grid-template-columns: 10% 80% 10%;
}
.boton{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7%;
    grid-row-start: 5;
}
.grilla{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    grid-column-start: 2;
}
.carta {
    display: grid;
    grid-template-rows: 1fr 1fr 8fr; 
    grid-template-columns: 100%;
    width: 65vh;
    height: 40vh;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    border-radius: 15px;
    overflow: hidden; 
}

.service-image {
  grid-row-start: 1;
  position: relative;
  width: 100%; 
  padding-bottom: 17%;
  background-size: cover;
  background-position:center;
}

.info{
    grid-row-start: 3;
    display: grid;
    grid-template-rows: 15% 10% 35% 15% 20% 5%;
}

</style>