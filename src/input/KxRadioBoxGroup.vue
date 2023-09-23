<template>
	<div><slot/></div>
</template>

<script setup lang="ts" generic='T'>
export interface RadioGroupProps {
	modelValue: T;
	name?: string;
	disabled?: boolean;
}

defineProps<RadioGroupProps>();
defineEmits(["update:modelValue"]);
</script>
