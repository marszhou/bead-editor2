<template>
  <g v-if='visible' :transform='getTranslate(layer.translation.x * cellWidth, layer.translation.y * cellWidth)'>
    <circle v-for='cell of cells'
          :cx='cell.x * cellWidth + cellWidth/2'
          :cy='cell.y * cellWidth + cellWidth/2'
          :r='cellWidth * 0.3'
          :style='{stroke: cell.color, strokeWidth: cellWidth * 0.35, fill: "rgba(0,0,0,0)"}'></circle>
    <a v-for='cell of cells'>{{cell}}</a>
  </g>
</template>

<script>
// import { resourceMapActions, resourceMapGetters } from 'utils/func'

export default {

  name: 'layer',

  props: ['layer', 'cellWidth', 'visible'],

  data() {
    return {

    };
  },

  computed: {
    cells() {
      return _.values(this.layer.data)
    }
  },

  methods: {

  }
}
</script>

<style lang="css" scoped>
</style>