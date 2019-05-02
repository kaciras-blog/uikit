<template>
	<label class="kx-check-box"
		   :class="{ disabled }"
		   role="checkbox"
		   :aria-checked="model"
		   :aria-disabled="disabled">

		<input class="check-box-input"
			   type="checkbox"
			   :disabled="disabled"
			   v-model="model"
			   aria-hidden="true"
			   @change="handleChange">

		<span class="check-box-mark" :class="{ ckecked: model }"></span>

		<slot/> <!-- 外面不套一层不知道行不行 -->
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
	margin-top: 50px;
	display: flex;
	align-items: center;
	height: 1.6em;
	cursor: pointer;
}

.check-box-input {
	position: absolute;
	opacity: 0;

	&:focus + .check-box-mark {
		box-shadow: 0 0 0 .2rem #94dfff;
	}
}

.check-box-mark {
	display: inline-block;
	position: relative;
	.size(1.6em);
	margin-right: 5px;

	border: 1px solid @color-border;
	border-radius: 4px;
	transition: all .15s;

	&.ckecked {
		background-color: #2196F3;
		border-color: #2196F3;
	}

	&.ckecked::after {
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
</style>
