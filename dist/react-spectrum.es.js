import { jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';

function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    for (let i = 0; i < sortedA.length; i += 1) {
        if (sortedA[i] !== sortedB[i])
            return false;
    }
    return true;
}

function getRandomInRange(min, max) {
    const mn = Math.ceil(min);
    const mx = Math.floor(max);
    return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}

const getWords = ({ width, colors, wordWidths, wordDistances, truncate, }) => {
    const minWordWidth = Math.min(...wordWidths);
    const maxWordsPerLine = Math.floor(width / minWordWidth);
    const wordForLine = getRandomInRange(Math.max(0, truncate ? 1 : maxWordsPerLine - Math.floor(maxWordsPerLine / 2)), truncate ? Math.floor(maxWordsPerLine / 2) : maxWordsPerLine);
    const words = [];
    let totalWidth = 0;
    for (let i = 0; i < wordForLine; i += 1) {
        const wordWidth = wordWidths[getRandomInRange(0, wordWidths.length - 1)];
        let wordDistance = wordDistances[getRandomInRange(0, wordDistances.length - 1)];
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
        }
        else {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function usePrevious(value) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const DrawLine = ({ width, colors, wordWidths, wordDistances, wordHeight, wordRadius, lineDistance, truncate, renderWord, }) => {
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
    const [words, setWords] = React.useState(() => getWords({
        width,
        colors,
        wordWidths,
        wordDistances,
        truncate,
    }));
    React.useEffect(() => {
        // Handle props update on the runtime
        // Memo isn't helping here as props contains array
        // whose reference might change on every re-render
        if (previous &&
            (previous.width !== width ||
                previous.wordHeight !== wordHeight ||
                previous.wordRadius !== wordRadius ||
                previous.lineDistance !== lineDistance ||
                previous.truncate !== truncate ||
                !arraysEqual(previous.wordWidths, wordWidths) ||
                !arraysEqual(previous.wordDistances, wordDistances) ||
                !arraysEqual(previous.colors, colors))) {
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
    return (jsx(Fragment, { children: words.map(({ width: w, distance, background }, i) => {
            const style = {
                width: w,
                marginRight: distance,
                height: wordHeight,
                background,
                display: 'inline-block',
                borderRadius: wordRadius,
                marginBottom: lineDistance,
            };
            // Ensure only synchronous results are rendered
            const node = renderWord({ key: i, style });
            if (node instanceof Promise) {
                throw new Error("`renderWord` must be synchronous function and not return a Promise.");
            }
            return node;
        }) }));
};
var DrawLine$1 = React.memo(DrawLine);

const Spectrum = ({ width = 500, colors = ['#eee'], wordWidths = [30, 60, 90, 120, 150], wordDistances = [4, 8, 12], wordHeight = 12, wordRadius = 20, linesPerParagraph = 8, lineDistance = 12, paragraphs = 1, paragraphDistance = 24, truncateLastLine = true, renderWord = ({ key, style }) => (jsx("span", { style: style }, key)), }) => {
    return (jsx(Fragment, { children: new Array(paragraphs).fill(true).map((_, i) => {
            const lines = new Array(linesPerParagraph).fill(true).map((__, j) => (jsx("div", { "data-line": j, children: jsx(DrawLine$1, { width: width, colors: colors, wordWidths: wordWidths, wordDistances: wordDistances, wordHeight: wordHeight, wordRadius: wordRadius, lineDistance: lineDistance, truncate: truncateLastLine ? j === linesPerParagraph - 1 : false, renderWord: renderWord }) }, j)));
            return (jsx("div", { "data-paragraph": i, style: {
                    marginBottom: paragraphDistance,
                    fontSize: 0,
                }, children: lines }, i));
        }) }));
};
var Spectrum$1 = React.memo(Spectrum);

export { Spectrum$1 as default };
//# sourceMappingURL=react-spectrum.es.js.map
