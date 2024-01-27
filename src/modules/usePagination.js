import { computed, ref } from "vue";

export function usePagination(config) {
  // ======= Vars ========== //
  console.log(config);
  const rowsPerPage = config.rowsPerPage.value || ref(10);
  console.log(config.currentPage.value, rowsPerPage);

  const paginatedArray = computed(() =>
    config.ssData.value.data.values.slice(
      (config.currentPage.value - 1) * rowsPerPage,
      config.currentPage.value * rowsPerPage
    )
  );
  console.log(paginatedArray);

  const numberOfPages = computed(() =>
    Math.ceil((config.ssData.value.data.values.length || 0) / rowsPerPage)
  );

  return {
    paginatedArray,
    numberOfPages,
  };
}
