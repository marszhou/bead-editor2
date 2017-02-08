<template>
  <g>
    <layer v-for='(layer, index) of reverseLayers'
           :layer='layer'
           :cell-width='cellWidth'
           :visible='isLayerVisible(layer)'></layer>
  </g>
</template>

<script>
import Layer from './layer'
const { isLayerVisible } = require('store/modules/bead-app')

export default {
  name: 'layers',

  components: {
    Layer
  },

  props: [
    'layers', 'cellWidth', 'onlyLayer'
  ],

  data() {
    return {

    };
  },

  computed: {
    reverseLayers() {
      return _.reverse(this.layers.slice())
    }
  },

  methods: {
    isLayerVisible(layer) {
      return isLayerVisible(layer)
    }
  }
}
</script>

<style lang="css" scoped>
</style>