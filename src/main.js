/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

//Services
import('@/services')

window.HELP_IMPROVE_VIDEOJS = false;
window.__DEV__ = import.meta.env.DEV

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
