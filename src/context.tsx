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
const { Consumer, Provider } = React.createContext(defaultContext)

export { Consumer, Provider }
