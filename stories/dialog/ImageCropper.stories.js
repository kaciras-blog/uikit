import { blobToURL, openFile } from "@";
import KxImageCropper from "@/dialog/KxImageCropper.vue";

export default {
	component: KxImageCropper,
};

export const Simple = () => ({
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

			const cropper = this.$dialog.cropImage({
				image: await blobToURL(file),
				type: file.type,
				aspectRatio: 10 / 9,
			});
			const blob = await cropper.confirmPromise;

			URL.revokeObjectURL(this.result);
			this.result = URL.createObjectURL(blob);
		},
	},
});
