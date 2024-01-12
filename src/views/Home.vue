<template>
  <h1>Senior Options</h1>

  <button @click="getRows">Get Rows</button>
</template>

<script setup>
  // ========= Vars ======================= //

  async function getRows() {
    const ssRows = await fetch(
      "https://script.google.com/macros/s/AKfycbxAyycSrzihox8RpI2C_SNNnYyjrg6MTe-1nbvhvCZwJUyLPjObwo5FC4c9j44zOm0WPQ/exec"
    );
    console.log(ssRows);
  }
</script>
