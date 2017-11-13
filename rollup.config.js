import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import replace from "rollup-plugin-replace";

export default {
  input: "src/index.js",
  name: "ReactAwesomePopover",
  output: {
    file: "dest/react-awesome-popover.js",
    format: "umd"
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    babel({ exclude: "node_modules/**" }),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: "node_modules/**"
    }),
    alias({
      react: "node_modules/react/umd/react.development.js",
      "react-dom":
        "node_modules/react-dom/umd/reac-dom.react-dom.development.js"
    })
  ],
  external:['react','react-dom'],
  globals:{
    react:"React",
    "react-dom":"ReactDOM"
  }
};
