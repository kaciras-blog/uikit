import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";
import { join } from "path";
import { fileURLToPath } from "url";

export default <StorybookConfig>{
	framework: {
		name: "@storybook/vue3-vite",
		options: {},
	},
	addons: [
		"@storybook/addon-actions",
	],
	docs: {
		autodocs: "tag",
	},

	stories: [
		// "../stories/**/*.mdx",
		"../stories/**/*.stories.ts",
	],
	viteFinal(config) {


		return mergeConfig(config, {
			resolve: {
				alias: {
					"@": join(fileURLToPath(import.meta.url), "../../src")
				}
			},
		})
	}
};
