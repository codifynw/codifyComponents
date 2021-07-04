import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import autoprefixer from 'autoprefixer'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

export default {
  input: 'src/lib/components.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: ['.js'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    babel({
      presets: ['@babel/preset-react'],
    }),
    commonjs(),
    postcss({
      plugins: [autoprefixer()],
      extensions: ['.sass', '.scss', '.css'],
      extract: path.resolve('dist/styles.css'),
      minimize: true,
    }),
  ],
}
