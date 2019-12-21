import React, { memo } from 'react';
import DrawLine from './DrawLine';

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
   * Distance(margin) between lines
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
   * Distance(margin) between paragraphs
   */
  paragraphDistance?: number;
  /**
   * Show less words in last line to make it feel more natural
   */
  truncateLastLine?: boolean;
};

const Spectrum = ({
  width = 500,
  colors = ['#eee'],
  wordWidths = [30, 60, 90, 120, 150],
  wordDistances = [4, 8, 12],
  linesPerParagraph = 8,
  wordHeight = 12,
  lineDistance = 12,
  paragraphs = 1,
  paragraphDistance = 24,
  truncateLastLine = true,
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
              lineDistance={lineDistance}
              truncate={truncateLastLine ? j === linesPerParagraph - 1 : false}
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

export default memo(Spectrum);
