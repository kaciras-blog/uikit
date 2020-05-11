import LuckyNumber from "./LuckyNumberDialog";

export default {
	title: "Dialogs",
};

export const custom = () => ({
	template: `
		<div>
			<kx-button @click="showDialog">算一下幸运数字</kx-button>
			<kx-dialog-container></kx-dialog-container>
		</div>`,
	methods: {
		showDialog() {
			this.$dialog.show(LuckyNumber);
		},
	},
});

custom.story = { name: "Custom dialog" };
