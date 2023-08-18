<template>
    <div class="container">
      <h1 class="title">¿Dónde nos ubicamos?</h1>
      <div class="image-container">
        <img class="responsive-image" :src="imageSrc" alt="Ubicación" @click="goToMaps"/>
      </div>
      <h3 @click="goToMaps" class="address">Av Independencia 608-613, Centro, 27440 Matamoros, Coah.</h3>
    </div>d
  </template>
  
  <script setup>
  const imageSrc = '../src/assets/img/Ubicacion.png'
  
  const goToMaps = () => {
    window.open("https://www.google.com/maps/place/Clinica+veterinaria+cachorros/@25.5260108,-103.2249768,16.74z/data=!4m6!3m5!1s0x868fc1bf8b8f70e5:0x30f7ddd0cd2cd4a!8m2!3d25.5259657!4d-103.2227034!16s%2Fg%2F11fr37vvbn?hl=en-MX&entry=ttu", "_blank")
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    text-align: center;
  }
  
  .title {
    margin-bottom: 20px;
    transition: transform 0.5s;
  }
  
  .title:hover{
    transform: scale(1.05);
  }
  
  .image-container {
    width: 70%;
    height: 50%;
    margin-bottom: 20px;
    cursor: pointer;
  }
  
  .responsive-image {
    border-radius: 15px;
    padding: 10px;
 box-shadow: 0 0 60px #00000034;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  .responsive-image:hover {
  transform: scale(1.05);
  box-shadow: 0 0 60px #030ea857;
  }
  
  .address {
    color: rgb(0, 0, 0);
    transition: transform 0.5s;
  }

  .address:hover{
    cursor: pointer;
    color: rgb(0, 30, 199);
    transform: scale(1.05);
  }
  </style>
  