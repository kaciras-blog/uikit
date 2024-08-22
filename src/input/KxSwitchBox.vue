<template>
	<label
		class='kx-switch-box'
		role='switch'
		:aria-checked='checked.toString()'
		:aria-disabled='disabled'
		:class='{ disabled }'
	>
		<slot></slot>

		<!--
			aria-checked 是 role="switch" 的必需属性，使用 toString() 防止 false 时属性被省略。
			详情见：https://www.w3.org/TR/wai-aria-1.1/#aria-checked
		-->
		<span
			class='kx-switch'
			:class='{ checked }'
		>
			<input
				class='kx-switch-input'
				type='checkbox'
				v-model='checked'
				:name='name'
				:disabled='disabled'
			>
		</span>
	</label>
</template>

<script setup lang="ts">
interface SwitchBoxProps {
	name?: string;
	disabled?: boolean;
}

defineProps<SwitchBoxProps>();

const checked = defineModel<boolean>({ required: true });
</script>

<style lang="less">
@import "../css/exports";

@width: 48px;
@height: 24px;

.kx-switch-box {
	display: flex;
	align-items: center;
	cursor: pointer;

	&.disabled {
		cursor: default;
	}
}

.kx-switch {
	display: inline-block;
	width: @width;
	height: @height;
	margin-left: auto;
	padding: 4px;

	border-radius: (@height / 2);
	background: gray;

	transition: background .2s ease-out;

	&::after {
		content: "";

		/* inline-block 会受 font-size 影响 */
		display: block;
		width: 16px;
		height: 100%;

		background: white;
		border-radius: 8px;
		transition: margin-left .2s ease-out;
	}

	&.checked {
		background: @color-input-active;
	}

	&.checked::after {
		margin-left: @width - @height;
	}
}

.disabled > .kx-switch {
	background: lightgray;
}

.kx-switch-input {
	position: absolute;
	opacity: 0;
	z-index: -1;
}
</style>
