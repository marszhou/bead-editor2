import Vue from 'vue'
import App from './App'
import eventHub from './event-hub'

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/js/bootstrap.js')
// require('assets/font-awesome-4.7.0/css/font-awesome.min.css')
require('assets/custom.css')

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
    },
    $fire(eventName, ...args) {
      eventHub.$emit(eventName, ...args)
    },
    $listen(eventName, func) {
      eventHub.$on(eventName, func)
      if (!this.$eventStack) {
        this.$eventStack = []
        this.$eventStack.push({name: eventName, handler: func})
      }
    },
    getTranslate(x, y) {
      return `translate(${x}, ${y})`
    }
  },
  beforeDestroy() {
    if (this.$eventStack && _.isArray(this.$eventStack)) {
      this.$eventStack.forEach((event) => {
        eventHub.$off(event.name, event.handler)
      })
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
