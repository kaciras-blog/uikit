import Vue, { VNode } from "vue";

declare global {

	namespace JSX {
		// tslint:disable no-empty-interface
		interface Element extends VNode {}

		interface IntrinsicElements {
			[elem: string]: any;
		}

		// tslint:disable no-empty-interface
		interface ElementClass extends Vue {}
	}
}
