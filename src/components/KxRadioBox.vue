<template>
	<label class="kx-radio-box"
		   :class="{ disabled }"
		   :aria-checked="model"
		   :aria-disabled="disabled">

		<input class="radio-box-input"
			   type="checkbox"
			   :disabled="disabled"
			   v-model="model"
			   aria-hidden="true"
			   @change="handleChange">

		<span class="radio-box-mark" :class="{ ckecked: model }"></span>

		<span class="radio-box-label"><slot/></span>
	</label>
</template>

<script>
export default {
	name: "KxRadioBox",
	props: {
		value: {
			required: true,
		},
		name: {},
		initSelected: {},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data () {
		return {
			selected: false,
			mName: this.name || this.value,
		};
	},
	inject: ["updateSelected", "register"],
	computed: {
		model: {
			get () {
				return this.selected;
			},
			set (selected) {
				this.selected = selected;
				this.updateSelected(this.mName, this.value);
			},
		},
	},
	methods: {
		handleChange (event) {
			this.$emit("changed", event.target.checked);
		},
	},
	created () {
		this.register(name => this.selected = name === this.mName);
		if (typeof this.initSelected !== "undefined") {
			this.model = true;
		}
	},
};
</script>

<style lang="less">

.kx-radio-box {
	display: block;
	height: 1.6em;
	cursor: pointer;
}

.kx-radio-box:hover > .check-radio-mark,
.check-radio-input:focus + .check-radio-mark {
	&:not(.ckecked) {
		background-color: rgba(255, 255, 255, 0.3);
	}
	&.ckecked{
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
		margin-top:  -5px;
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
