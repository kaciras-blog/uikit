<!-- TODO:以后可以删掉，目前仅为兼容 -->
<script>
import PagingButtons from "./PagingButtons";
import TextPagingButtons from "./TextPagingButtons";

export default {
	name: "ButtonPager",
	props: {
		index: {
			type: Number,
			required: true,
		},
		totalCount: {
			type: Number,
			required: true,
		},
		pageSize: {
			type: Number,
			required: true,
		},
		/**
		 * 省略起始位置，在当前页面按钮左右omitPos之内
		 * 的页面将显示为按钮，超出的显示省略号。
		 */
		omitPos: {
			type: Number,
			default: 2,
		},
		theme: {
			type: String,
			default: "button", // text
		},
	},
	render(h) {
		const { current, omitPos, totalPage, theme } = this;

		return h(theme === "button" ? PagingButtons : TextPagingButtons, {
			props: { index: current, total: totalPage, omitPos },
			on: { showPage: index => this.showPage(index) },
		});
	},
	computed: {
		current() {
			return this.index + 1;
		},
		totalPage() {
			return Math.max(0, Math.floor((this.totalCount - 1) / this.pageSize) + 1);
		},
	},
	methods: {
		showPage(index) {
			this.$emit("load-page", index - 1);
		},
	},
};
</script>
