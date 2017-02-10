import {beadApp} from '../mutation-types'
import {resourceMapping, generateGetterCluster, uniqueKey} from 'utils/func'
import {items as ToolbarItems} from 'components/toolbar/const'

const prefix = 'beadApp_'
const state = {
  currentTool: 2,
  editorZoom: 1,
  // editorZoomRange: {
  //   min: 1, max: 1
  // },
  editorViewPort: {x1: 0, x2: 10, y1: 0, y2: 10},
  editorSize: {
    columns: 10, rows: 10
  },
  editorDimension: {
    width: 300,
    height: 300
  },
  // cellWidth: 0,
  // currentCell: {},
  editorMargin: [25, 25], // top, left
  altKey: false,
  mousedown: false,
  mousedownPosition: null,
  mousedownViewPort: null,
  mouseInCanvas: false,
  oldLayerTranslations: null,

  mousePosition: {x: 0, y: 0, column: 0, row: 0},
  pencilColor: {hex: '#000000'},
  pencilSize: 1,
  eraserSize: 1,

  layers: [
    genNewLayer(),
    genNewLayer()
  ],
  // currentLayerIndex: -1,
  currentLayer: null,
  onlyLayer: null,
  chains: []
}

const getters = {
  ...generateGetterCluster(state)
}

const actions = {

}

const mutations = {

}

// -- 设置当前工具 setCurrentTool
actions.setCurrentTool = ({ commit }, index) => {
  commit(beadApp.setCurrentTool, index)
}
mutations[beadApp.setCurrentTool] = (state, current) => {
  state.currentTool = current
}
// --

// -- 设置缩放 setEditorZoom
actions.setEditorZoom = ({ commit }, v) => {
  commit(beadApp.setEditorZoom, v)
}
mutations[beadApp.setEditorZoom] = (state, v) => {
  state.editorZoom = v
}
// --

// -- 设置视口 setEditorViewPort
actions.setEditorViewPort = ({ commit }, v) => {
  commit(beadApp.setEditorViewPort, v)
}
mutations[beadApp.setEditorViewPort] = (state, v) => {
  state.editorViewPort = v
}
// --

// -- 设置编辑区域的列行 setEditorSize
actions.setEditorSize = ({ commit }, v) => {
  commit(beadApp.setEditorSize, v)
}
mutations[beadApp.setEditorSize] = (state, v) => {
  state.editorSize = v
  state.editorZoom = 1
  state.editorViewPort = {
    x1: 0, x2: v.columns,
    y1: 0, y2: v.rows
  }
}
// --

// -- 设置编辑区域尺寸 setEditorDimension
actions.setEditorDimension = ({ commit }, v) => {
  commit(beadApp.setEditorDimension, v)
}
mutations[beadApp.setEditorDimension] = (state, v) => {
  state.editorDimension = v
}
// --

// -- 设置编辑区域边距 setEditorMargin
actions.setEditorMargin = ({ commit }, v) => {
  commit(beadApp.setEditorMargin, v)
}
mutations[beadApp.setEditorMargin] = (state, v) => {
  state.editorMargin = v
}
// --

// -- is alt key down?
actions.setAltKey = ({ commit }, v) => {
  commit(beadApp.setAltKey, v)
}
mutations[beadApp.setAltKey] = (state, v) => {
  state.altKey = v
}
// --

function paint(layer, position, size, color) {
  let area = {}
  let origin = {
    x: position.column - Math.floor((size-1) / 2) - layer.translation.x,
    y: position.row - Math.floor((size-1) / 2) - layer.translation.y
  }
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      area[`${origin.x + x}, ${origin.y + y}`] = {x: origin.x + x, y: origin.y + y, color: color.hex}
    }
  }
  layer.data = Object.assign({}, layer.data, area)
}

function eraser(layer, position, size) {
  // let area = []
  let origin = {
    x: position.column - Math.floor((size-1) / 2) - layer.translation.x,
    y: position.row - Math.floor((size-1) / 2) - layer.translation.y
  }
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      delete layer.data[`${origin.x + x}, ${origin.y + y}`]
    }
  }

  layer.data = Object.assign({}, layer.data)
}

const isLayerVisible = _.partial((state, layer) => {
  if (state.onlyLayer) {
    if (state.onlyLayer === layer.id) {
      return true
    } else {
      return layer.status.force
    }
  }
  return layer.status.visible
}, state)

