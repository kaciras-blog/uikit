<!-- TODO: 是否需要固定按钮尺寸？ -->
<template>
	<KxButton
		:class="{ [$style.running]: running }"
		:route="route"
		:type="type"
		:color="color"
		@click="handleClick"
	>
		<slot v-if="!running"/>
		<slot v-else name="running"><slot/></slot>
	</KxButton>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KxButton from "./KxButton.vue";

type TaskHandler = (event: Event, signal: AbortSignal) => Promise<unknown>;

interface TaskButtonProps {

	// Vue 残废的 TS 支持，只能把按钮的属性复制一遍。
	type?: string;
	color?: string;
	route?: string;

	// 在运行状态下点击时是否取消当前操作
	abortable?: boolean;

	// 事件无法获取返回值所以用 props
	onClick: TaskHandler | TaskHandler[];
}

const props = withDefaults(defineProps<TaskButtonProps>(), {
	abortable: false,
});

const running = ref(false);
let controller = new AbortController();

function handleClick(event: MouseEvent) {
	const { onClick, abortable } = props;

	if (running.value) {
		if (abortable) {
			running.value = false;
			controller.abort();
		}
	} else {
		const { signal } = controller = new AbortController();

		const task = typeof onClick === "function"
			? onClick(event, signal)
			: Promise.all(onClick.map(v => v(event, signal)));

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
		background-color: var(--struct-active);
		border-color: var(--struct-highlight);
		background-size: @stripeWidth @stripeWidth;
	}

	background-image: linear-gradient(-45deg,
	var(--struct-highlight) 25%,
	transparent 25%,
	transparent 50%,
	var(--struct-highlight) 50%,
	var(--struct-highlight) 75%,
	transparent 75%);

	animation: barbershop linear .4s infinite;
}

// 国内理发店就是这个效果
@keyframes barbershop {
	from { background-position: 0; }
	to { background-position: -@stripeWidth; }
}
</style>
