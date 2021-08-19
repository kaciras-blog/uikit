<template>
	<button
		title="关闭"
		:class="$style.iconBox"
		@mousedown.stop
	>
		<close-icon/>
	</button>
</template>

<script>
import CloseIcon from "../assets/icon-close.svg";

export default {
	components: { CloseIcon },
};
</script>

<style module lang="less">
.iconBox {
	height: 3rem;
	width: 3rem;

	font-size: 24px;
	line-height: 1em;

	text-align: center;
	cursor: pointer;
	background: none;

	transition: .15s ease-out;
}

.iconBox:hover,
.iconBox:focus {
	background-color: rgba(0, 0, 0, .05);
}

.iconBox:active {
	background-color: rgba(0, 0, 0, .1);
}
</style>
