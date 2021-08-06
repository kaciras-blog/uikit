<!--
该组件必须与 KxRadioBoxGroup 搭配使用。
目前仅使用 value 来区分，即相同 value 的组件具有同样的选择状态，请确保同一组下 Radio 的 value 各不相同。
-->
<template>
	<label
		class="kx-radio-box"
		role="radio"
		:aria-checked="checked.toString()"
		:aria-disabled="group.disabled"
	>
		<input
			class="radio-box-input"
			type="radio"
			:name="group.name"
			:value="value"
			:disabled="group.disabled"
			:checked="checked"
			@input="group.$emit('input', value)"
			@change="handleChange"
		>
		<span
			class="radio-box-mark"
			:class="{ checked, disabled: group.disabled }"
		/>
		<span class="radio-box-label"><slot/></span>
	</label>
</template>

<script>
export default {
	name: "KxRadioBox",
	props: {
		name: String,
		value: {
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["change"],
	inject: ["group"],
	computed: {
		checked() {
			return this.value === this.group.value;
		},
	},
	methods: {
		handleChange(event) {
			this.group.$emit("change", event.target.checked);
		},
	},
};
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
