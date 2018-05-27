/// <reference types="react" />
import { Component } from 'react';
import { DragProviderState, onSnapFn, UpdateLayoutFn, HitTestFn } from './types';
import { PanResponderInstance, Animated } from 'react-native';
export interface Props {
    onSnap: onSnapFn;
    provide: string;
    context: DragProviderState;
    zIndex: number;
}
declare class Dragged extends Component<Props> {
    state: {
        pan: Animated.ValueXY;
    };
    _memoizedCoords: {
        left: number;
        top: number;
    };
    _value: {
        x: number;
        y: number;
    };
    _moveOffset: {
        x: number;
        y: number;
    };
    _dragging: boolean;
    panResponder: PanResponderInstance;
    _contextUpdateLayout: UpdateLayoutFn;
    _contextHitTest: () => ReturnType<HitTestFn>;
    _debouncedSnap: onSnapFn;
    onMove: () => void;
    constructor(props: Props);
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Dragged;
