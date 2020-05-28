import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import { getImageSize, openFile } from "../src";

const stories = storiesOf("HelperFunctions", module);
stories.addDecorator(withKnobs);

stories.add("CheckBox", () => ({
	template: `
		<div>
			<kx-button @click="showImageFileSize">选择文件</kx-button>
			<input v-model="url" placeholder="图片URL">
			<kx-button @click="showImageURLSize">获取大小</kx-button>

			<div v-if="size">width: {{size.width}}, height: {{size.height}}</div>
			<img v-if="image" :src="image" alt="preview" :style="imgStyle">
		</div>`,
	data: () => ({
		url: "",
		size: null,
		image: null,
	}),
	computed: {
		imgStyle() {
			return { width: this.size.width + "px", height: this.size.height + "px" };
		},
	},
	methods: {
		async showImageURLSize() {
			const { url } = this;
			this.size = await getImageSize(url);
			this.image = url;
		},
		async showImageFileSize() {
			const file = await openFile("image/*");
			this.size = await getImageSize(file);

			URL.revokeObjectURL(this.image);
			this.image = URL.createObjectURL(file);
		},
	},
}));
