<script lang="ts">
import { h, useCssModule } from "vue";
import { RouterLink } from "vue-router";

function KxButton(props, context) {
	const { type, color, route } = props;
	const { slots, attrs, emit } = context;

	const $style = useCssModule();

	const data = {
		...attrs,
		class: [
			"kx-btn",
			$style[color],
			$style[type],
			attrs.class,
		],
	};

	if (attrs.disabled) {
		data.class.push($style.disabled);
	}

	/*
	 * 鼠标点击时屏蔽 focus 状态的边框，还需要在下面样式中 :active 伪类里移除边框。
	 * 因为 Safari 不支持 :focus-visible 所以只能这样搞了。
	 *
	 * 【可能的副作用】
	 * 可访问性：用鼠标聚焦元素然后再键盘操作的情况不常见，影响不大。
	 * 事件处理：在真正的处理函数完成后才取消聚焦，对同步代码没有影响，而异步代码考虑到用户操作也可能取消聚焦，
	 *           故在异步代码里访问event的聚焦属性应当考虑到该情况，这里不考虑。
	 *
	 * 【无法处理的情况】
	 * 如果鼠标保持按下状态移动到元素之外，则 mouseup 事件无法触发，这种情况很少不用管。
	 */
	data.onMouseup = (event) => {
		emit("mouseup", event);
		event.currentTarget.blur();
	};

	const children = slots.default();

	if (attrs.href !== undefined) {
		return h("a", data, children);
	} else if (route !== undefined) {
		data.to = route;
		return h(RouterLink, data, children);
	} else {
		data.type = "button";
		return h("button", data, children);
	}
}

KxButton.props = {

	/** 内置样式，有 outline，text 和默认三种 */
	type: String,

	/** 内置颜色主题，有 second，info，dangerous，shadow 和默认五种 */
	color: String,

	/** 渲染为 router-link，其 to 属性等于该值 */
	route: String,
};

export default KxButton;
</script>

<style module lang="less">
@import "../css/exports";

@radius: 4px;

// 最顶层的类公开，以便从外层识别。
:global(.kx-btn) {
	display: inline-flex;
	align-items: center;

	padding: 8px 16px;
	font-size: initial;
	line-height: initial;

	border-radius: @radius;
	transition: ease-in-out .15s;

	// 基础样式，也是默认的类型
	color: var(--color);
	background: var(--background);
	border: solid 1px var(--background);

	&:hover {
		background: var(--bg-highlight);
		border-color: var(--bg-highlight);

		// 用于覆盖 a 元素的样式
		color: var(--color);
		text-decoration: none;
	}

	&:focus {
		box-shadow: 0 0 0 4px var(--bg-glass);
		outline: 0;
		text-decoration: none;
	}

	&:active {
		color: var(--color);
		box-shadow: none;
		background: var(--bg-active);
		border-color: var(--bg-active);
	}

	.generateColors(white, @color-button-primary);
}

// 镂空按钮样式
.outline {
	color: var(--background);
	border-color: var(--background);
	background: none;
}

// 未激活状态只有文字的样式
.text {
	color: var(--background);
	background: none;
	border-color: transparent;
}

// 只有一个图标就用这个，可与上面的搭配
.icon {
	padding: 5px;
	font-size: 1.2rem;
}

.second {
	.generateColors(white, @color-button-second);
}

.info {
	.generateColors(white, @color-button-info);
}

.dangerous {
	.generateColors(white, @color-button-dangerous);
}

.shadow {
	border-width: 0;

	--color: initial;
	--bg-glass: none;
	--background: rgba(0, 0, 0, 0.05);
	--bg-highlight: rgba(0, 0, 0, 0.08);
	--bg-active: rgba(0, 0, 0, 0.16);
}

// 禁用按钮样式，所有颜色的按钮禁用样式都一样。
// 因为 a 元素没有 :disabled 状态，所以用类来代替。
.disabled {
	cursor: initial;
	pointer-events: none;

	color: dimgray;
	background: #d9dfdf;
	border-color: #d9dfdf;
}

// 配置各主题色，less还不支运算作为CSS变量值，需要先用变量定义
.generateColors(@text, @color) {
	@color-active: @color - #0C0C0C;
	@color-highlight: lighten(@color, 5%);
	@color-glass: fade(@color, 50%);

	--color: @text;
	--background: @color;
	--bg-active: @color-active;
	--bg-highlight: @color-highlight;
	--bg-glass: @color-glass;
}
</style>
