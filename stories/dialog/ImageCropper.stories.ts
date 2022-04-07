import { Story } from "@storybook/vue3";
import { blobToURL, openFile } from "@";
import KxImageCropper from "@/dialog/KxImageCropper.vue";

export default {
	component: KxImageCropper,
};

export const ImageCropper: Story = () => ({
	template: `
		<KxButton @click="showCropper"> 裁剪图片</KxButton>
		<DialogContainer/>
		<img v-if="result" :src="result" alt="Cropped image">
	`,
	data: () => ({
		result: null,
	}),
	methods: {
		async showCropper() {
			const file = await openFile("image/*");

			const cropper = this.$dialog.show(KxImageCropper, {
				mimeType: file.type,
				aspectRatio: 10 / 9,
				image: await blobToURL(file),
			});
			const blob = await cropper.confirmPromise;

			URL.revokeObjectURL(this.result);
			this.result = URL.createObjectURL(blob);
		},
	},
});
