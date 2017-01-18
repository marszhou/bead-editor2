import {beadApp} from '../mutation-types'
import {resourceMapping, generateGetterCluster} from 'utils/func'

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

  mousePosition: {x: 0, y: 0, column: 0, row: 0}
}

const getters = {
  ...generateGetterCluster(state)
}

const actions = {

}

const mutations = {
  [beadApp.setMouseDown](state, v, position, viewPort) {
    state.mousedown = v
    state.mousedownPosition = position
    state.mousedownViewPort = viewPort
  },
  [beadApp.setMousePosition](state, position) {
    state.mousePosition = position
  }
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
actions.setMouseDown = ({ commit }, v, position = null, viewPort = null) => {
  commit(beadApp.setMouseDown, v, position, viewPort)
}
mutations[beadApp.setMouseDown] = (state, v, position, viewPort) => {
  state.mousedown = v
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

module.exports = {
  state,
  getters: resourceMapping(getters, prefix),
  actions: resourceMapping(actions, prefix),
  mutations,
  prefix
}