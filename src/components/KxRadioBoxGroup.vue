<template>
	<div><slot/></div>
</template>

<script>
export default {
	name: "KxRadioBoxGroup",
	props: {
		name: String,
		modelValue: {},
		disabled: Boolean,
	},
	emits: ["update:modelValue"],
	provide() {
		return { group: this };
	},
};
</script>
