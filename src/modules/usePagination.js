import { computed, ref } from "vue";

export function usePagination(config) {
  const rowsPerPage = ref(config.rowsPerPage) || ref(100);
  const paginatedArray = computed(() =>
    config.ssData.value.data.values.slice(
      (config.currentPage.value - 1) * rowsPerPage.value,
      config.currentPage.value * rowsPerPage.value
    )
  );
  console.log(config.ssData.value.data.values[0]);
  console.log(paginatedArray);
  const numberOfPages = computed(() =>
    Math.ceil((config.ssData.value.length || 0) / rowsPerPage.value)
  );
  console.log(numberOfPages);
  return {
    paginatedArray,
    numberOfPages,
  };
}
