<template>
  <div class='row' style='height: 48px'>
    <div class='col-xs-3'>
      <svg class='preview'></svg>
    </div>
    <div class='col-xs-9'>
      <a href='#' @click.prevent.stop style='line-height: 1.8em; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: 140px; display: inline-block'>{{layer.name}}</a><br/>
      <div class="btn-group btn-group-xs">
        <button type="button"
                class="btn btn-default"
                @click.stop='toggleLayerStatus({status: "visible", id: layer.id})'
                :disabled='!!onlyLayer'>
          <i class='fa' :class='layer.status.visible ? "fa-eye" : "fa-eye-slash"'></i>
        </button>

        <button type="button"
                class="btn btn-default"
                @click.stop='toggleLayerStatus({status: "chain", id: layer.id})'>
          <i class='fa' :class='layer.status.chain ? "fa-link" : "fa-unlink"'></i>
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
      'onlyLayer'
    ], prefix)
  },

  methods: {
    ...resourceMapActions([
      'copyLayer',
      'toggleLayerStatus'
    ], prefix),
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