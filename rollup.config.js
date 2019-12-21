import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getPlugins = () => [
  eslint(),
  external(),
  resolve(),
  babel({
    comments: true,
    exclude: 'node_modules/**',
  }),
  commonjs(),
  typescript(),
];

export default [
  {
    input: 'src/Spectrum.tsx',
    output: {
      globals: {
        react: 'React',
      },
      name: 'ReactSpectrum',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: getPlugins().concat([terser()]),
  },
  {
    input: 'src/Spectrum.tsx',
    external: ['react'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: getPlugins().concat([terser()]),
  },
  {
    input: 'src/Spectrum.tsx',
    external: ['react'],
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: getPlugins(),
  },
];
