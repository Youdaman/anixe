import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Vue2Filters from 'vue2-filters'

Vue.use(Buefy)
Vue.use(Router)
Vue.use(Vue2Filters)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
