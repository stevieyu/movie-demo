/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
// import vuesax from './vuesax'
import pinia from '../store'
import router from '../router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    // .use(vuesax)
    .use(router)
    .use(pinia)
}
