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
		const { current, omitPos, totalPage, theme, $style } = this;

		const buttons = h(theme === "button" ? PagingButtons : TextPagingButtons, {
			props: { index: current, total: totalPage, omitPos },
			on: { showPage: index => this.showPage(index) },
		});

		if (theme === "text") {
			return buttons;
		} else {
			/*
		 	 * <div class="minor-text">
		 	 *     <span>共{{totalPage}}页，</span>
		 	 *     <label>跳至<input ...>页</label>
		 	 * </div>
		 	 */
			const jumpInput = h("input", {
				staticClass: $style.jump,
				on: { keyup: this.jump },
			});
			const jump = h("div", { staticClass: "minor-text" }, [
				h("span", `共${totalPage}页，`),
				h("label", { staticClass: $style.jump_label }, ["跳至", jumpInput, "页"]),
			]);
			return h("div", { staticClass: $style.wrapper }, [buttons, jump]);
		}
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
		jump(event) {
			if (event.key === "Enter") {
				this.$emit("load-page", event.target.value - 1);
				event.target.value = "";
			}
		},
		showPage(index) {
			this.$emit("load-page", index - 1);
		},
	},
};
</script>

<style module lang="less">
@import "../css/exports";

.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.jump {
	font-size: .8em;
	width: 4em;
	margin: 0 .5em;
	text-align: center;
}

.jump_label {
	display: inline-flex;
	align-items: center;
}
</style>
