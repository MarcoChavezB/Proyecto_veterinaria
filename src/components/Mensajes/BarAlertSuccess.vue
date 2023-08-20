<template>
  <transition name="slide-out" mode="out-in" >
    <div v-if="isVisible" class="app">
      <div class="izquierdo">
        <div class="icon">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#67c23a"
            width="35px"
            height="35px"
        >
          <circle cx="12" cy="12" r="10" />
          <path
              d="M7 12.5l3 3L17 8"
              fill="none"
              stroke="#403c3a"
              stroke-width="1.5"
          />
        </svg>
      </div>
      <div class="txt">
        <p>{{name}}</p>
      </div>
    </div>
  </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

defineProps({
  name:{
    type: String,
  }
})

const isVisible = ref(true);


onMounted(() => {
    setTimeout(() => {
      isVisible.value = false
    }, 2000);
});
</script>


<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}



.app {
  display: flex;
  border-radius: 10px;
  background-color: #403c3a;
  color: #c9ba88;
  height: 5em;
  width: 25em;
  position: fixed;
  top: 45em;
  right: -1em;
  z-index: 999;
  animation: slide-in 0.2s ease-in-out;
}

.izquierdo {
  width: 16em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon{
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 10px;
  justify-content: flex-start;
  align-items: center;
}

.txt{
  margin-left: 20px;
  height: 100%;
  width: 200em;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>