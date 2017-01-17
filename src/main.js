import Vue from 'vue'
import App from './App'

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/js/bootstrap.js')

import {timeDisplay, percent} from 'utils/func'
Vue.filter('translate', (v) => `translate(${v})`)
Vue.filter('embrace', (v, func, ...params) => `${func}(${v}${params.length > 0 ? ',' + params.join(',') : ''})`)
Vue.filter('timeDisplay', timeDisplay)
Vue.filter('percent', percent)

Vue.mixin({
  methods: {
    $$emit(eventName, args) {
      var argsCopy = Array.prototype.slice.call(args)
      argsCopy.unshift(eventName)
      this.$emit.apply(this, argsCopy)
    }
  }
})

import store from './store/store'
const router = require('./routes')(store)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: 'app',
  template: '<App/>',
  components: { App }
})
