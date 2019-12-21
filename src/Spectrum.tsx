import React, { memo } from 'react';
import DrawLine from './DrawLine';

type SpectrumProps = {
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

const Spectrum = ({
  width = 500,
  colors = ['#eee'],
  wordWidths = [30, 60, 90, 120, 150],
  wordDistances = [4, 8, 12],
  linesPerParagraph = 8,
  lineHeight = 12,
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
              lineHeight={lineHeight}
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
