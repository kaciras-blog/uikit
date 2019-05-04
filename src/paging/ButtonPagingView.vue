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
import { CancelToken, scrollToElementEnd, scrollToElementStart } from "../index";
import { getScrollTop } from "../interactive";

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
		viewportOffset: {
			type: Number,
			default: 0,
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
		/**
		 * 用户点击按钮后切换页面，同时如果视口无法看到第一项，则会滚动到刚好能看到第一项的位置。
		 * 这个滚动不要用动画，否则会让人觉得磨叽。
		 *
		 * @param index 页码
		 */
		async switchPage(index) {
			await this.loadPage(index);
			const top = this.$el.getBoundingClientRect().top - this.viewportOffset;
			if (top < 0) {
				document.documentElement.scrollTop = getScrollTop(this.$el) - this.viewportOffset;
			}
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
