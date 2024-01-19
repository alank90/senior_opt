<template>
  <h1>Senior Options</h1>

  <button @click="retrieveSSData">Get Data</button>

  <div v-if="ssData">{{ ssData.data.range }}</div>
</template>

<script setup>
  import { ref } from "vue";
  import { useFetch } from "../modules/useFetch.js";

  // ========= Variable Declarations ======================= //
  const API_KEY = import.meta.env.VITE_API_SS_KEY;
  const ssID = "12NuSzSyIIoVf5oQv2YyjLyGKYe4Pyyme0oPPj7G2pK0";
  const ssURL = `https://sheets.googleapis.com/v4/spreadsheets/${ssID}/values/students!A2:D10?key=${API_KEY}`;
  const ssData = ref(null);

  // Fetch the SS data

  const retrieveSSData = async () => {
    ssData.value = await useFetch(ssURL);
  };
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
</style>
