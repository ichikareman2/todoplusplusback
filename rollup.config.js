import { defineConfig } from "rollup";
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

const config = defineConfig({
  input: 'src/index.ts',
  output: {dir: 'dist'},
  plugins: [
    commonjs(),
    typescript(),
  ]
})
export default config;