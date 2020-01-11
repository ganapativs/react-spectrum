import * as React from 'react';
import { RenderWord } from './Spectrum';
interface DrawLineProps {
    width: number;
    colors: Array<string>;
    wordWidths: Array<number>;
    wordDistances: Array<number>;
    truncate: boolean;
    wordHeight: number;
    wordRadius: number;
    lineDistance: number;
    renderWord: RenderWord;
}
declare const _default: React.MemoExoticComponent<({ width, colors, wordWidths, wordDistances, wordHeight, wordRadius, lineDistance, truncate, renderWord, }: DrawLineProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>>;
export default _default;
