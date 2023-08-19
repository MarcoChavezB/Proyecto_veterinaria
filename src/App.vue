<template>
  <div class="app">
    <loader v-if="isLoading" />
    <div class="container-fluid" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Loader from './components/loaders/loaderEye.vue';

const isLoading = ref(true);

onMounted(() => {
  // Simula una carga
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
}

.container-fluid {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
