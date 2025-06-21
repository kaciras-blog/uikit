// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import core from "@kaciras/eslint-config-core";
import typescript from "@kaciras/eslint-config-typescript";
import vueTs from "@kaciras/eslint-config-vue/typescript.js";

export default [
  ...core,
  ...typescript,
  ...vueTs,
  { ignores: ["dist/**"] },
  ...storybook.configs["flat/recommended"]
];
