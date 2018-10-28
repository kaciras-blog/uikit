<template>
	<main :class="$style.container">
		<aside :class="$style.aside">
			<h1>组件列表</h1>
			<ul :class="$style.tab">
				<router-link to="/buttons" tag="li">对话框</router-link>
				<router-link to="/dialog" tag="li">对话框</router-link>
				<router-link to="/radiobox" tag="li">单选按钮</router-link>
			</ul>
		</aside>
		<div :class="$style.view">
			<router-view/>
		</div>
	</main>
</template>

<script>
export default {
	name: "UsageView",
};
</script>

<style module lang="less">
.container {
	height: 100vh;
}

.aside {
	width: 20%;
	height: 100%;
	display: inline-block;
}

.view {
	display: inline-block;
	padding: 1rem;
}

.tab {
	padding: 0;
}

.tab > li {
	list-style: none;
	cursor: pointer;
	padding: .4rem .5rem;
}
</style>
