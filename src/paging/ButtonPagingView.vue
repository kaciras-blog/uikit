<template>
	<div>
		<button-pager
			v-if="showTopButtons && items.length"
			:class="$style.buttons"
			:theme="theme"
			:total-count="total"
			:index="index"
			:page-size="pageSize"
			@load-page="switchPage"/>

		<slot :items="items"/>

		<button-pager
			v-if="items.length"
			:class="$style.buttons"
			:theme="theme"
			:total-count="total"
			:index="index"
			:page-size="pageSize"
			@load-page="switchPage"/>
	</div>
</template>

<script>
import { CancelToken, scrollToElementStart, scrollToElementEnd } from "../index";

export default {
	name: "ButtonPagingView",
	props: {
		/** index, size, cancelToken => Promise<{ items, total } | items> */
		loader: {
			type: Function,
			required: true,
		},
		start: {
			type: Number,
			default: 0,
		},
		initItems: {
			type: Array,
			default: () => ([]),
		},
		initPageSize: {
			type: Number,
			default: 20,
		},
		initTotalCount: {
			type: Number,
			default: 0,
		},
		showTopButtons: {
			type: Boolean,
			default: true,
		},
		theme: String,
	},
	data() {
		return {
			index: this.start,
			pageSize: this.initPageSize,
			items: this.initItems,
			total: this.initTotalCount,
			loading: null,
		};
	},
	methods: {
		loadPage(index) {
			const { pageSize, _loading, loader } = this;
			if (_loading) {
				_loading.cancel();
			}
			const cancelToken = new CancelToken();
			this._loading = cancelToken;

			return loader(index, pageSize, cancelToken).then(res => {
				this.index = index;

				if (Array.isArray(res)) {
					this.items = res;
				} else {
					this.items = res.items;
					this.total = res.total;
				}
			}).finally(() => this._loading = null);
		},
		switchPage(index) {
			this.loadPage(index).then(this.scrollToStart);
		},
		refresh() {
			this.loadPage(this.index);
		},
		switchToLast() {
			const { loadPage, total, pageSize, scrollToEnd } = this;
			loadPage(Math.floor(total / pageSize)).then(scrollToEnd);
		},
		scrollToStart() {
			this.$nextTick(() => scrollToElementStart(this.$el));
		},
		scrollToEnd() {
			this.$nextTick(() => scrollToElementEnd(this.$el));
		},
	},
};
</script>

<style module lang="less">
.buttons {
	margin: 16px 0;
}
</style>
