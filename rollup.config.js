/* eslint-disable no-undef */
import {babel} from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import postCssImport from "postcss-import";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const outputFolder = "public";

const watching = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/index.js",
  output: {
    file: `${outputFolder}/app.js`,
    format: "iife",
    sourcemap: true
  },
  plugins: [
    babel({ 
      babelHelpers: "bundled"
    }),
    resolve(),
    commonjs({
        include: "node_modules/**"
    }),
    postcss({
          plugins: [postCssImport]
        })

  ].concat(
      watching? [
        serve({contentBase: outputFolder, port: 10001}),
        livereload()
      ]:[]
  )
};
