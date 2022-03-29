<template>
	<div class="kx-dialog-icon" :class="$style[MessageType[type]]"/>
</template>

<script setup lang="ts">
import { MessageType } from "./core";

interface DialogIconProps {
	type: MessageType;
}

defineProps<DialogIconProps>();
</script>

<style module lang="less">
@color-info: #358bff;
@color-success: #00d936;
@color-warning: #ffc04c;
@color-error: #ff5d64;

:global(.kx-dialog-icon) {
	position: relative;

	width: 80px;
	height: 80px;

	border: 4px solid gray;
	border-radius: 50%;

	margin: 20px auto;
	box-sizing: content-box;
}

// 下面几个用驼峰命名，便于动态获取。

&.Error {
	border-color: @color-error;

	&::before, &::after {
		content: "";
		display: block;
		position: absolute;
		top: 37px;
		height: 5px;
		width: 47px;

		background-color: @color-error;
		border-radius: 2px;
	}

	&::before {
		transform: rotate(45deg);
		left: 17px;
	}

	&::after {
		transform: rotate(-45deg);
		right: 16px;
	}
}

&.Warning {
	border-color: @color-warning;

	&::before {
		content: '';
		position: absolute;
		width: 5px;
		height: 29px;
		left: 50%;
		bottom: 17px;

		margin-left: -2px;
		border-radius: 2px;
		background-color: @color-warning;
	}

	&::after {
		content: '';
		position: absolute;
		width: 7px;
		height: 7px;
		top: 19px;

		margin-left: -3px;
		border-radius: 50%;
		background-color: @color-warning;
	}
}

&.Info {
	border-color: @color-info;

	&::before {
		content: '';
		position: absolute;
		width: 5px;
		height: 29px;
		left: 50%;
		bottom: 17px;

		margin-left: -2px;
		border-radius: 2px;
		background-color: @color-info;
	}

	&::after {
		content: '';
		position: absolute;
		width: 7px;
		height: 7px;
		top: 19px;

		margin-left: -3px;
		border-radius: 50%;
		background-color: @color-info;
	}
}

&.Success {
	border-color: @color-success;

	&::before, &::after {
		content: "";
		display: block;
		position: absolute;
		z-index: 2;

		height: 5px;
		background-color: @color-success;
		border-radius: 2px;
	}

	&::before {
		width: 25px;
		left: 14px;
		top: 46px;
		transform: rotate(45deg);
	}

	&::after {
		width: 47px;
		right: 8px;
		top: 38px;
		transform: rotate(-45deg);
	}
}
</style>
