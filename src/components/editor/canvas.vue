<template>
  <g :transform='getTranslate(rect.x, rect.y)'
     clip-path='url(#canvasMask)'
     :style='{cursor: cursor}'>
    <g :transform='getTranslate((-viewPort.x1 * cellWidth), (-viewPort.y1 * cellWidth))'
       ref='canvas'
       @click='handleClick'
       @mousedown='handleMouseDown'
       @mousemove='handleMouseMove'
       @mouseleave='handleMouseOut'
       @mouseenter='handleMouseIn'>
      <!-- <rect :width='columns * cellWidth' :height='rows * cellWidth' fill='url(#transparentBackground)'></rect> -->
      <!-- layers -->
      <layers :layers='layers' :cell-width='cellWidth' :only-layer='onlyLayer'></layers>
      <grid :columns='columns' :rows='rows' :cell-width='cellWidth' :show-line='true' :show-dot='true'></grid>
      <indicator :position='indicatorPosition'
                 :size='indicatorSize'
                 :color='indicatorColor'
                 v-if='indicatorVisible'></indicator>
    </g>
  </g>
</template>

<script>
import Grid from './grid'
import Indicator from './indicator'
import Layers from './layers'
import { resourceMapActions, resourceMapGetters } from 'utils/func'
import {items as ToolbarItems} from 'components/toolbar/const'
const { prefix, isLayerVisible, findLayer } = require('store/modules/bead-app')

export default {
  name: 'b-canvas',

  components: {
    Grid,
    Indicator,
    Layers
  },

  props: {
    rect: {
      type: Object
    },
    viewPort: {
      type: Object
    },
    columns: {
      type: Number
    },
    rows: {
      type: Number
    },
    cellWidth: {
      type: Number
    },
    cursor: {
      type: String
    }
  },

  computed: {
    ...resourceMapGetters([
      'mousePosition',
      'pencilColor',
      'pencilSize',
      'eraserSize',
      'currentTool',
      'mouseInCanvas',
      'currentLayer',
      'layers',
      'onlyLayer'
    ], prefix),

    indicatorColor() {
      switch (ToolbarItems[this.currentTool].name) {
        case 'pencil':
          return this.pencilColor
        case 'eraser':
          return {hex: '#000000'}
      }
    },

    indicatorSize() {
      switch (ToolbarItems[this.currentTool].name) {
        case 'pencil':
          return this.pencilSize * this.cellWidth
        case 'eraser':
          return this.eraserSize * this.cellWidth
      }
    },

    indicatorPosition() {
      let size = 1
      switch (ToolbarItems[this.currentTool].name) {
        case 'pencil':
          size = this.pencilSize
          break
        case 'eraser':
          size = this.eraserSize
          break
      }
      return {
        x: (this.mousePosition.column - Math.floor((size-1) / 2)) * this.cellWidth,
        y: (this.mousePosition.row - Math.floor((size-1) / 2)) * this.cellWidth
      }
    },

    indicatorVisible() {
      if (!this.mouseInCanvas) return false
      if (!this.currentLayer) return false
      let layer = findLayer(this.layers, this.currentLayer)
      if (!isLayerVisible(layer)) return false

      switch (ToolbarItems[this.currentTool].name) {
        case 'pencil':
        case 'eraser':
          return true
        default:
          return false
      }
    }
  },

  methods: {
    ...resourceMapActions([
      'setMouseDown',
      'setMousePosition',
      'toggleMouseInOut'
    ], prefix),

    getPosition(e) {
      let canvasPosition = $(this.$refs.canvas).position()
      let x = e.pageX - canvasPosition.left
      let y = e.pageY - canvasPosition.top
      let position = {x, y}

      return position
    },
    getCell(e) {
      let position = this.getPosition(e)
      let x = position.x //+ this.viewPort.x1 * this.cellWidth
      let y = position.y //+ this.viewPort.y1 * this.cellWidth
      return {
        x: Math.floor(x/this.cellWidth),
        y: Math.floor(y/this.cellWidth)
      }
    },
    handleClick(e) {
      let cell = this.getCell(e)
      this.$fire('bead-canvas:click', e, cell)
    },
    handleMouseDown(e) {
      // console.log('mouse-down')
      // console.log(e)
      $(window).on('mouseup', this.handleMouseUp)

      let canvasRect = this.$el.getBoundingClientRect()
      this.setMouseDown({
        isDown: true,
        position: {
          px: e.pageX,
          py: e.pageY,
          x: e.pageX - canvasRect.left,
          y: e.pageY - canvasRect.top,
          column: Math.floor((e.pageX - canvasRect.left) / this.cellWidth),
          row: Math.floor((e.pageY - canvasRect.top) / this.cellWidth)
        },
        viewPort: _.clone(this.viewPort)
      })
    },
    handleGlobalMouseMove(e) {
      let canvasRect = this.$el.getBoundingClientRect()
      let position = {px: e.pageX, py: e.pageY}
      position.x = position.px - canvasRect.left
      position.y = position.py - canvasRect.top
      position.rx = position.x - this.viewPort.x1 * this.cellWidth // 距离右边界位置
      position.ry = position.y - this.viewPort.y1 * this.cellWidth // 距离下边界位置
      this.$fire('bead-canvas:mousemove', position)
    },
    handleMouseUp(e) {
      $(window).off('mouseup', this.handleMouseUp)
      // console.log('mouse-up')
      this.setMouseDown(false)
    },
    handleMouseMove(e) {
      let rect = this.$refs.canvas.getClientRects()[0]
      let x = e.x - rect.left
      let y = e.y - rect.top
      let column = Math.floor(x / this.cellWidth)
      let row = Math.floor(y / this.cellWidth)
      let p = {x, y, column, row}
      // console.log(p)
      this.setMousePosition(p)
    },
    handleMouseOut() {
      // console.log('out', arguments)
      this.toggleMouseInOut(false)
    },
    handleMouseIn() {
      // console.log('in', arguments)
      this.toggleMouseInOut(true)
    }
  },

  mounted() {
    this.$nextTick(() => {
      $(window).on('mousemove', this.handleGlobalMouseMove)
    })
  },
  beforeDestroy() {
    $(window).off('mousemove', this.handleGlobalMouseMove)
  }
};
</script>

<style lang="css" scoped>
</style>