import { Story } from "@storybook/vue3";
import { ref } from "vue";
import KxPasswordInput from "@/input/KxPasswordInput.vue";

export default {
	component: KxPasswordInput,
	args: {
		disabled: false,
	},
};

export const Password: Story = args => ({
	template: `
		<div style="width: 300px">
			<label for="input">
				请输入密码：
			</label>
			<KxPasswordInput
				style="margin-top: 10px"
				input-id="input"
				v-bind="args"
				v-model="value"
			/>
		</div>
	`,
	setup() {
		return { args, value: ref("") };
	},
});
