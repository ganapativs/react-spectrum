declare const getWords: ({ width, colors, wordWidths, wordDistances, truncate, }: {
    width: number;
    colors: string[];
    wordWidths: number[];
    wordDistances: number[];
    truncate: boolean;
}) => {
    width: number;
    distance: number;
    background: string;
}[];
export default getWords;
