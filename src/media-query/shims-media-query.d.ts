// noinspection ES6UnusedImports (1.确保在声明补充的类型之前导入 'vue')
import Vue from "vue";
import { MediaQueryAPI } from ".";

declare module "vue/types/vue" {
	interface Vue { $mediaQuery: MediaQueryAPI; }
}
