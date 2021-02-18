<template>
	<transition
		:enter-class="$style.enter_before"
		:leave-to-class="$style.enter_before"
	>
		<div
			:class="$style.container"
			@mouseenter="handleHover"
			@mouseleave="handleLeave"
		>
			{{ content }}
		</div>
	</transition>
</template>

<script>
export default {
	name: "PopupAlert",
	props: {
		time: {
			type: Number,
			default: 2000,
		},
		content: {
			type: String,
			required: true,
		},
	},
	methods: {
		handleHover() {
			this.preventClose = true;
		},
		handleLeave() {
			if (this.closed) {
				this.$emit("close");
			}
			this.preventClose = false;
		},
		close() {
			if (this.preventClose) {
				this.closed = true;
			} else {
				this.$emit("close");
			}
		},
	},
	mounted() {
		setTimeout(this.close, this.time);
	},
};
</script>

<style module lang="less">
@import "../css/exports";

.enter_before {
	opacity: 0;
}

.container {
	position: fixed;
	left: 50%;
	bottom: 10vh;
	z-index: 5000;

	transition: opacity .25s;
	padding: 5px 12px;
	transform: translateX(-50%);

	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	border-radius: 4px;
	color: white;
	background-color: #4eaf4b;

	@media screen and (min-width: @length-screen-mobile) {
		padding: .5em 1em;
	}
}
</style>
