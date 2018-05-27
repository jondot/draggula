/// <reference types="react" />
import { Component } from 'react';
export interface Props {
    accept: string;
}
declare class DragTarget extends Component<Props> {
    render(): JSX.Element;
}
export default DragTarget;
