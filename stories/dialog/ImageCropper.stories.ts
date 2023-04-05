import { StoryFn } from "@storybook/vue3";
import { selectFile } from "@kaciras/utilities/browser";
import ImageCropperVue from "@/dialog/ImageCropper.vue";

export default {
	component: ImageCropperVue,
};

export const ImageCropper: StoryFn = () => ({
	template: `
		<div class="crop-image">
			<KxButton @click="showCropper">
				裁剪图片
			</KxButton>
			<pre>
				{{ JSON.stringify(result, null, 4) }}
			</pre>
			<img
				v-if="imageURL"
				class="cropped"
				:src="imageURL"
				alt="裁剪结果"
				:style="style"
			>
		</div>
		<DialogContainer></DialogContainer>
	`,
	data: () => ({
		imageURL: null,
		result: undefined,
	}),
	computed: {
		style() {
			const crop = this.result;
			if (!crop) {
				return {};
			}

			let transform = `rotate(${crop.rotate}deg)`;
			if (crop.flipX) {
				transform += " scaleX(-1)";
			}
			if (crop.flipY) {
				transform += " scaleY(-1)";
			}

			return {
				width: `${crop.width}px`,
				height: `${crop.height}px`,
				transform,
				objectPosition: `${-crop.left}px ${-crop.top}px`,
			};
		},
	},
	methods: {
		async showCropper() {
			const [image] = await selectFile("image/*");
			const cropper = this.$dialog.show(ImageCropperVue, {
				image,
				aspectRatio: 16 / 9,
			});

			this.result = await cropper.confirmPromise;
			URL.revokeObjectURL(this.imageURL);
			this.imageURL = URL.createObjectURL(image);
		},
	},
});
