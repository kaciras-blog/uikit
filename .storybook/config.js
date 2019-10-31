import { configure } from "@storybook/vue";

configure(require.context("../stories", true, /\.stories\.(js|mdx)$/), module);
