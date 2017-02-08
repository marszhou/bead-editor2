<template>
  <g :transform='getTranslate(layer.translation.x * cellWidth, layer.translation.y * cellWidth)'>
    <rect v-for='cell of cells'
          :x='cell.x * cellWidth'
          :y='cell.y * cellWidth'
          :width='cellWidth'
          :height='cellWidth'
          :style='{fill: cell.color}'></rect>
    <a v-for='cell of cells'>{{cell}}</a>
  </g>
</template>

<script>
// import { resourceMapActions, resourceMapGetters } from 'utils/func'

export default {

  name: 'layer',

  props: ['layer', 'cellWidth'],

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