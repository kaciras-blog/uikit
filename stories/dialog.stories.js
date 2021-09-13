import LuckyNumber from "./LuckyNumberDialog";

export default {
	title: "Dialogs",
};

export const Custom = {
	render: () => ({
		components: {
			LuckyNumber,
		},
		template: `
			<kx-button @click="isOpen = true">算一下幸运数字</kx-button>
			<lucky-number v-model:open="isOpen"/>
		`,
		data: () => ({
			isOpen: false,
		}),
	}),
};
