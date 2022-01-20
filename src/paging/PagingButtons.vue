<script lang="ts">
import { h, useCssModule } from "vue";
import KxButton from "../input/KxButton.vue";

function PagingButtons(props, context) {
	const { index, total, omitPos, theme, buttonClass } = props;
	const { emit } = context;
	const $style = useCssModule();

	const buttons = [];

	function button(page, content, disabled = false) {
		const data = {
			type: "outline",
			disabled,
			onClick: () => emit("show-page", page),
		};
		return h(KxButton, data, content);
	}

	function indexButton(page) {
		return button(page, page, page === index);
	}

	// 下面都是按钮，前三个跟后三个是对称的，中间循环创建按钮
	buttons.push(button(index - 1, "<", index <= 1));
	buttons.push(indexButton(1));
	if (index - omitPos > 1) {
		buttons.push(h("span", { class: $style.omit }, "..."));
	}

	const cStart = Math.max(index - omitPos, 2);
	const cEnd = Math.min(index + omitPos, total - 1);
	for (let i = cStart; i <= cEnd; i++) {
		buttons.push(indexButton(i));
	}

	if (index + omitPos < total) {
		buttons.push(h("span", { class: $style.omit }, "..."));
	}
	if (total > 1) {
		buttons.push(indexButton(total));
	}
	buttons.push(button(index + 1, ">", index >= total));

	// 坑：type="text" 的输入框没有 valueAsNumber
	function jumpToPage({ target }) {
		const i = parseInt(target.value);
		if (i > 0 && i < total) {
			emit("show-page", i);
		}
		target.value = "";
	}

	/*
	 * <div class="minor-text">
	 *     <span>共{{totalPage}}页，</span>
	 *     <label>跳至<input ...>页</label>
	 * </div>
	 */
	const jumpInput = h("input", {
		class: $style.jumpInput,
		onChange: jumpToPage,
	});
	const jumpGroup = h("label", { class: "minor-text " + $style.jumpLabel }, ["转到", jumpInput, "页"]);
	const buttonGroup = h("div", { class: "btn-group compact" }, buttons);

	return h("div", { class: $style.wrapper }, [buttonGroup, jumpGroup]);
}

PagingButtons.props = {
	index: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	omitPos: {
		type: Number,
		default: 2,
	},
	theme: {
		type: String,
		default: "default",
	},
	buttonClass: {
		type: String,
	},
};

PagingButtons.emits = ["show-page"];

export default PagingButtons;
</script>

<style module lang="less">
@import "../css/exports";

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

.jumpInput {
	font-size: .8em;
	width: 4em;
	margin: 0 .5em;
	text-align: center;
}

.jumpLabel {
	margin-left: auto;
}
</style>
