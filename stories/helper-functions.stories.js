import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import { getImageSize, getVideoSize, openFile } from "../src";

const stories = storiesOf("HelperFunctions", module);
stories.addDecorator(withKnobs);

stories.add("MediaSize", () => ({
	template: `
		<div>
			<kx-button @click="showImageFileSize">选择文件</kx-button>

			<input v-model="urlInput" placeholder="URL">
			<kx-button @click="showImageURLSize">获取大小</kx-button>

			<div v-if="size">width: {{size.width}}, height: {{size.height}}</div>

			<component
				v-if="source"
				:is="mediaType"
				:src="source"
				controls
				alt="preview"
				style="display: block"
			/>
		</div>
	`,
	data: () => ({
		urlInput: "",
		size: null,

		mediaType: null,
		source: null,
	}),
	methods: {
		async showImageURLSize() {
			const { urlInput } = this;

			// 先HEAD确定资源类型
			const head = await fetch(urlInput, { method: "HEAD" });
			if(head.headers.get("Content-Type").indexOf("image") > 0) {
				this.mediaType = "img";
				this.size = await getImageSize(urlInput);
			} else {
				this.mediaType = "video";
				this.size = await getVideoSize(urlInput);
			}

			this.source = urlInput;
		},
		async showImageFileSize() {
			const file = await openFile("image/*; video/*");

			if (file.type.indexOf("image") > 0) {
				this.mediaType = "img";
				this.size = await getImageSize(file);
			} else {
				this.mediaType = "video";
				this.size = await getVideoSize(file);
			}

			URL.revokeObjectURL(this.source);
			this.source = URL.createObjectURL(file);
		},
	},
}));