function tryPaint(state, event) {
  if (state.currentLayer && state.mousedown) {
    let layer = findLayer(state.layers, state.currentLayer)
    if (!isLayerVisible(layer)) return

    let toolbarItem = ToolbarItems[state.currentTool]
    let position = _.clone(state.mousePosition)
    if (event.shiftKey) {
      let downPosition = state.mousedownPosition
      let diffColumn = downPosition.column - position.column
      let diffRow = downPosition.row - position.row

      if (Math.abs(diffColumn) > Math.abs(diffRow)) { // horizontal
        position.row = downPosition.row
      } else { // vertical
        position.column = downPosition.column
      }
    }
    if (toolbarItem.name === 'pencil') {
      paint(layer, position, state.pencilSize, state.pencilColor)
    } else if (toolbarItem.name === 'eraser') {
      eraser(layer, position, state.eraserSize)
    }
  }
}

function tryMove(state) {
  if (state.currentLayer && state.mousedown) {
    let toolbarItem = ToolbarItems[state.currentTool]
    if (toolbarItem.name === 'move') {
      let chain = _.find(state.chains, chain => chain.indexOf(state.currentLayer) > -1)
      if (!chain) {
        chain = [state.currentLayer]
      }
      // console.log(chain)
      // console.log(oldLayerTranslations)
      chain.forEach((layerId, index) => {
        let layer = findLayer(state.layers, layerId)
        let xDiff = state.mousePosition.column - state.mousedownPosition.column
        let yDiff = state.mousePosition.row - state.mousedownPosition.row
        layer.translation = {
          x: state.oldLayerTranslations[layer.id].x + xDiff,
          y: state.oldLayerTranslations[layer.id].y + yDiff
        }
      })
    }
  }
}

// -- is mouse down?
actions.setMouseDown = ({ commit }, payload) => {
  commit(beadApp.setMouseDown, payload)
}
mutations[beadApp.setMouseDown] = (state, {isDown, position, viewPort, event} = {}) => {
  state.mousedown = isDown
  state.mousedownPosition = position
  state.mousedownViewPort = viewPort
  if (isDown) {
    state.oldLayerTranslations = _.reduce(state.layers, (ret, layer) => {
      ret[layer.id] = Object.assign({}, layer.translation)
      return ret
    }, {})
  } else {
    state.oldLayerTranslations = null
  }

  tryPaint(state, event)
}
// --

// -- track mouse position
actions.setMousePosition = ({ commit }, v) => {
  commit(beadApp.setMousePosition, v)
}
mutations[beadApp.setMousePosition] = (state, {position, event}) => {
  state.mousePosition = position
  tryPaint(state, event)
  tryMove(state)
}
// --

// -- setPencilColor
actions.setPencilColor = ({ commit }, v) => {
  commit(beadApp.setPencilColor, v)
}
mutations[beadApp.setPencilColor] = (state, color) => {
  state.pencilColor = color
}
// --

// -- setPencilSize
actions.setPencilSize = ({ commit }, v) => {
  commit(beadApp.setPencilSize, v)
}
mutations[beadApp.setPencilSize] = (state, size) => {
  state.pencilSize = size
}
// --

// -- setEraserSize
actions.setEraserSize = ({ commit }, v) => {
  commit(beadApp.setEraserSize, v)
}
mutations[beadApp.setEraserSize] = (state, size) => {
  state.eraserSize = size
}
// --

function findLayer(layers, id) {
  return _.find(layers, {id})
}
// -- insertLayer
function genNewLayer() {
  let newLayer = {
    name: '未命名',
    translation: {x: 0, y: 0},
    data: {},
    id: uniqueKey(),
    status: {
      visible: true,
      only: false,
      force: false
    }
  }
  return newLayer
}
actions.insertLayer = ({ commit }, position) => {
  commit(beadApp.insertLayer, position)
}
mutations[beadApp.insertLayer] = (state, id) => {
  let position = 0 // state.layers.length
  if (id) {
    position = _.findIndex(state.layers, {id}) // + 1
  }
  let newLayer = genNewLayer()
  state.layers.splice(position, 0, newLayer)

  // state.currentLayerIndex = position
  state.currentLayer = newLayer.id
}
// --

// -- copyLayer
function genCopyLayer(layer) {
  let newLayer = genNewLayer()
  newLayer.data = _.cloneDeep(layer.data)
  newLayer.name = layer.name + ' 副本'
  return newLayer
}
actions.copyLayer = ({ commit }, payload) => {
  commit(beadApp.copyLayer, payload)
}
mutations[beadApp.copyLayer] = (state, id) => {
  let layer = _.find(state.layers, {id})
  if (layer) {
    let newLayer = genCopyLayer(layer)
    let position = _.findIndex(state.layers, {id}) // + 1
    state.layers.splice(position, 0, newLayer)
    state.currentLayer = newLayer.id
  }
}
// --

