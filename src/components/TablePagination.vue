<template>
  <ul>
    <li>
      <button type="button">First</button>
    </li>

    <li>
      <button type="button">Previous</button>
    </li>

    <!-- Visible Buttons Start -->

    <li v-for="page in pages" :key="page.name">
      <button type="button" :disabled="page.isDisabled">
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li>
      <button type="button">Next</button>
    </li>

    <li>
      <button type="button">Last</button>
    </li>
  </ul>
</template>

<script setup>
  import { computed } from "vue";

  // ========= Variables ================== //
  let maxVisibleButtons = 3;
  let totalPages = 0;
  let perPage = 0;
  let currentPage = 0;

  /* ========== Computed Properties ================= */
  const startPage = computed(() => {
    // When on the first page
    if (currentPage === 1) {
      return 1;
    }

    // When on the last page
    if (currentPage === totalPages) {
      return totalPages - maxVisibleButtons;
    }

    // When inbetween
    return currentPage - 1;
  });

  const pages = computed(() => {
    const range = [];

    for (
      let i = startPage;
      i.value <=
      Math.min(startPage.value + maxVisibleButtons - 1, totalPages);
      i.value++
    ) {
      range.push({
        name: i,
        isDisabled: i.value === currentPage,
      });
    }

    return range;
  });

  /* ========== End of Computed Properties ================= */
</script>
