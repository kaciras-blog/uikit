<template>
	<label
		class="kx-check-box"
		:class="{ disabled }"
		role="checkbox"
		:aria-checked="model.toString()"
		:aria-disabled="disabled"
	>
		<input
			v-model="model"
			type="checkbox"
			class="check-box-input"
			:disabled="disabled"
			aria-hidden="true"
			@change="handleChange"
		>

		<span class="check-box-mark" :class="{ checked: model }"></span>

		<!-- 如果有内容，则用 span 包裹住添加样式 -->
		<span v-if="$slots.default" class="check-box-text"><slot/></span>
	</label>
</template>

<script>
export default {
	name: "KxCheckBox",
	props: {
		// 可能没有设置，使用 undefined 区分
		value: {
			type: Boolean,
			default: undefined,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		selfValue: false,
	}),
	computed: {
		model: {
			get() {
				const { selfValue, value } = this;
				return typeof value === "undefined" ? selfValue : value;
			},
			set(value) {
				this.selfValue = value;
				this.$emit("input", value);
			},
		},
	},
	methods: {
		handleChange(event) {
			this.$emit("changed", event.target.checked);
		},
	},
};
</script>

<style lang="less">
@import "../css/exports";

.kx-check-box {
	display: inline-flex;

	// 里面的input使用了绝对定位，这里一定要设置个相对定位。否则虽然input仍在
	// 里面并且不影响布局，但是它的的绝对定位会导致更外层的布局BUG，如虚空滚动条和点击乱跳等。
	position: relative;
	align-items: center;
	height: 1.6em;
	cursor: pointer;

	// 竖直对齐以内部的input为基准，但input设了绝对定位且容器不是相对定位，没法调整
	// 内部input的位置，所以这里手动调下距离，14和16像素的字体刚好能对齐
	vertical-align: -6px;
}

.check-box-input {
	position: absolute;
	opacity: 0;

	&:focus + .check-box-mark {
		border-color: #32b3ff;
		box-shadow: 0 0 0 .2rem #94dfff;
	}

	&[disabled] + .check-box-mark {
		background-color: #F0F0F0;

		&.checked {
			border-color: #bababa;
			background-color: #bababa;
		}
	}
}

.check-box-mark {
	display: inline-block;
	position: relative;
	.size(1.6em);

	border: 1px solid @color-border;
	border-radius: 4px;
	transition: all .15s;

	&.checked {
		background-color: @color-input-active;
		border-color: @color-input-active;
	}

	&.checked::after {
		content: "";
		border: solid white;
		border-width: 0 2px 2px 0;
		position: absolute;

		transform: translateX(-50%) translateY(-50%) rotate(45deg);
		left: 10px;
		top: 9px;
		width: 7px;
		height: 13px;
	}
}

// 这个边距不能放在框框上，因为会有无文字的复选框用法
.check-box-text {
	margin-left: 5px;
}
</style>
