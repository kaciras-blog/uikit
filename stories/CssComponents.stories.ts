import { StoryFn } from "@storybook/vue3";

export default {
	title: "Misc",
};

export const TagGroup = () => ({
	template: `
		<div class="tag-group">
			<a class="tag-group-item">Last</a>
			<a class="tag-group-item">Second</a>
			<a class="tag-group-item">First</a>
		</div>
	`,
});

export const LineClamp: StoryFn = args => ({
	template: `
		<div
			class="line-clamp story"
			:style='{"--line-clamp": args.lines}'
		>
			<article>{{ args.text }}</article>
		</div>
	`,
	setup: () => ({ args }),
});

LineClamp.args = {
	lines: 3,
	text: `Proprietary and undocumented CSS property that will contain text to a
		given amount of lines when used in combination with display: -webkit-box.
		It will end with ellipsis when text-overflow: ellipsis is included.`,
};
