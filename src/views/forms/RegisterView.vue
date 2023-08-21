
<template>
    <div class="app">
        <div class="img">
            <div class="imagen">
            </div>
        </div>
        <div class="login">
            <div class="log">
                <div class="formulario">
                <div class="form">
                    <h1>¡Bienvenido!</h1>
                    <p>Por favor, ingrese sus credenciales.</p>
                    <div class="flex-column">
                        <label>Nombre </label>
                    </div>
                    <div class="nombres">
                        <div class="flex-column">
                        </div>
                        <div class="inputForm personal">
                            <input v-model="nombre" class="input nombre" type="text" placeholder="Nombre">
                        </div>
                        <div class="flex-column ">
                        </div>
                        <div class="inputForm personal">
                            <input v-model="last" class="input" type="text" placeholder="Apellido">
                        </div>
                    </div>
                    <div class="flex-column">
                        <label>Email </label>
                    </div>
                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                            <g data-name="Layer 3" id="Layer_3">
                                <path
                                    d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z">
                                </path>
                            </g>
                        </svg>
                        <input v-model="correo" placeholder="Ingresa tu Email" class="input" type="text">
                    </div>

                    <div class="flex-column">
                        <label>Contraseña </label>
                    </div>

                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                            <path
                                d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
                            </path>
                            <path
                                d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
                            </path>
                        </svg>
                        <input v-model="contrasena" placeholder="Ingresa tu contraseña" class="input" type="password">
                    </div>
                    <div class="flex-column">
                        <label>Confirmar contraseña </label>
                    </div>

                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                            <path
                                d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0">
                            </path>
                            <path
                                d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
                            </path>
                        </svg>
                        <input v-model="confirmacion" placeholder="Confirma tu contraseña" class="input" type="password">
                    </div>
                    <div class="flex-column">
                        <label>Télefono</label>
                    </div>
                    <div class="telefonos">
                        <div class="flex-column">
                        </div>
                        <div class="inputForm personal">
                            <input v-model="tel1" class="input nombre" type="text" placeholder="Teléfono 1">
                        </div>
                        <div class="flex-column ">
                        </div>
                        <div class="inputForm personal">
                            <input v-model="tel2" class="input password" type="text" placeholder="Teléfono 2 (opcional)">
                        </div>
                    </div>

                    <div class="flex-row">
                        <div>
                            <input type="radio">
                            <label>Recuérdame </label>
                        </div>
                        <span class="span">¿Olvidaste tu contraseña?</span>
                    </div>
                    <button @click="verificarCorreo" class="button-submit">Sign In</button>
                    <p class="p">¿Ya tienes una cuenta?
                        <router-link :to="{ name: 'login' }" class="custom-link">
                            <span class="span">Iniciar sesión</span>
                        </router-link>
                    </p>
                </div>
            </div>
            </div>
            <div class="salir">
                <btn_salir/>
            </div>
        
        </div>
        
        <!--Mensaje de error-->

            <div v-if="mostrarError" class="err">
                <error title="No se registro el usuario" />
            </div>

            <div v-if="mostrarErrorRegistro" class="err">
                <error title="El correo ya existe" />
            </div>


            <div v-if="mostrarSuccess" class="err">
                <success />
            </div>

    </div>
</template>




<script setup>
import error from '../../components/Mensajes/Error.vue'
import success from '../../components/Mensajes/Success.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import btn_salir from '../../components/ControlesIndividuales/OutBtn.vue'

const nombre =          ref('');
const last =            ref('');
const correo =          ref('');
const tel1 =            ref('');
const tel2 =            ref('');
const contrasena =      ref('');
const confirmacion =    ref('');
var mostrarError =      ref();
var mostrarSuccess =    ref();
var mostrarErrorRegistro = ref()
const router =          useRouter();



const registro = () => {
    if (
        contrasena.value === confirmacion.value &&
        nombre.value != '' &&
        last.value != '' &&
        correo.value != '' &&
        tel1.value != ''
    ) {
        data();
        mostrarSuccess.value = true;

        setTimeout(() => {
            mostrarSuccess.value = false;
            redirectToPage();
        }, 5000);


    } else {
      mostrarError.value = true;
        setTimeout(() => {
          mostrarError.value = false;
        }, 5000);
    }
};

const verificarCorreo = async () => {
  try {
    const response = await axios.post('http://backend.vetcachorros.one/verificarCorreoR', {correo: correo.value});
    

    if (response.data.data.data) {
      mostrarErrorRegistro.value = true;
      setTimeout(() => {
        mostrarErrorRegistro.value = false;
      }, 5000);

    } else {
      registro()
    }


  } catch (error) {
    console.error(error);
  }
};



const data = async () => {
    const reg = {
        nombres: nombre.value,
        apellidos: last.value,
        password: contrasena.value,
        correo: correo.value,
        tel1: tel1.value,
        tel2: tel2.value,
        ts: "Cliente"
    };

    try {
        const response = await axios.post('http://backend.vetcachorros.one/signin', reg);
        console.log(response.data); 
    } catch (error) {
        console.error(error);
    }
};

const redirectToPage = () => {                                                      // Router
    router.push('/login');
};

</script>






<style scoped>
* {
    box-sizing: border-box;
}


.err {
    margin-left: 41.3%;
    margin-top: 15.6%;
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login {
     display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-rows: 3fr 0.2fr; 
  gap: 0px 0px; 

}

.app {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1.5fr 1.5fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
        ". .";
}

.log{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2em 0 0 2em;
    height: 90vh;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form button {
    align-self: flex-end;
}

.flex-column>label {
    color: #151717;
    font-weight: 600;
}

.inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;

}
.salir{
    
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
}
.input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
}

.input:focus {
    outline: none;
}

.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
}

.flex-row>div>label {
    font-size: 14px;
    color: black;
    font-weight: 400;
}

.span {
    font-size: 14px;
    margin-left: 5px;
    font-weight: 500;
    cursor: pointer;
}

.button-submit {
    margin: 20px 0 10px 0;
    background-color: #7e999e;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
}

.p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
}

.imagen {
    height: 100vh;
}

.nombres {
    display: flex;
}

.personal {
    width: 50%;
}

.telefonos {
    display: flex;
}

.imagen {
    background-image: url('../../assets/img/perroRegister.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

@media screen and (max-width: 768px) {
    .img {
        display: none;
    }

    .login {
        border-radius: 0;
        width: 130%;
    }

    .form {
        width: 27.7em;
    }

    .imagen {
        display: none;
    }
}

@media screen and (min-resolution: 70dpi) and (max-resolution: 120dpi) {

    /* Estilos para el rango de zoom entre el 80% y el 120% */
    .app {
        width: 100%;
        right: 1em;
        position: fixed;
    }

    .formulario {
        max-height: 45rem;
        /* Altura máxima del formulario */
        overflow-y: auto;
    }
}</style>