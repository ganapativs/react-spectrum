import React from 'react';
declare type DrawLineProps = {
    width: number;
    colors: Array<string>;
    wordWidths: Array<number>;
    wordDistances: Array<number>;
    truncate: boolean;
    lineHeight: number;
    lineDistance: number;
};
declare const _default: React.MemoExoticComponent<({ width, colors, wordWidths, wordDistances, lineHeight, lineDistance, truncate, }: DrawLineProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>>;
export default _default;
