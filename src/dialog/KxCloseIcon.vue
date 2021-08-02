<template>
	<button
		title="关闭"
		:class="[data.class, data.staticClass, $style.iconBox]"
		:style="[data.style, data.staticStyle]"
		v-on="listeners"
		@mousedown.stop
	>
		<img src="../assets/icon-close.svg" alt="关闭">
	</button>
</template>

<style module lang="less">
.iconBox {
	height: 3rem;
	width: 3rem;

	line-height: 3rem;
	text-align: center;
	cursor: pointer;
	background: none;

	transition: .15s ease-out;
}

.iconBox:hover, .iconBox:focus {
	background-color: rgba(0, 0, 0, .05);
}
</style>
