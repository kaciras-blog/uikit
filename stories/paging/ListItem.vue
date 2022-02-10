<template>
	<div :class="$style.box">
		<img :class="$style.avatar" alt="avatar" :src="avatar"/>
		<div :class="$style.header">
			<span :class="$style.name">{{ name }}</span>
			<span :class="$style.index"></span>
		</div>
		<div :class="$style.content">{{ content }}</div>
	</div>
</template>

<script lang="ts">
// props 数据可以用 data.ts 里的 getQuotes() 生成。
export default {
	name: "DemoListItem",
	props: ["avatar", "name", "content"],
};
</script>

<style module lang="less">
.box {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto 1fr;
	grid-template-areas: "avatar header" "avatar content";
	gap: 10px;

	margin: 10px;
	padding: 10px;
	border: solid 2px #888;
}

.avatar {
	grid-area: avatar;
	width: 48px;
	height: 48px;
}

.header {
	grid-area: header;
	display: flex;
}

.name {
	font-size: 1.125em;
}

.index {
	margin-left: auto;
	counter-increment: index;
	content: "#" counter(index);
}

.content {
	grid-area: content;
}
</style>
