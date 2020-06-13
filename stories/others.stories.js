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

tagGroup.story = { name: "tagGroup" };
