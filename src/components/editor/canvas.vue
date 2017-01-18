<template>
  <g :transform='getTranslate(rect.x, rect.y)'
     clip-path='url(#canvasMask)'
     :style='{cursor: cursor}'>
    <g :transform='getTranslate((-viewPort.x1 * cellWidth), (-viewPort.y1 * cellWidth))'
       ref='canvas'
       @click='handleClick'
       @mousedown='handleMouseDown'
       @mousemove='handleMouseMove'>
      <!-- <rect :width='columns * cellWidth' :height='rows * cellWidth' fill='url(#transparentBackground)'></rect> -->
      <!-- layers -->
      <grid :columns='columns' :rows='rows' :cell-width='cellWidth' :show-line='true' :show-dot='true'></grid>
    </g>
  </g>
</template>

<script>
import Grid from './grid'
import { resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {
  name: 'b-canvas',

  components: {
    Grid
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

  methods: {
    ...resourceMapActions([
      'setMouseDown',
      'setMousePosition'
    ], prefix),
    getTranslate(x, y) {
      return `translate(${x}, ${y})`
    },
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
      this.setMouseDown(true, {x: e.pageX, y: e.pageY}, _.clone(this.viewPort))
    },
    handleGlobalMouseMove(e) {
      let canvasRect = this.$el.getBoundingClientRect()
      let position = {px: e.pageX, py: e.pageY}
      position.x = position.px - canvasRect.left
      position.y = position.py - canvasRect.top
      position.rx = position.x - this.viewPort.x1 * this.cellWidth
      position.ry = position.y - this.viewPort.y1 * this.cellWidth
      this.$emit('bead-canvas:mousemove', position)
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
      this.setMousePosition({x, y, column, row})
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