<!-- 可惜没有 :hover-within 标签关联没法高亮 hover -->
<template>
	<div
		:class='[$style.container, { disabled }]'
		class='input'
	>
		<input
			:type="visible ? 'text': 'password'"
			:id='inputId'
			v-model='value'
			:class='$style.input'
			:placeholder='placeholder'
			:required='required'
			:disabled='disabled'
			:autocomplete='autocomplete'
		>
		<KxButton
			:title="visible ? '隐藏' : '显示密码'"
			:class='$style.toggle'
			type='icon'
			:disabled='disabled'
			@click='visible = !visible'
		>
			<VisibleIcon v-if='visible'/>
			<HiddenIcon v-else/>
		</KxButton>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VisibleIcon from "../assets/visible.svg?sfc";
import HiddenIcon from "../assets/visible-off.svg?sfc";
import KxButton from "./KxButton.vue";

interface PasswordInputProps {
	inputId?: string;
	disabled?: boolean;
	required?: boolean;
	autocomplete?: string;
	placeholder?: string;
}

defineProps<PasswordInputProps>();

const value = defineModel<string>({ required: true });

const visible = ref(false);
</script>

<style module lang="less">
.container {
	display: flex;
	padding: 0;
}

.input,
.input:focus-within {
	flex-grow: 1;
	padding-right: 0;
	border: none;
	box-shadow: none;
}

.toggle {
	padding: 0 6px;
	font-size: 22px;
	border-radius: 0;
}
</style>
