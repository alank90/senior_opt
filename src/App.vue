<template>
  <app-navbar></app-navbar>
  <img
    alt="SHS Building"
    id="titleImage"
    src="./assets/img/shs_building_small.webp"
  />

  <!-- =============== route outlet ============================================= -->
  <!-- component matched by the route will render here ========================== -->
  <router-view></router-view>
  <!-- =============== End route outlet ========================================= -->
</template>

<script setup>
  import appNavbar from "/src/components/app-navbar.vue";
</script>

<style>
  @import "/src/assets/css/style.css";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .moveImage {
    opacity: 0;
    transition: opacity 0.4s ease-out;
  }

  .moveApp {
    transform: translateY(-15%);
    transition: transform 0.4s ease-out;
  }

  img[alt="SHS Building"] {
    max-width: 300px;
  }

  @media only screen and (max-width: 760px) {
    .moveApp {
      transform: translateY(-8%);
      transition-duration: 1.2s;
    }
  }
</style>
