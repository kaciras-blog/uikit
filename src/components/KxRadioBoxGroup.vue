<template>
	<div><slot/></div>
</template>

<script>
export default {
	name: "KxRadioBoxGroup",
	props: {
		name: String,
		value: {},
		disabled: Boolean,
	},
	provide () {
		return { radioGroup: this };
	},
};
</script>
