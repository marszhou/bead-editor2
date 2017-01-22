import {beadApp} from '../mutation-types'
import {resourceMapping, generateGetterCluster, uniqueKey} from 'utils/func'

const prefix = 'beadApp_'
const state = {
  currentTool: 1,
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
  editorMargin: [25, 25],
  altKey: false,
  mousedown: false,
  mousedownPosition: null,
  mousedownViewPort: null,

  mousePosition: {x: 0, y: 0, column: 0, row: 0},
  pencilColor: {hex: '#000000'},
  pencilSize: 1,
  eraserSize: 1,

  layers: [],
  currentLayerIndex: -1
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

// -- is mouse down?
actions.setMouseDown = ({ commit }, payload) => {
  commit(beadApp.setMouseDown, payload)
}
mutations[beadApp.setMouseDown] = (state, {isDown, position, viewPort} = {}) => {
  state.mousedown = isDown
  state.mousedownPosition = position
  state.mousedownViewPort = viewPort
}
// --

// -- track mouse position
actions.setMousePosition = ({ commit }, v) => {
  commit(beadApp.setMousePosition, v)
}
mutations[beadApp.setMousePosition] = (state, position) => {
  state.mousePosition = position
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

// -- insertLayer
actions.insertLayer = ({ commit }, position) => {
  commit(beadApp.insertLayer, position)
}
mutations[beadApp.insertLayer] = (state, position) => {
  state.layers.splice(position, 0, {
    name: '未命名',
    translation: {x: 0, y: 0},
    data: [],
    id: uniqueKey()
  })

  state.currentLayerIndex = position
}
// --

// -- removeLayer
actions.removeLayer = ({ commit }, layerId) => {
  commit(beadApp.removeLayer, layerId)
}
mutations[beadApp.removeLayer] = (state, layerId) => {
  let index = _.findIndex(state.layers, {id: layerId})
  state.layers.splice(index, 1)
  state.currentLayerIndex = -1
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

// -- setCurrentLayerIndex
actions.setCurrentLayerIndex = ({ commit }, v) => {
  commit(beadApp.setCurrentLayerIndex, v)
}
mutations[beadApp.setCurrentLayerIndex] = (state, v) => {
  state.currentLayerIndex = v
}
// --

module.exports = {
  state,
  getters: resourceMapping(getters, prefix),
  actions: resourceMapping(actions, prefix),
  mutations,
  prefix
}
