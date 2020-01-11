import * as React from 'react';
import arraysEqual from './utils/arraysEqual';
import getWords from './utils/getWords';
import usePrevious from './usePrevious';
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

const DrawLine = ({
  width,
  colors,
  wordWidths,
  wordDistances,
  wordHeight,
  wordRadius,
  lineDistance,
  truncate,
  renderWord,
}: DrawLineProps): React.ReactElement => {
  const previous = usePrevious({
    width,
    colors,
    wordWidths,
    wordDistances,
    wordHeight,
    wordRadius,
    lineDistance,
    truncate,
    renderWord,
  });
  const [words, setWords] = React.useState(() =>
    getWords({
      width,
      colors,
      wordWidths,
      wordDistances,
      truncate,
    }),
  );

  React.useEffect(() => {
    // Handle props update on the runtime
    // Memo isn't helping here as props contains array
    // whose reference might change on every re-render
    if (
      previous &&
      (previous.width !== width ||
        previous.wordHeight !== wordHeight ||
        previous.wordRadius !== wordRadius ||
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
    wordHeight,
    wordRadius,
    lineDistance,
  ]);

  return (
    <>
      {words.map(({ width: w, distance, background }, i) => {
        const style = {
          width: w,
          marginRight: distance,
          height: wordHeight,
          background,
          display: 'inline-block',
          borderRadius: wordRadius,
          marginBottom: lineDistance,
        };

        return renderWord({ key: i, style });
      })}
    </>
  );
};

export default React.memo(DrawLine);
