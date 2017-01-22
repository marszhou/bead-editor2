<template>
  <div class="color-mapping-panel side-panel panel panel-default color-mapping-panel" style='margin-bottom:0; position: relative'>
    <div class="panel-heading">
      <h3 class="panel-title">颜色映射</h3>
    </div>

    <ul class="list-group" style='overflow-y: auto' :style='{height: height + "px"}'>
      <li class="list-group-item">

      </li>
    </ul>
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

    handleResize() {
      let wHeight = window.document.documentElement.clientHeight
      let ret = wHeight // - $('.info-panel').get(0).getBoundingClientRect().height
                        // - $('.toolbar-panel').get(0).getBoundingClientRect().height
                        // - $('.color-mapping-panel').get(0).getBoundingClientRect().height
                        - $('#panel-tabs').get(0).getBoundingClientRect().height
                        - $('.color-mapping-panel .panel-heading').get(0).getBoundingClientRect().height
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