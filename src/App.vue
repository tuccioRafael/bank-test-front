<script setup lang="ts">
import TransferPage from './view/TransferPage.vue';
</script>

<template>
  <header class="header">
    <p>Sistema de transferencia</p>
  </header>
  <div class="container">
    <TransferPage />
    
  </div>
</template>

<style scoped>
  .header {
    background-color: #333;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
  }

  .container {
    width: 100%;
    padding: 20px 50px;
  }




</style>
