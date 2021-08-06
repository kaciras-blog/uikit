<!-- 可惜没有 :hover-within 标签关联没法高亮 hover -->
<template>
	<div class="input" :class="$style.container" :disabled="disabled">
		<input
			:type="visible ? 'text': 'password'"
			:id="inputId"
			:class="$style.input"
			:value="value"
			:placeholder="placeholder"
			:required="required"
			:disabled="disabled"
			@input="handleInput"
		>

		<!-- TODO: 去除Font-Awesome的依赖 -->
		<i class="fa"
		   :class="[visible ? 'fa-eye' : 'fa-eye-slash', $style.toggle]"
		   @click="visible = !visible"
		/>
	</div>
</template>

<script>
export default {
	name: "KxPasswordInput",
	props: {
		inputId: String, // 用于跟label关联
		required: {},
		placeholder: String,
		value: String,
		disabled: {},
	},
	emits: ["change"],
	data: () => ({
		visible: false,
	}),
	methods: {
		handleInput(event) {
			const { value } = event.target;
			this.$emit("change", value);
		},
	},
};
</script>

<style module lang="less">
.container {
	display: flex;
	padding: 0;
	align-items: baseline;
}

.input, .input:focus-within {
	flex-grow: 1;
	padding-right: 0;
	border: none;
	box-shadow: none !important;
}

.toggle {
	padding: .5em;
	cursor: pointer;
}
</style>
