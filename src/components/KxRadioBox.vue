<!--
该组件必须与KxRadioBoxGroup搭配使用。
目前仅使用value来区分，即相同value的组件具有同样的选择状态，请确保同一组下Radio的value各不相同。
-->
<template>
	<label class="kx-radio-box"
		   :class="{ disabled: source.disabled }"
		   :aria-checked="checked"
		   :aria-disabled="source.disabled">

		<input class="radio-box-input"
			   type="radio"
			   aria-hidden="true"
			   :name="source.name"
			   :value="value"
			   :disabled="source.disabled"
			   :checked="checked"
			   @input="source.$emit('input', value)"
			   @change="handleChange">

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
		source () {
			return this.radioGroup;
		},
		checked () {
			return this.value === this.source.value;
		},
	},
	methods: {
		handleChange (event) {
			this.source.$emit("change", event.target.checked);
		},
	},
};
</script>

<style lang="less">

.kx-radio-box {
	height: 1.6em;
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
	height: 1.6em;
	width: 1.6em;
	vertical-align: top;

	border: 1px solid #dbdbdb;
	border-radius: .8em;

	transition: all .15s;

	&::after {
		content: "";
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;

		margin-left: -5px;
		margin-top: -5px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: white;
	}

	&.ckecked {
		background-color: #2196F3;
		border-color: #2196F3;
	}
	&.ckecked::after {
		display: block;
	}
}

.radio-box-label {
	display: inline-block;
	padding-left: .5rem;
	padding-top: 1px; // 微调下上边距跟勾对齐
	line-height: 19px;
}
</style>
