
/** 屏蔽 WebStorm 不能识别 $style 而产生的警告 */
declare module "vue/types/vue" {
	interface Vue {
		$style: { [key: string]: string };
	}
}

declare module "*.vue" {
	import Vue from "vue";
	export default Vue;
}
