<template>
	<div class="dimmer" @click.self="$dialog.close()">
		<component
			:is="component"
			class="basic-ctx-menu"
			:style="style"
			v-bind="data"/>
	</div>
</template>

<script>
export default {
	name: "KxContextMenu",
	props: {
		event: MouseEvent,
		component: {},
		data: {},
	},
	data: () => ({
		style: {
			opacity: 0,
		},
	}),
	methods: {
		positionForCursor () {
			const rect = this.$el.getBoundingClientRect();
			const { width, height } = rect;
			const { clientX, clientY } = this.event;

			function computePosition (mouse, length, limit) {
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
				position: "absolute",
				opacity: 1,
				top: computePosition(clientY, height, window.innerHeight) + "px",
				left: computePosition(clientX, width, window.innerWidth) + "px",
			};
		},
	},
	mounted () {
		if (window.innerWidth <= 768) {
			const rect = this.$el.getBoundingClientRect();
			this.style = {
				position: "absolute",
				opacity: 1,
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

}
</style>
