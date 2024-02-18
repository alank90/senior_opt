# Display Internship list for A-School w/Vue 3 + Vite

This project uses Vue 3 w/[Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) to render a table in the browser.

### App requirements

&nbsp;&nbsp; You will need a _Google Cloud API key_ to make requests. To get a key you must setup a Google Cloud project. [See this link](https://developers.google.com/workspace/guides/get-started) for instructions on how to setup a project, enable the Google Sheets API for the project, and create an API key. To get started using simple Get requests to your Sheet see [create API key](https://developers.google.com/workspace/guides/create-credentials#api-key). You will also need the Google sheets ID number, which you can get from the SS's URL.

&nbsp;&nbsp;You will also need to create an .env file to store the API key. Since we use Vite to build the app we name the env var _VITE_API_SS_KEY_ and access it thru
_import.meta.env.VITE_API_SS_KEY_. You must also store the Sheets ID in the .env file
under the key _VITE_SHEETS_ID_ and access it thru _import.meta.env.VITE_SHEETS_ID_.

**_Important_** - Remember you must also setup the environment variables in the Netlify console when deploying the App.

### Notes

We do not use the Javascript client library for Sheets in the app. We make simple /Get requests to the Sheets API and get JSON back which we then process and generate our table.

You may also need to generate a _client_secret.json_ file which will contain an email address for your project's app e.g.,_"client_email": "google-api@senior-options.iam.gserviceaccount.com"_. This email you can then use when referencing who to share the Sheet with.

### Deploying to Netlify

- **_npm run build_**

- **_netlify init_** (Follow the prompts to add a project to netlify.)

- **_netlify env:import .env_** (If necessary. You must then rebuild the project to add the environment variables to your project.)
