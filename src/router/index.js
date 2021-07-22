import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import TransactionList from '@/views/TransactionList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TransactionList',
    component: TransactionList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
