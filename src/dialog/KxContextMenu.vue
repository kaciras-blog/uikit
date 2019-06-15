<!-- TODO: 菜单功能还没写完 -->
<template>
	<div class="dimmer"
		 @contextmenu.self.prevent="handleClick"
		 @click.self="handleClick"
	>
		<component
			:is="component"
			ref="menu"
			class="basic-ctx-menu"
			:style="style"
			v-bind="data"/>
	</div>
</template>

<script>
export default {
	name: "KxContextMenu",
	props: {
		event: {}, // MouseEvent is unaliveable in SSR.
		component: {},
		data: {},
	},
	data: () => ({
		style: {},
	}),
	methods: {
		positionForCursor() {
			const rect = this.$refs.menu.$el.getBoundingClientRect();
			const { width, height } = rect;
			const { clientX, clientY } = this.event;

			function computePosition(mouse, length, limit) {
				if (mouse + length < limit) {
					return mouse;
				}
				const reverse = mouse - length;
				if (reverse > 0) {
					return reverse;
				}
				return mouse > limit / 2 ? reverse : mouse;
			}

			this.style = {
				visibility: "visible",
				top: computePosition(clientY, height, window.innerHeight) + "px",
				left: computePosition(clientX, width, window.innerWidth) + "px",
			};
		},
		handleClick(event) {
			this.$dialog.close();

			// 重新触发点击事件，模拟点击穿透
			const ev = new MouseEvent(event.type, {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: event.clientX,
				clientY: event.clientY,
			});
			this.$nextTick(() => document.elementFromPoint(ev.clientX, ev.clientY).dispatchEvent(ev));
		},
	},
	mounted() {
		if (window.innerWidth <= 768) {
			const rect = this.$el.getBoundingClientRect();
			this.style = {
				visibility: "visible",
				top: `calc(50% - ${rect.height / 2}px)`,
				left: `calc(50% - ${rect.width / 2}px)`,
			};
		} else {
			this.positionForCursor();
		}
	},
};
</script>

<style lang="less">
.basic-ctx-menu {
	position: absolute;
	visibility: hidden;
}
</style>
