// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

//Services
import "@/services";

import "virtual:uno.css";

// Components
import App from "./App.vue";

window.HELP_IMPROVE_VIDEOJS = false;
window.__DEV__ = import.meta.env.DEV;

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
