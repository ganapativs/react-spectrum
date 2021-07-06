import * as React from 'react';
import DrawLine from './DrawLine';

export interface RenderWordProps {
  key: number;
  style: React.CSSProperties;
}

type SpectrumProps = {
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

const Spectrum = ({
  width = 500,
  colors = ['#eee'],
  wordWidths = [30, 60, 90, 120, 150],
  wordDistances = [4, 8, 12],
  wordHeight = 12,
  wordRadius = 20,
  linesPerParagraph = 8,
  lineDistance = 12,
  paragraphs = 1,
  paragraphDistance = 24,
  truncateLastLine = true,
  renderWord = ({ key, style }: RenderWordProps): React.ReactElement => (
    <span key={key} style={style} />
  ),
}: SpectrumProps): React.ReactElement => {
  return (
    <>
      {new Array(paragraphs).fill(true).map((_, i) => {
        const lines = new Array(linesPerParagraph).fill(true).map((__, j) => (
          <div data-line={j} key={j}>
            <DrawLine
              width={width}
              colors={colors}
              wordWidths={wordWidths}
              wordDistances={wordDistances}
              wordHeight={wordHeight}
              wordRadius={wordRadius}
              lineDistance={lineDistance}
              truncate={truncateLastLine ? j === linesPerParagraph - 1 : false}
              renderWord={renderWord}
            />
          </div>
        ));

        return (
          <div
            data-paragraph={i}
            key={i}
            style={{
              marginBottom: paragraphDistance,
              fontSize: 0,
            }}>
            {lines}
          </div>
        );
      })}
    </>
  );
};

export default React.memo(Spectrum);
