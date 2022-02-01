import { readFileSync } from "fs";
import { URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueSvgComponent } from "@kaciras-blog/devtool";

const url = new URL("./package.json", import.meta.url);
const { dependencies } = JSON.parse(readFileSync(url, "utf8"));

/*
 * 【已经试过的库】
 * https://github.com/qmhc/vite-plugin-dts 不生成 vue 文件的类型。
 */

export default defineConfig({
	plugins: [vue(), vueSvgComponent()],
	build: {
		lib: {
			entry: "src/index.ts",
			name: "ui-kit",
			formats: ["es"],
			fileName: () => "index.js",
		},
		rollupOptions: {
			external: Object.keys(dependencies),
		},
	},
});
