import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Vue2Filters from 'vue2-filters'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

Vue.use(Buefy)
Vue.use(Router)
Vue.use(Vue2Filters)
Vue.use(flatPickr)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
