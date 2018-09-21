// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import meta from 'vue-meta'
import App from './App'
import * as resources from './resources'
import resource from './plugins/resource'
import router from './router'
import store from './store'

require('web-animations-js/web-animations.min')

// Vue.config.productionTip = false

Vue.use(resource, {
  resources,
  endpoint: 'https://benhorvat.prismic.io/api/v2'
})

Vue.use(meta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
