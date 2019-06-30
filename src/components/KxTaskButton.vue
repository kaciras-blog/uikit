<template>
	<kx-button
		:class="{ running }"
		:tag="tag"
		@click="handleClick"
	>
		<slot v-if="running" name="running">
			<slot/>
		</slot>
		<slot v-else/>

	</kx-button>
</template>

<script>
import KxButton from "./KxButton";

export default {
	name: "KxTaskButton",
	components: { KxButton },
	props: {
		onClick: {
			type: Function,
			required: true,
		},
		// 在运行状态下是否屏蔽点击事件
		waiting: {
			type: Boolean,
			default: true,
		},
		// 直接代理到下层按钮组件
		tag: String,
		icon: String,
	},
	data: () => ({
		running: false,
	}),
	methods: {
		handleClick() {
			if (this.running && this.waiting) {
				return;
			}
			const task = this.onClick();
			if (typeof task.then === "function") {
				throw new Error("TaskButton onclick handler must return a Promise");
			}
			this.running = true;
			task.finally(() => this.running = false);
		},
	},
};
</script>

<style lang="less">
@import "../css/exports";

// 条纹宽度
@stripeWidth: 32px;

// 正在运行的按钮样式，因为需要长时间运行的任务并不一定是加载，所以没用.loading而是.running
&.kx-btn.running {
	&, &:hover {
		color: white;
		background-color: var(--background-active);
		border-color: var(--background-highlight);
		background-size: @stripeWidth @stripeWidth;
	}

	background-image: linear-gradient(-45deg,
	var(--background-highlight) 25%, transparent 25%,
	transparent 50%, var(--background-highlight) 50%,
	var(--background-highlight) 75%, transparent 75%);

	animation: barbershop linear .4s infinite;
}

// 国内理发店就是这个效果
@keyframes barbershop {
	from { background-position: 0; }
	to { background-position: -@stripeWidth; }
}
</style>
