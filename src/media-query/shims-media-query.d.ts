// noinspection ES6UnusedImports
import Vue from "vue";
import { MediaQueryAPI } from ".";

declare module "vue/types/vue" {
	interface Vue { $mediaQuery: MediaQueryAPI; }
}
