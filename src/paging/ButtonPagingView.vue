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

		<!-- 检查一下防止初始项目数量大于分页数量 -->
		<slot :items="items.length > pageSize ? items.slice(0, pageSize) : items"/>

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
		/** index, size, cancelToken => Promise<{ items, total }> */
		loader: {
			type: Function,
			required: true,
		},
		/**
		 * value 必须是一个对象，并包含以下字段：
		 *   - items: any[]; // 列表项
		 *   - total: number; // 总数
		 */
		value: {
			type: Object,
		},
		start: {
			type: Number,
			default: 0,
		},
		pageSize: {
			type: Number,
			default: 20,
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
	data: () => ({
		index: 0,
	}),
	computed: {
		items() {
			const { value } = this;
			return value ? value.items : [];
		},
		total() {
			const { value } = this;
			return value ? value.total : 0;
		},
	},
	methods: {
		loadPage(index) {
			const { start, pageSize, _loading, loader } = this;
			if (_loading) {
				_loading.cancel();
			}
			const cancelToken = new CancelToken();
			this._loading = cancelToken;
			this.index = index; // 先跳页再加载

			return loader(start + index * pageSize, pageSize, cancelToken)
				.then(r => this.$emit("input", r))
				.finally(() => this._loading = null);
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
		/** 刷新（重新加载）当前页，返回 Promise 表示刷新完成 */
		refresh() {
			return this.loadPage(this.index);
		},
		/** 切换到最后一页 */
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
