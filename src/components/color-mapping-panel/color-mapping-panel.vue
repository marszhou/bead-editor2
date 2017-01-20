<template>
  <div class="side-panel panel panel-default color-mapping-panel" style='margin-bottom:0; position: relative'>
    <div class="panel-heading">
      <h3 class="panel-title">颜色映射</h3>
    </div>

    <ul class="list-group" style='overflow-y: auto; height: 300px'>
      <li class="list-group-item">

      </li>
    </ul>
  </div>
</template>

<script>
import { resourceMapGetters, resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'layers-panel',

  components: {
  },

  data() {
    return {
      color: {hex: '#000000'},
      show: false
    };
  },

  computed: {
    ...resourceMapGetters([

    ], prefix)
  },

  methods: {
    ...resourceMapActions([

    ], prefix)
  }
}
</script>

<style lang="css" scoped>
</style>