import Vue from 'vue'
import App from './App.vue'
import router from "./router/routes"
import store from './store/store'
import vuelidate from 'vuelidate'
import moment from 'moment'
import Toasted from 'vue-toasted'

import AppBanner from './components/AppBanner'
import AppSpinner from './components/AppSpinner'

Vue.component('AppBanner', AppBanner)
Vue.component('AppSpinner', AppSpinner)

Vue.use(vuelidate)
Vue.use(Toasted)

Vue.filter('capitalize', function(value) {
  if (value && typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return ''
})

Vue.filter("formatDate", function (value, formatType = "LL") {
  if (!value) return "";

  return moment(value).format(formatType);
});

Vue.config.productionTip = false

require('./assets/main.scss')

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')