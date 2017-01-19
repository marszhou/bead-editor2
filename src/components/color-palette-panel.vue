<template>
<div>
</div>
</template>

<script>
import { Photoshop } from 'vue-color'

export default {

  name: 'color-palette-panel',

  components: {
    'photoshop-picker': Photoshop
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

  },

  methods: {
    onChange() {
      console.log(arguments)
    }
  },

  route: {

  }
};
</script>

<style lang="css" scoped>
</style>