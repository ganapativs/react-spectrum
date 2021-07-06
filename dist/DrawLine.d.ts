import * as React from 'react';
import { RenderWordProps } from './Spectrum';
interface DrawLineProps {
    width: number;
    colors: Array<string>;
    wordWidths: Array<number>;
    wordDistances: Array<number>;
    truncate: boolean;
    wordHeight: number;
    wordRadius: number;
    lineDistance: number;
    renderWord: React.FC<RenderWordProps>;
}
declare const _default: React.MemoExoticComponent<({ width, colors, wordWidths, wordDistances, wordHeight, wordRadius, lineDistance, truncate, renderWord, }: DrawLineProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>>;
export default _default;
