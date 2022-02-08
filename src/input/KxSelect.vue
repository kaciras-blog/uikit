<template>
	<div :class="$style.container">
		<select
			:class="$style.select"
			@input="handleInput"
		>
			<slot></slot>
		</select>
		<CaretDownIcon :class="$style.icon"/>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import CaretDownIcon from "bootstrap-icons/icons/caret-down-fill.svg?sfc";

export interface SelectProps {
	modelValue: string;
}

const emit = defineEmits(["update:modelValue"]);

function handleInput(event) {
	emit("update:modelValue", event.target.value);
}
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
