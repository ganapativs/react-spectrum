import * as React from 'react';
export interface RenderWordProps {
    key: number;
    style: React.CSSProperties;
}
declare type SpectrumProps = {
    /**
     * Width of the placeholder container
     */
    width?: number;
    /**
     * Possible colors of words, will be picked randomly
     */
    colors?: Array<string>;
    /**
     * Possible widths of words, will be picked randomly
     */
    wordWidths?: Array<number>;
    /**
     * Possible distance between words, will be picked randomly
     */
    wordDistances?: Array<number>;
    /**
     * Height of every word placeholder
     */
    wordHeight?: number;
    /**
     * Border radius of every word
     */
    wordRadius?: number;
    /**
     * Distance(margin) between the lines
     */
    lineDistance?: number;
    /**
     * Lines per paragraph
     * if there are multiple paragraphs, all of them will have same number of lines
     */
    linesPerParagraph?: number;
    /**
     * Number of paragraphs in the placeholder
     */
    paragraphs?: number;
    /**
     * Distance(margin) between the paragraphs
     */
    paragraphDistance?: number;
    /**
     * Show less words in the last line for more natural feel
     */
    truncateLastLine?: boolean;
    /**
     * Render word with customizations
     */
    renderWord?: React.FC<RenderWordProps>;
};
declare const _default: React.MemoExoticComponent<({ width, colors, wordWidths, wordDistances, wordHeight, wordRadius, linesPerParagraph, lineDistance, paragraphs, paragraphDistance, truncateLastLine, renderWord, }: SpectrumProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>>;
export default _default;
