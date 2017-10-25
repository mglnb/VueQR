// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'

Vue.config.productionTip = false


/**
 * A Firebase db
 */
import db from './firebase'
Vue.use(VueFire) 
Vue.prototype.$db = db;

 


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
