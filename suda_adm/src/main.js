import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from "element-ui";

Vue.config.productionTip = false

Vue.use(ElementUI)

import Http from './http';
Vue.prototype.$http = Http


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
