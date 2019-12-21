import React, { memo, useEffect, useState } from 'react';
import arraysEqual from './utils/arraysEqual';
import getWords from './utils/getWords';
import usePrevious from './usePrevious';

type DrawLineProps = {
  width: number;
  colors: Array<string>;
  wordWidths: Array<number>;
  wordDistances: Array<number>;
  truncate: boolean;
  lineHeight: number;
  lineDistance: number;
};

const DrawLine = ({
  width,
  colors,
  wordWidths,
  wordDistances,
  lineHeight,
  lineDistance,
  truncate,
}: DrawLineProps): React.ReactElement => {
  const previous = usePrevious({
    width,
    colors,
    wordWidths,
    wordDistances,
    lineHeight,
    lineDistance,
    truncate,
  });
  const [words, setWords] = useState(() =>
    getWords({
      width,
      colors,
      wordWidths,
      wordDistances,
      truncate,
    }),
  );

  useEffect(() => {
    // Handle props update on the runtime
    // Memo isn't helping here as props contains array
    // whose reference might change on every re-render
    if (
      previous &&
      (previous.width !== width ||
        previous.lineHeight !== lineHeight ||
        previous.lineDistance !== lineDistance ||
        previous.truncate !== truncate ||
        !arraysEqual(previous.wordWidths, wordWidths) ||
        !arraysEqual(previous.wordDistances, wordDistances) ||
        !arraysEqual(previous.colors, colors))
    ) {
      const newWords = getWords({
        width,
        colors,
        wordWidths,
        wordDistances,
        truncate,
      });

      setWords(newWords);
    }
  }, [
    previous,
    width,
    colors,
    wordWidths,
    wordDistances,
    truncate,
    lineHeight,
    lineDistance,
  ]);

  return (
    <>
      {words.map(({ width: w, space, background }, i) => (
        <span
          key={i}
          style={{
            width: w,
            marginRight: space,
            height: lineHeight,
            background,
            display: 'inline-block',
            borderRadius: Math.max(...wordWidths),
            marginBottom: lineDistance,
          }}
        />
      ))}
    </>
  );
};

export default memo(DrawLine);
