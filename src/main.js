import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import "./assets/css/reset.css";
import "./assets/css/style.css";

// ========== Create main Vue App ================== //
createApp(App).use(router).mount("#app");
