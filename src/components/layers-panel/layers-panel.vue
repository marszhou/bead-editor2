<template>
  <div class="side-panel panel panel-default layers-panel" style='margin-bottom:0; position: relative'>
    <div class="panel-heading">
      <h3 class="panel-title">层</h3>
    </div>

    <ul class="list-group" style='overflow-y: auto' :style='{height: height + "px"}'>
      <draggable :list='fakeLayers' @change='handleSort'>
      <li class="list-group-item layer"
          v-for='(layer, index) of layers'
          @click='toggleCurrentLayer(layer.id)'
          :class='{highlight: layer.id === currentLayer, "layer-invisible": !isLayerVisible(layer), "layer-chained": chainStatuses[layer.id]}'>
        <layer :layer='layer' @name-edit='handleLayerNameEdit(layer)'></layer>
      </li>
      </draggable>
    </ul>

    <div class="btn-toolbar">
      <div class="btn-group">
        <button type="button" class="btn btn-default layer-btn" @click='handleInsert'>
          <i class='fa fa-plus'></i>
        </button>
        <button type="button" class="btn btn-default layer-btn" @click='handleRemove' :disabled="!!!currentLayer">
          <i class='fa fa-trash-o'></i>
        </button>
      </div>
    </div>

    <bs-dialog title='设置层名称' dialog-id='size-dialog' @dialog:btn-click='handleLayerNameButton' ref='dialog'>
      <a href='#' @click.prevent
                  slot='trigger'>
        <span></span>
      </a>
      <div slot='dialog-body'>
        <form class="form-horizontal" role="form" @submit.prevent>
          <div class="form-group">
            <label for="title" class="col-sm-2 control-label">名称</label>
            <div class="col-sm-10">
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="层名称"
                     v-model='editLayer.name'
                     ref='input'
                     @keydown.stop @keyup.stop @keypress.stop>
            </div>
          </div>
        </form>
      </div>
    </bs-dialog>
  </div>
</template>

<script>
import { resourceMapGetters, resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')
import Draggable from 'vuedraggable'
import Layer from './layer'
import Dialog from 'components/common/dialog'

export default {

  name: 'layers-panel',

  components: {
    Draggable,
    Layer,
    'bs-dialog': Dialog
  },

  data() {
    return {
      height: 0,
      editLayer: {
        id: '',
        name: ''
      }
    };
  },

  computed: {
    ...resourceMapGetters([
      'layers',
      'currentLayer',
      'onlyLayer',
      'chainStatuses'
    ], prefix),

    fakeLayers() {
      return this.layers.slice()
    }
  },

  methods: {
    ...resourceMapActions([
      'insertLayer',
      'removeLayer',
      'setLayers',
      'setCurrentLayer',
      'toggleCurrentLayer',
      'updateLayer'
    ], prefix),
    isLayerVisible(layer) {
      if (this.onlyLayer) {
        if (this.onlyLayer === layer.id) {
          return true
        } else {
          return layer.status.force
        }
      }
      return layer.status.visible
    },
    handleRemove() {
      if (this.currentLayer) {
        this.removeLayer(this.currentLayer)
      }
    },
    handleInsert() {
      this.insertLayer(this.currentLayer)
    },
    handleResize() {
      let wHeight = window.document.documentElement.clientHeight
      let ret = wHeight // - $('.info-panel').get(0).getBoundingClientRect().height
                        // - $('.toolbar-panel').get(0).getBoundingClientRect().height
                        // - $('.color-mapping-panel').get(0).getBoundingClientRect().height
                        - $('#panel-tabs').get(0).getBoundingClientRect().height
                        - $('.layers-panel .panel-heading').get(0).getBoundingClientRect().height
                        - $('.layers-panel .btn-toolbar').get(0).getBoundingClientRect().height
      this.height = ret
    },
    handleSort(e) {
      if (e.moved) {
        let layers = this.layers.slice()
        let layer = layers.splice(e.moved.oldIndex, 1)
        layers.splice(e.moved.newIndex, 0, layer[0])
        this.setLayers(layers)
      }
    },
    handleLayerNameButton(btn, e, dialog) {
      if (this.editLayer.name.trim().length > 0) {
        this.updateLayer({
          id: this.editLayer.id,
          data: {
            name: this.editLayer.name.trim()
          }
        })
        dialog.close()
      }
    },
    handleLayerNameEdit(layer) {
      this.editLayer.id = layer.id
      this.editLayer.name = layer.name
      this.$refs.dialog.show()
      this.$nextTick(() => this.$refs.input.focus())
    }
  },

  created() {
    $(window).on('resize', this.handleResize)
  },

  mounted() {
    this.$nextTick(this.handleResize)
  },

  beforeDestroy() {
    $(window).off('resize', this.handleResize)
  }
}
</script>

<style lang="css" scoped>
.highlight {
  background: #DDD!important;
}
.layer-invisible {
  opacity: 0.5
}
.layer-chained {
  background: AliceBlue;
}
</style>