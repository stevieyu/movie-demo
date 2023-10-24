/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
});

[
  'https://fastly.jsdelivr.net/npm/@mdi/font@7/css/materialdesignicons.min.css'
].forEach(i => {
  const s = document.createElement('link')
  s.href = i
  s.rel = 'stylesheet'
  document.head.appendChild(s)
});
