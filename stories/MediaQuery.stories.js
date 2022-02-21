import { useBreakPoints } from "../src";

export default {};

export const MediaQuery = () => ({
	template: `
		<p>当前视区宽度信息：</p>
		<p>Current screen: {{ mediaQuery.value }}</p>
		<p>Greater than tablet: {{ gtTablet }}</p>
		<p>Smaller than tablet: {{ ltTablet }}</p>
	`,
	setup() {
		const mediaQuery = useBreakPoints();
		return {
			mediaQuery,
			gtTablet: mediaQuery.greater("tablet"),
			ltTablet: mediaQuery.smaller("tablet"),
		};
	},
});
