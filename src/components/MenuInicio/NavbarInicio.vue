<template>
    <div class="app">
        <div class="ctn">
            <div class="nomb">
                    <span class="material-symbols-outlined">
                        sound_detection_dog_barking
                    </span>
                <h3>Veterinaria</h3>
            </div>
            <MenuDesplegable/>
            <div class="middle">
                <RouterLink :to="{name: 'control'}" class="custom-link">
                    <p>Sobre nosotros</p>
                </RouterLink>
                <RouterLink :to="{name: 'citas'}" class="custom-link">
                    <p>Citas</p>
                </RouterLink>
            </div>
            <div class="aside">
                <router-link :to="{name: 'register'}" class="custom-link">
                    <p>Registrarse</p>
                </router-link>
                <RouterLink :to="{name: 'login'}" class="custom-link">
                    <p>Iniciar sesión</p>    
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ctn {
    margin-top: 1.2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

}

.nomb,
.middle,
.aside {
    display: flex;
}


.nomb {
    margin-left: 40px;
}

.middle,
.aside {
    gap: 100px;
}

.aside {
    margin-right: 40px;
}

.app {
    font-family: 'Comfortaa';
    width: 100%;
    display: flex;
    justify-content: flex-end;
    transition: all 3.2s ease;
}

p:hover {
    border-bottom: 1px solid #f6bb46;
    cursor: pointer;
}
span{
    font-size: 2em;
}






/*==========================Resoluciones=============================*/

@media screen and (max-width: 768px) {
    /*====================Small tablets y mobil======================*/
    .ctn{
        margin-left: 15%;
    }
    .middle,
    .aside {
        display: none;
    }
  
}

@media screen and (max-width: 1268px) {
    /*====================Small tablets y mobil======================*/
    .ctn{
        width: 100%;
        justify-content: flex-start;
    }

    .middle, .aside{
        margin-left: 5em;
    }
}

.custom-link{
    text-decoration: none !important;
    color: black;
}

</style>