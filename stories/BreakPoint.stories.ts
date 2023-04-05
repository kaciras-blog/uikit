import { StoryFn } from "@storybook/vue3";
import { useBreakPoint } from "@";

export default {
	title: "BreakPoint",
};

export const BreakPoint: StoryFn = () => ({
	template: `
		<p>当前视区宽度信息：</p>
		<p>Current screen: {{ $bp.value }}</p>
		<p>Greater than tablet: {{ gtTablet }}</p>
		<p>Smaller than tablet: {{ ltTablet }}</p>
	`,
	setup() {
		const breakPoint = useBreakPoint();
		return {
			gtTablet: breakPoint.greater("tablet"),
			ltTablet: breakPoint.smaller("tablet"),
		};
	},
});
