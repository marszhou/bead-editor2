<template>
<div>
  <toolbar :current='currentTool'></toolbar>
  <div class='row' :style='{"margin-left": leftMargin + "px"}'>
    <div class='col-xs-10' style='overflow: auto; border-left: 2px outset; border-right: 2px inset; background:#fafafa; padding: 0;text-align: center' :style='{height: windowHeight + "px", width: (windowWidth - leftMargin - rightColumnWidth + 2) + "px"}'>
      <editor
        :width='editorDimension.width'
        :height='editorDimension.height'
        :columns='editorSize.columns'
        :rows='editorSize.rows'
        :unit-width='editorUnitWidth'
        :cell-width='editorCellWidth'
        :zoom='editorZoom'
        :margin='editorMargin'
        :inner-size='editorInnerSize'
        :view-port='editorViewPort'
        :canvas-rect='canvasRect'
        :cursor='editorCursor'></editor>
    </div>
    <div class='col-xs-2' style='padding: 0;' :style='{width: rightColumnWidth + "px"}'>
      <ul id='panel-tabs' class="nav nav-tabs nav-tabs-xs" role="tablist" style='border-bottom: 0'>
        <li role="presentation" v-for='(item, index) of panels'
            :class='index === currentPanelIndex ? "active" : ""'>
          <a href="#" style='padding: 3px 6px;'
             :class='index === currentPanelIndex ? "" : "panel-item"'
             @click.prevent='handleChangePanel(index)'><i class='fa' :class='item.className'></i></a>
        </li>

      </ul>
      <info-panel :size='editorSize' :dimension='editorDimension' v-if='currentPanelIndex === 0'></info-panel>
      <toolbar-panel v-if='currentPanelIndex === 1'></toolbar-panel>
      <color-mapping-panel v-if='currentPanelIndex === 2'></color-mapping-panel>
      <layers-panel v-if='currentPanelIndex === 3'></layers-panel>
    </div>
  </div>
</div>
</template>

<script>
import Editor from 'components/editor/editor'
import Toolbar from 'components/toolbar/toolbar'
import InfoPanel from 'components/info-panel'
import ToolbarPanel from 'components/toolbar-panel'
import ColorMappingPanel from 'components/color-mapping-panel/color-mapping-panel'
import LayersPanel from 'components/layers-panel/layers-panel'

import {items as ToolbarItems} from 'components/toolbar/const'
import { resourceMapGetters, resourceMapActions } from 'utils/func'
const { prefix, state } = require('store/modules/bead-app')

