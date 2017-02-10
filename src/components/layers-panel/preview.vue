<template>
  <svg class='preview'>
    <layer :layer='layer'
           :cell-width='cellWidth'
           :preview='true'
           :visible='true'
           ></layer>
  </svg>
</template>

<script>
import Layer from 'components/editor/layer'
import { resourceMapGetters } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {
  name: 'layer-preview',

  props: ['layer'],

  components: {
    Layer
  },

  data() {
    return {

    };
  },

  computed: {
    ...resourceMapGetters([
      'editorSize',
      'editorDimension'
    ], prefix),

    cellWidth() {
      return Math.min(48 / this.editorSize.columns, 48 / this.editorSize.rows)
    }
  },

  methods: {

  }
}
</script>

<style lang="css" scoped>
</style>