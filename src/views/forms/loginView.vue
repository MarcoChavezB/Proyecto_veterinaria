<template>
    <div class="app">
        <div class="img">
            <div class="imagen"></div>
        </div>
        <div class="login ">
            <div class="header">
                <h5>Veterinaria cachorros</h5>
                <div class="logo"></div>
            </div>
            <div class="formulario ">
                <div class="form">

                    <h1>Welcome Back!</h1>
                    <p>Por favor, ingrese sus credenciales.</p><br>
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
                        <input v-model="email" placeholder="Ingresa tu Email" class="input" type="text" @keyup.enter="login">
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
                        <input v-model="pass" placeholder="Ingresa tu contraseña" class="input" type="password" @keyup.enter="login">
                    </div>
                    <!-- <router-link :to="{name: 'MenuCliente'}"> -->
                    <button @click="login" class="button-submit">Sign In</button>
                    <!-- </router-link> -->
                    <p class="p">¿No tienes una cuenta?
                        <router-link :to="{ name: 'register' }" class="custom-link">
                            <span class="span">Regístrate</span>
                        </router-link>

                    </p>

                </div>
            </div>
            <div class="btnSalir d-flex align-items-center justify-content-end">
                <btn_salir />
            </div>
        </div>
        <!--Mensaje de error-->

        <div v-if="ShowWarning" class="err">
            <Error :title="errMessage" />
        </div>
        <div v-if="ShowSuccess" class="err">
            <Success :title="succMessage" />
        </div>
    </div>
</template>



<script>
import Error from '../../components/Mensajes/Error.vue'
import Success from '../../components/Mensajes/Success.vue'
import axios from 'axios'
import { useUsuarioStore } from "@/stores/UsuariosStore";

export default {
    components: {
        Error,
        Success
    },
    data() {
        return {
            email: '',
            pass: '',
            ShowWarning: false,
            ShowSuccess: false,
            errMessage: '',
            succMessage: '',
            usuarioStore: useUsuarioStore(),
        }
    },
    methods:{
        showMessage(type, message){
            if(type === 'error'){
                this.ShowWarning = true
                this.errMessage = message
                setTimeout(() => {
                    this.ShowWarning = false
                }, 3000)
            }else{
                this.ShowSuccess = true
                this.succMessage = message
                setTimeout(() => {
                    this.ShowSuccess = false
                }, 3000)
            }
        },
        async login() {
            try {
                const data = {
                    correo: this.email,
                    contra: this.pass
                };

                const response = await axios.post('http://18.223.116.149/api/usuario/login', data);
                const tipoUsuario = response.data.data.tipo_usuario;
                console.log(response.data.data)
                if (tipoUsuario === 'Administrador') {
                    this.usuarioStore.setUser(response.data.data);
                    this.usuarioStore.setToken(response.data.jwt);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
                    this.$router.push('/control');
                } else {
                    this.usuarioStore.setUser(response.data.data);
                    this.usuarioStore.setToken(response.data.jwt);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
                    this.$router.push('/cuerpo');
                }

                this.showMessage('success', response.data.msg);
            } catch (error) {
                console.error(error);
                this.showMessage('error', 'No se encontro el usuario');
            }
        }

    }
}
</script>
<!-- 
<script setup>
import error from '../../components/Mensajes/Error.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { dataLog } from '@/stores/counter.js'
import btn_salir from '../../components/ControlesIndividuales/OutBtn.vue'
import axios from 'axios';

const email = ref('');
const pass = ref('');

const router = useRouter();
var mostrarError = ref();

const ShowWarning = ref(false);

const redirectToPage = () => {
    router.push('/cuerpo');
};

const redirectToPageAdmin = () => {
    router.push('/control');
}


import { useUsuarioStore } from "@/stores/UsuariosStore";

let usuarioStore = useUsuarioStore();
let valid = ref(true)

function login() {
    if (!valid.value) {
        return
    }
    let usuario = ref({
        correo: email.value,
        contra: pass.value
    })
    fetch('http://18.223.116.149/api/auth', {
        method: 'POST',
        body: JSON.stringify(usuario.value),
    }).then(response => response.json())
        .then(data => {
            if (data.status != 200) {
              ShowWarning.value = true;
              setTimeout( () => {
                ShowWarning.value = false;
              }, 3000)
                return
            }
            if (
                (usuario.value.correo === 'veterinaria@gmail.com' && usuario.value.contra === 'veterinaria') ||
                (usuario.value.correo === 'root@utt.com' && usuario.value.contra === 'qwerty-1234')
            ) {
                redirectToPageAdmin();
                usuarioStore.setUser(data.data);
            } else {
                usuarioStore.setUser(data.data);
                redirectToPage();
            }
        });
}



</script> -->




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
    height: 100vh;
    border-radius: 2em 0 0 2em;
    background-color: white;
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
    background-color: #fac134;
}

.form {
    display: flex;
    flex-direction: column;
}

.btnSalir {
    margin-bottom: 50px;
    margin-bottom: 50px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 550px;
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
    background-color: #151717;
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

.btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
}


.login {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1.5fr;
    grid-template-rows: 0.2fr 1.8fr;
    gap: 0px 0px;
    grid-template-areas:
        "."
        ".";
}

.formulario {
    display: flex;
    justify-content: center;
    align-items: center;
}

.header {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    align-items: center;
}

.logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    margin-left: 10px;
    margin-right: 10px;
    background-repeat: no-repeat;

}

.app {
    position: relative;
    right: 12px;
}

.img {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100vh;
    background-image: url('../../assets/img/loginSinFondo.png');
    background-size: 30em;
    background-repeat: no-repeat;
    background-position: center bottom;
}



@media (max-width: 680px) {
    .app {
        background-color: white;
    }

    .img {
        display: none;
    }

    .formulario {
        width: 122%;
    }
}
</style>