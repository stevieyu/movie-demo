/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import urql from './urql'
import pinia from '../store'
import router from '../router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    // .use(vuesax)
    .use(urql)
    .use(router)
    .use(pinia)
}
