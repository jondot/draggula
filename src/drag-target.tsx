import React from 'react'
import { Component, Consumer } from 'react'
import { DragProviderState } from './types'

export interface Props {
  accept: string
}
function createDragTarget(Consumer: Consumer<DragProviderState>) {
  return class DragTarget extends Component<Props> {
    render() {
      const Child = React.Children.only(this.props.children)
      return (
        <Consumer>
          {context =>
            React.cloneElement(Child, {
              style: { ...Child.props.style, position: 'absolute' },
              onLayout: context.onTargetLayout(this.props.accept)
            })
          }
        </Consumer>
      )
    }
  }
}

export default createDragTarget
