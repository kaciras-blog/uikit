<!--
对 <time> 的简单封装，提供了格式化时间的功能，使用原生的 Internationalization API。

这里把绝对时间（Absolute time）称为时刻，相对时间（Relative time）称为时差（Duration）。
当渲染为绝对时间时，默认使用当前的时区，这在 SSR 中会造成不一致，但不是什么大问题。
-->

<template>
	<time data-allow-mismatch :title='title' :datetime='date.toISOString()'>{{ text }}</time>
</template>

<script lang='ts'>
// 时刻的格式是 yyyy-MM-dd HH:mm，瑞典正好符合。
const dateTimeMinute = new Intl.DateTimeFormat("sv", {
	day: "numeric",
	month: "numeric",
	year: "numeric",
	hour: "numeric",
	hour12: false,
	minute: "2-digit",
});

const dateOnly = new Intl.DateTimeFormat("sv", {
	day: "numeric",
	month: "numeric",
	year: "numeric",
});

// TODO: support i18n in the next major release.
const relative = new Intl.RelativeTimeFormat("zh-CN", {
	numeric: "auto",
});

const divisions: any = [
	60,			"second",
	60,			"minute",
	24,			"hour",
	7,			"day",
	4.34524,	"week",
	12,			"month",
	Infinity,	"year",
];
</script>

<script setup lang='ts'>
import { computed, shallowRef, watchEffect } from "vue";
import { useIntervalFn } from "@vueuse/core";

export interface RelativeTimeProps {
	/**
	 * 自动刷新间隔（毫秒），默认为 0 代表禁用。
	 */
	autoRefresh?: number;

	/**
	 * 如果时差（秒）大于该值，直接显示时刻，否则显示格式化后的时差。
	 *
	 * 默认是一年，设为 0 只显示时刻，设为 Infinity 只显示时差。
	 */
	threshold?: number;

	/**
	 * 时刻值，数字类型以毫秒作单位，不能为负数，可以大于当前时刻。
	 */
	value: Date | number;
}

// Vue 3.5 支持解构写法啦，但本来 setup 块变量就多，这一搞就更乱了。
const { value, autoRefresh = 0, threshold = 31536e+3 } = defineProps<RelativeTimeProps>();

const text = shallowRef("");

const date = computed(() => typeof value === "number" ? new Date(value) : value);
const title = computed(() => dateTimeMinute.format(date.value));

function refreshText() {
	let duration = date.value.getTime() - Date.now();

	const sign = duration > 0 ? 1 : -1;
	duration = Math.abs(duration / 1000);

	if (duration > threshold) {
		return text.value = dateOnly.format(date.value);
	}

	/*
	 * xxxTimeFormat.format() 使用的是小数而不是模数，区别如下：
	 * 小数：90s -> 1.5m
	 * 模数：90s -> 1m 30s
	 *
	 * 显然模数更适合表示时差，这玩意的 API 不太好用，得自己先处理下。
	 */
	let i = 0;
	for (; i < divisions.length; i += 2) {
		const d = divisions[i];
		if (duration < d) {
			break;
		} else {
			duration /= d;
		}
	}
	/*
	 * 由于 RelativeTimeFormat 不支持 1 个多月这样的模糊词，所以要考虑舍入问题。
	 * GitHub 是在 90% 的位置向上舍入，这里还是简单些全部向下取整。
	 *
	 * https://github.com/github/relative-time-element/blob/7a8113f5a9035fc9e6e81c75099eba2877dcf51d/src/duration.ts#L126
	 */
	duration = sign * Math.floor(duration);
	text.value = relative.format(duration, divisions[i + 1]);
}

watchEffect(refreshText);

useIntervalFn(refreshText, () => autoRefresh);
</script>
