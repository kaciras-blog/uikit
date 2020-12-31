<script>
import KxBaseButton from "./KxBaseButton";

export default {
	name: "KxButton",
	functional: true,
	props: {
		// 设置该按钮为 router-link，其to属性等于此属性的值，其tag属性等于prop中的tag
		route: String,

		// 在按钮的内容的开头加上一个图标
		icon: String,
	},
	render(h, ctx) {
		let { data, children } = ctx;
		let { route, icon } = ctx.props;

		data.props = { route };
		data.class = [data.class, "kx-btn"];

		if (icon) {
			const el = h("i", { staticClass: icon });
			if (!children) {
				data.class.push("icon"); // 仅有一个图标，给加一个样式
				children = [el];
			} else {
				children.unshift(el);
			}
		}

		return h(KxBaseButton, data, children);
	},
};
</script>

<style lang="less">
@import "../css/exports";

// 园角按钮的圆角半径
@radius: .25rem;

.kx-btn {
	display: inline-block;
	position: relative;
	vertical-align: top;

	// 内部布局
	padding: .5rem 1.2rem;
	font-size: 1rem;
	line-height: 1;
	text-align: center;
	white-space: nowrap;

	// 基本样式
	border: solid 1px #e0e0e0;
	background-color: transparent;
	border-radius: @radius;

	cursor: pointer;
	user-select: none;

	// 默认的颜色变量
	.color-mixin(@color-button-primary);

	// 各种伪类下的样式
	transition: ease-in-out .15s;
	.pseudo-style();

	// 混入主题颜色
	&.primary {
		.flat-style();
	}

	&.second {
		.color-mixin(@color-button-second);
		.flat-style();
	}

	&.info {
		.color-mixin(@color-button-info);
		.flat-style();
	}

	&.dangerous {
		.color-mixin(@color-button-dangerous);
		.flat-style();
	}

	// 镂空按钮样式
	&.outline {
		.outline-style();
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

.pseudo-style() {
	&:hover {
		color: white;
		background-color: var(--background-highlight);
		border-color: var(--background-highlight);

		// <a> 作为按钮时需要去掉默认样式
		text-decoration: none;
	}
	&:focus {
		box-shadow: 0 0 0 4px var(--background-glass);

		// <a> 作为按钮时需要去掉默认样式
		outline: 0;
		text-decoration: none;
	}
	&:active {
		color: white;
		box-shadow: none;
		background-color: var(--background-active);
		border-color: var(--background-active);
	}
}

// 填充样式
.flat-style() {
	color: white;
	border-color: var(--background);
	background-color: var(--background);
	.pseudo-style();
}

.outline-style() {
	background-color: transparent;
	color: var(--background);

	&:hover {
		color: white;
		background-color: var(--background);
		border-color: var(--background);
	}
}

// 配置各主题色，less还不支运算作为CSS变量值，需要先用变量定义
.color-mixin(@color) {
	@color-active: @color - #0C0C0C;
	@color-highlight: lighten(@color, 5%);
	@color-glass: fade(@color, 50%);

	--background: @color;
	--background-active: @color-active;
	--background-highlight: @color-highlight;
	--background-glass: @color-glass;
}
</style>
