/// <reference types="react" />
import React from 'react';
import { Provider } from 'react';
import { DragProviderState, GestureResponderEventSlice, Point, Layout, UpdateHitsFn } from './types';
export interface Props {
    onUpdateHits: UpdateHitsFn;
}
declare function createDragProvider(Provider: Provider<DragProviderState>): {
    new (props: Props, context?: any): {
        updateLayout: (comp: string) => ({ left, top }: Layout) => void;
        onUpdateHits: (comp: string, hit: false | Point, hits: {
            [key: string]: Point;
        }, state: DragProviderState) => void;
        computeHitTest: (d: Point, t: Point) => false | Point;
        hitTest: (target: string) => Point;
        onTargetLayout: (target: string) => ({ nativeEvent: { layout } }: GestureResponderEventSlice) => void;
        state: DragProviderState;
        render(): JSX.Element;
        setState<K extends "draggables" | "targets" | "hits" | "hitTest" | "onTargetLayout" | "updateLayout">(state: DragProviderState | ((prevState: Readonly<DragProviderState>, props: Props) => DragProviderState | Pick<DragProviderState, K> | null) | Pick<DragProviderState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Props>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export default createDragProvider;
