<!--
	http://tobiasahlin.com/spinkit
	MIT License
	Copyright (c) 2020 Tobias Ahlin
 -->
<template>
	<div :class='$style.container'>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
		<div :class='$style.cycle'></div>
	</div>
</template>

<style module lang="less">
@import "../css/exports";

.container {
	--color: @color-primary;
	--size: 40px;

	margin: 0 auto;
	width: var(--size);
	height: var(--size);
	position: relative;
}

.cycle {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;

	&::before {
		content: '';
		display: block;
		margin: 0 auto;
		width: 15%;
		height: 15%;
		background: var(--color);
		border-radius: 100%;
		animation: animation 1.2s infinite ease-in-out both;
	}
}

each(range(2, 12), {
	.cycle:nth-child(@{value}) {
		transform: rotate(30deg * (@value - 1));

		&::before {
			animation-delay: -1s * (1.3 - @value / 10);
		}
	}
});

// 动画名也会被 CSS Module 转换
@keyframes animation {
	40% {
		opacity: 1;
	}
	0%, 39%, 100% {
		opacity: 0;
	}
}
</style>
