<template>
	<div><slot/></div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

interface Props {
	modelValue: any;
	name?: string;
	disabled?: boolean;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>
