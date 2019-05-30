<template>
	<div :class="$style.container">

		<!-- 通过该插槽可以自定义状态显示，父组件内请使用inline-template -->
		<slot name="state">
			<sk-fading-circle v-if="state === 'LOADING'"></sk-fading-circle>

			<span v-else-if="state === 'FAILED'">
				加载失败,请<a class="error highlight" @click="loadPage">重试</a>
			</span>

			<span v-else-if="state === 'ALL_LOADED'" class="minor-text">没有更多的了</span>
		</slot>

		<!-- 手动加载按钮 -->
		<kx-button
			v-if="state==='FREE'"
			tag="a"
			class="primary"
			:class="$style.button"
			icon="fas fa-chevron-circle-down"
			:href="nextPageUrl"
			@click.prevent="loadPage">
			查看更多
		</kx-button>
	</div>
</template>

<script>
const LOADING = "LOADING";
const FREE = "FREE";
const FAILED = "FAILED";
const ALL_LOADED = "ALL_LOADED";

class LoadTask {

	constructor(vm) {
		this._finish = false;
		this._vm = vm;
	}

	complete(allLoaded = false) {
		// 可能一次加载后空余高度仍达不到activeHeight，还得继续加载
		if (!this._vm.tryLoadPage()) {
			this.finish(allLoaded ? ALL_LOADED : FREE);
		}
	}

	completeWithError() {
		this.finish(FAILED);
	}

	finish(state) {
		if (this._finish) {
			throw new Error("不能重复设置加载的结果");
		}
		this._finish = true;
		this._vm.state = state;
	}
}

export default {
	name: "ScrollPager",
	props: {
		// 用于多页显示模式，也能够让爬虫跟踪到后续页
		nextPageUrl: {
			type: String,
			required: false,
		},
		// 滚动时自动加载，该选项为false时将不触发滚动加载
		autoLoad: {
			type: Boolean,
			default: false,
		},
		// 滚动到距离底部还有多高时触发加载事件
		activeHeight: {
			type: Number,
			default: 512,
		},
		// 初始状态，用于预渲染。
		initState: {
			type: String,
			default: FREE,
		},
	},
	data() {
		/* FREE, FAIL, LOADING, ALL_LOADED */
		return { state: this.initState };
	},
	computed: {
		loadable() {
			return [ALL_LOADED, LOADING].indexOf(this.state) < 0;
		},
	},
	methods: {
		tryLoadPage() {
			const { state, activeHeight, autoLoad } = this;
			if (state !== FREE || !autoLoad) return;

			// 网页高度 - 窗口高度 - 窗口之上部分的高度 = 窗口下面剩余的高度
			const remain = document.body.offsetHeight - window.innerHeight - window.scrollY;

			if (remain < activeHeight) {
				this.loadPage();
			}
			return remain < activeHeight;
		},
		loadPage() {
			if (!this.loadable) return;
			this.state = LOADING;
			this.$emit("load-page", new LoadTask(this));
		},
	},
	mounted() {
		window.addEventListener("scroll", this.tryLoadPage);
		this.loadPage(); // 第一页一定加载，无论是否滚动到位
	},
	destroyed() {
		window.removeEventListener("scroll", this.tryLoadPage);
	},
};
</script>

<style module lang="less">
@import "../css/exports";

.container {
	text-align: center;
}

@media screen and (max-width: @length-screen-mobile) {
	.button { width: 100%; }
}
</style>
