<!--
	https://epic-spinners.epicmax.co
	MIT License
	Copyright (c) 2018 Epicmax LLC
-->
<template>
	<div :class="$style.spinner">
		<div :class="$style.line"></div>
		<div :class="$style.line"></div>
		<div :class="$style.line"></div>
		<div :class="$style.dot">&#9679;</div>
	</div>
</template>

<style module lang="less">
@import "../css/exports";

.spinner {
	--color: @color-primary;
	--size: 60px;

	display: block;
	position: relative;
	width: var(--size);
	height: var(--size);
}

.dot {
	display: block;
	position: absolute;
	color: var(--color);
	font-size: calc(var(--size) * 0.24);
	top: 50%;
	left: 50%;
	user-select: none;
	transform: translate(-50%, -50%);
}

.line {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	animation-duration: 1s;
	border-left-width: calc(var(--size) / 25);
	border-top-width: calc(var(--size) / 25);
	border-left-color: var(--color);
	border-left-style: solid;
	border-top-style: solid;
	border-top-color: transparent;

	&:nth-child(1) {
		animation: animation-1 1s linear infinite;
		transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
	}

	&:nth-child(2) {
		animation: animation-2 1s linear infinite;
		transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
	}

	&:nth-child(3) {
		animation: animation-3 1s linear infinite;
		transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
	}
}

@keyframes animation-1 {
	100% {
		transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
	}
}

@keyframes animation-2 {
	100% {
		transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
	}
}

@keyframes animation-3 {
	100% {
		transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
	}
}
</style>
