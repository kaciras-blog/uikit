import Avatar0 from "./assets/avatar0.jpg";
import Avatar1 from "./assets/avatar1.jpg";
import Avatar2 from "./assets/avatar2.jpg";
import Avatar3 from "./assets/avatar3.jpg";
import Avatar4 from "./assets/avatar4.jpg";

const DATASET = [
	{
		avatar: Avatar0,
		name: "我最小白",
		content: "前一版的求推荐专用楼又双叒叕没了，考虑到吧务已经开了【萌新提问专用楼】，实际上我好像也没必要再重开自己的求推荐专用楼了",
	},
	{
		avatar: Avatar1,
		name: "禁卫军骑士",
		content: "求後味が悪い类型的混账游戏（限AVG……剧情作？）嗜虐毛病又发作了",
	},
	{
		avatar: Avatar2,
		name: "nagi",
		content: "剧情作和纯爱，好耶",
	},
	{
		avatar: Avatar2,
		name: "nagi",
		content: "那给俺整一个有乡村气息的，没啥雷的展开的纯爱作，画风不要太老，妹药已经玩过了，最好是能在手机上玩的",
	},
	{
		avatar: Avatar3,
		name: "遥遥相望",
		content: "海猫鸣泣之时",
	},
	{
		avatar: Avatar4,
		name: "Akari",
		content: "那么求一些 社畜每天9/10点回家也能玩一会觉的开心的游戏，最好作品有铜（但没有x行为）但要求登场次数多，欢快，纯爱作品，日文也完全可以",
	},
];

let counter = 0;

/**
 * 从数据集里随机选一条，并附加上唯一的 id 属性。

 * @param list 数据集
 */
function rand(list: any[]) {
	const value = list[Math.floor(Math.random() * list.length)];
	return { ...value, id: counter++ };
}

export function getQuotes(length: number) {
	return Array.from({ length }, () => rand(DATASET));
}
