<template>
  <div class="side-panel panel panel-default info-panel" style='margin-bottom:0'>
    <div class="panel-heading">
      <h3 class="panel-title">画布设置</h3>
    </div>

    <ul class="list-group">
      <li class="list-group-item">
        <!-- <button class='edit-btn btn btn-default'>修改</button> -->
        尺寸
        <bs-dialog title='尺寸设置' dialog-id='size-dialog' @dialog:btn-click='handleSizeDialogButton'>
          <a href='#' @click.prevent
                  slot='trigger'>
            <span>{{size.columns}}</span> x <span>{{size.rows}}</span>
          </a>
          <div slot='dialog-body'>
            <form class="form-inline" role="form">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">列</div>
                  <input type="number" class="form-control" v-model='columns' @keydown.stop @keyup.stop @keypress.stop>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">行</div>
                  <input type="number" class="form-control" v-model='rows' @keydown.stop @keyup.stop @keypress.stop>
                </div>
              </div>
            </form>
          </div>
        </bs-dialog>
      </li>
      <li class="list-group-item">
        <!-- <button class='edit-btn btn btn-default'>修改</button> -->
        宽高
        <bs-dialog title='宽高设置' dialog-id='dimension-dialog' @dialog:btn-click='handleDimensionDialogButton'>
          <a href='#' @click.prevent
                  slot='trigger'>
            <span>{{dimension.width}}</span> x <span>{{dimension.height}}</span>
          </a>
          <div slot='dialog-body'>
            <form class="form-inline" role="form">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">宽</div>
                  <input type="number" class="form-control" v-model='width' @keydown.stop @keyup.stop @keypress.stop>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">高</div>
                  <input type="number" class="form-control" v-model='height' @keydown.stop @keyup.stop @keypress.stop>
                </div>
              </div>
            </form>
          </div>

        </bs-dialog>

      </li>
      <li class="list-group-item">
        C: <span>{{mousePosition.column}}</span>
        R: <span>{{mousePosition.row}}</span>
      </li>
    </ul>
  </div>

</template>

<script>
import Dialog from 'components/common/dialog'
import { resourceMapGetters, resourceMapActions } from 'utils/func'
const { prefix } = require('store/modules/bead-app')

export default {

  name: 'info-panel',

  components: {
    'bs-dialog': Dialog
  },

  props: ['dimension', 'size'],

  data() {
    return {
      columns: this.size.columns,
      rows: this.size.rows,
      width: this.dimension.width,
      height: this.dimension.height,
    };
  },

  computed: {
    ...resourceMapGetters([
      'mousePosition'
    ], prefix)
  },

  methods: {
    ...resourceMapActions([
      'setEditorDimension',
      'setEditorSize'
    ], prefix),
    handleSizeDialogButton(button, event, dialog) {
      if (button.name === 'cancel') {
        this.width = this.size.columns
        this.height = this.size.rows
      } else if (button.name === 'save') {
        this.setEditorSize({columns: Number(this.columns), rows: Number(this.rows)})
      }
      dialog.close()
    },
    handleDimensionDialogButton(button, event, dialog) {
      if (button.name === 'cancel') {
        this.width = this.dimension.width
        this.height = this.dimension.height
      } else if (button.name === 'save') {
        this.setEditorDimension({width: Number(this.width), height: Number(this.height)})
      }
      dialog.close()
    }
  },

  watch: {
    dimension: function(n, o) {
      this.width = n.width
      this.height = n.height
    },
    size: function(n) {
      this.columns = n.columns
      this.rows = n.rows
    }
  },

  route: {

  }
};
</script>

<style lang="css" scoped>
.edit-btn {
  float: right; font-size: 12px; padding: 2px 7px
}
</style>