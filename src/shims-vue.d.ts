import Vue from "vue";

/** 屏蔽WebStorm不能识别$style而产生的警告 */
declare module "vue/types/vue" {
	interface Vue {
		$style: { [key: string]: string };
	}
}

declare module "*.vue" {
	export default Vue;
}
