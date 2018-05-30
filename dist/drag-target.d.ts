/// <reference types="react" />
import React from 'react';
import { Consumer } from 'react';
import { DragProviderState } from './types';
export interface Props {
    accept: string;
}
declare function createDragTarget(Consumer: Consumer<DragProviderState>): {
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
export default createDragTarget;
