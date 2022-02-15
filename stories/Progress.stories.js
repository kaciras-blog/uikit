import KxProgress from "@/components/KxProgress.vue";

export default {
	component: KxProgress,
};

export const Progress = () => ({
	template: `
		<KxProgress ref="progress"/>
		<KxButton @click="increase">增加10%</KxButton>
		<KxButton @click="fail">失败</KxButton>
		<KxButton @click="reset">重置</KxButton>
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
