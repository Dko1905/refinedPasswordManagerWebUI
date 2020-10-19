import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: './src/main.ts',
	output: {
		file: './dist/bundle.js',
		format: 'iife',
		sourcemap: true
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript(),
		production && terser() // minify, but only in production
	]
};