<template>
  <div class="pagination-container" aria-label="row pagination">
    <ul v-if="propNumberOfPages > 1" class="pagination">
      <li
        class="page-item"
        aria-label="go to previous page range"
        data-info="previous"
        @click="updatePageNumberBounds()"
        :class="{
          disabled: lowerBoundOfPagesToDisplay === 1,
        }"
      >
        <span class="page-link">&#x23EE;</span>
      </li>
      <li
        class="page-item"
        aria-label="go to previous page"
        @click="previous()"
        :class="{
          disabled: lowerBoundOfPagesToDisplay === props.propCurrentPage,
        }"
      >
        <span class="page-link">&laquo;</span>
      </li>

      <!--- Generate page buttons -->
      <li
        v-for="index in range(
          lowerBoundOfPagesToDisplay,
          upperBoundOfPagesToDisplay
        )"
        :key="index"
        :aria-label="'go to page ' + index"
        class="page-item"
        @click="setCurrentPage(index)"
      >
        <div
          class="page-link"
          :class="{
            'active-page': propCurrentPage === index,
          }"
        >
          {{ index }}
        </div>
      </li>
      <!-- End generate page buttons -->

      <div
        v-if="upperBoundOfPagesToDisplay < props.propNumberOfPages"
        class="morePages"
      >
        ...
      </div>

      <li
        class="page-item"
        :class="{
          disabled: propCurrentPage === upperBoundOfPagesToDisplay,
        }"
        aria-label="go to next page"
        @click="next()"
      >
        <div class="page-link">&raquo;</div>
      </li>

      <li
        class="page-item"
        data-info="next"
        :class="{
          disabled: upperBoundOfPagesToDisplay >= propNumberOfPages,
        }"
        aria-label="go to next page range"
        @click="updatePageNumberBounds()"
      >
        <div class="page-link">&#x23EF;</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";
  // ============ Variables ========================== //
  const props = defineProps({
    propNumberOfPages: {
      required: true,
      type: Number,
    },
    propCurrentPage: {
      required: true,
      type: Number,
    },
    propRowsPerPage: {
      required: true,
      type: Number,
    },
    propSheet: {
      required: true,
      type: String,
    },
  });

  const emit = defineEmits(["updatePage", "updateRange"]);

  let lowerBoundOfPagesToDisplay = ref(1);
  let upperBoundOfPagesToDisplay = ref(0);
  let range = ref([]);

  // ======= End variable declarations ================= //

  // ============= Methods ======================== //
  const setCurrentPage = (number) => {
    emit("updatePage", number);
  };
  // --------------------------------------------------------------------- //

  const previous = () => {
    if (lowerBoundOfPagesToDisplay.value === props.propCurrentPage) return;
    emit("updatePage", props.propCurrentPage - 1);
  };
  // --------------------------------------------------------------------- //

  const next = () => {
    if (props.propCurrentPage >= upperBoundOfPagesToDisplay.value) return;
    emit("updatePage", props.propCurrentPage + 1);
  };
  // --------------------------------------------------------------------- //

  const updatePageNumberBounds = (event) => {
    console.log(event);
    if (upperBoundOfPagesToDisplay.value === props.propNumberOfPages) return;
    emit("updateRange", upperBoundOfPagesToDisplay.value);

    lowerBoundOfPagesToDisplay.value = upperBoundOfPagesToDisplay.value + 1;
    if (lowerBoundOfPagesToDisplay.value + 5 > props.propNumberOfPages) {
      upperBoundOfPagesToDisplay.value = props.propNumberOfPages;
    } else {
      upperBoundOfPagesToDisplay.value += 5;
    }
  };
  // --------------------------------------------------------------------- //

  range.value = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  // --------- Watch effects ----------------------------------------------------------- //
  // The watch function updates the page range
  watch(
    () => props.propNumberOfPages,
    (newUpperBoundValueToDisplay) => {
      newUpperBoundValueToDisplay <= 5
        ? (upperBoundOfPagesToDisplay.value = newUpperBoundValueToDisplay)
        : (upperBoundOfPagesToDisplay.value = 5);
    }
  );

  // ============= End  Methods ==================== //
</script>

<style scoped>
  .pagination-container {
    display: inline-block;
  }
  .pagination {
    background: white;
    margin: 0px;
    padding: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
    border: none;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;
    align-content: center;
    border-radius: 14px;
  }
  .page-item {
    display: flex;
    cursor: pointer;
    margin-bottom: 0px;
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
  .page-link {
    color: #666b85;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 800;
  }
  .page-link:hover {
    color: #333;
    background-color: #e9e9e9;
    border: none;
  }
  .active-page {
    background-color: #5d6878 !important;
    color: white !important;
  }
  .active-page:hover {
    border: none;
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled .page-link {
    background-color: #f9fafb;
  }

  .morePages {
    vertical-align: bottom;
    font-weight: 700;
    font-size: 1.4rem;
  }
</style>
