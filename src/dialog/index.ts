import { VueConstructor } from "vue";
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxContextMenu from "./KxContextMenu.vue";
import KxBaseDialog from "./KxBaseDialog.vue";
import KxStandardDialogButtons from "./KxStandardDialogButtons.vue";
import { DialogManager, DialogSession } from "./controller";
import { boundClass } from "autobind-decorator";

export { DialogManager, DialogSession };

export enum MessageBoxType {
	Info, Success, Warning, Error,
}

export interface MessageBoxOptions {
	title: string;
	content?: string;
	type?: MessageBoxType;

	/** 是否显示取消按钮，默认 false */
	showCancelButton?: boolean;

	/**
	 * 是否启用消息框默认的关闭方式，默认的关闭方式包括右上角的叉、ESC键和点击遮罩层，默认 true。
	 *
	 * 该选项为 false 表明弹窗必须通过点击按钮来关闭，此时即使 overlayClose 为 true 也不能通过遮
	 * 罩层关闭，并且在点击遮罩后会产生动效提示用户。
	 */
	closable?: boolean;

	/** 是否在点击遮罩层时关闭,该选项只有在 closable 为 true 时才有效，默认 true */
	overlayClose?: boolean;
}

@boundClass
class KxDialogManagerExt extends DialogManager {

	contextMenu(this: DialogManager, component: any, event: MouseEvent, data?: object) {
		this.show(KxContextMenu, { component, event, data });
	}

	/**
	 * 显示内置的消息框，请使用title来做一个简要的说明，如："操作失败"，内容部分可以省略
	 *
	 * @param options 选项
	 */
	alert(options: MessageBoxOptions) {
		return this.show(KxMessageBox, options);
	}

	// 下面4个都是便捷方法，其中成功的消息往往仅用于提醒一下用户，所以有个有默认标题。

	alertInfo(title: string, content?: string) {
		return this.alert({ title, content, type: MessageBoxType.Info });
	}

	alertWarning(title: string, content?: string) {
		return this.alert({ title, content, type: MessageBoxType.Warning });
	}

	alertError(title: string, content?: string) {
		return this.alert({ title, content, type: MessageBoxType.Error });
	}

	alertSuccess(title: string = "执行成功", content?: string) {
		return this.alert({ title, content, type: MessageBoxType.Success });
	}
}

// 只导出类型而不是整个class，避免暴露实现细节
export type KxDialogAPI = InstanceType<typeof KxDialogManagerExt>;

export default function install(Vue: VueConstructor) {
	Vue.component(KxBaseDialog.name, KxBaseDialog);
	Vue.component(KxDialogContainer.name, KxDialogContainer);
	Vue.component(KxContextMenu.name, KxContextMenu);
	Vue.component(KxStandardDialogButtons.name, KxStandardDialogButtons);

	const commands = new KxDialogManagerExt();

	// 指令不支持字面量，还得加个引号有点烦。
	Vue.directive("context-menu", {
		bind(el, { arg, value }, vnode) {
			const vm = vnode.context as any; // 烦人
			if (typeof value === "string") {
				value = vm.$options.components[value] || value;
			}
			el.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				commands.contextMenu(value, event, arg && vm[arg]);
			});
		},
	});

	Vue.prototype.$dialog = commands;
}
