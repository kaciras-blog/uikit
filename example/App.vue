<template functional>
	<div id="app">
		<nav>
			<router-link to="/usage">使用指南</router-link>
		</nav>
		<router-view/>
	</div>
</template>

<style lang="less">
nav {
	font-size: 1rem;
	margin-bottom: 1rem;
	background-color: #2171f5;
	color: white;

	& > a {
		display: inline-block;
		padding: .8rem;
	}

	& > .router-link-active {
		color: black;
		background-color: white;
	}
}
</style>
