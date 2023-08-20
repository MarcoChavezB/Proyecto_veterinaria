<template>
    <div v-if="mostrar" class="card">
        <div class="header">
            <div class="image"><svg aria-hidden="true" stroke="green" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                    <path d="M5.2 12.4l3.5 3.5 8.8-8.8" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
            <div class="content">
                <span class="title">¡Se ha registrado correctamente! <br> :)</span>
                <p class="message">Se redirigirá al login para acceder a su cuenta</p>
            </div>
            <div class="actions">
                <button @click="quitar" class="cancel" type="button">Entendido</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();


const mostrar = ref(true);

const quitar = () => {
    mostrar.value = false;
    redirectToPage()
}

const redirectToPage = () => {                                                      // Router
    router.push('/login');
};

</script>

<style scoped>
.card {
    overflow: hidden;
    position: relative;
    background-color: #ffffff;
    text-align: left;
    border-radius: 0.5rem;
    max-width: 290px;
    max-height: 290px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}


.header {
    padding: 1.25rem 1rem 1rem 1rem;
    background-color: #ffffff;
}

.image {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #C7F3C7;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
}

.image svg {
    color: red;
    width: 3.5rem;
    height: 1.5rem;
}

.content {
    margin-top: 0.75rem;
    text-align: center;
}

.title {
    color: #111827;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
}

.message {
    margin-top: 0.5rem;
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.actions {
    margin: 0.75rem 1rem;
    background-color: #F9FAFB;
}

.cancel {
    display: inline-flex;
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    color: #374151;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    justify-content: center;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid #D1D5DB;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>