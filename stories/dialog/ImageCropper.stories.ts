import { Story } from "@storybook/vue3";
import { blobToURL, openFile } from "@";
import KxImageCropper from "@/dialog/ImageCropper.vue";

export default {
	component: KxImageCropper,
};

export const ImageCropper: Story = () => ({
	template: `
		<KxButton 
			@click="showCropper"
		>
			裁剪图片
		</KxButton>
		<DialogContainer/>
		<img
			v-if="result"
			class="cropped" 
			:src="result" 
			alt="裁剪结果" 
			:style="style"
		>
	`,
	data: () => ({
		result: null,
		style: {},
	}),
	methods: {
		async showCropper() {
			const file = await openFile("image/*");

			const cropper = this.$dialog.show(KxImageCropper, {
				mimeType: file.type,
				aspectRatio: 16 / 9,
				image: await blobToURL(file),
			});
			const i = await cropper.confirmPromise;

			this.style = {
				objectPosition: `${-i.left}px ${-i.top}px`,
				width: `${i.width}px`,
				height: `${i.height}px`,
			};

			URL.revokeObjectURL(this.result);
			this.result = URL.createObjectURL(file);
		},
	},
});