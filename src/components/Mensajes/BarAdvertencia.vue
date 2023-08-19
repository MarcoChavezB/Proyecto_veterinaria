<template>
    <transition name="slide-out" mode="out-in">
        <div v-if="isVisible" class="app">
            <div class="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            <div class="izquierdo">
                
                <div class="txt">
                    <p>{{ name }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>
  
<script setup>
import { ref, onMounted, defineProps } from 'vue';

defineProps({
    name: {
        type: String,
    }
})

const isVisible = ref(true);


onMounted(() => {
    setTimeout(() => {
        isVisible.value = false
    }, 4000);
});
</script>
<style scoped>
@keyframes slide-in {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}



.app {
    display: flex;
    border-radius: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
    color: black;
    height: 8em;
    width: 25em;
    position: fixed;
    top: 45em;
    gap: 10px;
    right: -1em;
    z-index: 999;
    animation: slide-in 0.2s ease-in-out;
    border: 1px dashed gray;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.1);

}

.izquierdo {
    width: 16em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: #4c86f9;
    --second-color: #49a84c;
    --third-color: #f6bb02;
    --fourth-color: #f6bb02;
    --fifth-color: #2196f3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    gap: 6px;
    height: 50px;
}

.loading span {
    width: 4px;
    height: 50px;
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
}

.loading span:nth-child(2) {
    background: var(--second-color);
    animation-delay: -0.8s;
}

.loading span:nth-child(3) {
    background: var(--third-color);
    animation-delay: -0.7s;
}

.loading span:nth-child(4) {
    background: var(--fourth-color);
    animation-delay: -0.6s;
}

.loading span:nth-child(5) {
    background: var(--fifth-color);
    animation-delay: -0.5s;
}

@keyframes scale {

    0%,
    40%,
    100% {
        transform: scaleY(0.05);
    }

    20% {
        transform: scaleY(1);
    }
}

.txt {
    margin-left: 20px;
    height: 100%;
    width: 200em;
    display: flex;
    justify-content: center;
    align-items: center;
}</style>