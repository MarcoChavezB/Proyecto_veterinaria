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
  precio: {
    type: Number,
    default: 0
  },
  ispublic: {
    type: Boolean
  }
});

let { Description, Service  } = props;
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
        <div class="service-image"></div>
        <div class="info">
            <div class="texto tit" >
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
                <BotonConEstilo @click="editService(Id, ispublic)" title="Ocultar" v-show="!ispublic" />
            </div>
      </div>
    </div>
</template>

<style scoped>

.tit{
  color: white;
}

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
    grid-template-rows: 5% 5% 90%; 
    grid-template-columns: 100%;
    width: 65vh;
    height: 35vh;
    box-shadow: 0 2rem 3rem rgba(77, 80, 107, 0.432);
    border-radius: 15px;
    overflow: hidden; 
}

.service-image {
  height: 100%;
  grid-row-start: 1;
  width: 100%; 
  padding-bottom: 20%;
  background: linear-gradient(rgb(16, 50, 145), rgb(255, 255, 255));
}

.info{
    grid-row-start: 3;
    display: grid;
    grid-template-rows: 25% 10% 25% 15% 20% 5%;
}

</style>