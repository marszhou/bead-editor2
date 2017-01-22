<template>
  <div class="side-panel panel panel-default layers-panel" style='margin-bottom:0; position: relative'>
    <div class="panel-heading">
      <h3 class="panel-title">层</h3>
    </div>

    <ul class="list-group" style='overflow-y: auto' :style='{height: height + "px"}'>
      <li class="list-group-item" v-for='(layer, index) of layers'>
        {{index}}

      </li>
    </ul>

    <div class="btn-toolbar">
      <!-- <div style='font-size: 16px;'>
        <button type='button' class='btn btn-default'>
          <i class='fa' aria-hidden='true'></i>
        </button>
      </div> -->

      <div class="btn-group">
        <button type="button" class="btn btn-default layer-btn" @click='handleCreate'>
          +
        </button>
        <button type="button" class="btn btn-default layer-btn" @click='handleRemove'>
          -
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { resourceMapGetters, resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'layers-panel',

  components: {
  },

  data() {
    return {
      layers: [{}],
      currentLayer: 0,
      height: 0
    };
  },

  computed: {
    ...resourceMapGetters([

    ], prefix)
  },

  methods: {
    ...resourceMapActions([

    ], prefix),
    genNewLayer() {
      return {}
    },
    handleRemove() {
      if (this.currentLayer > -1) {
        this.layers.splice(this.currentLayer, 1)
      }
    },
    handleCreate() {
      let layer = this.genNewLayer()
      this.layers.push(layer)
    },
    handleResize() {
      let wHeight = window.document.documentElement.clientHeight
      let ret = wHeight // - $('.info-panel').get(0).getBoundingClientRect().height
                        // - $('.toolbar-panel').get(0).getBoundingClientRect().height
                        // - $('.color-mapping-panel').get(0).getBoundingClientRect().height
                        - $('#panel-tabs').get(0).getBoundingClientRect().height
                        - $('.layers-panel .panel-heading').get(0).getBoundingClientRect().height
                        - $('.layers-panel .btn-toolbar').get(0).getBoundingClientRect().height
      this.height = ret
    }
  },

  created() {
    $(window).on('resize', this.handleResize)
  },

  mounted() {
    this.$nextTick(this.handleResize)
  },

  beforeDestroy() {
    $(window).off('resize', this.handleResize)
  }
}
</script>

<style lang="css" scoped>
</style>