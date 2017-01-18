<template>
  <div class="btn-toolbar" style='position: fixed; top:0; left:0'>
    <div style='font-size: 16px;' class="btn-group-vertical">
      <item v-for='(item, index) of items'
            :class-name='item.icon' :name='item.name' :tips='item.tips' :highlight='current === index'
            @click='handleItemClick(index)'
            @dblclick='handleItemDoubleClick(index)'></item>
    </div>
  </div>
</template>

<script>
import Item from './item'
import {items} from './const'
import { resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'toolbar',

  components: {
    Item
  },

  props: {
    current: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      items: items.slice()
    };
  },

  computed: {

  },

  methods: {
    ...resourceMapActions([
      'setCurrentTool',
      'setAltKey'
    ], prefix),
    handleItemClick(index) {
      if (index !== this.current) {
        this.$emit('toolbar:itemClick')
        this.setCurrentTool(index)
      }
    },
    handleItemDoubleClick(index) {
      this.$emit('toolbar:itemDblclick')
    },

    handleKeyDown(e) {
      // console.log('keydown')
      if (e.altKey) {
        this.setAltKey(true)
      }
      let index = _.findIndex(items, item => item.hotKey.toUpperCase() === e.key.toUpperCase())
      if (index > -1) {
        this.setCurrentTool(index)
      }
      $(window).on('keyup', this.handleKeyUp)
    },
    handleKeyUp(e) {
      // console.log('keyup')
      if (!e.altKey) {
        this.setAltKey(false)
      }
      $(window).off('keyup', this.handleKeyUp)
    }
  },

  mounted() {
    this.$nextTick(() => {
      $(window).on('keydown', this.handleKeyDown)
    })
  },
  beforeDestroy() {
    $(window).off('keydown', this.handleKeyDown)
    $(window).off('keyup', this.handleKeyUp)
  }
};
</script>

<style lang="css" scoped>
.tb-highlight {
  background: #e6e6e6
}
/*.icon{
  padding: 4px;
  text-align: center;
  height: 30px;
  width: 30px;
  display: inline-block;
  border: 1px solid #F0F0F0;
}*/
</style>