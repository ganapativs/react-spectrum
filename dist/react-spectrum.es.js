import React, { useRef, useEffect, memo, useState } from 'react';

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    var sortedA = __spreadArrays(a).sort();
    var sortedB = __spreadArrays(b).sort();
    for (var i = 0; i < sortedA.length; i += 1) {
        if (sortedA[i] !== sortedB[i])
            return false;
    }
    return true;
}

function getRandomInRange(min, max) {
    var mn = Math.ceil(min);
    var mx = Math.floor(max);
    return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}

var getWords = function (_a) {
    var width = _a.width, colors = _a.colors, wordWidths = _a.wordWidths, wordDistances = _a.wordDistances, truncate = _a.truncate;
    var minWordWidth = Math.min.apply(Math, wordWidths);
    var maxWordsPerLine = Math.floor(width / minWordWidth);
    var wordForLine = getRandomInRange(Math.max(0, truncate ? 1 : maxWordsPerLine - Math.floor(maxWordsPerLine / 2)), truncate ? Math.floor(maxWordsPerLine / 2) : maxWordsPerLine);
    var words = [];
    var totalWidth = 0;
    for (var i = 0; i < wordForLine; i += 1) {
        var wordWidth = wordWidths[getRandomInRange(0, wordWidths.length - 1)];
        var wordDistance = wordDistances[getRandomInRange(0, wordDistances.length - 1)];
        var totalWidthWithoutDistance = totalWidth + wordWidth;
        totalWidth = totalWidthWithoutDistance + wordDistance;
        // If we can just fit the word without margin, push it by resetting margin
        var fitWord = totalWidthWithoutDistance <= width && totalWidth > width;
        var fitWordWithDistance = totalWidth <= width;
        if (fitWord || fitWordWithDistance) {
            // If we are fitting the word, assume that it's the last word
            // so, reset it's distance
            if (fitWord && !fitWordWithDistance) {
                wordDistance = 0;
            }
            var background = colors[getRandomInRange(0, colors.length - 1)];
            words.push({ width: wordWidth, distance: wordDistance, background: background });
            // If we are fitting the word, it's the last word
            if (fitWord && !fitWordWithDistance) {
                break;
            }
        }
        else {
            // If we cannot fit the word into the line
            // clear the margin of the last word
            var last = __spreadArrays(words).reverse()[0];
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
    var ref = useRef();
    useEffect(function () {
        ref.current = value;
    });
    return ref.current;
}

var DrawLine = function (_a) {
    var width = _a.width, colors = _a.colors, wordWidths = _a.wordWidths, wordDistances = _a.wordDistances, wordHeight = _a.wordHeight, wordRadius = _a.wordRadius, lineDistance = _a.lineDistance, truncate = _a.truncate;
    var previous = usePrevious({
        width: width,
        colors: colors,
        wordWidths: wordWidths,
        wordDistances: wordDistances,
        wordHeight: wordHeight,
        wordRadius: wordRadius,
        lineDistance: lineDistance,
        truncate: truncate,
    });
    var _b = useState(function () {
        return getWords({
            width: width,
            colors: colors,
            wordWidths: wordWidths,
            wordDistances: wordDistances,
            truncate: truncate,
        });
    }), words = _b[0], setWords = _b[1];
    useEffect(function () {
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
            var newWords = getWords({
                width: width,
                colors: colors,
                wordWidths: wordWidths,
                wordDistances: wordDistances,
                truncate: truncate,
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
    return (React.createElement(React.Fragment, null, words.map(function (_a, i) {
        var w = _a.width, distance = _a.distance, background = _a.background;
        return (React.createElement("span", { key: i, style: {
                width: w,
                marginRight: distance,
                height: wordHeight,
                background: background,
                display: 'inline-block',
                borderRadius: wordRadius,
                marginBottom: lineDistance,
            } }));
    })));
};
var DrawLine$1 = memo(DrawLine);

var Spectrum = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 500 : _b, _c = _a.colors, colors = _c === void 0 ? ['#eee'] : _c, _d = _a.wordWidths, wordWidths = _d === void 0 ? [30, 60, 90, 120, 150] : _d, _e = _a.wordDistances, wordDistances = _e === void 0 ? [4, 8, 12] : _e, _f = _a.wordHeight, wordHeight = _f === void 0 ? 12 : _f, _g = _a.wordRadius, wordRadius = _g === void 0 ? 20 : _g, _h = _a.linesPerParagraph, linesPerParagraph = _h === void 0 ? 8 : _h, _j = _a.lineDistance, lineDistance = _j === void 0 ? 12 : _j, _k = _a.paragraphs, paragraphs = _k === void 0 ? 1 : _k, _l = _a.paragraphDistance, paragraphDistance = _l === void 0 ? 24 : _l, _m = _a.truncateLastLine, truncateLastLine = _m === void 0 ? true : _m;
    return (React.createElement(React.Fragment, null, new Array(paragraphs).fill(true).map(function (_, i) {
        var lines = new Array(linesPerParagraph).fill(true).map(function (__, j) { return (React.createElement("div", { "data-line": j, key: j },
            React.createElement(DrawLine$1, { width: width, colors: colors, wordWidths: wordWidths, wordDistances: wordDistances, wordHeight: wordHeight, wordRadius: wordRadius, lineDistance: lineDistance, truncate: truncateLastLine ? j === linesPerParagraph - 1 : false }))); });
        return (React.createElement("div", { "data-paragraph": i, key: i, style: {
                marginBottom: paragraphDistance,
                fontSize: 0,
            } }, lines));
    })));
};
var Spectrum$1 = memo(Spectrum);

export default Spectrum$1;
//# sourceMappingURL=react-spectrum.es.js.map
