/// <reference types="vitest" />
import { defineConfig } from "vite";
import svgSfc from "vite-plugin-svg-sfc";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import packageJson from "./package.json" with { type: "json" };

export default defineConfig(({ mode }) => ({
	plugins: [
		svgSfc(),
		vue(),
		mode === "lib" && dts({
			include: "src",
			rollupTypes: true,
			staticImport: true,
		}),
	],
	test: {
		environment: "happy-dom",
		clearMocks: true,
		include: ["tests/**/*.spec.ts"],
		env: {
			TZ: "Asia/Shanghai",
		},
	},
	build: {
		reportCompressedSize: false,

		// website 项目里还会再次构建的，这里不转换。
		target: "esnext",
		lib: {
			entry: "src/index.ts",
			formats: ["es"],
			fileName: "index",
		},
		rollupOptions: {
			external: Object.keys(packageJson.dependencies),
		},
	},
	css: {
		modules: {
			generateScopedName: mode !== "development"
				? "[hash:base64:5]" : undefined,
		},
	},
}));
