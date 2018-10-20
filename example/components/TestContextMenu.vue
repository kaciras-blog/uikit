<template>
	<ul class="menu">
		<li class="menu-item">查看代码</li>
	</ul>
</template>

<script>
export default {
	name: "TestContextMenu",
};
</script>

<style scoped lang="less">
.menu {
	padding: 0;
	margin: 0;
	background-color: white;
}
.menu-item {
	list-style: none;
	padding: .4rem .8rem;
	cursor: default;
}
</style>
