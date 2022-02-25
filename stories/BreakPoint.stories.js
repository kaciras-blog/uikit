import { useBreakPoint } from "../src";

export default {};

export const BreakPoint = () => ({
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