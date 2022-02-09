import { MediaQueryAPI } from "./media-query";
import { KxDialogAPI } from "./dialog/quick-alert";
import { ToastController } from "./dialog/controller";

declare module "@vue/runtime-core" {
	interface ComponentCustomOptions {
		$toast: ToastController;
		$dialog: KxDialogAPI;
		$mediaQuery: MediaQueryAPI;
	}
}
