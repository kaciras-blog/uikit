import { storiesOf } from "@storybook/vue";
import KxImageCropper from "../src/components/KxImageCropper";
import { blobToString, openFile } from "../src";

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

			const cropper = this.$dialog.show(KxImageCropper, {
				mimeType: files[0].type,
				aspectRatio: 10 / 9,
				image: await blobToString(files[0]), // createObjectURL 也行
			});
			const blob = await cropper.confirmPromise;

			if (this.result) {
				URL.revokeObjectURL(this.result);
			}
			this.result = URL.createObjectURL(blob);
		},
	},
}))
;
