<template>
  <div class='row' style='height: 48px'>
    <div class='col-xs-3'>
      <svg class='preview'></svg>
    </div>
    <div class='col-xs-9'>
      <a href='#' @click.prevent.stop='$emit("name-edit")' style='line-height: 1.8em; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: 140px; display: inline-block'>{{layer.name}}</a><br/>
      <div class="btn-group btn-group-xs" @click.stop>
        <button type="button"
                class="btn btn-default"
                @click.stop='toggleLayerStatus({status: "visible", id: layer.id})'
                :disabled='!!onlyLayer'>
          <i class='fa' :class='layer.status.visible ? "fa-eye" : "fa-eye-slash"'></i>
        </button>

        <button type="button"
                class="btn btn-default"
                @click.stop='toggleLayerStatus({status: "only", id: layer.id})'
                :disabled='!!(onlyLayer && !(onlyLayer && onlyLayer===layer.id))'>
          <i class='fa' :class='layer.status.only ? "fa-star" : "fa-star-o"'></i>
        </button>

        <button type="button"
                class="btn btn-default"
                @click.stop='toggleLayerStatus({status: "force", id: layer.id})'
                :disabled='(!onlyLayer || (onlyLayer && onlyLayer===layer.id))'>
          <i class='fa' :class='layer.status.force ? "fa-toggle-on" : "fa-toggle-off"'></i>
        </button>

        <button type="button"
                class="btn btn-default"
                @click.stop='chainLayer(layer.id)'
                :disabled='isChainDisabled(layer.id)'>
          <i class='fa' :class='getChainClassName(layer.id)'></i>
        </button>

        <button type="button"
                class="btn btn-default"
                @click.stop='copyLayer(layer.id)'>
          <i class='fa fa-copy'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { resourceMapActions, resourceMapGetters } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'layer-item',
  props: ['layer'],
  components: {

  },

  computed: {
    ...resourceMapGetters([
      'onlyLayer',
      'currentLayer',
      'chainStatuses'
    ], prefix)
  },

  methods: {
    ...resourceMapActions([
      'copyLayer',
      'chainLayer',
      'toggleLayerStatus'
    ], prefix),

    isChainDisabled(layerId) {
      if (!this.currentLayer) {
        return true
      } else {
        if (this.currentLayer === layerId) {
          return true
        }
      }
      return false
    },

    getChainClassName(layerId) {
      return this.chainStatuses[layerId] ? 'fa-link' : 'fa-unlink'
    }
  },

  data() {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
.preview {
  width: 48px;
  height: 48px;
  border: 1px solid gray;
}
</style>