<script>
import KxBaseButton from "./KxBaseButton";

export default {
	name: "KxToolButton",
	functional: true,
	render(createElement, context) {
		const { $style, data, children } = context;
		data.class = [data.class, $style.button];
		return createElement(KxBaseButton, data, children);
	},
};
</script>

<style module lang="less">
@default-focus: rgba(128, 128, 128, 0.1);
@default-active: rgba(160, 160, 160, 0.1);

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	padding: 0 1rem;
	font-size: 16px;

	color: var(--color);
	background: none;
	cursor: pointer;
	user-select: none;

	transition: ease-in-out .15s;

	&:hover, &:focus {
		text-decoration: none;
		background-color: var(--bg-focus, @default-focus);
		color: var(--color);
	}

	&:active {
		background-color: var(--bg-active, @default-active);
	}
}
</style>
