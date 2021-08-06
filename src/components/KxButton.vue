<script>
import { defineComponent, h, useCssModule } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
	name: "KxButton",
	props: {
		route: String,
		type: String,
	},
	setup(props, context) {
		const { slots, attrs, emit } = context;
		const { type, route } = props;

		const children = slots.default();
		const $style = useCssModule();

		const data = {
			class: [$style.button, $style[type], attrs.class],
		};

		/*
		 * 鼠标点击时屏蔽 focus 状态的边框，还需要在下面样式中 :active 伪类里移除边框。
		 * 因为苹果不支持 :focus-visible 所以只能这样搞了。
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

		return () => {
			if (attrs.href !== undefined) {
				data.href = attrs.href;
				return h("a", data, children);
			} else if (route !== undefined) {
				data.to = route;
				return h(RouterLink, data, children);
			} else {
				data.type = "button";
				return h("button", data, children);
			}
		};
	},
});
</script>

<style module lang="less">
@import "../css/exports";

@radius: 4px;

// 基础样式，也是默认类型
.button {
	display: inline-flex;
	align-items: center;
	padding: 8px 16px;

	border: solid 1px var(--background);
	border-radius: @radius;
	background-color: transparent;

	cursor: pointer;
	user-select: none;

	// 默认的颜色变量

	transition: ease-in-out .15s;

	&:hover {
		color: white;
		background-color: var(--bg-highlight);
		border-color: var(--bg-highlight);

		// <a> 作为按钮时需要去掉默认样式
		text-decoration: none;
	}

	&:focus {
		box-shadow: 0 0 0 4px var(--bg-glass);

		// <a> 作为按钮时需要去掉默认样式
		outline: 0;
		text-decoration: none;
	}

	&:active {
		color: white;
		box-shadow: none;
		background-color: var(--bg-active);
		border-color: var(--bg-active);
	}

	// 混入主题颜色
	&:global(.primary) {
		.color-mixin(white, @color-button-primary);
	}

	&:global(.second) {
		.color-mixin(white, @color-button-second);
	}

	&:global(.info) {
		.color-mixin(white, @color-button-info);
	}

	&:global(.dangerous) {
		.color-mixin(white, @color-button-dangerous);
	}

	// 禁用按钮样式，所有颜色按钮禁用样式都一样
	&:disabled, :disabled:hover {
		cursor: initial;
		pointer-events: none; // `<a>`禁用状态下也能点击

		&:not(.running) {
			color: dimgray;
			border-color: #d9dfdf;
			background-color: #d9dfdf;
		}
	}

	// 图标按钮基本样式
	&.icon {
		border-radius: 0;
		border: none;
		padding: .3rem .8rem;
		font-size: 1.2rem;
	}
}

// 镂空按钮样式
.outline {
	background-color: transparent;
	color: var(--background);
	border-color:  var(--background);

	&:hover {
		color: var(--color);
		background-color: var(--background);
		border-color: var(--background);
	}
}

// 未激活状态只有文字的样式
.text {
	line-height: 1;
}

// 配置各主题色，less还不支运算作为CSS变量值，需要先用变量定义
.color-mixin(@text, @color) {
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
