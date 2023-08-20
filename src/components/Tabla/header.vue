<template>
    <div class="title">
        <p id="titulo">Manage Products</p>
        <div class="header">
            <div class="publicos">
                <router-link :to="{ name: 'productosPublicos' }" class="custom-link">
                <h3>
                    <span class="material-symbols-outlined">dynamic_form</span>
                    Productos públicos
                </h3>
            </router-link>
            </div>
            
            <router-link :to="{ name: 'productosInternos' }" class="custom-link">
                <h3>
                    <span class="material-symbols-outlined">trending_up</span>
                    Productos internos
                </h3>
            </router-link>
        </div>
        <div class="img">
            <span class="material-symbols-outlined">account_circle</span>
        </div>
    </div>
    
</template>

<style scoped>

.header{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 75%;
}
.title {
    
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    margin: 20px 0px 20px 0px;
}

#titulo {
    font-size: 20px;
    margin-left: 17px;
}

.title span {
    color: black;
    font-size: 37px;
    margin-right: 17px;
}

h3{
    color: black;
    font-size: 20px;
}

.header h3 .material-symbols-outlined {
    font-size: 30px;
}


</style>