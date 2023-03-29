<script lang="ts">
import { FunctionalComponent, h, useCssModule } from "vue";
import { RouterLink } from "vue-router";

const KxButton: FunctionalComponent<any> = (props, context) => {
	const { type, color, route } = props;
	const { slots, attrs, emit } = context;

	const $style = useCssModule();

	// Vue 还会在底层做 inheritAttrs，不用在此添加 attrs.class。
	const data: any = {
		...attrs,
		class: [
			"kx-btn",
			$style[color],
			$style[type],
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
	data.onMouseup = (event: MouseEvent) => {
		emit("mouseup", event);
		(event.currentTarget as HTMLElement).blur();
	};

	if (!slots.default) {
		throw new Error("按钮必须有内容");
	}

	if (props.href !== undefined) {
		data.href = props.href;
		return h("a", data, slots.default());
	} else if (route !== undefined) {
		data.to = route;
		return h(RouterLink, data, slots);
	} else {
		data.type = "button";
		return h("button", data, slots.default());
	}
};

KxButton.props = {
	/**
	 * 内置样式，有默认，outline，text 和 icon 四种。
	 */
	type: String,

	/**
	 * 内置颜色主题，有默认，second，info，dangerous 五种。
	 */
	color: String,

	/**
	 * 渲染为 <a>，其 href 属性等于该值。
	 */
	href: String,

	/**
	 * 渲染为 router-link，其 to 属性等于该值，不能与 href 同时使用。
	 */
	route: String,
};

export default KxButton;
</script>

<style module lang="less">
@import "../css/exports";

/*
 * 该组件有以下 CSS 变量：
 * --btn-radius: 圆角大小，默认 4px。
 *
 * 颜色由以下变量控制：
 * --text-color: 文字主色，通常是主题的主色。
 * --text-active: 激活文字颜色，因为激活状态下背景是主色，所以它通常是白色。
 * --struct-color: 文字以外的颜色，跟文字区分开以便分别设置。
 * --struct-*: 各种状态下的结构色。
 */

// 最顶层的类公开，以便从外层识别。
:global(.kx-btn) {
	display: inline-flex;
	justify-content: center;
	align-items: center;

	padding: 8px 16px;
	font-size: initial;
	line-height: initial;

	border-radius: var(--btn-radius, 4px);
	transition: ease-in-out 0.15s;

	// 基础样式，也是默认的类型
	color: var(--text-active);
	background-color: var(--struct-color);
	border: solid 1px var(--struct-color);

	&:hover {
		background-color: var(--struct-highlight);
		border-color: var(--struct-highlight);

		// 用于覆盖 a 元素的样式
		color: var(--text-active);
		text-decoration: none;
	}

	&:focus {
		box-shadow: 0 0 0 4px var(--struct-glass);
		outline: 0;
		text-decoration: none;
	}

	&:active {
		color: var(--text-active);
		box-shadow: none;
		background-color: var(--struct-active);
		border-color: var(--struct-active);
	}

	.generateColors(white, @color-button-primary);
}

// 镂空按钮样式
.outline {
	color: var(--text-color);
	border-color: var(--struct-color);
	background-color: transparent;

	--text-color: initial;
	--struct-color: #ddd;
}

// 未激活状态只有文字的样式
.text {
	color: var(--struct-color);
	background-color: transparent;
	border-color: transparent;
}

// 只有一个图标就用这个
.icon {
	padding: 5px;

	// 这个大小跟文字一起排版较合适，其他地方可能要覆盖。
	font-size: 24px;

	color: var(--struct-color);
	border: none;
	background-color: transparent;

	--struct-color: initial;

	&:hover {
		color: var(--struct-color);
		background-color: rgba(0, 0, 0, 0.07);
	}

	&:active {
		color: var(--struct-color);
		background-color: rgba(0, 0, 0, 0.1);
	}
}

.primary {
	.generateColors(white, @color-button-primary);
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

// 禁用按钮样式，所有颜色的按钮禁用样式都一样。
// 因为 a 元素没有 :disabled 状态，所以用类来代替。
.disabled {
	cursor: initial;
	pointer-events: none;

	color: dimgray;
	background-color: #d9dfdf;
	border-color: #d9dfdf;
}

// 配置各主题色，less 不支运算作为 CSS 变量值，需要再用变量定义
.generateColors(@text, @color) {
	@color-active: @color - #0c0c0c;
	@color-highlight: lighten(@color, 4%);
	@color-glass: fade(@color, 50%);

	--text-color: @color;
	--struct-color: @color;

	--text-active: @text;
	--struct-active: @color-active;
	--struct-highlight: @color-highlight;
	--struct-glass: @color-glass;
}
</style>
