<template>
	<div
		:class="$style.container"
		@mouseenter="handleHover"
		@mouseleave="handleLeave"
	>
		{{ content }}
	</div>
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
	emits: ["close"],
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

@keyframes fade-in {
	from { opacity: 0; }
	to { opacity: 1; }
}

.container {
	position: fixed;
	left: 50%;
	bottom: 10vh;
	z-index: 5000;

	padding: 5px 12px;
	transform: translateX(-50%);

	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	border-radius: 4px;
	color: white;
	background-color: #4eaf4b;

	animation: fade-in .25s;

	@media screen and (min-width: @length-screen-mobile) {
		padding: .5em 1em;
	}
}
</style>
