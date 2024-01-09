<template>
  <h1>Senior Options</h1>

  <button @click="getRows"></button>
</template>

<script setup>
  import { google } from "googleapis";

  // ========= Vars ======================= //
  const ssID = "12NuSzSyIIoVf5oQv2YyjLyGKYe4Pyyme0oPPj7G2pK0";

  /**
   * Description - Function for authentication object.
   *  First creates created a new Google auth object so that we can authorize the API request.
   *  Second, the authClient variable stores the service account details (client instance) from the getClient() method
   *  Third, we create an instance of the Google Sheets API.
   *  Lastly, we return the variables so that we can access the spreadsheet values in any routes of the app.
   * @returns - auth, authClient & sheets
   */
  async function authSheets() {
    const auth = new google.auth.GoogleAuth({
      keyfile: "keys.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Create client instance for auth
    const authClient = await auth.getClient();

    // Instance of the Sheets API
    const sheets = google.sheets({ version: "v4", auth: authClient });

    return {
      auth,
      authClient,
      sheets,
    };
  }

  // Now, to get the data from the spreadsheet, we'll use the sheets.spreadsheets.values.get method
  const { sheets } = await authSheets();

  /**
   * Description - Function to retrieve rows from SS
   */
  const getRows = async () => {
    // Read rows from spreadsheet
    const readRows = await sheets.spreadsheets.values.get({
      spreadsheetId: ssID,
      range: "students!A1:C7",
    });
    console.log(readRows);
  };
</script>
