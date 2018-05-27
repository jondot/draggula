import React from 'react'
import { Component } from 'react'
import L from 'lodash'
import { Provider } from './context'
import {
  DragProviderState,
  GestureResponderEventSlice,
  Point,
  Layout,
  HitTestFn,
  UpdateLayoutFn,
  UpdateHitsFn
} from './types'
import { debounce, FPS_60 } from './utils'

const SNAP_THRESH = 10

interface Props {
  onUpdateHits: UpdateHitsFn
}
interface IDragProvider {
  onTargetLayout: (target: string) => (e: GestureResponderEventSlice) => void
}

class DragProvider extends Component<Props, DragProviderState> {
  updateLayout = (comp: string) => ({ left, top }: Layout) => {
    const pos = {
      x: left,
      y: top
    }
    const hit = this.computeHitTest(pos, this.state.targets[comp])

    const hits = this.state.hits
    if (hit) {
      hits[comp] = hit
    } else {
      delete hits[comp]
    }

    this.onUpdateHits(comp, hit, hits, this.state)
    this.setState({
      draggables: { ...this.state.draggables, [comp]: pos },
      hits
    })
  }
  onUpdateHits = debounce(
    (
      comp: string,
      hit: Point | false,
      hits: { [key: string]: Point },
      state: DragProviderState
    ) => {
      this.props.onUpdateHits(comp, hit, hits, state)
    },
    FPS_60
  )
  computeHitTest = (d: Point, t: Point) => {
    if (
      d &&
      t &&
      Math.abs(d.x - t.x) < SNAP_THRESH &&
      Math.abs(d.y - t.y) < SNAP_THRESH
    ) {
      return t
    }
    return false
  }
  hitTest = (target: string) => {
    return this.state.hits[target]
  }
  onTargetLayout = (target: string) => ({
    nativeEvent: { layout }
  }: GestureResponderEventSlice): void => {
    console.log('target: laying out', { target, layout })
    this.setState({ targets: { ...this.state.targets, [target]: layout } })
  }

  state: DragProviderState = {
    draggables: {},
    targets: {},
    hits: {},
    updateLayout: this.updateLayout,
    hitTest: this.hitTest,
    onTargetLayout: this.onTargetLayout
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export default DragProvider
