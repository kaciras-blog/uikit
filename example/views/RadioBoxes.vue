<template>
	<div>
		<kx-radio-box-group v-model="value">
			<kx-radio-box value="1">阿斯顿</kx-radio-box>
			<kx-radio-box value="2">饿我去</kx-radio-box>
			<kx-radio-box value="3" init-selected>柔柔弱弱</kx-radio-box>
			<kx-radio-box name="sss" value="3">大法师</kx-radio-box>

			<kx-radio-box-group v-model="value2">
				<kx-radio-box value="1">阿斯顿</kx-radio-box>
				<kx-radio-box value="2">饿我去</kx-radio-box>
				<kx-radio-box value="3" init-selected>柔柔弱弱</kx-radio-box>
				<kx-radio-box name="sss" value="3">大法师</kx-radio-box>
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

<style scoped>

</style>
