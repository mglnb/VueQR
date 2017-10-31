// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import 'vue-event-calendar/dist/style.css'
import VueEventCalendar from 'vue-event-calendar'


Vue.use(VueEventCalendar, {locale: 'pt-br', color: '#42b983'})
Vue.config.productionTip = false


/**
 * A Firebase db
 */
import firebase from './firebase'
Vue.use(VueFire) 
Vue.prototype.$db = firebase.db
Vue.prototype.$auth = firebase.auth


firebase.auth.onAuthStateChanged((user) => {
  if(user) {
    localStorage['user'] = JSON.stringify({
      displayName: user.displayName || user.email,
      email: user.email,
      emailVerified : user.emailVerified || false,
      photoURL: user.photoURL || false,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      providerData: user.providerData || false,
    })
  } else {
    localStorage.removeItem('user')
  }
})
 
router.beforeEach((to,from, next) => {
  let user = firebase.auth.currentUser
  if(to.matched.some(record=> record.meta.requireAuth)) {
    if (!user) {
      console.log('não tá logado')
      next('/login')
    } else {
      console.log('logado')
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
