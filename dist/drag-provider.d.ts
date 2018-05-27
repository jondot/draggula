/// <reference types="react" />
import { Component } from 'react';
import { DragProviderState, GestureResponderEventSlice, Point, Layout, UpdateHitsFn } from './types';
export interface Props {
    onUpdateHits: UpdateHitsFn;
}
declare class DragProvider extends Component<Props, DragProviderState> {
    updateLayout: (comp: string) => ({ left, top }: Layout) => void;
    onUpdateHits: (comp: string, hit: false | Point, hits: {
        [key: string]: Point;
    }, state: DragProviderState) => void;
    computeHitTest: (d: Point, t: Point) => false | Point;
    hitTest: (target: string) => Point;
    onTargetLayout: (target: string) => ({ nativeEvent: { layout } }: GestureResponderEventSlice) => void;
    state: DragProviderState;
    render(): JSX.Element;
}
export default DragProvider;
