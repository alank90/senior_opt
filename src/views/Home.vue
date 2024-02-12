<template>
  <h1>Internships List</h1>
  <h2>A School</h2>

  <form id="form">
    <label for="sheetNames">Select an Internship List to View:</label>
    <select
      v-if="ssProperties"
      name="sheets"
      id="sheetNames"
      autofocus
      required
    >
      <template v-for="(sheetName, index) in ssProperties.data.sheets">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <option value="" v-if="index === 0">--Please choose a sheet--</option>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <option :value="sheetName.properties.title">
          {{ sheetName.properties.title }}
        </option>
      </template>
    </select>

    <label for="input-range1">Sheet Range (optional):</label>
    <input
      type="text"
      name="input-range1"
      id="input-range1"
      autocapitalize="characters"
    />
    <span id="spanSemi">:</span>
    <input
      type="text"
      name="input-range2"
      id="input-range2"
      autocapitalize="characters"
    />

    <button @click.prevent="getSSData">Get Data</button>
  </form>

  <div v-if="loadingState">
    <p>Loading...</p>
    <img src="@/assets/img/loading.gif" alt="Loading Data" />
  </div>

  <div v-if="ssData?.data.error">
    Status: {{ ssData.data.error.status }}. {{ ssData.data.error.message }}
  </div>
  <div v-else-if="ssData?.data.values" class="container">
    <table>
      <thead>
        <tr>
          <th></th>
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <th v-for="colNames in ssData.data.values[0]">
            {{ colNames }}
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <template v-for="n in paginatedSSDataArray.length">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tr v-if="currentPage === 1">
            <td>{{ n < 7 ? `${(currentPage - 1) * 7 + n}.` : "" }}</td>
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <td v-for="cellData in paginatedSSDataArray[n]">
              {{ cellData }}
            </td>
          </tr>
          <!-- Else skip 1st row in array because is column names-->
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tr v-else-if="currentPage > 1">
            <td>{{ `${(currentPage - 1) * 7 + (n - 1)}.` }}</td>
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <td v-for="cellData in paginatedSSDataArray[n - 1]">
              {{ cellData }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <table-pagination
    class="pagination-component"
    :propNumberOfPages="numberOfPagesOuterScope"
    :propCurrentPage="currentPage"
    :propRowsPerPage="rowsPerPage"
    @update-page="updateTablePageData"
    @update-range="updateTableRangeData"
  ></table-pagination>
</template>

<script setup>
  import { ref } from "vue";
  import { fetchSSData } from "../modules/fetchSSData.js";
  import TablePagination from "@/components/TablePagination.vue";
  import { createPagination } from "../modules/createPagination.js";
  import moveTitleImage from "@/modules/moveTitleImage.js";

  // ========= Variable Declarations ======================= //
  const API_KEY = import.meta.env.VITE_API_SS_KEY;

  const ssID = "1H6gVpXqtmHJBHs-ZZiEHDraxGsC0KbX9owZdt6AzsF8";
  let sheet = "";
  let ssRange = "";
  const ssData = ref(null);

  let loadingState = ref(false);
  const rowsPerPage = ref(7);
  const currentPage = ref(1);
  let numberOfPagesOuterScope = ref(0);
  let paginatedSSDataArray = ref(null);
  let ssProperties = ref(null);
  // ======== End Variable Declarations ==================== //

  // Fetch the SS resource property which contains the sheet names in the SS
  const ssPropertiesURL = `https://sheets.googleapis.com/v4/spreadsheets/${ssID}/?key=${API_KEY}`;

  // Fetch SS properties data w/sheetnames
  (async () => {
    loadingState.value = true;
    ssProperties.value = await fetchSSData(ssPropertiesURL);
    loadingState.value = false;
  })();

  // ================================================================= //
  // =========== Start Methods  Section ============================== //
  // ================================================================= //

  /**
   * Description - Gets selected sheet from form and formats it and
   *   then fetches SS data via Google Sheets REST API
   */
  const getSSData = async () => {
    loadingState.value = true;
    moveTitleImage();

    // Check if currentPage is greater then 1. If so this is from
    // a previous SS request so we should reset it to 1.
    if (currentPage.value > 1) {
      currentPage.value = 1;
    }

    // Get the form element values and store them in our variables
    const form = document.getElementById("form");
    const formData = new FormData(form);
    sheet = formData.get("sheets");
    const a1NotationValue1 = formData.get("input-range1");
    const a1NotationValue2 = formData.get("input-range2");
    const regex = /^(?:[A-Z,a-z]{1,3}[0-9]{1,7})?$/;

    // ---------- Do some input validation ------------ //
    // Check if a sheet was chosen
    if (!sheet) {
      loadingState.value = false;
      alert("Please pick a sheet to view.");
      return;
    }
    // Check input and see if its valid A1 notation
    if (!regex.test(a1NotationValue1)) {
      loadingState.value = false;
      alert("Sorry. Invalid A1 notation used.");
      return;
    } else if (a1NotationValue1 === "") {
      ssRange = "";
    } else {
      ssRange = `!${a1NotationValue1}:${a1NotationValue2}`;
    }
    // -------- End input validation ------------------ //

    // Escape URI if special characters in the sheet name.
    const escapedSheet = encodeURIComponent(sheet);
    const ssURL = `https://sheets.googleapis.com/v4/spreadsheets/${ssID}/values/${escapedSheet}${ssRange}?key=${API_KEY}`;

    // Fetch SS data
    loadingState.value = true;
    ssData.value = await fetchSSData(ssURL);
    loadingState.value = false;

    // Create pagination for the sheets table
    const { paginatedArray, numberOfPages } = createPagination({
      rowsPerPage,
      ssData,
      currentPage,
    });
    paginatedSSDataArray.value = paginatedArray.value;
    numberOfPagesOuterScope.value = numberOfPages.value;
  };

  /**
   * Description - Function triggered when page number clicked
   *  in page button from emit event update.
   * @param( @integer )- page number or next page, next page range clicked on menu
   */
  const updateTablePageData = (number) => {
    paginatedSSDataArray.value = ssData.value.data.values.slice(
      (number - 1) * rowsPerPage.value,
      number * rowsPerPage.value
    );

    currentPage.value = number;
  };

  /**
   * Description - Funcion triggered when the change page range >| button
   *  is clicked
   *  @param  ( @integer )  - The current upperBoundsPageNumberToDisplay value
   */

  const updateTableRangeData = (upperBoundPageNumber) => {
    console.log("In updateRangeData", upperBoundPageNumber);
    paginatedSSDataArray.value = ssData.value.data.values.slice(
      upperBoundPageNumber * rowsPerPage.value,
      (upperBoundPageNumber + 1) * rowsPerPage.value
    );

    currentPage.value = upperBoundPageNumber + 1;
  };

  // ================================================================= //
  // ============ End of Methods Section ============================= //
  // ================================================================= //
</script>

<style scoped>
  @import "../assets/css/table.css";

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 550;
    margin: 0 0 5px 0;
  }

  h1,
  h2 {
    font-family: var(--heading-font);
  }

  .container {
    width: 90vw;
    max-width: 1200px;
    overflow: auto;
    margin: 0 auto 20px;
  }

  img[alt="Loading Data"] {
    width: 150px;
  }

  /* ------------Form stylings ------------- */
  form {
    display: inline;
    /* Center the form on the page */
    /* Form outline */
    padding: 1em;
    border: 1px solid #636060;
    border-radius: 1em;
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }

  input,
  textarea,
  select,
  button {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  #input-range1,
  #input-range2 {
    width: 35px;
    margin: auto 3px;
  }

  #spanSemi {
    font-weight: 650;
  }
  label {
    /* Uniform size & alignment */
    display: inline-block;
    font:
      0.8rem "Fira Sans",
      sans-serif;
    text-align: center;
    padding-right: 10px;
  }

  input,
  label {
    margin: 0.4rem 0;
  }

  label:not(:first-child) {
    margin-left: 9px;
  }

  select {
    font-size: 0.7rem;
    padding: 2px 5px;
  }

  input,
  textarea {
    /* To make sure that all text fields have the same font settings
     By default, textareas have a monospace font */
    font: 1em sans-serif;

    /* Uniform text field size */
    width: 100px;
    height: 1.1rem;
    box-sizing: border-box;

    /* Match form field borders */
    border: 1px solid #999;
  }

  input:focus,
  textarea:focus {
    /* Additional highlight for focused elements */
    border-color: #000;
  }

  textarea {
    /* Align multiline text fields with their labels */
    vertical-align: top;

    /* Provide space to type some text */
    height: 5em;
  }

  button {
    width: 75px;
    height: 25px;
    /* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
    margin-left: 0.5em;
  }

  /* -------- End Form stylings ------------ */
</style>
../modules/createPagination.js
