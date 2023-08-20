<template>
    <div class="app">
        <div class="sec1">
            <h5>
                <span class="material-symbols-outlined">
                    inventory_2
                </span>Productos
            </h5>
            <RouterLink :to="{name: 'catalogo'}" class="custom-link">
                    <p>¡Nuestros productos!</p>
            </RouterLink>
        </div>
        <div class="sec2">
            <h5>
                <span class="material-symbols-outlined">
                    upload_file
                </span>
                Citas
            </h5>
            <RouterLink  :to="{name: 'citas'}" class="custom-link"><p>¡Agenda una cita o registra a tu mascota!</p></RouterLink>
        </div>
        <div class="sec3">
            <h5>
                <span class="material-symbols-outlined">
                    location_on
                </span>Ubicacion
            </h5>
            <p>¡Descubre nuestra ubicacion!</p>
        </div>
    </div>
</template>

<style scoped>
.app {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 6em;
    width: 50em;
    background-color: white;
    border-radius: 1em;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
}

.sec2{
    display: flex;
    justify-content: center;
    border-left: 1px solid rgb(224, 216, 216);
    border-right: 1px solid rgb(224, 216, 216);
    width: 15em;
    
}

.sec1, .sec3{
    width: 15em;
    display: flex;
    justify-content: center;
}

.sec1, .sec2 , .sec3{
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    transition: all 300ms ease;
}

.sec1:hover{
    transform: scale(1.1);
}
.sec2:hover{
    transform: scale(1.1);
}
.sec3:hover{
    transform: scale(1.1);
}

p{
    color: black;
    text-align: center;
}


/*==========================Resoluciones=============================*/

@media screen and (max-width: 567.98px) {
    /*====================Small tablets y mobil======================*/
    span{
        font-size: 20px;
    }
    .app{
        font-size: 10px;
        margin-top: 10;
        width: 90%;
        height: 9em;
    }
    p{
        display: none;
    }
}


</style>