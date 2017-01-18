<template>
  <g :transform='getTranslate(x, y)' style='stroke: black; stroke-width: 1px'
     :clip-path='getClipPath(type)'>
    <g v-if='type=="horizontal"' :transform='getTranslate((-from * cellWidth), 0)'>
      <line :x1='0' :y1='0'
            :x2='length' :y2='0'></line>
      <line v-for='(pos, index) of lines'
            :x1='getRulerPos(index)' :x2='getRulerPos(index)'
            :y1='0' :y2='-getRulerLength(pos)'></line>
      <text
          v-for='(p, index) of makeRange(10)'
          :x='getRulerPos(index * 10)'
          :y='-14'
          text-anchor='start'
          style='fill: #999999; stroke: #000000; '
          :style='{fontSize: 8}'
          >{{index*10}}</text>
    </g>

    <g v-if='type=="vertical"' :transform='getTranslate(0, (-from*cellWidth))'>
      <line :x1='0' :y1='0'
            :x2='0' :y2='length'></line>
      <line v-for='(pos, index) of lines'
            :y1='getRulerPos(index)' :y2='getRulerPos(index)'
            :x1='0' :x2='-getRulerLength(pos)'></line>
      <text
          v-for='(p, index) of makeRange(10)'
          :x='- index * 10 * cellWidth'
          :y='-14'
          text-anchor='end'
          style='fill: #999999; stroke: #000000; '
          :style='{fontSize: 8}'
          transform='rotate(270)'
          >{{index*10}}</text>
    </g>
  </g>
</template>

<script>
export default {

  name: 'axis',

  props: {
    type: {
      type: String,
      validator: (v) => ['horizontal', 'vertical'].indexOf(v) > -1,
      default: 'horizontal'
    },
    from: {
      type: Number
    },
    to: {
      type: Number
    },
    rulerLength: {
      type: Number
    },
    height: {
      type: Number
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    cellWidth: {
      type: Number
    },
    count: {
      type: Number
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
    lines() {
      return _.range(this.count + 1)
    },
    length() {
      return this.cellWidth * this.count
    }
  },

  methods: {
    getTranslate(x, y) {
      return `translate(${x}, ${y})`
    },
    getClipPath(type) {
      return type==='horizontal' ? 'url(#xAxisMask)' : 'url(#yAxisMask)'
    },
    makeRange(gap) {
      return _.range(Math.floor(this.lines.length / gap) + 1)
    },
    getRulerPos(index) {
      return this.cellWidth * index
    },
    getRulerLength(index) {
      let gap = 5
      let factor = this.rulerLength
      if (index % (gap*2) === 0) {
        return factor * 0.375
      } else if (index % gap === 0) {
        return factor * 0.25
      }
      return factor * 0.125
    }
  },

  route: {

  }
};
</script>

<style lang="css" scoped>
</style>