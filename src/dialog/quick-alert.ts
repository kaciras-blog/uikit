import { App, inject } from "vue";
import { boundClass } from "autobind-decorator";
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox, { MessageBoxProps } from "./KxMessageBox.vue";
import KxImageCropper from "./KxImageCropper.vue";
import { DialogSession, QuickDialogController } from "./controller";

export { QuickDialogController, DialogSession };

export enum MessageBoxType {
	Info,
	Success,
	Warning,
	Error,
}

export interface ImageCopperProps {
	image: Blob | string;
	type?: string;
	aspectRatio: number;
}

@boundClass
class KxDialogManagerExt extends QuickDialogController {

	/**
	 * 显示内置的消息框，请使用title来做一个简要的说明，如："操作失败"，内容部分可以省略
	 *
	 * @param options 选项
	 */
	alert(options: MessageBoxProps) {
		return this.show<void>(KxMessageBox, options);
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

	alertSuccess(title = "执行成功", content?: string) {
		return this.alert({ title, content, type: MessageBoxType.Success });
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
		session.finally(() => URL.revokeObjectURL(imageURL));
		return session;
	}
}

// 只导出类型而不是整个class，避免暴露实现细节
export type KxDialogAPI = InstanceType<typeof KxDialogManagerExt>;

export function useDialog() {
	return inject<KxDialogAPI>("$dialog");
}

export default function (app: App) {
	const controller = new KxDialogManagerExt();

	// 为了方便插件见通信，以及兼容性考虑，还是得把它加入全局属性里。
	app.config.globalProperties.$dialog = controller;

	app.provide("$dialog", controller);
	app.component("KxDialogContainer", KxDialogContainer);
}