export default {
  name: 'bead-app',

  components: {
    Editor,
    Toolbar,
    InfoPanel,
    ToolbarPanel,
    ColorMappingPanel,
    LayersPanel
  },

  data() {
    return {
      editorSuggestUnitWidth: 30,
      editorMaxUnitWidth: 70,
      windowWidth: window.document.documentElement.clientWidth,
      windowHeight: window.document.documentElement.clientHeight,
      rightColumnWidth: 240,
      leftMargin: 35,

      panels: [
        {
          name: 'canvas',
          className: 'fa-picture-o'
        },
        {
          name: 'toolbar',
          className: 'fa-wrench'
        },
        {
          name: 'color-mapping',
          className: 'fa-superpowers'
        },
        {
          name: 'layers',
          className: 'fa-window-restore'
        }
      ],
      currentPanelIndex: 3
    }
  },

  computed: {
    ...resourceMapGetters(_.keys(state), prefix),

    editorInnerSize: function() {
      return {
        width: this.editorDimension.width - _.sum(this.editorMargin),
        height: this.editorDimension.height - _.sum(this.editorMargin)
      }
    },
    editorUnitWidth: function() {
      return Math.min(this.editorSuggestUnitWidth,
                      this.editorInnerSize.width / this.editorSize.columns,
                      this.editorInnerSize.height / this.editorSize.rows)
    },
    editorCellWidth: function() {
      return this.editorUnitWidth * this.editorZoom
    },
    editorZoomMin: function() {
      if (this.editorUnitWidth <= this.editorSuggestUnitWidth) {
        return 1
      }
      return this.editorSuggestUnitWidth / Math.min(this.editorInnerSize.width / this.editorSize.columns,
                                              this.editorInnerSize.height / this.editorSize.rows)
    },
    editorZoomMax: function() {
      return this.editorMaxUnitWidth / this.editorUnitWidth
    },
    // canvas 所占区域
    canvasRect: function() {
      let w = this.editorCellWidth * this.editorSize.columns
      let h = this.editorCellWidth * this.editorSize.rows

      let width = w <= this.editorInnerSize.width ? w : this.editorInnerSize.width
      let height = h <= this.editorInnerSize.height ? h : this.editorInnerSize.height

      return {
        x: (this.editorDimension.width - width) / 2,
        y: (this.editorDimension.height - height) / 2,
        width, height
      }
    },
    editorCursor: function() {
      let item = ToolbarItems[this.currentTool]
      // if (item.code) {
      //   let cursorData = genCursorUrlData(item.code, 16)
      //   let ret = 'url(' + cursorData + '), auto'
      //   console.log(ret)
      //   return ret
      // }
      if (item.cursor) {
        if (item.name === 'zoom' && this.altKey) {
          return item.outCursor
        }
        if (item.name === 'hand' && this.mousedown) {
          // console.log('grabbing', item.grabbingCursor)
          return item.grabbingCursor
        }
        return item.cursor
      }
      return null
    }
  },

  methods: {
    ...resourceMapActions([
      'setEditorViewPort',
      'setEditorSize',
      'setEditorDimension',
      'setEditorZoom',
      'setEditorMargin'
    ], prefix),
    editorZoomAt(inOrOut, cell) {
      let currentZoom = this.editorZoom
      currentZoom += inOrOut ? 0.25 : -0.25
      currentZoom = currentZoom > this.editorZoomMax ? this.editorZoomMax: (currentZoom < this.editorZoomMin ? this.editorZoomMin : currentZoom)
      this.setEditorZoom(currentZoom)

      // debugger
      let x = this.calculateNewViewPortRange(currentZoom, cell.x, this.editorViewPort.x1, this.editorViewPort.x2, this.editorSize.columns, this.editorInnerSize.width)
      let y = this.calculateNewViewPortRange(currentZoom, cell.y, this.editorViewPort.y1, this.editorViewPort.y2, this.editorSize.rows, this.editorInnerSize.height)
      let newViewPort = {
        x1: x[0],
        x2: x[1],
        y1: y[0],
        y2: y[1]
      }
      // console.log(newViewPort)
      this.setEditorViewPort(newViewPort)
    },

    calculateNewViewPortRange(newZoom, c, v1, v2, t, l) {
      let n = this.editorUnitWidth * newZoom * t
      // javascript精度问题
      if (Math.floor(n) <= l) {
        return [0, t]
      }
      let w1 = (c - v1) / (v2 - v1) * l
      let a1 = c - w1 / (this.editorUnitWidth * newZoom)
      let w2 = (v2 - c) / (v2 - v1) * l
      let a2 = c + w2 / (this.editorUnitWidth * newZoom)

      if (a1 < 0) {
        let temp = a1
        a1 = 0
        a2 += -temp
      }

      if (a2 > t) {
        let temp = a2
        a2 = t
        a1 -= (temp - t)
      }

      return [a1, a2]
    },

    moveEditorViewPort(pos) {
      let dx = pos.px - this.mousedownPosition.x
      let dy = pos.py - this.mousedownPosition.y

      let x1 = (this.mousedownViewPort.x1 * this.editorCellWidth - dx) / this.editorCellWidth
      let w = this.mousedownViewPort.x2 - this.mousedownViewPort.x1
      let y1 = (this.mousedownViewPort.y1 * this.editorCellWidth - dy) / this.editorCellWidth
      let h = this.mousedownViewPort.y2 - this.mousedownViewPort.y1

      x1 = (x1 < 0) ? 0 : x1
      x1 = (x1 > this.editorSize.columns-w) ? (this.editorSize.columns-w) : x1
      y1 = (y1 < 0) ? 0 : y1
      y1 = (y1 > this.editorSize.rows-h) ? (this.editorSize.rows-h) : y1
      let x2 = x1 + w
      let y2 = y1 + h
      let newViewPort = {x1, x2, y1, y2}
      // console.log(_.clone(this.mousedownViewPort), newViewPort)
      this.setEditorViewPort(newViewPort)
    },

    handleWindowResize() {
      this.windowHeight = window.document.documentElement.clientHeight
      this.windowWidth = window.document.documentElement.clientWidth
    },

    handleCanvasClick(e, cell) {
      switch (ToolbarItems[this.currentTool].name) {
        case 'zoom':
          this.editorZoomAt(!e.altKey, cell)
          break
      }
    },

    handleToolbarItemDblclick() {
      if (ToolbarItems[this.currentTool].name === 'zoom') {
        this.setEditorZoom(1)
        this.setEditorViewPort({x1: 0, y1: 0, x2: this.editorSize.columns, y2: this.editorSize.rows})
      }
    },

    handleCanvasMouseMove(pos) {
      // console.log(pos)
      // console.log(pos.x, pos.y, pos.rx, pos.ry)
      if (ToolbarItems[this.currentTool].name === 'hand' && this.mousedown) {
        this.moveEditorViewPort(pos)
      }
    },

    handleChangePanel(panelIndex) {
      this.currentPanelIndex = panelIndex
    }
  },

  created() {
    this.$listen('bead-canvas:click', this.handleCanvasClick)
    this.$listen('toolbar:itemDblclick', this.handleToolbarItemDblclick)
    this.$listen('bead-canvas:mousemove', this.handleCanvasMouseMove)
  },

  mounted() {
    this.$nextTick(() => {
      this.setEditorDimension({width: 800, height: 800})
      this.setEditorSize({columns: 52, rows: 52})
      this.setEditorMargin([30, 30])

      $(window).on('resize', this.handleWindowResize)
    })
  },

  beforeDestroy() {
    $(window).off('resize', this.handleWindowResize)
  }
}
</script>

<style lang="css" scoped>
.panel-item {color: #999;}
</style>