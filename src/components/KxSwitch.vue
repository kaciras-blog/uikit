<template>
	<!--
		注意 aria-checked 是 role="switch" 的必需属性，使用toString()防止为false时属性被省略。
		详情见：https://www.w3.org/TR/wai-aria-1.1/#aria-checked
	 -->
	<div
		class="kx-switch"
		:class="{ checked: value, disabled: disabled }"
		role="switch"
		:aria-checked="value.toString()"
		:aria-disabled="disabled"
		@click.prevent="switchValue"
	>
		<!--suppress HtmlFormInputWithoutLabel -->
		<input
			:name="name"
			:id="id"
			class="kx-switch-input"
			type="checkbox"
			aria-hidden="true"
			@change="handleChange"
			:disabled="disabled"
		>
	</div>
</template>

<script>
export default {
	name: "KxSwitch",
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		id: String,
		name: String,
	},
	methods: {
		switchValue() {
			if (this.disabled) {
				return;
			}
			this.$emit("input", !this.value);
		},
		handleChange(event) {
			this.$emit("input", event.target.value);
		},
	},
};
</script>

<style lang="less">
@import "../css/exports";

@checked-color: #2196F3;

.kx-switch {
	display: inline-block;
	width: 48px;
	height: 24px;
	padding: 4px;

	border-radius: 12px;
	cursor: pointer;
	background: gray;

	transition: .2s ease-out;

	&::after {
		content: "";
		display: inline-block;
		width: 16px;
		height: 100%;

		background: white;
		border-radius: 8px;
		transition: .2s ease-out;
	}

	&.checked {
		background: @checked-color;
	}

	&.checked::after {
		margin-left: 24px;
	}

	&.disabled {
		cursor: default;
		background: lightgray;
	}
}

.kx-switch-input {
	position: absolute;
	opacity: 0;
	z-index: -1;
}
</style>
