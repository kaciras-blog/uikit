<!--
	因为在手机中下拉框不好布局，特别是在紧凑的设计中，
	可能需要不同的机制，比如弹窗，如果自己实现就很麻烦。

	所以使用原生的 select 是很好的选择。
-->
<template>
	<div :class='$style.container'>
		<select
			:class='$style.select'
			v-model='value'
		>
			<slot></slot>
		</select>
		<CaretDownIcon :class='$style.icon'/>
	</div>
</template>

<script setup lang="ts">
import CaretDownIcon from "bootstrap-icons/icons/caret-down-fill.svg?sfc";

/**
 * v-model 指令对表单元素有特殊的处理，比如 select 支持任意类型的值，
 * 这里懒得自己实现了，所以就直接转发 v-model。
 *
 * https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/directives/vModel.ts
 */
const value = defineModel<any>({ required: true });
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
	padding: 5px 30px 5px 10px;
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
