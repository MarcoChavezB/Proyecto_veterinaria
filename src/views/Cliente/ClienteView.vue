<template>
    <div class="container-fluid">
        <div class="header">
            <headerMenu/>
        </div>
        <div class="body">
          <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import headerMenu from '../../components/cliente/menuComponents/header.vue'
</script>

<style scoped>

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container-fluid {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr;  /* Update this line */
    grid-template-rows: 0.2fr 1.8fr;
    gap: 0px 0px;
    grid-template-areas:
        "."
        ".";
}

.body {
    margin: 0;
    padding: 0;
}
</style>
