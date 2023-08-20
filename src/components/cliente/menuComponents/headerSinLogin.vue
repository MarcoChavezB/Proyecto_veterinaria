<template>
    <div class="cont">
        <header>
            <div class="vet"> <router-link :to="{path: '/'}" ><span class="logo material-symbols-outlined">sound_detection_dog_barking <p>Veterinaria</p></span></router-link></div>
            <ul class="navbar normal">
                <li><router-link :to="{name: 'catalogoSin'}" href="#">Productos</router-link></li>
                <li><router-link :to="{name: 'login'}">Citas</router-link></li>
                <li><router-link :to="{name: 'login'}">Iniciar sesion</router-link></li>
                <li><router-link :to="{name: 'register'}">Registrarse</router-link></li>
                <li><router-link :to="{name: 'serviciosSin'}">Servicios</router-link></li>

            </ul>
            <div class="main">
            
                <span @click="menu" class="material-symbols-outlined">
                    menu
                </span>
                <ul v-if="despliegue" class=" despliegue">
                    
                    <li><router-link :to="{name: 'catalogoSin'}" href="#">Productos</router-link></li>
                    <li><router-link :to="{name: 'login'}">Citas</router-link></li>
                    <li><router-link :to="{name: 'ubicacionSin'}">Ubicación</router-link></li>
                    <li><router-link :to="{name: 'login'}">Iniciar sesión</router-link></li>
                    <li><router-link :to="{name: 'register'}">Registrarse</router-link></li>
                    <li><router-link :to="{name: 'servicios'}">Servicios</router-link></li>
                </ul>
            </div>
            
            <div class="profile">
                <p v-for="persona in nombre" :key="persona.id">{{ persona.nombre }}</p><span class="material-symbols-outlined">
                    account_circle
                </span>
            </div>
        
        </header>
        
        <body>

        </body>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {dataLog} from '@/stores/counter.js'
import router from "@/router";
import {RouterLink} from "vue-router";

var userData = dataLog()
const nombre = ref([])
nombre.value = userData.state.variable;
console.log("🚀 ~ file: headerjijijijij.vue:45 ~ nombre.value :", nombre.value )



var despliegue = ref(false);

const menu = () => {
    if (despliegue.value) {
        despliegue.value = false
        console.log('true')
    }
    else {
        despliegue.value = true
        console.log('false')
    }
}


</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
}

a {
    color: black;
}


header {
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    padding: 28px 12%;
    transition: all .50s ease;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    border-radius: 0px 0px  30px 30px;
    background-color: white;

}



.despliegue{
    position: absolute;
    right: 0px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 0px 0px 0px 30px;
    transition: transform 0.3s ease;
    background-color: white;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
}

.despliegue li{
    width: 100%;
    text-align: end;
    margin-bottom: 10px;
}



.despliegue a:hover{
    color: blueviolet;
}

.logo {
    display: flex;
    align-items: center;
}

.logo p {
    font-size: 20px;
}

.navbar {
    display: flex;
}

.navbar a {
    font-size: 1.1rem;
    font-weight: 500;
    padding: 5px 0;
    margin: 0px 30px;
    transition: all .50s ease;
}

.vet p{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.navbar a:hover {
    color: blueviolet;
}

.navbar a.active {
    color: #fd9300;
}

.main {
    display: none;
    align-items: center;
    cursor: pointer;
}

.main span {
    font-size: 40px;
}


.main a {
    margin-right: 25px;
    margin-left: 10px;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all .50 ease;
}



#menu-icon {
    font-size: 35px;
    cursor: pointer;
    z-index: 1001;
}

.profile{
    display: flex;
    gap: 16px;
}


@media (max-width: 1280px) {
    header {
        padding: 14px 2%;
        transition: .2s;
    }

    .navbar a {
        padding: 5px 0;
        margin: 0px 20px;
    }
}

@media (max-width: 1090px) {

    

    .navbar {
        
        position: absolute;
        top: 100%;
        right: 0;
        width: 270px;
        height: 29vh;
        display: flex;
        justify-content: flex-end;
        border-radius: 10px;
        transition: all .50s ease;
    }

    .normal {
        display: none;
    }

    .despliegue {
        display: flex;
        justify-content: flex-end;
    }

    .navbar a {
        display: block;
        margin: 12px o;
        padding: 0px 35px;
        transition: all .50s ease;
    }

    .navbar a:hover {
        transform: translateY(5px);
    }

    .profile{
        display: none;
    }
    .navbar a:active {
        color: aqua;
    }

    .navbar.open {
        right: 2%;
    }

    .main {
        display: block;
        margin-right: 30px;
    }

    .vet{
        width: 100%;
        display: flex;
        justify-content: center;
        
    }

}
</style>