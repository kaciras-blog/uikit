import { BreakPointAPI } from "./break-point";
import { KxDialogAPI } from "./dialog/quick-alert";
import { ToastController } from "./dialog/controller";

declare module "@vue/runtime-core" {
	interface ComponentCustomOptions {
		$bp: BreakPointAPI;
		$toast: ToastController;
		$dialog: KxDialogAPI;
	}
}
