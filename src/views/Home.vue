<template>
  <h1>Internships List</h1>
  <h2>A School</h2>

  <button @click="getSSData">Get Data</button>

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
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <td v-for="colNames in ssData.data.values[0]">
            <th >{{ colNames }}</th>
          </td>
        </thead>

        <tbody>
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <template v-for="n in ssData.data.values.length">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tr>
             <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <td v-for="cellData in ssData.data.values[n]"> {{ cellData }}</td>
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
  const sheet = ref("Animal Care");
  const ssRange = ref("!A1:H14");
  const ssURL = `https://sheets.googleapis.com/v4/spreadsheets/${ssID}/values/${sheet.value}${ssRange.value}?key=${API_KEY}`;
  const ssData = ref(null);

  let loadingState = false;
  // ======== End Variable Declarations ==================== //

  // Fetch the SS data
  const getSSData = async () => {
    loadingState = true;
    ssData.value = await fetchSSData(ssURL);
    loadingState = false;
  };
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

  .container {
    overflow: scroll;
  }
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
    font-size: .7rem;
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
