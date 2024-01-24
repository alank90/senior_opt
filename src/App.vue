<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <img alt="SHS Building" src="./assets/img/shs_building.webp" />

  <!-- =============== route outlet ============================================= -->
  <!-- component matched by the route will render here ========================== -->
  <router-view></router-view>
  <!-- =============== End route outlet ========================================= -->
</template>

<style>
  @import "/src/assets/css/style.css";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  img[alt="SHS Building"] {
    max-width: 300px;
  }
</style>
