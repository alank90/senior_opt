import { ref } from "@vue/reactivity";
import axios from "axios";

import { usePagination } from "./usePagination";


export function useSheetsApi(currentPage, rowsPerPage) {
  const todos = ref([]);

  const todosAreLoading = ref(false);

  const { paginatedArray, numberOfPages } = usePagination({
    rowsPerPage,
    arrayToPaginate: todos,
    currentPage,
  });

  const loadTodos = async () => {
    todosAreLoading.value = true;
    try {
      const result = await axios.get(URL);
      todos.value = result.data;
    } catch (err) {
      console.log(err);
    } finally {
      todosAreLoading.value = false;
    }
  };

  return {
    todos: paginatedArray,
    loadTodos,
    todosAreLoading,
    numberOfPages,
  };
}
