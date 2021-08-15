import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import multi from '@rollup/plugin-multi-entry';
import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default {
    input: [
        "lib/**/*.js",
        "lib/index.js"
    ],
    output: [
        {
            file: pkg.main,
            name: pkg.name,
            format: "umd",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: true
        },
    ],
    external: [],
    watch: {
        include: "lib/**",
    },
    plugins: [
        resolve({
            browser: true,
            moduleDirectories: ['node_modules']
        }),
        json(),
        multi({exports: true}),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
        }),
    ],
}