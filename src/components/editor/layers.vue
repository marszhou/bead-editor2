<template>
  <g>

  </g>
</template>

<script>
import { resourceMapActions, resourceMapGetters } from 'utils/func'

export default {

  name: 'layers',

  data() {
    return {

    };
  },

  computed: {
    ...resourceMapGetters([
      'layers'
    ])
  },

  methods: {

  }
}
</script>

<style lang="css" scoped>
</style>