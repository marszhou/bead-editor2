<template>
  <g v-if='visible' :transform='getTranslate(layer.translation.x * cellWidth, layer.translation.y * cellWidth)'>
    <circle v-if='!preview' v-for='cell of cells'
          :cx='cell.x * cellWidth + cellWidth/2'
          :cy='cell.y * cellWidth + cellWidth/2'
          :r='cellWidth * 0.3'
          :style='{stroke: cell.color, strokeWidth: cellWidth * 0.35, fill: "rgba(0,0,0,0)"}'></circle>
    <rect v-if='preview' v-for='cell of cells'
          :style='{fill: cell.color}'
          :x='cell.x * cellWidth'
          :y='cell.y * cellWidth'
          :width='cellWidth'
          :height='cellWidth'
          >
    </rect>
  </g>
</template>

<script>
// import { resourceMapActions, resourceMapGetters } from 'utils/func'

export default {

  name: 'layer',

  props: ['layer', 'cellWidth', 'visible', 'preview'],

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