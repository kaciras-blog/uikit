<template>
	<main>
		<kx-button @click="counter++" square>标准按钮</kx-button>
		<h3>{{counter}}</h3>

		<kx-button tag="a" route="/dialog">路由按钮</kx-button>
		<kx-button tag="a" route="/radiobox">RadioBox</kx-button>

		<kx-task-button :on-click="ck">
			加载按钮
			<template v-slot:running>正在加载</template>
		</kx-task-button>

		<kx-task-button class="second outline" :on-click="ck">
			加载按钮
			<template v-slot:running>正在加载</template>
		</kx-task-button>

		<hr>

		<kx-button>默认样式</kx-button>
		<kx-button class="primary">主按钮</kx-button>
		<kx-button class="second">次要按钮</kx-button>
		<kx-button class="info">信息</kx-button>
		<kx-button class="dangerous">危险操作</kx-button>

		<kx-button class="second outline">次要按钮</kx-button>
		<kx-button class="primary outline">主按钮</kx-button>
		<kx-button class="info outline">信息</kx-button>
		<kx-button class="dangerous outline">危险操作</kx-button>
	</main>
</template>

<script>
import { sleep } from "@/helpers";

export default {
	data: () => ({
		counter: 0,
	}),
	methods: {
		ck () {
			return sleep(3000 * 9999);
		},
	},
};
</script>
