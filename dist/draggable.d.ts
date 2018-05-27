/// <reference types="react" />
import { Component } from 'react';
import { onSnapFn } from './types';
export interface Props {
    provide: string;
    onSnap: onSnapFn;
}
declare class Draggable extends Component<Props> {
    render(): JSX.Element;
}
export default Draggable;
