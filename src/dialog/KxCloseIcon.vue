<template functional>
	<button title="关闭"
			:class="[data.class, data.staticClass, $style.iconBox]"
			:style="[data.style, data.staticStyle]"
			@mousedown.stop
			v-on="listeners">
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
	border-top-right-radius: 4px;
	background: none;
}

.iconBox:hover, .iconBox:focus {
	background-color: rgba(0, 0, 0, .05);
}
</style>
