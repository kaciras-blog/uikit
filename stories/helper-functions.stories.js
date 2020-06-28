import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";
import { getImageResolution, getVideoResolution, openFile } from "../src";

const stories = storiesOf("HelperFunctions", module);
stories.addDecorator(withKnobs);

stories.add("MediaResolution", () => ({
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
				:style="previewStyle"
			/>
		</div>
	`,
	data: () => ({
		urlInput: "",
		size: null,

		mediaType: null,
		source: null,
	}),
	computed: {
		previewStyle() {
			const { width, height } = this.size || {};
			return {
				display: "block",
				width: width + "px",
				height: height + "px",
			};
		},
	},
	methods: {
		async showImageURLSize() {
			const { urlInput } = this;

			// 先HEAD确定资源类型
			const head = await fetch(urlInput, { method: "HEAD" });
			await this.parse(head.headers.get("Content-Type"), urlInput);

			this.source = urlInput;
		},
		async showImageFileSize() {
			const file = await openFile("image/*,video/*");

			await this.parse(file.type, file);

			URL.revokeObjectURL(this.source);
			this.source = URL.createObjectURL(file);
		},
		async parse(type, source) {
			if (type.indexOf("image") === -1) {
				this.mediaType = "video";
				this.size = await getVideoResolution(source);
			} else {
				this.mediaType = "img";
				this.size = await getImageResolution(source);
			}
		},
	},
}));
