<template>
  <g style='stroke-width: 1px; stroke: rgba(0,0,0,0.3); fill: rgba(0,0,0,0.3);'>
<!--     <rect v-for='(i, index) of cells'
          :x='getCellPosition(index).x'
          :y='getCellPosition(index).y'
          :width='cellWidth'
          :height='cellWidth'
          :class='getCellClass(index)'></rect> -->
    <rect :x='0' :width='cellWidth * columns' :y='0' :height='cellWidth * rows' fill='white'>
    </rect>
    <!-- 横线 -->
    <line v-for='(i, index) of yCells'
          :x1='0' :x2='width'
          :y1='cellWidth * index' :y2='cellWidth * index'
          :class='getLineClass(index)'></line>
    <!-- 竖线 -->
    <line v-for='(i, index) of xCells'
          :y1='0' :y2='height'
          :x1='cellWidth * index' :x2='cellWidth * index'
          :class='getLineClass(index)'></line>
  </g>
</template>

<script>
export default {

  name: 'grid',

  components: {

  },

  props: {
    columns: {
      type: Number
    },
    rows: {
      type: Number
    },
    cellWidth: {
      type: Number
    },
    showLine: {
      type: Boolean
    },
    showDot: {
      type: Boolean
    }
  },

  vuex: {
    actions: {

    },
    getters: {

    }
  },

  data() {
    return {

    };
  },

  computed: {
    width() {
      return this.columns * this.cellWidth
    },
    height() {
      return this.rows * this.cellWidth
    },
    xCells() {
      return _.range(0, this.columns + 1)
    },
    yCells() {
      return _.range(0, this.rows + 1)
    },
    cells() {
      return _.range(0, this.columns * this.rows)
    }
  },

  methods: {
    getLineClass(index) {
      let gap = 5
      let ret = ['minor-line']
      if (index % gap === 0) {
        ret.push('emphsis-line')
      }
      if (index % (gap*2) === 0) {
        ret.push('major-line')
      }
      return ret
    },
    getCellCenter(index) {
      let x = index % this.columns
      let y = Math.floor(index / this.columns)
      return {
        x: x * this.cellWidth + this.cellWidth / 2,
        y: y * this.cellWidth + this.cellWidth / 2
      }
    },
    getCellPosition(index) {
      let x = index % this.columns
      let y = Math.floor(index / this.columns)
      return {
        x: x * this.cellWidth,
        y: y * this.cellWidth
      }
    },
    getCellClass(index) {
      let x = index % this.columns
      let y = Math.floor(index / this.columns)

      let flag = 0
      if ((y%2===0 && x%2===0) || (y%2===1 && x%2===1)) {
        flag = 1
      }
      return flag ? 'cell-gray' : 'cell-white'
    }
  }
}
</script>

<style lang="css" scoped>
.minor-line {
  stroke-dasharray: 1,3;
  stroke-width:1;
}
.emphsis-line {
  stroke-dasharray: 2,4;
  /*stroke-width:2;*/
}
.major-line {
  stroke: rgba(0,0,0,0.75);
}
.cell-white {
  fill: white;
  stroke: none;
}
.cell-gray {
  fill: rgba(0,0,0,0.075);
  stroke: none;
}
</style>