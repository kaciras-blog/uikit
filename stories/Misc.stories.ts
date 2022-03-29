export default {};

export const TagGroup = () => ({
	template: `
		<div class="tag-group">
			<a class="tag-group-item">Last</a>
			<a class="tag-group-item">Second</a>
			<a class="tag-group-item">First</a>
		</div>
	`,
});

const defaultText = `
Proprietary and undocumented CSS property that will contain text to a
given amount of lines when used in combination with display: -webkit-box.
It will end with ellipsis when text-overflow: ellipsis is included.`;

export const LineClamp = () => ({
	props: {
		text: {
			default: defaultText,
		},
	},
	template: `
		<div class="line-clamp">
		<article>{{ text }}</article>
		</div>
	`,
});

export const Table = () => ({
	template: `
		<table style="width: 600px">
		<thead>
		<tr v-for="row of head">
			<th v-for="data of row">{{data}}</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="row of body">
			<td v-for="data of row">{{data}}</td>
		</tr>
		</tbody>
		<tfoot>
		<tr>
			<td colspan="3">厉害耶我以前还不知道有个 tfoot 元素</td>
		</tr>
		</tfoot>
		</table>
	`,
	data: () => ({
		head: [[
			"特特特特特特特特特特特特特特特特特特特特特特特特特特特特特特别长的的一格",
			"第二列", "Column",
		]],
		body: [
			["1e-16", 2.125, "log(36) / log(64) = ?"],
			["1e-16", 2.125, "log(36) / log(64) = ?"],
			["1e-16", 2.125, "log(36) / log(64) = ?"],
			["1e-16", 2.125, "log(36) / log(64) = ?"],
			["1e-16", 2.125, "log(36) / log(64) = ?"],
			["1e-16", 2.125, "log(36) / log(64) = ?"],
		],
	}),
});
