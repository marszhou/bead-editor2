<template>
  <div class="side-panel panel panel-default toolbar-panel" style='margin-bottom:0; position: relative'>
    <div class="panel-heading">
      <h3 class="panel-title">工具设置</h3>
    </div>

    <ul class="list-group">
      <li class="list-group-item">
        颜色
        <!-- <button type='button' class='color-block btn btn-default dropdown-toggle' data-toggle="dropdown" href='###'><button> -->
        <span class='color-block'
              @click.stop.prevent='handlePickClick'
              :style='{"background-color": pencilColor.hex}'></span>
        <span v-html='readableColor'></span>
      </li>
      <li class="list-group-item">
        笔触
        <div class="btn-group btn-group-xs">
          <a data-toggle='dropdown' href='###'>{{readablePencilSize}}</a>
          <ul class="dropdown-menu" role="menu">
            <li v-for='v of sizeRange' @click.prevent='setPencilSize(v)'>
              <a href="#">
              {{v}} x {{v}}
              <i class='fa fa-circle pull-right' aria-hidden="true" v-if='v === pencilSize' style='color: gray'></i>
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li class="list-group-item">
        笔擦
        <div class="btn-group btn-group-xs">
          <a data-toggle='dropdown' href='###'>{{readableEraserSize}}</a>
          <ul class="dropdown-menu" role="menu">
            <li v-for='v of sizeRange' @click.prevent='setEraserSize(v)'>
              <a href="#" >
              {{v}} x {{v}}
              <i class='fa fa-circle pull-right' aria-hidden="true" v-if='v === eraserSize' style='color: gray'></i>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class='color-picker-layer' style='position: absolute; top: 74px' v-show='show'>
      <color-picker v-model='color' @change-color='handleColorChange'></color-picker>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import { resourceMapGetters, resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'toolbar-panel',

  components: {
    'color-picker': Chrome
  },

  data() {
    return {
      color: {hex: '#000000'},
      show: false
    };
  },

  computed: {
    ...resourceMapGetters([
      'pencilColor',
      'pencilSize',
      'eraserSize'
    ], prefix),
    readableColor() {
      if (this.pencilColor.rgba) {
        const rgba = this.pencilColor.rgba
        return `<span style="color:red">${rgba.r}</span> <span style="color:green">${rgba.g}</span> <span style="color:blue">${rgba.b}</span>`
      }
    },
    sizeRange() {
      return _.range(1, 10)
    },
    readablePencilSize() {
      return `${this.pencilSize} x ${this.pencilSize}`
    },
    readableEraserSize() {
      return `${this.eraserSize} x ${this.eraserSize}`
    }
  },

  methods: {
    ...resourceMapActions([
      'setPencilColor',
      'setPencilSize',
      'setEraserSize'
    ], prefix),
    handlePickClick() {
      this.show = true
    },
    handleColorChange(color) {
      this.setPencilColor(color)
    },
    handleClickGlobal(e) {
      if (this.show && $(e.target).parents('.color-picker-layer').length === 0) {
        this.show = false
      }
    }
  },

  created() {
    $(window).on('click', this.handleClickGlobal)
  },
  beforeDestroy() {
    $(window).off('click', this.handleClickGlobal)
  }
}
</script>

<style lang="css" scoped>
span.color-block {
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid black;
  vertical-align: text-bottom;
  cursor: pointer;
}
</style>