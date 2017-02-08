<template>
  <g>
    <layer v-for='(layer, index) of reverseLayers' :layer='layer' :cell-width='cellWidth'></layer>
  </g>
</template>

<script>
import Layer from './layer'

export default {
  name: 'layers',

  components: {
    Layer
  },

  props: [
    'layers', 'cellWidth'
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

  }
}
</script>

<style lang="css" scoped>
</style>