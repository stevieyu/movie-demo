import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';


export default {
  install(app) {
    app.directive('tooltip', Tooltip);
    app.use(PrimeVue, {
      // unstyled: true
      ripple: true,
      locale: {
        // accept: 'Aceptar',
        // reject: 'Rechazar',
      }
    })
  }
};

[
  'https://fastly.jsdelivr.net/npm/primeicons@6/primeicons.min.css',
  // 'https://fastly.jsdelivr.net/npm/primevue/resources/themes/lara-light-blue/theme.min.css',
  'https://fastly.jsdelivr.net/npm/primevue/resources/themes/lara-dark-blue/theme.min.css'
].forEach(i => {
  const s = document.createElement('link')
  s.href = i
  s.rel = 'stylesheet'
  document.head.appendChild(s)
});


