import { App, inject } from "vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxImageCropper from "./KxImageCropper.vue";
import { DialogSession, MessageType, QuickDialogController, ToastController } from "./controller";

export { QuickDialogController, DialogSession, MessageType };

/**
 * KxMessageBox 的 Props 类型，因为 Vue 的编译器 bug 只能复制出来：
 * https://github.com/vuejs/vue-next/issues/4918
 */
interface MessageBoxProps {
	title: string;
	type: MessageType;
	content?: string;
	cancelable?: boolean;
	closable?: boolean;
}

export interface ImageCopperProps {
	image: Blob | string;
	type?: string;
	aspectRatio: number;
}

/**
 * 全局的弹出层 API，通过调用方法来将组件挂载到 DialogContainer 中，通常用于弹窗。
 *
 * <2h>与挂载到模板的区别</h2>
 * 官方推荐把弹窗放在模板里，通过 teleport 挂到顶层，然后使用一个 ref 来控制开关。
 * 与本 API 相比，组件状态之间的联系更紧密，但也有缺点：
 * 1）需额外添加一个是否显示的状态，增加代码量。
 * 2）消息框等常用的组件搞得模板里到处都是。
 * 3）弹窗的 props 必须在顶层定义，即使只在弹窗动作内使用。
 *
 * 综上所述，本项目尝试不使用官方推荐的模式，仅用本 API 来实现所有弹窗。
 */
class KxDialogManagerExt extends QuickDialogController {

	/**
	 * 显示内置的消息框，优先使用 title 来做一个简要的说明，如："操作失败"，内容部分可以省略。
	 *
	 * @param options 选项
	 */
	alert(options: MessageBoxProps) {
		return this.show<void>(KxMessageBox, options);
	}

	// 下面4个都是便捷方法，其中成功的消息往往仅用于提醒一下用户，所以有个有默认标题。

	alertInfo(title: string, content?: string) {
		return this.alert({ title, content, type: MessageType.Info });
	}

	alertWarning(title: string, content?: string) {
		return this.alert({ title, content, type: MessageType.Warning });
	}

	alertError(title: string, content?: string) {
		return this.alert({ title, content, type: MessageType.Error });
	}

	alertSuccess(title = "执行成功", content?: string) {
		return this.alert({ title, content, type: MessageType.Success });
	}

	cropImage(options: ImageCopperProps) {
		if (typeof options.image === "string") {
			return this.show<Blob>(KxImageCropper, options);
		}

		const blob = options.image;
		const imageURL = URL.createObjectURL(blob);

		const session = this.show<Blob>(KxImageCropper, {
			...options,
			mimeType: options.type || blob.type,
			image: imageURL,
		});
		return session.finally(() => URL.revokeObjectURL(imageURL));
	}
}

// 只导出类型而不是整个class，避免暴露实现细节
export type KxDialogAPI = InstanceType<typeof KxDialogManagerExt>;

export function useDialog() {
	const value = inject<KxDialogAPI>("$dialog");
	if (process.env.NODE_ENV === "production" || value) {
		return value!;
	}
	throw new Error("无法获取 $dialog，请确保加入了插件");
}

export function useToast() {
	const value = inject<ToastController>("$toast");
	if (process.env.NODE_ENV === "production" || value) {
		return value!;
	}
	throw new Error("无法获取 $toast，请确保加入了插件");
}

export default function (app: App) {
	const $dialog = new KxDialogManagerExt();
	const $toast = new ToastController();

	app.provide("$dialog", $dialog);
	app.provide("$toast", $toast);

	// 加入全局属性，以兼容选项型组件。
	app.config.globalProperties.$dialog = $dialog;
	app.config.globalProperties.$toast = $toast;
}
