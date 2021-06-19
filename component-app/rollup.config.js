import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
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
    // serve({
    //   open: true,
    //   verbose: true,
    //   contentBase: ['', 'public'],
    //   host: 'localhost',
    //   port: 3000,
    // }),
    // livereload({ watch: 'dist' }),
    postcss({
      extract: true,
      // Or with custom file name
      extract: path.resolve('dist/styles.css'),
    }),
  ],
}
