import getRandomInRange from './getRandomInRange';

const getWords = ({
  width,
  colors,
  wordWidths,
  wordDistances,
  truncate,
}: {
  width: number;
  colors: Array<string>;
  wordWidths: Array<number>;
  wordDistances: Array<number>;
  truncate: boolean;
}): Array<{ width: number; distance: number; background: string }> => {
  const minWordWidth = Math.min(...wordWidths);
  const maxWordsPerLine = Math.floor(width / minWordWidth);
  const wordForLine = getRandomInRange(
    Math.max(
      0,
      truncate ? 1 : maxWordsPerLine - Math.floor(maxWordsPerLine / 2),
    ),
    truncate ? Math.floor(maxWordsPerLine / 2) : maxWordsPerLine,
  );

  const words = [];
  let totalWidth = 0;
  for (let i = 0; i < wordForLine; i += 1) {
    const wordWidth = wordWidths[getRandomInRange(0, wordWidths.length - 1)];
    const wordDistance =
      wordDistances[getRandomInRange(0, wordDistances.length - 1)];

    /**
     * TODO
     * ----
     * Check if the possible last word with margin fits(if this fits, it might not be the last word)
     * Check if possible last word without margin fits(this is the last word)
     * If the word doesn't fit, we will stop
     */
    if (totalWidth + wordWidth + wordDistance > width) {
      // If we cannot fit the word into the line
      // clear the margin of the last word
      const [last] = [...words].reverse();
      if (last) {
        last.distance = 0;
      }
      break;
    } else {
      totalWidth += wordWidth + wordDistance;
    }

    const background = colors[getRandomInRange(0, colors.length - 1)];
    words.push({ width: wordWidth, distance: wordDistance, background });
  }

  return words;
};

export default getWords;
