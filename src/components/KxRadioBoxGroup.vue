<template>
	<div><slot/></div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

interface Props {
	modelValue: string;
	name?: string;
	disabled?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>
