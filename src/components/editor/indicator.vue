<template>
  <g :transform='getTranslate(position.x, position.y)'>
    <rect x='0' y='0' :width='size' :height='size' :style='{opacity: 0.25, fill: color.hex}'></rect>
  </g>
</template>

<script>
export default {

  name: 'grid',

  components: {

  },

  props: [
    'position', 'size', 'color'
  ],

  computed: {

  },

  methods: {

  }
}
</script>

<style lang="css" scoped>

</style>