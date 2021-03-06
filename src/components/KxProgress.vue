<template>
	<div :class="[$style.progress, {[$style.error]: hasError}]" :style="style"></div>
</template>

<script>
const TRANSITION_TIME = 300;
const RESIDUAL_TIME = 800;

export default {
	name: "KxProgress",
	data: () => ({
		visible: false,
		hasError: false,
		progress: 0,
		transition: true,
	}),
	computed: {
		style() {
			return {
				opacity: this.visible ? 1 : 0,
				"--progress": this.progress,
				transition: this.transition ? `width ease-out ${TRANSITION_TIME}ms` : undefined,
			};
		},
	},
	methods: {
		start() {
			if (this.visible) {
				return; // 忽略重复调用
			}
			this.progress = 0;
			this.visible = true;
			this.hasError = false;
		},
		setProgress(percent) {
			if (!this.visible) {
				this.start();
			}
			this.progress = percent;
		},

		/** 重置到进度为0并且不显示的状态，该过程是立即的没有动画 */
		async reset() {
			this.transition = false;
			this.progress = 0;
			this.visible = false;

			await this.$nextTick();
			this.transition = true;
			clearTimeout(this.$_timer);
		},
		finish() {
			if (!this.visible) {
				return; // 必须先调用启动方法
			}
			this.progress = 100;
			this._fadeout();
		},
		fail() {
			if (!this.visible) {
				return;
			}
			this.progress = 100;
			this.hasError = true;
			this._fadeout();
		},
		_fadeout() {
			this.$_timer = setTimeout(() => {
				this.visible = false;
				this.$_timer = setTimeout(this.reset, TRANSITION_TIME);
			}, RESIDUAL_TIME);
		},
	},
};
</script>

<style module lang="less">
@default-color: #1084ff;

@comet-size: 100px;
@comet-speed: 40ms;

.progress {
	position: fixed;
	top: 0;
	left: 0;
	width: calc(var(--progress) * 1%);
	height: 2px;

	// 全局加载条在样式上是比页面更外层的元素，设置最大的 z-index 值
	z-index: 999999;

	background: var(--color, @default-color);

	&::before {
		content: '';
		position: absolute;
		width: @comet-size;
		height: 100%;

		background-image: linear-gradient(
			90deg,
			transparent 0,
			rgba(255, 255, 255, 0.7) 20%,
			rgba(255, 255, 255, 0.9) 60%,
			transparent 100%
		);

		// 恒速运动
		animation: highlight linear calc(@comet-speed * var(--progress)) infinite;
	}
}

.error {
	background: #f74343;
}

@keyframes highlight {
	from { right: 100%; }
	to { right: @comet-size * -0.6 }
}
</style>
