<template>
	<div :class="$style.container">

		<!-- 通过该插槽可以自定义状态显示，父组件内请使用inline-template -->
		<slot name="state">
			<sk-fading-circle v-if="state === 'LOADING'"/>

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
			@click.prevent="loadPage"
		>
			查看更多
		</kx-button>
	</div>
</template>

<script>
const LOADING = "LOADING";
const FREE = "FREE";
const FAILED = "FAILED";
const ALL_LOADED = "ALL_LOADED";

export class LoadTask {

	constructor(vm) {
		this._finish = false;
		this._vm = vm;
	}

	complete(allLoaded = false) {
		this.finish(allLoaded ? ALL_LOADED : FREE);
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
	methods: {
		loadPage() {
			if (this.state === ALL_LOADED || this.state === LOADING) {
				return;
			}
			this.state = LOADING;
			this.$emit("load-page", new LoadTask(this));
		},

		/** 强制加载，该方法在加载完成时仍可以调用，用于HACK一些操作 */
		forceLoad(loader) {
			this.state = LOADING;
			loader(new LoadTask(this));
		},
	},
	mounted() {
		this.$_observer = new IntersectionObserver(entries => {
			// state === FREE 在出错时不自动加载
			if (entries[0].isIntersecting && this.state === FREE) this.loadPage();
		});
		const autoLoadWatcher = (value) => {
			if (value) {
				this.$_observer.observe(this.$el);
			} else {
				this.$_observer.disconnect();
			}
		};
		this.$watch("autoLoad", autoLoadWatcher, { immediate: true });
	},
	destroyed() {
		this.$_observer.disconnect();
	},
};
</script>

<style module lang="less">
@import "../css/exports";

.container {
	text-align: center;
}

@media screen and (max-width: @length-screen-mobile) {
	.button { width: 64%; }
}
</style>
