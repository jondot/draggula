import React from 'react'
import { Component } from 'react'

import { Consumer } from 'react'
import Dragged from './dragged'
import { onSnapFn, DragProviderState } from './types'

export interface Props {
  provide: string
  onSnap: onSnapFn
  lockOnHit: boolean
}

function createDraggable(Consumer: Consumer<DragProviderState>) {
  return class Draggable extends Component<Props> {
    render() {
      const Child = React.Children.only(this.props.children)
      return (
        <Consumer>
          {context => (
            <Dragged
              context={context}
              provide={this.props.provide}
              //optimize: move these two inside dragged and only pass context and props
              onSnap={this.props.onSnap}
              lockOnHit={this.props.lockOnHit}
              zIndex={Child.props.style.zIndex || 0}
            >
              {Child}
            </Dragged>
          )}
        </Consumer>
      )
    }
  }
}

export default createDraggable
