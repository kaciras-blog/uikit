import { expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import RelativeTime from "../../src/components/RelativeTime.vue";

vi.useFakeTimers();

it("should render past time in relative", async () => {
	vi.setSystemTime(1676456200_000);

	const wrapper = shallowMount(RelativeTime, {
		props: { value: 1671848003_000 },
	});

	expect(wrapper.html()).toBe(
		'<time data-allow-mismatch="" title="2022-12-24 10:13" datetime="2022-12-24T02:13:23.000Z">上个月</time>');
});

it("should render future time in relative", async () => {
	vi.setSystemTime(1676456200_000);

	const wrapper = shallowMount(RelativeTime, {
		props: { value: 1676945603_000 },
	});

	expect(wrapper.html()).toBe(
		'<time data-allow-mismatch="" title="2023-02-21 10:13" datetime="2023-02-21T02:13:23.000Z">5天后</time>');
});

it("should render time that greater than the threshold in absolute", () => {
	vi.setSystemTime(1676456200_000);

	const wrapper = shallowMount(RelativeTime, {
		props: { value: 1566422003_000 },
	});

	expect(wrapper.html()).toBe(
		'<time data-allow-mismatch="" title="2019-08-22 5:13" datetime="2019-08-21T21:13:23.000Z">2019-08-22</time>');
});

it("should update current time on value change", async () => {
	vi.setSystemTime(1676456200_000);

	const wrapper = shallowMount(RelativeTime, {
		props: { value: 1671848003_000 },
	});

	// 模拟全局时间改变后设置 value，textContent 应当能够更新。
	vi.setSystemTime(1000);
	await wrapper.setProps({ value: 3000 });

	expect(wrapper.html()).toBe(
		'<time data-allow-mismatch="" title="1970-01-01 8:00" datetime="1970-01-01T00:00:03.000Z">2秒钟后</time>');
});
