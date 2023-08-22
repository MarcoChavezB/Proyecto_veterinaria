<template>
  <input class="inputs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: String
})
</script>

<style scoped>
 .inputs{
    font-family: inherit;
    font-size: inherit;
    box-shadow: 0 0 1em #00000018;
    border: none;
    color: #646464;
    padding: 0.7rem 1rem;
    border-radius: 30px;
    width: 18em;
    transition: all ease-in-out .5s;
    margin-right: -2rem;
   text-align: center;
  }

  .inputs:hover{
    box-shadow: 0 0 1em #00000013;
  }

  .inputs:focus{
    outline: none;
    background-color: #f0eeee;
  }

  .inputs::-webkit-input-placeholder {
    font-weight: 100;
    color: #929090;
  }

  @media (max-width: 767px) {
    .inputs{
      width: 10em;
    }
   }
</style>