<template>
	<div :class="$style.container">
		<select
			:class="$style.select"
			v-model="forward"
		>
			<slot></slot>
		</select>
		<CaretDownIcon :class="$style.icon"/>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import CaretDownIcon from "bootstrap-icons/icons/caret-down-fill.svg?sfc";

export interface SelectProps {
	modelValue: string;
}

const props = defineProps<SelectProps>();
const emit = defineEmits(["update:modelValue"]);

/**
 * v-model 指令对表单元素有特殊的处理，比如 select 支持任意类型的值，
 * 这里懒得自己实现了，所以就直接转发 v-model。
 *
 * https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/directives/vModel.ts
 */
const forward = useVModel(props, "modelValue", emit);
</script>

<style module lang="less">
.container {
	display: block;
	position: relative;

	border: solid 1px #ddd;
	border-radius: 4px;
}

.select {
	appearance: none;

	width: 100%;
	padding: 5px 30px 5px 5px;
	border: none;

	cursor: pointer;
	font: inherit;
	background: none;
}

.icon {
	position: absolute;
	right: 10px;
	top: 50%;
	width: 16px;

	transform: translateY(-50%);
	pointer-events: none;
}
</style>
