<!-- 可以跟弹窗容器合并的，但我懒得折腾了 -->
<template>
	<div>
		<popup-alert
			v-for="props of stack"
			:key="props.id"
			v-bind="props"
			@close="handleClose(props)"
		/>
	</div>
</template>

<script>
import PopupAlert from "./PopupAlert";

export default {
	name: "PopupAlertContainer",
	components: {
		PopupAlert,
	},
	data: () => ({
		stack: [],
		counter: 0,
	}),
	methods: {
		add(props) {
			props.id = ++this.counter;
			this.stack.push(props);
		},
		handleClose(props) {
			this.stack = this.stack.filter(e => e !== props);
		},
	},
	created() {
		this.$root.$on("popup", this.add);
	},
};
</script>
