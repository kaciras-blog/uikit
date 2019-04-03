<template>
	<div id="app">
		<nav :class="$style.navigation">
			<router-link to="/usage">使用指南</router-link>
		</nav>
		<router-view></router-view>
	</div>
</template>

<style module lang="less">
#app {
	min-height: 100vh;
}

.navigation {
	position: sticky;
	top: 0;
	z-index: 100;

	width: 100%;
	font-size: 1rem;
	color: white;
	background-color: #4a78d8;

	& > a {
		display: inline-block;
		padding: .8rem;

		&:visited {
			color: white;
		}

		&:hover, &:focus {
			color: #ffff4d;
			text-decoration: none;
		}
	}

	& > .router-link-active {
		color: black;
		background-color: white;
	}
}
</style>
