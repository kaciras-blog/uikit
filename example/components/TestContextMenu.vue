<template>
	<ul class="menu">
		<li class="menu-item">查看代码</li>
		<li class="menu-item">菜单项目2</li>
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
	border: solid 1px #dcdcdc;
	box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.05);
}

.menu-item {
	list-style: none;
	padding: .4rem .8rem;
	cursor: default;

	&:hover {
		background-color: #00c6fa;
		color: white;
	}
}
</style>
