<!--
按钮样式元素的通用逻辑，包括屏防止击聚焦，设置 type 属性，链接和路由的适配。
如果设置了 href 属性，则渲染为链接元素。
-->
<script>
export default {
	name: "KxBaseButton",
	functional: true,
	props: {
		// 设置该按钮为 router-link，其 to 等于此属性
		route: String,
	},
	render(h, context) {
		const { data, children } = context;
		const { route } = context.props;

		// 服务端渲染不走 Babel，Vue 为啥不标准化一下这些属性？
		data.on = data.on || {};
		data.attrs = data.attrs || {};

		/*
		 * 鼠标点击时屏蔽focus状态的边框，还需要在下面样式中 :active 伪类里移除边框。
		 *
		 * 【可能的副作用】
		 * 可访问性：用鼠标聚焦元素然后再键盘操作的情况不常见，影响不大。
		 * 事件处理：在真正的处理函数完成后才取消聚焦，对同步代码没有影响，而异步代码考虑到用户操作也可能取消聚焦，
		 *           故在异步代码里访问event的聚焦属性应当考虑到该情况，这里不考虑。
		 *
		 * 【无法处理的情况】
		 * 如果鼠标保持按下状态移动到元素之外，则 mouseup 事件无法触发，这种情况很少不用管。
		 */
		const rawMouseUp = data.on.mouseup;
		data.on.mouseup = (event) => {
			if (rawMouseUp) {
				rawMouseUp(event);
			}
			event.currentTarget.blur();
		};

		if (data.attrs.href !== undefined) {
			return h("a", data, children);
		} else if (route !== undefined) {
			data.props = { to: route };
			return h("router-link", data, children);
		} else {
			data.attrs.type = "button";
			return h("button", data, children);
		}
	},
};
</script>
