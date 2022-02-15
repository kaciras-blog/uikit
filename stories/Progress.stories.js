import KxProgress from "@/components/KxProgress.vue";

export default {
	component: KxProgress,
};

export const Progress = () => ({
	template: `
		<kx-progress ref="progress"></kx-progress>
		<kx-button @click="increase">增加10%</kx-button>
		<kx-button @click="fail">失败</kx-button>
		<kx-button @click="reset">重置</kx-button>
		<input type="number" min="0" v-model="value">
	`,
	data: () => ({
		value: 0,
	}),
	watch: {
		value(percent) {
			this.$refs.progress.setProgress(percent);
		},
	},
	methods: {
		increase() {
			this.$refs.progress.increase(10);
		},
		fail() {
			this.value = 0;
			this.$refs.progress.fail();
		},
		reset() {
			this.value = 0;
			this.$refs.progress.reset();
		},
	},
});
