<template>
	<label
		class="kx-switch-box"
		role="switch"
		:aria-checked="value.toString()"
		:aria-disabled="disabled"
		:class="{ disabled }"
		@click.prevent="switchValue"
	>
		<slot></slot>

		<!--
			注意 aria-checked 是 role="switch" 的必需属性，使用toString()防止为false时属性被省略。
			详情见：https://www.w3.org/TR/wai-aria-1.1/#aria-checked
		 -->
		<span
			class="kx-switch"
			:class="{ checked: value }"
		>
			<input
				:name="name"
				class="kx-switch-input"
				type="checkbox"
				@change="handleChange"
				:disabled="disabled"
			>
		</span>
	</label>
</template>

<script>
export default {
	name: "KxSwitchBox",
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
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

		// inline-block 会受 font-size 影响
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
