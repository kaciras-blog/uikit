export default {
	title: "Radio Box",
};

export const custom = () => ({
	template: `
		<kx-radio-box-group v-model="value">
			<h1>Selected: {{value}}</h1>
			<kx-radio-box :value="0">0: Apple</kx-radio-box>
			<kx-radio-box :value="1">1: PC</kx-radio-box>
			<kx-radio-box :value="2">2: Android</kx-radio-box>
			<kx-radio-box :value="3">3: WindowsPhone</kx-radio-box>
		</kx-radio-box-group>`,
	data: () => ({
		value: 1,
	}),
});

custom.story = {
	name: "simple",
	parameters: { notes: "My notes on some bold text" },
};
