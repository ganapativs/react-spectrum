import React from 'react';
declare type SpectrumProps = {
    width: number;
    colors: Array<string>;
    wordWidths: Array<number>;
    wordDistances: Array<number>;
    lineHeight: number;
    lineDistance: number;
    linesPerParagraph: number;
    paragraphs: number;
    paragraphDistance: number;
    truncateLastLine: boolean;
};
declare const _default: React.MemoExoticComponent<({ width, colors, wordWidths, wordDistances, linesPerParagraph, lineHeight, lineDistance, paragraphs, paragraphDistance, truncateLastLine, }: SpectrumProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>>;
export default _default;
