const { optimize } = require("svgo");

/**
 * 调整 SVG 的属性，使其能够用容器元素的 CSS 控制：
 * 1）宽高设为 1em 以便外层用 font-size 控制。
 * 2）将 fill 和 stroke 改为 currentColor 以便用 color 控制。
 *
 * 代码从另一个项目复制的：
 * https://github.com/Kaciras/browser-theme/blob/master/rollup/svg.js
 */
const reactivePlugin = {
	name: "reactiveSVGAttribute",
	type: "perItem",
	fn(ast) {
		const { type, name, attributes } = ast;

		if (type === "element" && name === "svg") {
			const { fill, stroke } = attributes;

			if (stroke && stroke !== "none") {
				attributes.stroke = "currentColor";
			}
			if (fill && fill !== "none") {
				attributes.fill = "currentColor";
			}
			attributes.width = attributes.height = "1em";
		}
	},
};

const minifyPreset = {
	name: "preset-default",
	params: {
		overrides: {
			removeViewBox: false,
		},
	},
};

const developmentPlugins = [
	reactivePlugin,
	{ name: "removeDoctype" },
	{ name: "removeXMLProcInst" },
];

const productionPlugins = [
	reactivePlugin,
	minifyPreset, // 它会把 #000000 改为 none 导致 reactivePlugin 失效，要放到最后。
];

/**
 * SVG 组件的加载器，优化 SVG 并将宽高、颜色等属性设为能够响应的值。
 *
 * 因为后面可能有其它的加载器，可能将内容转为非 SVG 导致插件无法优化，所以此处顺带优化了。
 *
 * @param svg SVG 文本
 * @return 修改后的 SVG 文本
 */
module.exports = function (svg) {
	const { mode, resourcePath } = this;

	const plugins = (mode === "production")
		? productionPlugins
		: developmentPlugins;

	const result = optimize(svg, { plugins, path: resourcePath });

	if (!result.modernError) {
		return result.data;
	}
	throw new Error("无法解析 SVG 资源:" + result.modernError);
};