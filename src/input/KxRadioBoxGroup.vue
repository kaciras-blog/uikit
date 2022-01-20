<template>
	<div><slot/></div>
</template>

<script setup lang="ts">
export interface RadioGroupProps {
	modelValue: any;
	name?: string;
	disabled?: boolean;
}

defineProps<RadioGroupProps>();
defineEmits(["update:modelValue"]);
</script>
