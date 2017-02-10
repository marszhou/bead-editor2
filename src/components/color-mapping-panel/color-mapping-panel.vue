<template>
  <div class="color-mapping-panel side-panel panel panel-default color-mapping-panel" style='margin-bottom:0; position: relative'>
    <div class="panel-heading">
      <h3 class="panel-title">颜色映射</h3>
    </div>

    <ul class="list-group" style='overflow-y: auto' :style='{height: height + "px"}'>
      <li class="list-group-item" v-for='(count, color) of colorStatics.colors'>
        <div class="btn-group btn-group-xs">
          <a class='color-block dropdown-toggle'
             href='###'
             :style='{"background-color": color}'
             data-toggle='dropdown'></a>
          <ul class="dropdown-menu" role="menu">
            <li>
              <a href='#' @click.prevent='handleResetColorDialogOpen'>
                重设颜色
              </a>
            </li>
            <li>
              <a href='#' @click.prevent='generateLayerFromColor({color: color})'>
                创建图层
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="#" @click.prevent='removeColor({color: color})'>
                清除
              </a>
            </li>

          </ul>
        </div>
        {{color}} <span class="badge">{{count}}</span>
      </li>
    </ul>

    <reset-color-dialog ref='resetColorDialog'></reset-color-dialog>
  </div>
</template>

<script>
import { resourceMapGetters, resourceMapActions } from 'utils/func'
import ResetColorDialog from './reset-color-dialog'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'layers-panel',

  components: {
    ResetColorDialog
  },

  data() {
    return {
      height: 0
    };
  },

  computed: {
    ...resourceMapGetters([
      'colorStatics'
    ], prefix)
  },

  methods: {
    ...resourceMapActions([
      'removeColor',
      'generateLayerFromColor'
    ], prefix),

    handleResize() {
      let wHeight = window.document.documentElement.clientHeight
      let ret = wHeight // - $('.info-panel').get(0).getBoundingClientRect().height
                        // - $('.toolbar-panel').get(0).getBoundingClientRect().height
                        // - $('.color-mapping-panel').get(0).getBoundingClientRect().height
                        - $('#panel-tabs').get(0).getBoundingClientRect().height
                        - $('.color-mapping-panel .panel-heading').get(0).getBoundingClientRect().height
      this.height = ret
    },

    handleResetColorDialogOpen() {
      console.log(this.$refs.resetColorDialog)
      this.$refs.resetColorDialog.show()
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