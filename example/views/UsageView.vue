<!-- Vue的路由 -->
<template>
	<main :class="$style.container">
		<ul :class="$style.tab">
			<router-link to="/usage/buttons" tag="li">按钮</router-link>
			<router-link to="/usage/dialog" tag="li">对话框</router-link>
			<router-link to="/usage/radiobox" tag="li">单选按钮</router-link>
		</ul>
		<div :class="$style.view"><router-view/></div>
	</main>
</template>

<style module lang="less">
.container {
	height: 100vh;
}

.tab {
	position: fixed;
	width: 20%;
	height: 100%;
	margin: 0;
	padding: 14px;
	overflow-y: scroll;
}

.tab > li {
	list-style: none;
	cursor: pointer;
	padding: 6px 0;
	font-size: 1rem;

	&:hover {
		color: #f50cce;
		text-decoration: underline;
	}
}

.view {
	margin-left: 20%;
	padding: 20px;
}
</style>
