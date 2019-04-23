import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'

import router from './router/router'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'animate.css/animate.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
