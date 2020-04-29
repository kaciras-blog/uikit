<!-- 流程跟 PagingButtons 有点像，但是按钮结构有些不同，也没想到什么好办法抽象下 -->
<script>
export default {
	name: "TextPagingButtons",
	functional: true,
	render(h, context) {
		const { $style } = context;
		const { index, total, omitPos } = context.props;
		const { showPage } = context.listeners;
		const buttons = [];

		function textLink(page, content) {
			const data = {
				staticClass: $style.text_link,
				attrs: { tabIndex: 0 },
				on: { click: () => showPage(page) },
			};
			return h("a", data, content);
		}

		function indexTextLink(page) {
			if (page !== index) {
				return textLink(page, page);
			}
			return h("span", { staticClass: $style.active }, page);
		}

		// 文本分页按钮一律带上总数
		buttons.push(h("span", { staticClass: $style.total }, `共${total}页`));

		if (index > 1) {
			buttons.push(textLink(1, "首页"));
			buttons.push(textLink(index - 1, "上一页"));
		}
		if (index - omitPos > 1) {
			buttons.push(h("span", { staticClass: "omit" }, "..."));
		}

		const cStart = Math.max(index - omitPos, 1);
		const cEnd = Math.min(index + omitPos, total);
		for (let i = cStart; i <= cEnd; i++) {
			buttons.push(indexTextLink(i));
		}

		if (index + omitPos < total) {
			buttons.push(h("span", { staticClass: "omit" }, "..."));
		}
		if (index < total) {
			buttons.push(textLink(index + 1, "下一页"));
			buttons.push(textLink(total, "尾页"));
		}

		return h("div", { staticClass: $style.container }, buttons);
	},
};
</script>

<style module lang="less">
@import "../css/Exports";

.container {
	user-select: none;
}

.text_link {
	padding: 0 4px;
	&:hover, :focus { color: @color-second; }
}

.active {
	padding: 0 4px;
	color: @color-primary;
	font-weight: 600;
}

.total {
	margin-right: 1rem;
}
</style>
