<template>
	<main>
		<kx-button @click="counter++" square>标准按钮</kx-button>
		<h3>{{counter}}</h3>

		<kx-button tag="a" route="/dialog">路由按钮</kx-button>
		<kx-button tag="a" route="/radiobox">RadioBox</kx-button>

		<p class="btn-group">
			<kx-button class="primary" v-ripple.centered>主按钮</kx-button>
			<kx-button class="second">次要按钮</kx-button>
			<kx-button class="info">信息</kx-button>
			<kx-button class="dangerous">危险操作</kx-button>
		</p>
		<p class="btn-group">
			<kx-button class="primary outline">主按钮</kx-button>
			<kx-button class="second outline">次要按钮</kx-button>
			<kx-button class="info outline">信息</kx-button>
			<kx-button class="dangerous outline">危险操作</kx-button>
		</p>
		<p class="btn-group">
			<kx-task-button :on-click="ck">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
			<kx-task-button class="second outline" :on-click="ck">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
			<kx-task-button class="info outline" :on-click="ck">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
			<kx-task-button class="dangerous" :on-click="ck">
				加载按钮
				<template v-slot:running>正在加载</template>
			</kx-task-button>
		</p>
		<input>
		<textarea class="input"></textarea>
	</main>
</template>

<script>
import { sleep } from "@";

export default {
	data: () => ({
		counter: 0,
	}),
	methods: {
		ck: sleep.bind(undefined, 3000)
	},
};
</script>
