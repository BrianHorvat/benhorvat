import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import resource from './plugins/resource'
// import * as resources from './resources'

import meta from 'vue-meta'
import VueMq from 'vue-mq'

import store from './store/'

// Vue.use(resource, {
//   resources,
//   endpoint: 'https://benhorvat.prismic.io/api/v2'
// })

Vue.use(meta)

Vue.use(VueMq, {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: Infinity,
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')