import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import QrReader from "@/components/QrReader"
import QrList from "@/components/QrList"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/reader',
      name: 'QrReader',
      component: QrReader
    },
    {
      path: '/list',
      name: 'QrList',
      component: QrList
    }
  ]
})
