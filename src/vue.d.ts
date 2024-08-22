import { BreakPointAPI } from "./break-point";
import { KxDialogAPI } from "./dialog/quick-alert";
import { ToastController } from "./dialog/core";

declare module "vue" {
	interface ComponentCustomProperties {
		$bp: BreakPointAPI;
		$toast: ToastController;
		$dialog: KxDialogAPI;
	}
}
