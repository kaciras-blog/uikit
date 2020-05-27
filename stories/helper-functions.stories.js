import { storiesOf } from "@storybook/vue";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { openFile } from "../src";
import { getRasterImageSize, getSVGImageSize } from "../src/image-size";

const stories = storiesOf("HelperFunctions", module);
stories.addDecorator(withKnobs);

stories.add("CheckBox", () => ({
	props: {
		disabled: {
			default: boolean("Disabled", false),
		},
	},
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

			if (new URL(url).pathname.endsWith("svg")) {
				this.size = await getSVGImageSize(url);
			} else {
				this.size = await getRasterImageSize(url);
			}

			this.image = url;
		},
		async showImageFileSize() {
			const file = await openFile("image/*");

			if (file.type.indexOf("svg") > -1) {
				this.size = await getSVGImageSize(file);
			} else {
				this.size = await getRasterImageSize(file);
			}

			URL.revokeObjectURL(this.image);
			this.image = URL.createObjectURL(file);
		},
	},
}));
