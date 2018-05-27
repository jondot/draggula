import React from 'react'
import { Component } from 'react'
import {
  DragProviderState,
  onSnapFn,
  Layout,
  Point,
  UpdateLayoutFn,
  HitTestFn
} from './types'
import {
  PanResponder,
  PanResponderInstance,
  Animated,
  View
} from 'react-native'
import { debounce, FPS_60 } from './utils'
import L from 'lodash'

const SNAP_DEBOUNCE_WAIT = 400
export interface Props {
  onSnap: onSnapFn
  provide: string
  context: DragProviderState
  zIndex: number
}

class Dragged extends Component<Props> {
  state = {
    pan: new Animated.ValueXY()
  }
  _memoizedCoords = { left: 0, top: 0 }
  _value = { x: 0, y: 0 }
  _moveOffset = { x: 0, y: 0 }
  _dragging = false
  panResponder: PanResponderInstance
  _contextUpdateLayout: UpdateLayoutFn
  _contextHitTest: () => ReturnType<HitTestFn>
  _debouncedSnap: onSnapFn = () => {}

  onMove = () => {
    const offset = this._moveOffset
    const delta = this.state.pan.getLayout()
    const coords = this._memoizedCoords

    // @ts-ignore
    coords.left = offset.x + delta.left._value
    // @ts-ignore
    coords.top = offset.y + delta.top._value
    //console.log('coords', { x: offset.x, left: coords.left })
    this._contextUpdateLayout(coords)
    const hit = this._contextHitTest()
    if (hit) {
      const snap = hit
      if (this._dragging && snap) {
        const delta = {
          x: snap.x - this._moveOffset.x,
          y: snap.y - this._moveOffset.y
        }
        this.state.pan.setValue(delta)
        if (this._debouncedSnap) {
          this._debouncedSnap(snap, this._dragging)
        }
      }
    }
  }

  constructor(props: Props) {
    super(props)
    this._value = { x: 0, y: 0 }
    if (props.onSnap) {
      this._debouncedSnap = debounce(props.onSnap, SNAP_DEBOUNCE_WAIT)
    }

    this._contextUpdateLayout = this.props.context.updateLayout(
      this.props.provide
    )
    const hitTest = this.props.context.hitTest
    this._contextHitTest = debounce(() => hitTest(this.props.provide), FPS_60)

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset(this._value)
        this._moveOffset = this._value
        this._dragging = true
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y
          }
        ],
        { listener: this.onMove }
      ),
      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.flattenOffset()
        const layout = this.state.pan.getLayout()
        this._dragging = false
      }
    })
  }
  componentWillMount() {
    this.state.pan.addListener(c => (this._value = c))
    const Child = React.Children.only(this.props.children)
    this._value = { x: Child.props.style.left, y: Child.props.style.top }
    this.state.pan.setValue(this._value)
  }
  componentWillUnmount() {
    // @ts-ignore
    this.state.pan.removeAllListeners()
  }
  render() {
    const Child = React.Children.only(this.props.children)
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          {
            position: 'absolute',
            zIndex: this.props.zIndex
          },
          this.state.pan.getLayout()
        ]}
      >
        {React.cloneElement(Child, {
          style: { ...Child.props.style, left: 0, top: 0 }
        })}
      </Animated.View>
    )
  }
}

export default Dragged
