<template functional>
	<div title="关闭"
		 :class="[data.class, data.staticClass, $style.iconBox]"
		 :style="[data.style, data.staticStyle]"
		 role="button"
		 v-on="listeners"
		 @mousedown.stop>
		<img src="../assets/icon-close.svg" alt="关闭">
	</div>
</template>

<style module lang="less">
.iconBox {
	height: 3rem;
	width: 3rem;
	line-height: 3rem;
	text-align: center;
	cursor: pointer;
	border-top-right-radius: 4px;
}

.iconBox:hover {
	background-color: rgba(0, 0, 0, .05);
}
</style>
