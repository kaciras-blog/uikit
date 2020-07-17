export default {
	title: "Others",
};

export const tagGroup = () => ({
	template: `
		<div class="tag-group">
			<a class="tag-group-item">Last</a>
			<a class="tag-group-item">Second</a>
			<a class="tag-group-item">First</a>
		</div>
	`,
});
tagGroup.story = { name: "TagGroup" };


const defaultText = `
Proprietary and undocumented CSS property that will contain text to a
given amount of lines when used in combination with display: -webkit-box.
It will end with ellipsis when text-overflow: ellipsis is included.`;

export const lineClamp = () => ({
	props: {
		text: {
			default: defaultText,
		},
	},
	template: `
		<div class="line-clamp"><article>{{text}}</article></div>
	`,
});
lineClamp.story = { name: "LineClamp" };
