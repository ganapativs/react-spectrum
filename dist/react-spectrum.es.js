import React, { useRef, useEffect, memo, useState } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

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
        var pillWidth = wordWidths[getRandomInRange(0, wordWidths.length - 1)];
        var pillSpace = wordDistances[getRandomInRange(0, wordDistances.length - 1)];
        if (totalWidth + pillWidth + pillSpace > width) {
            break;
        }
        else {
            totalWidth += pillWidth + pillSpace;
        }
        var background = colors[getRandomInRange(0, colors.length - 1)];
        words.push({ width: pillWidth, space: pillSpace, background: background });
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
    var width = _a.width, colors = _a.colors, wordWidths = _a.wordWidths, wordDistances = _a.wordDistances, lineHeight = _a.lineHeight, lineDistance = _a.lineDistance, truncate = _a.truncate;
    var previous = usePrevious({
        width: width,
        colors: colors,
        wordWidths: wordWidths,
        wordDistances: wordDistances,
        lineHeight: lineHeight,
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
                previous.lineHeight !== lineHeight ||
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
        lineHeight,
        lineDistance,
    ]);
    return (React.createElement(React.Fragment, null, words.map(function (_a, i) {
        var w = _a.width, space = _a.space, background = _a.background;
        return (React.createElement("span", { key: i, style: {
                width: w,
                marginRight: space,
                height: lineHeight,
                background: background,
                display: 'inline-block',
                borderRadius: Math.max.apply(Math, wordWidths),
                marginBottom: lineDistance,
            } }));
    })));
};
var DrawLine$1 = memo(DrawLine);

var Spectrum = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 500 : _b, _c = _a.colors, colors = _c === void 0 ? ['#eee'] : _c, _d = _a.wordWidths, wordWidths = _d === void 0 ? [30, 60, 90, 120, 150] : _d, _e = _a.wordDistances, wordDistances = _e === void 0 ? [4, 8, 12] : _e, _f = _a.linesPerParagraph, linesPerParagraph = _f === void 0 ? 8 : _f, _g = _a.lineHeight, lineHeight = _g === void 0 ? 12 : _g, _h = _a.lineDistance, lineDistance = _h === void 0 ? 12 : _h, _j = _a.paragraphs, paragraphs = _j === void 0 ? 1 : _j, _k = _a.paragraphDistance, paragraphDistance = _k === void 0 ? 24 : _k, _l = _a.truncateLastLine, truncateLastLine = _l === void 0 ? true : _l;
    return (React.createElement(React.Fragment, null, new Array(paragraphs).fill(true).map(function (_, i) {
        var lines = new Array(linesPerParagraph).fill(true).map(function (__, j) { return (React.createElement("div", { "data-line": j, key: j },
            React.createElement(DrawLine$1, { width: width, colors: colors, wordWidths: wordWidths, wordDistances: wordDistances, lineHeight: lineHeight, lineDistance: lineDistance, truncate: truncateLastLine ? j === linesPerParagraph - 1 : false }))); });
        return (React.createElement("div", { "data-paragraph": i, key: i, style: {
                marginBottom: paragraphDistance,
                fontSize: 0,
            } }, lines));
    })));
};
var Spectrum$1 = memo(Spectrum);

export default Spectrum$1;
//# sourceMappingURL=react-spectrum.es.js.map
