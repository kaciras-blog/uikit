<template>
	<div :class='$style.container'>
		<KxToast
			v-for='(data, i) of stack'
			:key='data.id'
			v-bind='data'
			@close='close(i)'
		/>
	</div>
</template>

<script setup lang="ts">
import { shallowReactive } from "vue";
import { uniqueKey } from "../common";
import { ToastProps } from "./core";
import KxToast from "./KxToast.vue";
import { useToast } from "./quick-alert";

interface InternalToastProps extends ToastProps {
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

useToast().mountPoint = { push, clear };
</script>

<style module lang="less">
@import "../css/exports";

.container {
	position: fixed;
	bottom: 1.25rem;
	right: 1.25rem;
	z-index: 5000;

	@media screen and (max-width: @length-screen-mobile) {
		right: 50%;
		transform: translateX(50%);
	}
}
</style>
