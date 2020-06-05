declare const getWords: ({ width, colors, wordWidths, wordDistances, truncate, }: {
    width: number;
    colors: Array<string>;
    wordWidths: Array<number>;
    wordDistances: Array<number>;
    truncate: boolean;
}) => {
    width: number;
    distance: number;
    background: string;
}[];
export default getWords;
