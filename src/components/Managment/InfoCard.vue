<template>
  <div class="right ">
    <div class="sales-analytics">
      <div class="item">
        <div :class="iconClass">
          <span class="material-symbols-outlined">
            {{ icono }}
          </span>
        </div>
        <div class="right">
          <div class="info">
            <h3>{{ name }}</h3>
            <div :class="status">
              <span class="material-symbols-outlined">
              {{ arrow }}
              </span>
              <small class="text-muted">{{ porcentaje }}%</small>
            </div>
          </div>
          <h3>{{ number }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  cardStyle: {
    type: String,
    default: 'estilo-negativo',
  },
  icono: {
    type: String,
    default: '...',
  },
  name: {
    type: String,
    default: 'NoData',
  },
  number: {
    type: Number,
    default: 'NoData',
  },
  porcentaje: {
    type: Number,
    default: 'NoData',
  },
  status:{
    type: String,
  },
  arrow:{
    type: String,
  }
});

// Definir la clase para cambiar el fondo del ícono
const iconClass = computed(() => `icon ${props.cardStyle}`);
const statusClass = computed(()=> `porcentaje ${props.status}`)
</script>

<style scoped>
/*=====================Sales analytics=======================00*/

h3, h5 {
  font-size: 1.2rem;
}

.right .sales-analytics .item .icon {
  padding: 0.6rem;
  color: #fff;
  border-radius: 50%;
  display: flex;
}

.right .sales-analytics .item {
  background: #fff;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.4rem 1.8rem;
  border-radius: 1.2rem;
  box-shadow: 0 0rem 2rem rgba(132, 139, 200, 0.1);
  transition: all 300ms ease;
  height: 100%;
  width: 90%;
  min-width: 17em;
  min-height: 7em;
}

.right .sales-analytics .item:hover {
  box-shadow: none;
}

.right .sales-analytics .item .right {
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
}

.right .sales-analytics .item .icon {
  padding: 0.6rem;
  color: #fff;
  border-radius: 50%;
  display: flex;
}

.right .sales-analytics {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

/* Estilos para cambiar el fondo del ícono */
.estilo1 {
  background-color: #171614;
}

.estilo2 {
  background-color: #754043;
}

.estilo3 {
  background-color: #37423d;
}

.estilo4 {
  background-color: #3a2618;
}

.estilo-positivo{
  background-color: #eefef7;
  font-size: 20px;
  color: #008000;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px;
}

.estilo-negativo{
  background-color: #feeaeb;
  font-size: 20px;
  color: #ff3c3c;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px;
}
</style>
