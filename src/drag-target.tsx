import React from 'react'
import { Component } from 'react'

import { Consumer } from './context'

export interface Props {
  accept: string
}
class DragTarget extends Component<Props> {
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

export default DragTarget
