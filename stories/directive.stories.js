export default {
	title: "Directive",
};

export const ImeInput = () => ({
	template: `
		<label>
			<div>使用输入法输入一些文本：</div>
			<textarea
				@input="e => value = e.target.value"
				@change="e => changeValue = e.target.value"
				v-ime-input="e => imeValue = e.target.value"
			/>
		</label>
		<div class="ime-input-result">
			<p>input 事件：{{ value }}</p>
			<p>change 事件：{{ changeValue }}</p>
			<p>v-ime-input：{{ imeValue }}</p>
		</div>
	`,
	data: () => ({
		value: "",
		changeValue: "",
		imeValue: "",
	}),
});

export const SectionBind = {
	render: (args, { argTypes }) => ({
		props: Object.keys(argTypes),
		template: `
			<textarea
				v-bind-selection.focus="'selection'"
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
	}),
	args: {
		start: 0,
		end: 0,
	},
};

export const SectionChange = () => ({
	template: `
		<textarea
			v-on-selection-change="setSelectionRange"
			v-model="value"
			class="directive-textarea"
		/>
		<div>选择范围：{{ start }} - {{ end }}</div>
	`,
	data: () => ({
		value: "选择文字，下面显示被选中部分的起止位置",
		start: 0,
		end: 0,
	}),
	methods: {
		setSelectionRange(s, e) {
			this.start = s;
			this.end = e;
		},
	},
});

export const SectionModel = () => ({
	template: `
		<textarea
			v-selection-model.focus="'selection'"
			v-model="value"
			class="directive-textarea"
		/>
		<div>选择范围：{{ selection[0] }} - {{ selection[1] }}</div>
		<kx-button @click="randomSelection">随机选择</kx-button>
	`,
	data: () => ({
		value: "调整下面的start和end，改变文本框的选择区域",
		selection: [0, 0],
	}),
	methods: {
		randomSelection() {
			const n = this.value.length;
			const s = Math.floor(Math.random() * n);
			const e = s + Math.floor(Math.random() * (n - s));
			this.selection = [s, e];
		},
	},
});

export const Ripple = {
	render: (args) => ({
		data: () => args,
		// 用 key 防止复用元素导致指令更新失败
		template: `
			<div v-if="centered && circle" :key="0" class="mock-dialog" v-ripple.centered.circle></div>
			<div v-else-if="circle" :key="1" class="mock-dialog" v-ripple.circle></div>
			<div v-else-if="centered" :key="2" class="mock-dialog" v-ripple.centered></div>
			<div v-else class="mock-dialog" :key="3" v-ripple></div>
		`,
	}),
	args: {
		circle: false,
		centered: false,
	},
};
