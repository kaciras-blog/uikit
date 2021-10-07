<template>
	<div>
		<button-pager
			v-if="showTopButtons && total"
			:theme="theme"
			:total-count="total"
			:index="index"
			:page-size="pageSize"
			@load-page="switchPage"
		/>

		<!-- 检查一下防止初始项目数量大于分页数量 -->
		<slot :items="items.length > pageSize ? items.slice(0, pageSize) : items"/>

		<button-pager
			v-if="total"
			:theme="theme"
			:total-count="total"
			:index="index"
			:page-size="pageSize"
			@load-page="switchPage"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";
import { scrollToElementEnd, scrollToElementStart } from "../index";
import { getScrollTop } from "../scroll";

interface Props {
	/** 是否触发滚动加载 */
	autoLoad: boolean;

	start: number;

	pageSize: number;

	/** 下一页的链接，用于 SSR，如果不存在则不生成 */
	nextLink?: (start: number, count: number) => string;

	showTopButtons: boolean;

	viewportOffset: number;
}

const props = withDefaults(defineProps<Props>(), {
	start: 0,
	pageSize: 16,
	showTopButtons: false,
	viewportOffset: 0,
});

const items = computed(() => {
	const { value } = props;
	return value ? value.items : [];
});

const total = computed(() => {
	const { value } = props;
	return value ? value.total : 0;
});

function loadPage(index) {
	const { start, pageSize, _loading, loader } = this;
	if (_loading) {
		_loading.abort();
	}
	this._loading = new AbortController();
	const { signal } = this._loading;

	this.index = index; // 先跳页再加载

	return loader(start + index * pageSize, pageSize, signal)
		.then(res => !signal.aborted && this.$emit("input", res))
		.finally(() => this._loading = null);
}

/**
 * 用户点击按钮后切换页面，同时如果视口无法看到第一项，则会滚动到刚好能看到第一项的位置。
 * 这个滚动不要用动画，否则会让人觉得磨叽。
 *
 * @param index 页码
 */
async function switchPage(index) {
	await this.loadPage(index);
	const top = this.$el.getBoundingClientRect().top - this.viewportOffset;
	if (top < 0) {
		document.documentElement.scrollTop = top + getScrollTop();
	}
}

/** 重新加载第一页，返回 Promise 表示加载完成 */
function reload() {
	return this.loadPage(0);
}

/** 刷新（重新加载）当前页，返回 Promise 表示刷新完成 */
function refresh() {
	return this.loadPage(this.index);
}

/** 切换到最后一页 */
function switchToLast() {
	const { loadPage, total, pageSize, scrollToEnd } = this;
	loadPage(Math.floor(total / pageSize)).then(scrollToEnd);
}

function scrollToStart() {
	this.$nextTick(() => scrollToElementStart(this.$el));
}

function scrollToEnd() {
	this.$nextTick(() => scrollToElementEnd(this.$el));
}
</script>
