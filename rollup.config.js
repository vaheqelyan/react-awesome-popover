import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import alias from "rollup-plugin-alias";
import swc from "rollup-plugin-swc";

const umdGlobals = {
	react: "React",
	"prop-types": "propTypes",
};

export default [
	{
		input: "src/index.js",
		output: {
			name: "ReactAwesomePopover",
			file: "build/index.umd.js",
			format: "umd",
			globals: umdGlobals,
		},
		external: Object.keys(umdGlobals),
		plugins: [
			nodeResolve(),
			commonjs({ include: "**/node_modules/**" }),
			replace({ "process.env.NODE_ENV": JSON.stringify("development") }),

			swc({
				jsc: {
					parser: {
						syntax: "ecmascript",
						jsx: true,
						dynamicImport: false,
						numericSeparator: false,
						classPrivateProperty: true,
						privateMethod: true,
						classProperty: true,
						functionBind: false,
						decorators: false,
						decoratorsBeforeExport: false,
					},
				},
			}),

			alias({
				react: "node_modules/react/umd/react.development.js",
				"react-dom": "./node_modules/react-dom/umd/react-dom.development.js",
			}),
			sizeSnapshot(),
		],
	},
];
