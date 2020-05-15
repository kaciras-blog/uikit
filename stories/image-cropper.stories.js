import { storiesOf } from "@storybook/vue";
import KxImageCropper from "../src/components/KxImageCropper";
import { openFile } from "../src";

const stories = storiesOf("ImageCropper", module);

stories.add("simple", () => ({
	template: `
		<div>
			<kx-button icon="fa fa-upload" @click="showCropper"> 裁剪图片</kx-button>
			<kx-dialog-container/>
			<img v-if="result" :src="result" alt="Cropped image">
		</div>
	`,
	data: () => ({
		result: null,
	}),
	methods: {
		async showCropper() {
			const files = await openFile(false, "image/*");
			const reader = new FileReader();
			reader.addEventListener("load", async ev => {
				const cropper = this.$dialog.show(KxImageCropper, {
					image: ev.target.result,
					width: 500,
					height: 450,
				});
				(await cropper.confirmPromise).toBlob(blob => {
					if (this.result) {
						URL.revokeObjectURL(this.result);
					}
					this.result = URL.createObjectURL(blob);
				});
			});
			reader.readAsDataURL(files[0]);
		},
	},
}));
