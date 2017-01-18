<template>
  <button type='button'
          class='btn btn-default'
          :class='{icon: true, "tb-highlight": highlight}'
          :title='tips'
          @click='handleClick'
          @dblclick='handleDblclick'>

    <i class="fa" :class='{[className]: true}' aria-hidden="true"></i>
  </button>
</template>

<script>
export default {

  name: 'item',

  props: {
    className: {
      type: String
    },
    name: {
      type: String
    },
    highlight: {
      type: Boolean
    },
    tips: {
      type: String
    }
  },

  data() {
    return {

    };
  },

  computed: {

  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },

    handleDblclick(e) {
      this.$emit('dblclick', e)
    }
  },

  route: {

  }
};
</script>

<style lang="css" scoped>
</style>