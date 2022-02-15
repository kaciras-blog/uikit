<!--
	该组件将使用相对路径 URI 渲染为 <router-link>，其他情况渲染为 <a>。

	解决 router-link 会把链接地址视为本站下的问题，
	例如 http://foo.bar -> https://localhost/http://foo.bar
 -->
<template>
	<router-link
		v-if="href[0] === '/'"
		:to="href"
	>
		<slot/>
	</router-link>
	<a v-else :href="href">
		<slot/>
	</a>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

interface SmartLinkProps {
	href: string;
}

defineProps<SmartLinkProps>();
</script>
