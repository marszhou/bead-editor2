import {resourceMaker} from 'utils/func'

export const foo = resourceMaker([], [
  'add', 'get', 'list', 'remove', 'removeAll'
], 'foo/')

export const beadApp = resourceMaker([], [
  'setCurrentTool',
  'setEditorZoom',
  'setEditorViewPort',
  'setEditorSize',
  'setEditorDimension',
  'setEditorMargin',
  'setAltKey',
  'setMouseDown',
  'setMousePosition',
  'setPencilColor'
], 'bead_app/')