// -- removeLayer
actions.removeLayer = ({ commit }, layerId) => {
  commit(beadApp.removeLayer, layerId)
}
mutations[beadApp.removeLayer] = (state, layerId) => {
  let index = _.findIndex(state.layers, {id: layerId})
  state.layers.splice(index, 1)
  // state.currentLayerIndex = -1
  state.currentLayer = null
  if (layerId === state.onlyLayer) {
    state.onlyLayer = null
    state.layers.forEach(layer => {
      layer.status.force = false
    })
  }
}
// --

// -- setLayers
actions.setLayers = ({ commit }, layers) => {
  commit(beadApp.setLayers, layers)
}
mutations[beadApp.setLayers] = (state, layers) => {
  state.layers = layers
}
// --

// -- setCurrentLayer
actions.setCurrentLayer = ({ commit }, v) => {
  commit(beadApp.setCurrentLayer, v)
}
mutations[beadApp.setCurrentLayer] = (state, v) => {
  state.currentLayer = v
}
// --

// -- toggleCurrentLayer
actions.toggleCurrentLayer = ({ commit }, v) => {
  commit(beadApp.toggleCurrentLayer, v)
}
mutations[beadApp.toggleCurrentLayer] = (state, v) => {
  if (v === state.currentLayer) {
    state.currentLayer = null
  } else {
    state.currentLayer = v
  }
}
// --

// -- toggleLayerStatus
actions.toggleLayerStatus = ({ commit }, payload) => {
  commit(beadApp.toggleLayerStatus, payload)
}
mutations[beadApp.toggleLayerStatus] = (state, { status, id }) => {
  let layer = _.find(state.layers, {id})
  if (layer) {
    let v = !layer.status[status]

    if (status === 'only') {
      state.onlyLayer = v ? id : null
      state.layers.forEach(layer => {
        layer.status.force = false
      })
    }
    layer.status[status] = v
  }
}
// --

// -- chainLayer
getters.chainStatuses = (state) => {
  return _.reduce(state.layers, (ret, layer) => {
    if (layer.id === state.currentLayer) {
      ret[layer.id] = true
    } else {
      let chain = _.find(state.chains, layers => layers.indexOf(state.currentLayer) > -1)
      ret[layer.id] = chain ? chain.indexOf(layer.id) > -1 : false
    }
    return ret
  }, {})
}
actions.chainLayer = ({ commit }, layerId) => {
  commit(beadApp.chainLayer, layerId)
}
mutations[beadApp.chainLayer] = (state, layerId) => {
  let chain = _.find(state.chains, layers => {
    return layers.indexOf(state.currentLayer) > -1
  })
  if (!chain) { // 链不存在，新建一个
    chain = [state.currentLayer]
    state.chains.push(chain)
  }

  // 检查目前layer是否处于其他chain中间，如果是，去掉它
  let chain2 = _.find(state.chains, layers => {
    return layers.indexOf(layerId)
  })
  if (chain2 && chain !== chain2) {
    _.pull(chain2, layerId)
  }

  let layerIndex = chain.indexOf(layerId)
  if (layerIndex > -1) {
    chain.splice(layerIndex, 1)
  } else {
    chain.push(layerId)
  }

  // 只有一个层，把链删掉
  state.chains = state.chains.filter(c => c.length > 1)
}
// --

// -- updateLayer
actions.updateLayer = ({ commit }, payload) => {
  commit(beadApp.updateLayer, payload)
}
mutations[beadApp.updateLayer] = (state, {id, data}) => {
  let layer = _.find(state.layers, {id})
  if (layer) {
    _.assign(layer, data)
  }
}
// --

// -- toggleMouseInOut
actions.toggleMouseInOut = ({ commit }, payload) => {
  commit(beadApp.toggleMouseInOut, payload)
}
mutations[beadApp.toggleMouseInOut] = (state, v) => {
  state.mouseInCanvas = v
}
// --

getters.usedColors = (state) => {
  return _.reduce(state.layers, (ret, layer) => {
    _.values(layer.data).forEach(cell => {
      if (_.indexOf(ret, cell.color) === -1) {
        ret.push(cell.color)
      }
    })
    return ret
  }, [])
}

getters.colorStatics = (state) => {

}

module.exports = {
  state,
  getters: resourceMapping(getters, prefix),
  actions: resourceMapping(actions, prefix),
  mutations,
  prefix,
  // -- exports functions
  isLayerVisible,
  findLayer
}
