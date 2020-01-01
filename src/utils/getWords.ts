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
    let wordDistance =
      wordDistances[getRandomInRange(0, wordDistances.length - 1)];

    const totalWidthWithoutDistance = totalWidth + wordWidth;
    totalWidth = totalWidthWithoutDistance + wordDistance;

    // If we can just fit the word without margin, push it by resetting margin
    const fitWord = totalWidthWithoutDistance <= width && totalWidth > width;
    const fitWordWithDistance = totalWidth <= width;

    if (fitWord || fitWordWithDistance) {
      // If we are fitting the word, assume that it's the last word
      // so, reset it's distance
      if (fitWord && !fitWordWithDistance) {
        wordDistance = 0;
      }

      const background = colors[getRandomInRange(0, colors.length - 1)];
      words.push({ width: wordWidth, distance: wordDistance, background });

      // If we are fitting the word, it's the last word
      if (fitWord && !fitWordWithDistance) {
        break;
      }
    } else {
      // If we cannot fit the word into the line
      // clear the margin of the last word
      const [last] = [...words].reverse();
      if (last) {
        last.distance = 0;
      }
      break;
    }
  }

  return words;
};

export default getWords;
