import { storiesOf } from "@storybook/vue";
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
			const file = await openFile("image/*");

			const cropper = this.$dialog.cropImage({
				image: file,
				aspectRatio: 10 / 9,
			});
			const blob = await cropper.confirmPromise;

			URL.revokeObjectURL(this.result);
			this.result = URL.createObjectURL(blob);
		},
	},
}))
;
