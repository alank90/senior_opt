<template>
  <h1>Internships List</h1>
  <h2>A School</h2>

  <form>
    <ul>
      <li>
        <label for="sheetNames">Select an Internship List to View:</label>
        <select name="sheets" id="sheetNames" autofocus required>
          <option value="">--Please choose a sheet--</option>
          <option value="Animal Care">Animal Care</option>
          <option value="Athletics">Athletics</option>
          <option value="Finance/Realty">Finance/Realty</option>
          <option value="Food Services/Baking">Food Services/Baking</option>
          <option value="Legal/Non profit/outreach/religious">
            Legal/Non profit/outreach/religious
          </option>
          <option value="Marketing/editorial/books">
            Marketing/editorial/books
          </option>
          <option value="Mechanics/Enginering/Construction">
            Mechanics/Enginering/Construction
          </option>
          <option value=" Media/art/design">Media/art/design</option>
          <option value="Medical">Medical</option>
          <option value="Misc.">Misc.</option>
          <option value="Music/Drama/Dance">Music/Drama/Dance</option>
          <option value="Other education/museum">Other education/museum</option>
          <option value="Scarsdale School District">
            Scarsdale School District
          </option>
          <option value="Retail/sales">Retail/sales</option>
        </select>
      </li>
      <li>
        <label for="range">Sheet Range:</label>
        <input type="text" id="range" />
      </li>
    </ul>

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
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <th v-for="colNames in ssData.data.values[0]">{{ colNames }}</th>
        </tr>
      </thead>

      <tbody>
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <template v-for="n in ssData.data.values.length">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tr>
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <td v-for="cellData in ssData.data.values[n]">{{ cellData }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { fetchSSData } from "../modules/fetchSSData.js";

  // ========= Variable Declarations ======================= //
  const API_KEY = import.meta.env.VITE_API_SS_KEY;

  const ssID = "1H6gVpXqtmHJBHs-ZZiEHDraxGsC0KbX9owZdt6AzsF8";
  let sheet = "";
  const ssRange = "!A1:H12";
  const ssData = ref(null);

  let loadingState = false;
  // ======== End Variable Declarations ==================== //

  // ================================================================= //
  // =========== Start Methods  Section ============================== //
  // ================================================================= //

  /**
   * Description - Gets selected sheet from form and formats it and
   *   then fetches SS data Google Sheets REST API
   */
  const getSSData = async () => {
    loadingState = true;

    const formSheetSelectElement = document.getElementById("sheetNames");
    let collection = formSheetSelectElement.selectedOptions;
    sheet = collection[0].value;

    // Check if a sheet was chosen
    if (!sheet) {
      alert("Please pick a sheet to view.");
      return;
    }
    
    // Escape URI if special characters in the sheet name.
    const escapedSheet = encodeURIComponent(sheet);
    const ssURL = `https://sheets.googleapis.com/v4/spreadsheets/${ssID}/values/${escapedSheet}${ssRange}?key=${API_KEY}`;

    // Fetch SS data
    ssData.value = await fetchSSData(ssURL);
    loadingState = false;
  };
  // ================================================================= //
  // ============ End of Methods Section ============================= //
  // ================================================================= //
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 550;
    margin: 0 0 3px 0;
  }

  th {
    border: 1px solid #000;
  }

  .container {
    width: 90vw;
    max-width: 1200px;
    overflow: scroll;
    margin: 0 auto 20px;
  }

  /* ------------Form stylings ------------- */
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
    width: 150px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  form {
    /* Center the form on the page */
    margin: 0 auto;
    width: 400px;
    /* Form outline */
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 1em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  form li + li {
    margin-top: 1em;
  }

  label {
    /* Uniform size & alignment */
    display: block;
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

  .button {
    /* Align buttons with the text fields */
    padding-left: 90px; /* same size as the label elements */
  }

  button {
    /* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
    margin-left: 0.5em;
  }

  /* -------- End Form stylings ------------ */

  /* -------- Table stylings ------------ */
  table {
    border-collapse: collapse;
    border-spacing: 5px;
    table-layout: auto;
    border: 3px solid #000;
    border-radius: 5px;
    margin-left: 15px;
    width: 100%;
  }

  thead {
    border-top: 4px solid #000;
  }

  th,
  td {
    max-width: 10%;
    text-align: center;
    vertical-align: middle;
    border-collapse: collapse;
    padding: 0.3em;
    font-weight: 500;
    font-size: 0.7rem;
    caption-side: bottom;
  }

  th {
    text-align: left;
    vertical-align: middle;
    font-size: 1.1rem;
  }

  td {
    border: 1px solid #000;
  }

  /* -------- End Table stylings -------------*/
</style>
