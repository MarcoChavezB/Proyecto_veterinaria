<template>
    <div class="app ">
        <div class="header">
            <div class="top-menu">
                <h3>Admin menu</h3>
            </div>
        </div>
        <div class="body">
            <div class="carta-admins">
                <div class="title">
                    <h4>Administradores</h4>
                </div>
                <div class="cuerpo-carta">
                    <div class="form">

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
                            <input v-model="confirmacion" placeholder="Confirma tu contraseña" class="input"
                                type="password">
                        </div>
                        <div class="flex-column">
                            <label>Télefono</label>
                        </div>
                        <div class="telefonos d-flex">    
                            <div class="inputForm personal">
                                <input maxlength="10" v-model="tel1" class="input nombre" type="text" placeholder="Teléfono 1">
                            </div>
                            <div class="inputForm personal">
                                <input maxlength="10" v-model="tel2" class="input nombre" type="text" placeholder="Teléfono 2 (opcional)">
                            </div>
                       
                        </div>
                        <div class="btns">
                                <btnNot @click="verificar" />
                            </div>

                    </div>

                    <div class="administradores">
                        <div class="row" v-for="us in users" :key="us.correo">
                            <rowAdmin @click="quitarAdmin(us.id)" :name="us.nombre" :correo="us.correo" :telefono="us.telefono1" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="notificaciones">
                        <success :name="mostrarmensajeSuccess" v-if="mostrarSuccess" />
                        <error :name="mostrarmensajeError" v-if="mostrarError" />
                    </div>
        </div>
    </div>
</template>



<script setup>
import btnNot from '../../components/controlesindividuales/BtnNotificacion.vue'
import rowAdmin from '../../components/Tabla/RowAdmins.vue'
import success from '../../components/Mensajes/BarAlertSuccess.vue'
import error from '../../components/Mensajes/BarAlertError.vue'
import { onMounted, ref } from 'vue'
import {deleteAdmin} from '@/stores/counter.js'
import axios from 'axios'
const nombre = ref('')
const last = ref('')
const correo = ref('')
const contrasena = ref('')
const confirmacion = ref('')
const tel1 = ref('')
const tel2 = ref('')
const users = ref([])
const useStore = deleteAdmin()
const recibirModulo = ref()

const quitarAdmin = (id) => {
    recibirModulo.value = id
    useStore.setVariable(recibirModulo.value)

};


const mostrarError = ref(false)
const mostrarSuccess = ref(false)
const mostrarmensajeSuccess = ref('')
const mostrarmensajeError = ref('')

const userData = async () => {
    try {
        const response = await axios.get('http://18.223.116.149/api/userData'); 
        users.value = response.data.data;
    } catch (error) {
        console.log(error)
    }
}

const verificar = () => {
    if (nombre.value === '' || last.value === '' || correo.value === '' || contrasena.value === '' || tel1.value === '') {
        mostrarmensajeError.value = 'Campos obligatorios'
        mostrarError.value = true
        setTimeout(() => {
            mostrarError.value = false
        }, 2000);

    } else {
        if (contrasena.value === confirmacion.value) {
            const verificarUsuario = async () => {
                try {
                    const response = await axios.post('http://18.223.116.149/api/verificarUsuario', { correo: correo.value });
                    const responseData = response.data.data;
                    const existeUsuario = responseData.data;

                    if (existeUsuario) {
                        mandarAdmin();
                    } else {
                        mostrarmensajeError.value = 'El usuario ya existe';
                        mostrarError.value = true;
                        setTimeout(() => {
                            mostrarError.value = false;
                        }, 2000);
                    }
                } catch (error) {
                    console.log(error);
                    mostrarmensajeError.value = 'Hubo un error en el servidor';
                    mostrarError.value = true;
                    setTimeout(() => {
                        mostrarError.value = false;
                    }, 2000);
                }

            }
            verificarUsuario()

        } else {
            mostrarmensajeError.value = 'La contraseña debe ser igual'
            mostrarError.value = true
            setTimeout(() => {
                mostrarError.value = false
            }, 2000);
        }
    }
}

const mandarAdmin = async () => {
    try {
        const infoAdmin = {  
            nombre: nombre.value,
            last: last.value,
            correo: correo.value,
            contrasena: contrasena.value,
            tel1: tel1.value,
            tel2: tel2.value,
            ts: "Administrador"
        };
        
        const response = await axios.post('http://18.223.116.149/api/registrarAdmin', infoAdmin);    
        users.value = response.data.data;
        mostrarmensajeSuccess.value = 'Se registró el usuario';
        mostrarSuccess.value = true;
        setTimeout(() => {
            mostrarSuccess.value = false;
        }, 2000);
    } catch (error) {
        console.log(error);
    }
}

setInterval(() => {
    userData()
}, 1000);
onMounted(userData)
</script>

<style scoped>
.app {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-rows: 0.1fr 1.9fr;
    gap: 0px 0px;
}

.title {
    padding: 30px;

}

.body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92vh;
}

.row {
    width: 100%;
}

.administradores{
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 80%;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 30px;
    width: 100%;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}


::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form button {
    align-self: flex-end;
}

.btns {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 15%;
    
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


.carta-admins {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-rows: 0.1fr 1.9fr;
    gap: 0px 0px;
    border-radius: 30px;
    height: 90%;
    width: 90%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.cuerpo-carta {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 0.6fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
        ". .";
}

.header {
    padding: 10px;
    border-bottom: 1px solid gray;
    width: 100%;
}
</style>