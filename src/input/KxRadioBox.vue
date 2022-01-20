<!--
	该组件只能作为 KxRadioBoxGroup 的子节点，一个 KxRadioBoxGroup 称为一组。
	目前仅以 value 来区分不同的选项，请确保同一组下的 value 各不相同。
-->
<template>
	<label
		class="kx-radio-box"
		role="radio"
		:aria-checked="checked.toString()"
		:aria-disabled="disabled"
	>
		<input
			class="radio-box-input"
			type="radio"
			:name="groupProps.name"
			:disabled="disabled"
			:checked="checked"
			@input="handleInput"
		>
		<span
			class="radio-box-mark"
			:class="{ checked, disabled }"
		/>
		<span class="radio-box-label"><slot/></span>
	</label>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue";

interface RadioBoxProps {
	value: any;
}

const props = defineProps<RadioBoxProps>();
const self = getCurrentInstance();

// Vue 好像没有 React.cloneElement 这样的功能，用 slot 传递太麻烦。
if (!self?.parent) {
	throw new Error("RadioBox 必须放在 RadioBoxGroup 里");
}

const { props: groupProps, emit: groupEmit } = self.parent;

const disabled = computed(() => groupProps.disabled);
const checked = computed(() => props.value === groupProps.modelValue);

function handleInput() {
	groupEmit("update:modelValue", props.value);
}
</script>

<style lang="less">
@import "../css/exports";

@size: 24px;

.kx-radio-box {
	display: inline-block;
	margin-right: 1em;
	cursor: pointer;
}

.radio-box-input {
	position: absolute;
	opacity: 0;
}

.radio-box-mark {
	display: inline-block;
	position: relative;
	height: @size;
	width: @size;
	vertical-align: top;

	border: 1px solid #bbb;
	border-radius: 50%;
	--color: @color-input-active;

	// 选中状态下圆框内的小圆点
	&::after {
		content: "";
		display: none;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		border-radius: 50%;
		transform: scale(.6);
		background-color: var(--color);
	}

	&.checked {
		border-width: 2px;
		border-color: var(--color);
	}

	&.checked::after {
		display: block;
	}

	&.disabled {
		cursor: default;
		--color: #bbb;
		background-color: #f7f7f7;
	}
}

.radio-box-label {
	display: inline-block;
	padding-left: .5rem;
	line-height: @size;
}
</style>
