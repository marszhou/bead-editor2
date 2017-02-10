<template>
  <bs-dialog ref='dialog' title='重设颜色' dialog-id='dimension-dialog' @dialog:btn-click='handleDialogButton'>
    <a href='#' @click.prevent
       slot='trigger'>
      <span>重设颜色</span>
    </a>
    <div slot='dialog-body'>
      <color-picker v-model='color' @change-color='handleColorChange'></color-picker>
    </div>
  </bs-dialog>
</template>

<script>
import Dialog from 'components/common/dialog'
import { Chrome } from 'vue-color'
export default {

  name: 'reset-color-dialog',

  components: {
    'bs-dialog': Dialog,
    'color-picker': Chrome
  },

  data() {
    return {
      color: {hex: '#000000'},
    };
  },

  computed: {

  },

  methods: {
    handleDialogButton() {

    },

    show() {
      this.$refs.dialog.show()
    },

    handleColorChange() {

    }
  }
}
</script>

<style lang="css" scoped>
</style>