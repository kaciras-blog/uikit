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
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	docs: {
		autodocs: "tag",
	},
	stories: [
		// "../stories/**/*.mdx",
		"../stories/**/*.stories.ts",
	],
	viteFinal(config) {
		const vueDocgenIndex = config.plugins.findIndex(({ name }) => name === 'storybook:vue-docgen-plugin')
		if (vueDocgenIndex !== -1) config.plugins.splice(vueDocgenIndex, 1)

		return mergeConfig(config, {
			resolve: {
				alias: {
					"@": join(fileURLToPath(import.meta.url), "../../src")
				}
			},
		})
	}
};
