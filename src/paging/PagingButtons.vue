<script>
import KxButton from "../components/KxButton";

export default {
	name: "PagingButtons",
	functional: true,
	render(h, context) {
		const { $style } = context;
		const { index, total, omitPos } = context.props;
		const { showPage } = context.listeners;
		const buttons = [];

		function button(page, content, disabled = false) {
			const data = {
				staticClass: $style.margin_fix,
				attrs: { disabled },
				on: { click: () => showPage(page) },
			};
			return h(KxButton, data, content);
		}

		function indexButton(page) {
			if (page !== index) {
				return button(page, page);
			}
			return h("div", { staticClass: $style.active }, page);
		}

		// 下面都是按钮，前三个跟后三个是对称的，中间循环创建按钮
		buttons.push(button(index - 1, "<", index <= 1));
		buttons.push(indexButton(1));
		if (index - omitPos > 1) {
			buttons.push(h("span", { staticClass: $style.omit }, "..."));
		}

		const cStart = Math.max(index - omitPos, 2);
		const cEnd = Math.min(index + omitPos, total - 1);
		for (let i = cStart; i <= cEnd; i++) {
			buttons.push(indexButton(i));
		}

		if (index + omitPos < total) {
			buttons.push(h("span", { staticClass: $style.omit }, "..."));
		}
		if (total > 1) {
			buttons.push(indexButton(total));
		}
		buttons.push(button(index + 1, ">", index >= total));

		function jumpToPage(event) {
			const page = event.target.value;
			if (page > 0 && page < total) {
				showPage(page);
			}
			event.target.value = "";
		}

		/*
		 * <div class="minor-text">
		 *     <span>共{{totalPage}}页，</span>
		 *     <label>跳至<input ...>页</label>
		 * </div>
		 */
		const jumpInput = h("input", {
			staticClass: $style.jump_input,
			on: { change: jumpToPage },
		});
		const jumpGroup = h("label", { staticClass: "minor-text " + $style.jump_label }, ["转到", jumpInput, "页"]);
		const buttonGroup = h("div", { staticClass: "btn-group compact" }, buttons);

		return h("div", { staticClass: $style.wrapper }, [buttonGroup, jumpGroup]);
	},
};
</script>

<style module lang="less">
@import "../css/Exports";

.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.active {
	display: inline-block;
	padding: .5rem 1.2rem;
	border: solid 1px @color-button-primary;
	font-size: 1rem;
	line-height: 1;
	user-select: none;
	color: white;
	background-color: @color-button-primary;
}

// TODO: cursor 和 user-select 组合也挺常见的
.omit {
	vertical-align: middle;
	line-height: 34px;
	padding: 0 1rem;
	font-size: 1.5em;

	cursor: default;
	user-select: none;
}

.jump_input {
	font-size: .8em;
	width: 4em;
	margin: 0 .5em;
	text-align: center;
}

.jump_label {
	margin-left: auto;
}

.margin_fix {
	margin-left: -1px !important;
}
</style>
