<template>
	<div>
		<kx-radio-box-group name="asd" v-model="value">
			<kx-radio-box :class="$style.radioA" value="1">阿斯顿</kx-radio-box>
			<kx-radio-box :class="$style.radioA" value="2">饿我去</kx-radio-box>
			<kx-radio-box :class="$style.radioA" value="3">柔柔弱弱</kx-radio-box>
			<kx-radio-box :class="$style.radioA" value="4">大法师</kx-radio-box>

			<kx-radio-box-group :class="$style.inner" v-model="value2">
				<kx-radio-box :class="$style.radioA" value="1">阿斯顿</kx-radio-box>
				<kx-radio-box :class="$style.radioA" value="2">饿我去</kx-radio-box>
				<kx-radio-box :class="$style.radioA" value="3">柔柔弱弱</kx-radio-box>
				<kx-radio-box :class="$style.radioA" value="3">大法师</kx-radio-box>
			</kx-radio-box-group>
		</kx-radio-box-group>

		<h1>Outer Selected: {{value}}</h1>
		<h1>Inner Selected: {{value2}}</h1>
	</div>
</template>

<script>
export default {
	name: "RadioBoxes",
	data: () => ({
		value: 1,
		value2: 1,
	}),
};
</script>

<style module lang="less">
.radioA {
	display: inline-block;
	margin: 0 .5rem;
}

.inner {
	margin-top: .5rem;
	padding-top: .5rem;
	border-top: solid 1px #b1b1b1;
}
</style>
