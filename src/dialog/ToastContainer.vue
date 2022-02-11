<template>
	<div :class="$style.container">
		<KxToast
			v-for="(data, i) of stack"
			:key="data.id"
			v-bind="data"
			@close="close(i)"
		/>
	</div>
</template>

<script setup lang="ts">
import { inject, shallowReactive } from "vue";
import { uniqueKey } from "../common";
import { ToastController, ToastProps } from "./controller";
import KxToast from "./KxToast.vue";

interface InternalToastProps {
	id: number;
}

const stack = shallowReactive<InternalToastProps[]>([]);

function close(index: number) {
	stack.splice(index, 1);
}

function clear() {
	stack.splice(0, stack.length);
}

function push(options: ToastProps) {
	(options as InternalToastProps).id = uniqueKey();
	stack.push(options as InternalToastProps);
}

const controller = inject<ToastController>("$toast");
if (!controller) {
	throw new Error("必须将 QuickAlert 插件注册到 Vue 实例");
}

controller.mountPoint = { push, clear };
</script>

<style module lang="less">
.container {
	position: fixed;
	bottom: 1.25rem;
	right: 1.25rem;
	z-index: 5000;
}
</style>
