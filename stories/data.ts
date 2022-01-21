import Avatar0 from "./assets/avatar0.jpg";
import Avatar1 from "./assets/avatar1.jpg";
import Avatar2 from "./assets/avatar2.jpg";
import Avatar3 from "./assets/avatar3.jpg";
import Avatar4 from "./assets/avatar4.jpg";
import Avatar5 from "./assets/avatar5.jpg";
import Avatar6 from "./assets/avatar6.jpg";

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
	{
		avatar: Avatar5,
		name: "Super面筋人",
		content: "我从7年前就开始玩mc了，但是只玩过盗版，今天好不容易上票正版，搞了一下午终于把东西弄全了，结果进了游戏帧数就1到3，把所有东西都调到最低，甚至区块加载只有5格，才勉强到了3，40左右，有时候还是会走着走着卡一下，我的电脑配置还不至于是垃圾的，x64，处理器是i5，7200，到底怎么办啊，不是人家都说mc起步配置无限低的吗？",
	},
	{
		avatar: Avatar5,
		name: "Super面筋人",
		content: "我赛扬j4105都可以保持15-20帧",
	},
	{
		avatar: Avatar6,
		name: "暴走的酒桶桶",
		content: "调调Java分配内存试试，要不就买张1050ti或者同样性能的显卡插上。",
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

/**
 * 生成消对话息列表，使用一个简单的数据集，其中的项可能有重复。
 *
 * @param length 生成多少项
 */
export function getQuotes(length: number) {
	return Array.from({ length }, () => rand(DATASET));
}
