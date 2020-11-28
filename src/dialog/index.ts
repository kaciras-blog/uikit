import { VueConstructor } from "vue";
import { boundClass } from "autobind-decorator";
import KxDialogContainer from "./KxDialogContainer.vue";
import KxMessageBox from "./KxMessageBox.vue";
import KxBaseDialog from "./KxBaseDialog.vue";
import KxDialogButtons from "./KxDialogButtons.vue";
import KxImageCropper from "./KxImageCropper.vue";
import KxFrame from "./KxFrame.vue";
import KxFrameHeader from "./KxFrameHeader.vue";
import { DialogManager, DialogSession } from "./controller";

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

export interface ImageCopperProps {
	image: Blob | string;
	type?: string;
	aspectRatio: number;
}

@boundClass
class KxDialogManagerExt extends DialogManager {

	/**
	 * 显示内置的消息框，请使用title来做一个简要的说明，如："操作失败"，内容部分可以省略
	 *
	 * @param options 选项
	 */
	alert(options: MessageBoxOptions) {
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

	alertSuccess(title: string = "执行成功", content?: string) {
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

export default function install(Vue: VueConstructor) {
	Vue.prototype.$dialog = new KxDialogManagerExt();

	// 为了方便，把这些基础组件也注册了
	Vue.component(KxBaseDialog.name, KxBaseDialog);
	Vue.component(KxFrame.name, KxFrame);
	Vue.component(KxFrameHeader.name, KxFrameHeader);
	Vue.component(KxDialogContainer.name, KxDialogContainer);
	Vue.component(KxDialogButtons.name, KxDialogButtons);
}
