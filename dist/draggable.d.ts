/// <reference types="react" />
import React from 'react';
import { Consumer } from 'react';
import { onSnapFn, DragProviderState } from './types';
export interface Props {
    provide: string;
    onSnap: onSnapFn;
    lockOnHit: boolean;
}
declare function createDraggable(Consumer: Consumer<DragProviderState>): {
    new (props: Props, context?: any): {
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Props) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Props>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export default createDraggable;
