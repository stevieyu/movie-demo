// https://www.vuesax.space/guide/getting-started.html
import vuesax from 'vuesax-alpha'
import 'vuesax-alpha/theme-chalk/index.css'
// dark mode
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'

export default {
  install(app) {
    app.use(vuesax)
  }
}
