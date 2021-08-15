import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import {terser} from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
    input: "lib/index.js",
    output: [
        {
            file: pkg.main,
            name: pkg.name,
            format: "umd",
            sourcemap: false,
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: false
        },
    ],
    plugins: [
        json(),
        resolve({
            browser: true,
            moduleDirectories: ['node_modules']
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
        }),
        terser()
    ],
}