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
    const pillWidth = wordWidths[getRandomInRange(0, wordWidths.length - 1)];
    const pillDistance =
      wordDistances[getRandomInRange(0, wordDistances.length - 1)];

    if (totalWidth + pillWidth + pillDistance > width) {
      break;
    } else {
      totalWidth += pillWidth + pillDistance;
    }

    const background = colors[getRandomInRange(0, colors.length - 1)];
    words.push({ width: pillWidth, distance: pillDistance, background });
  }

  return words;
};

export default getWords;
