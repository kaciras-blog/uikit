<script>
import { h, useCssModule } from "vue";
import KxButton from "../input/KxButton.vue";

const defaultTheme = {
	button($style, emit, page, content, link, active) {
		const data = {
			type: "outline",
			class: $style.default,
			disabled: active,
			onClick(event) {
				event.preventDefault();
				emit("show-page", page);
			},
		};
		if (link && !active) {
			data.href = link(page);
		}
		return h(KxButton, data, content);
	},

	omit: ($style) => h("span", { class: $style.omit }, "..."),
};

const textTheme = {
	button($style, emit, page, content, link, active) {
		const data = {
			class: $style.text,
			onClick(event) {
				event.preventDefault();
				emit("show-page", page);
			},
		};
		if (active) {
			return h("span", { class: [$style.text, $style.active] }, content);
		}
		if (link) {
			data.href = link(page);
		}
		return h("a", data, content);
	},

	omit: ($style) => h("span", { class: $style.textOmit }, "..."),
};

/** 
 * 创建跳转输入框，用户输入页码后按回车即可跳页。
 * 
 * <div class="minor-text">
 *     <span>共{{totalPage}}页，</span>
 *     <label>跳至<input ...>页</label>
 * </div>
 */
function jumpInput($style, context) {
	const { emit } = context;

	const jumpInput = h("input", {
		class: $style.jumpInput,
		onChange({ target }) {
			const i = parseInt(target.value);
			if (i > 0 && i < total) {
				target.value = "";
				emit("show-page", i);
			}
		},
	});

	const data = { class: "minor-text " + $style.jumpLabel };
	return h("label", data, ["转到", jumpInput, "页"]);
}

function PagingButtons(props, context) {
	const { index, total, omitPos, type, pageLink } = props;
	const { emit } = context;
	const $style = useCssModule();

	const buttons = [];

	const factory = type === "default" ? defaultTheme : textTheme;

	function button(page, content, active = false) {
		return factory.button($style, emit, page, content, pageLink, active);
	}

	function indexButton(page) {
		return button(page, page, page === index);
	}

	// 下面都是按钮，前三个跟后三个是对称的，中间循环创建按钮
	buttons.push(button(index - 1, "<", index <= 1));
	buttons.push(indexButton(1));
	if (index - omitPos > 1) {
		buttons.push(factory.omit($style));
	}

	const cStart = Math.max(index - omitPos, 2);
	const cEnd = Math.min(index + omitPos, total - 1);
	for (let i = cStart; i <= cEnd; i++) {
		buttons.push(indexButton(i));
	}

	if (index + omitPos < total) {
		buttons.push(factory.omit($style));
	}
	if (total > 1) {
		buttons.push(indexButton(total));
	}
	buttons.push(button(index + 1, ">", index >= total));

	const buttonGroup = h("div", { class: "btn-group" }, buttons);
	return h("div", { class: $style.wrapper }, [buttonGroup, jumpInput($style, context)]);
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
	// 样式，目前仅支持 default 和 text。
	type: {
		type: String,
		default: "default",
	},
	pageLink: {
		type: Function,
		required: false,
	}
};

PagingButtons.emits = ["show-page"];

export default PagingButtons;
</script>

<style module lang="less">
@import "../css/exports";

.wrapper {
	display: flex;
	align-items: center;
}

.default {
	&.active {
		display: inline-block;
		padding: 0.5rem 1.2rem;
		border: solid 1px @color-button-primary;
		font-size: 1rem;
		line-height: 1;
		user-select: none;
		color: white;
		background-color: @color-button-primary;
	}
}

.omit {
	vertical-align: middle;
	line-height: 34px;
	padding: 0 1rem;
	font-size: 1.5em;

	cursor: default;
	user-select: none;
}

.text {
	padding: 0 4px;

	&:hover,
	:focus {
		color: @color-second;
	}

	&.active {
		padding: 0 4px;
		color: @color-primary;
		font-weight: 600;
	}
}

.textOmit {}

.jumpInput {
	font-size: 0.8em;
	width: 4em;
	margin: 0 0.5em;
	text-align: center;
}

.jumpLabel {
	margin-left: auto;
}
</style>
