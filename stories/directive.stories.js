import { storiesOf } from "@storybook/vue";
import { number, withKnobs } from "@storybook/addon-knobs";

const stories = storiesOf("Directive", module);
stories.addDecorator(withKnobs);

stories.add("ime-input", () => ({
	template: `
		<div>
			<label>
				<div>使用输入法输入一些文本：</div>
				<textarea
					@input="e => value = e.target.value"
					v-ime-input="e => imeValue = e.target.value"
				/>
			</label>
			<div class="ime-input-result">
				<p>input事件：{{value}}</p>
				<p>v-ime-input：{{imeValue}}</p>
			</div>
		</div>`,
	data: () => ({
		value: "",
		imeValue: "",
	}),
}));

stories.add("section-bind", () => ({
	props: {
		start: {
			default: number("selectionStart", 0),
		},
		end: {
			default: number("selectionEnd", 0),
		},
	},
	template: `
		<textarea
			v-bind-selection.focus="selection"
			v-model="value"
			class="directive-textarea"
		/>`,
	data: () => ({
		value: "调整下面的start和end，改变文本框的选择区域",
	}),
	computed: {
		selection() {
			return [this.start, this.end];
		},
	},
}));

stories.add("section-bind", () => ({
	props: {
		start: {
			default: number("selectionStart", 0),
		},
		end: {
			default: number("selectionEnd", 0),
		},
	},
	template: `
		<textarea
			v-bind-selection.focus="selection"
			v-model="value"
			class="directive-textarea"
		/>`,
	data: () => ({
		value: "调整下面的start和end，改变文本框的选择区域",
	}),
	computed: {
		selection() {
			return [this.start, this.end];
		},
	},
}));
