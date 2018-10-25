<template>
	<div><slot/></div>
</template>

<script>
export default {
	name: "KxRadioBoxGroup",
	props: {
		value: {},
	},
	provide () {
		return {
			updateSelected: this.updateSelected,
			register: this.register,
		};
	},
	methods: {
		updateSelected (name, value) {
			this.$emit("select", name);
			this.$emit("input", value);
		},
		register (callback) {
			this.$on("select", callback);
		},
	},
};
</script>
