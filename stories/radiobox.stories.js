export default {
	title: "Radio Box",
};

export const custom = () => ({
	template: `
	<kx-radio-box-group  v-model="value">
		<kx-radio-box value="0">大法师</kx-radio-box>
		<kx-radio-box value="1">阿斯顿</kx-radio-box>
		<kx-radio-box value="2">饿我去</kx-radio-box>
		<kx-radio-box value="3">柔柔弱弱</kx-radio-box>
		<h1>Outer Selected: {{value}}</h1>
	</kx-radio-box-group>`,
	data: () => ({
		value: 1,
	}),
});

custom.story = {
	name: "Basic",
	parameters: { notes: "My notes on some bold text" },
};
