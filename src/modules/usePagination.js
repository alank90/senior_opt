import { computed, ref } from "vue";

export function usePagination(config) {
  // ======= Vars ========== //
  const rowsPerPage = config.rowsPerPage.value || ref(10);

  const paginatedArray = computed(() =>
    config.ssData.value.data.values.slice(
      (config.currentPage.value - 1) * rowsPerPage,
      config.currentPage.value * rowsPerPage
    )
  );

  const numberOfPages = computed(() =>
    Math.ceil((config.ssData.value.data.values.length || 0) / rowsPerPage)
  );

  return {
    paginatedArray,
    numberOfPages,
  };
}
