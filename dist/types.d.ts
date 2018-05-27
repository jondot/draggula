export interface Layout {
    left: number;
    top: number;
}
export interface Point {
    x: number;
    y: number;
}
export declare type UpdateLayoutFn = (layout: Layout) => void;
export declare type HitTestFn = (target: string) => undefined | Point;
export declare type onSnapFn = (snap: Point, dragging: boolean) => void;
export declare type UpdateHitsFn = (comp: string, hit: Point | false, hits: {
    [key: string]: Point;
}, state: DragProviderState) => void;
export interface GestureResponderEventSlice {
    nativeEvent: {
        layout: Point;
    };
}
export interface DragProviderState {
    draggables: {
        [key: string]: Point;
    };
    targets: {
        [key: string]: Point;
    };
    hits: {
        [key: string]: Point;
    };
    hitTest: HitTestFn;
    onTargetLayout: (target: string) => (e: GestureResponderEventSlice) => void;
    updateLayout: (comp: string) => UpdateLayoutFn;
}
