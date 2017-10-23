// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import db from './firebase'

Vue.config.productionTip = false
Vue.use(VueFire)

 


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  firebase: {
   codes: {
     source: db.ref('codes')
   }
  },
  components: { App }
})
