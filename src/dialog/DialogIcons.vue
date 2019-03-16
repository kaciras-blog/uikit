<template>
	<div v-if="type === 0" class="sweet-modal-icon sweet-modal-info"></div>
	<div v-else-if="type === 1" class="sweet-modal-icon sweet-modal-success">
		<span class="sweet-modal-line sweet-modal-tip"></span>
		<span class="sweet-modal-line sweet-modal-long"></span>
		<div class="sweet-modal-placeholder"></div>
		<div class="sweet-modal-fix"></div>
	</div>
	<div v-else-if="type === 2" class="sweet-modal-icon sweet-modal-warning">
		<span class="sweet-modal-body"></span>
		<span class="sweet-modal-dot"></span>
	</div>
	<div v-else class="sweet-modal-icon sweet-modal-error">
		<span class="sweet-modal-x-mark">
			<span class="sweet-modal-line sweet-modal-left"></span>
			<span class="sweet-modal-line sweet-modal-right"></span>
		</span>
	</div>
</template>

<script>
import { MessageBoxType } from "./index";

export default {
	name: "DialogIcons",
	props: {
		type: MessageBoxType,
	}
}
</script>

<style lang="less">
@color-info: #358bff;
@color-success: #69ff80;
@color-warning: #ffc04c;
@color-error: #ff4a54;

.sweet-modal-icon {
	position: relative;

	width: 80px;
	height: 80px;

	border: 4px solid gray;
	border-radius: 50%;

	margin: auto;
	padding: 0;

	box-sizing: content-box;

	&.sweet-modal-error {
		border-color: @color-error;

		.sweet-modal-x-mark {
			position: relative;
			display: block;
		}

		.sweet-modal-line {
			display: block;
			position: absolute;
			top: 37px;
			height: 5px;
			width: 47px;

			background-color: @color-error;
			border-radius: 2px;

			&.sweet-modal-left {
				transform: rotate(45deg);
				left: 17px;
			}

			&.sweet-modal-right {
				transform: rotate(-45deg);
				right: 16px;
			}
		}
	}

	&.sweet-modal-warning {
		border-color: @color-warning;

		.sweet-modal-body { // Exclamation mark body
			position: absolute;
			width: 5px;
			height: 47px;
			left: 50%;
			top: 10px;

			margin-left: -2px;

			border-radius: 2px;
			background-color:@color-warning;
		}

		.sweet-modal-dot { // Exclamation mark dot
			position: absolute;
			left: 50%;
			bottom: 10px;
			width: 7px;
			height: 7px;

			margin-left: -3px;

			border-radius: 50%;
			background-color: @color-warning;
		}
	}

	&.sweet-modal-info {
		border-color: @color-info;

		&::before { // i-letter body
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

		&::after { // i-letter dot
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

	&.sweet-modal-success {
		border-color: @color-success;

		&::before, &::after { // Emulate moving circular line
			content: '';
			position: absolute;

			border-radius: 40px;

			width: 60px;
			height: 120px;

			background: white;

			transform: rotate(45deg);
		}

		&::before {
			border-radius: 120px 0 0 120px;

			top: -7px;
			left: -33px;

			transform: rotate(-45deg);

			-webkit-transform-origin: 60px 60px;
			transform-origin: 60px 60px;
		}

		&::after {
			border-radius: 0 120px 120px 0;

			top: -11px;
			left: 30px;

			transform: rotate(-45deg);

			-webkit-transform-origin: 0 60px;
			transform-origin: 0 60px;
		}

		.sweet-modal-placeholder { // Ring
			box-sizing: content-box;
			position: absolute;
			left: -4px;
			top: -4px;
			z-index: 2;

			width: 80px;
			height: 80px;

			border: 4px solid rgba(0, 255, 0, 0.2);
			border-radius: 50%;
		}

		.sweet-modal-fix { // Hide corners left from animation
			position: absolute;
			left: 28px;
			top: 8px;
			z-index: 1;

			width: 7px;
			height: 90px;
			background-color: white;

			transform: rotate(-45deg);
		}

		.sweet-modal-line {
			display: block;
			position: absolute;
			z-index: 2;

			height: 5px;
			background-color: @color-success;
			border-radius: 2px;

			&.sweet-modal-tip {
				width: 25px;

				left: 14px;
				top: 46px;

				transform: rotate(45deg);
			}

			&.sweet-modal-long {
				width: 47px;

				right: 8px;
				top: 38px;

				transform: rotate(-45deg);
			}
		}
	}

	&.sweet-modal-custom {
		border-radius: 0;
		border: none;

		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;
	}
}
</style>
