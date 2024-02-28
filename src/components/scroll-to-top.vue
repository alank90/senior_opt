<!-- ======================================================================= -->
<!--   A simple Vue component to render a scroll-to-top button on the page -->
<!--  ====================================================================== -->

<template>
  <img
    src="../assets/img/scroll_to_top.webp"
    id="scrollPageImg"
    alt="Scroll to top"
  />
</template>

<script setup>
  import { onMounted } from "vue";

  let el = null;

  onMounted(() => {
    el = document.getElementById("scrollPageImg");

    el.addEventListener("click", () => {
      window.scroll({
        top: 0,
        left: 25,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    if (scrollY > 200) {
      el.style.opacity = "80%";
    } else el.style.opacity = 0;
  });
</script>

<style scoped>
  img {
    width: 64px;
    position: sticky;
    bottom: -40%;
    left: 85%;
    margin-bottom: 85px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
</style>
