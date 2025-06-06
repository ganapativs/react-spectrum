import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import pkg from './package.json' with { type: 'json' };

const getPlugins = () => [
  peerDepsExternal(),
  resolve(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }]
    ],
  }),
  commonjs(),
  typescript(),
  // Cleanup typescript license and other comments from the output bundle
  cleanup({
    comments: false,
  }),
];

export default [
  {
    input: 'src/Spectrum.tsx',
    output: {
      globals: {
        react: 'React',
        'react/jsx-runtime': 'jsxRuntime',
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
        file: 'dist/react-spectrum.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'auto',
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
