<template>
  <svg :width='width'
       :height='height'>
    <defs>
      <clipPath id="xAxisMask">
        <rect :x="0" :y="-margin[1]" :width="innerSize.width" :height="margin[1]" />
      </clipPath>
      <clipPath id="yAxisMask">
        <rect :x="-margin[0]" :y="0" :width="margin[0]" :height="innerSize.height" />
      </clipPath>
      <clipPath id="canvasMask">
        <rect :x="0" :y="0" :width="canvasRect.width" :height="canvasRect.height" />
      </clipPath>
      <pattern id="transparentBackground" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <image width="20" height="20"
               xlink:href="./static/assets/t.png"/>
      </pattern>
    </defs>
    <axis type='horizontal'
          :x='canvasRect.x' :y='canvasRect.y' :ruler-length='margin[0]'
          :from='viewPort.x1' :to='viewPort.x2'
          :cell-width='cellWidth' :count='columns'
          ></axis>
    <axis type='vertical'
          :x='canvasRect.x' :y='canvasRect.y' :ruler-length='margin[1]'
          :from='viewPort.y1' :to='viewPort.y2'
          :cell-width='cellWidth' :count='rows'
          ></axis>
    <b-canvas :rect='canvasRect'
            :cell-width='cellWidth'
            :view-port='viewPort'
            :columns='columns'
            :rows='rows'
            :cursor='cursor'></b-canvas>
  </svg>
</template>

<script>
import Axis from './axis'
import BCanvas from './canvas'

export default {

  name: 'editor',

  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    columns: {
      type: Number,
      required: true
    },
    rows: {
      type: Number,
      required: true
    },
    // zoom: {
    //   type: Number,
    //   default: 1
    // },
    // zoomMax: {
    //   type: Number
    // },
    // zoomMin: {
    //   type: Number
    // },
    // maxUnitWidth: {
    //   type: Number,
    //   default: 50
    // },
    margin: {
      type: Array,
      default: () => [30, 30]
    },
    innerSize: {
      type: Object
    },
    // unitWidth: {
    //   type: Number
    // },
    cellWidth: {
      type: Number
    },
    viewPort: {
      type: Object
    },
    canvasRect: {
      type: Object
    },
    cursor: {
      type: String
    }
  },

  components: {
    Axis, BCanvas
  },

  data() {
    return {
    }
  }
};
</script>

<style lang="css" scoped>
</style>