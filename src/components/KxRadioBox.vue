<!--
该组件必须与KxRadioBoxGroup搭配使用。
目前仅使用value来区分，即相同value的组件具有同样的选择状态，请确保同一组下Radio的value各不相同。
-->
<template>
	<label
		class="kx-radio-box"
		:class="{ disabled: source.disabled }"
		role="radio"
		:aria-checked="checked.toString()"
		:aria-disabled="source.disabled"
	>
		<input
			class="radio-box-input"
			type="radio"
			aria-hidden="true"
			:name="source.name"
			:value="value"
			:disabled="source.disabled"
			:checked="checked"
			@input="source.$emit('input', value)"
			@change="handleChange"
		>
		<span class="radio-box-mark" :class="{ ckecked: checked }"></span>
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
	inject: ["radioGroup"],
	computed: {
		source() {
			return this.radioGroup;
		},
		checked() {
			return this.value === this.source.value;
		},
	},
	methods: {
		handleChange(event) {
			this.source.$emit("change", event.target.checked);
		},
	},
};
</script>

<style lang="less">
@import "../css/exports";

@height: 24px;

.kx-radio-box {
	display: inline-block;
	margin-right: 1em;
	cursor: pointer;
}

.kx-radio-box:hover > .check-radio-mark,
.check-radio-input:focus + .check-radio-mark {
	&:not(.ckecked) {
		background-color: rgba(255, 255, 255, 0.3);
	}

	&.ckecked {
		border-color: rgba(255, 255, 255, .7);
	}
}

.radio-box-input {
	position: absolute;
	opacity: 0;
}

.radio-box-mark {
	display: inline-block;
	position: relative;
	height: @height;
	width: @height;
	vertical-align: top;

	border: 1px solid #ccc;
	border-radius: 50%;

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
		background-color: @color-input-active;
	}

	&.ckecked {
		border-width: 2px;
		border-color: @color-input-active;
	}

	&.ckecked::after {
		display: block;
	}
}

.radio-box-label {
	display: inline-block;
	padding-left: .5rem;
	line-height: @height;
}
</style>
