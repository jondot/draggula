import React from 'react'
import { DragProviderState } from './types'
const defaultContext: DragProviderState = {
  onTargetLayout: (target: string) => () => {},
  updateLayout: () => () => {},
  hitTest: () => undefined,
  draggables: {},
  targets: {},
  hits: {}
}
const createContext = () => React.createContext(defaultContext)

export default createContext
