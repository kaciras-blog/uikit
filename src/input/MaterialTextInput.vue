<!--
	玩玩 Material Disign 的样式
-->
<template>
	<label :class='$style.container'>
		<span :class='$style.label'>
			{{ label }}
		</span>
		<input
			:class='$style.input'
			:name='name'
			v-model='value'
			:disabled='disabled'
			:placeholder='placeholder'
		>
	</label>
</template>

<script setup lang="ts">
interface TextInputProps {
	name?: string;
	disabled?: boolean;
	label?: string;
	placeholder?: string;
}

defineProps<TextInputProps>();

const value = defineModel<string>({ required: true });
</script>

<style module lang="less">
.container {
	display: block;
	margin: 16px 8px 8px 8px;

	&:focus-within > .label {
		color: #1672f9;
	}
}

.label {
	display: block;
	transition: all .2s ease;
}

.input {
	display: block;
	width: 100%;
	padding: 6px 0;

	border: none;
	border-bottom: 2px solid #d0d0d0;
	border-radius: 0;

	transition: all .2s ease;

	&:focus-within {
		box-shadow: none;
	}

	&:focus {
		border-bottom-color: #1175ff;
	}

	&:disabled {
		background: #fafafa;
	}
}
</style>
