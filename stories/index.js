import { storiesOf } from "@storybook/vue";
import KxButton from "../src/components/KxButton.vue";

storiesOf("Button", module)
	.add("as a component", () => ({
		components: { KxButton },
		template: "<kx-button>rounded</kx-button>",
	}));
