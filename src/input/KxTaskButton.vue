<!-- TODO: 是否需要固定按钮尺寸？ -->
<template>
	<kx-button
		:class="{ [$style.running]: running }"
		@click="handleClick"
	>
		<slot v-if="!running"/>
		<slot v-else name="running"><slot/></slot>
	</kx-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KxButton from "./KxButton.vue";

interface TaskButtonProps {

	// 因为事件无法获取返回值所以用 props
	onClick: (event: Event, signal: AbortSignal) => Promise<any>;

	// 在运行状态下点击时是否取消当前操作
	abortable?: boolean;
}

const props = withDefaults(defineProps<TaskButtonProps>(), {
	abortable: false,
});

const running = ref(false);
let controller = new AbortController();

function handleClick(event: MouseEvent) {
	if (running.value) {
		if (props.abortable) {
			running.value = false;
			controller.abort();
		}
	} else {
		const { signal } = controller = new AbortController();
		const task = props.onClick(event, signal);

		if (typeof task.finally !== "function") {
			throw new Error("Click handler must return a Promise");
		}

		running.value = true;
		task.finally(() => running.value = false);
	}
}
</script>

<style module lang="less">
@import "../css/exports";

// 条纹宽度
@stripeWidth: 32px;

// 正在运行的按钮样式，因为需要长时间运行的任务并不一定是加载，所以没用 loading 而是 running
.running {
	&, &:hover {
		color: white;
		background-color: var(--bg-active);
		border-color: var(--bg-highlight);
		background-size: @stripeWidth @stripeWidth;
	}

	background-image: linear-gradient(-45deg,
		var(--bg-highlight) 25%,
		transparent 25%,
		transparent 50%,
		var(--bg-highlight) 50%,
		var(--bg-highlight) 75%,
		transparent 75%);

	animation: barbershop linear .4s infinite;
}

// 国内理发店就是这个效果
@keyframes barbershop {
	from { background-position: 0; }
	to { background-position: -@stripeWidth; }
}
</style>
