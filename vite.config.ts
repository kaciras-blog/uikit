/// <reference types="vitest" />
import { defineConfig } from "vite";
import svgSfc from "vite-plugin-svg-sfc";
import vue from "@vitejs/plugin-vue";
import packageJson from "./package.json" assert { type: "json" };

/*
 * 【已经试过的库】
 * https://github.com/qmhc/vite-plugin-dts 不生成 vue 文件的类型。
 */

export default defineConfig(({ mode }) => ({
	plugins: [svgSfc(), vue()],
	test: {
		environment: "happy-dom",
		clearMocks: true,
		include: ["__tests__/**/*.spec.ts"],
	},
	build: {
		reportCompressedSize: false,

		// website 项目里还会再次构建的，这里不转换。
		target: "esnext",
		lib: {
			entry: "src/index.ts",
			name: "ui-kit",
			formats: ["es"],
			fileName: "index",
		},
		rollupOptions: {
			external: Object.keys(packageJson.dependencies),
		},
	},
	css: {
		modules: {
			generateScopedName: mode === "production"
				? "[hash:base64:5]" : undefined,
		},
	},
}));
