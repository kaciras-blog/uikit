/*
 * 获取媒体尺寸（分辨率）的函数集合，支持像素图、矢量图和视频，该模块只能在浏览器端使用。
 *
 * 常用函数：
 * await getImageResolution(); // 获取图片尺寸
 * await getVideoResolution(); // 获取视频尺寸
 *
 * 【尺寸的单词】
 * size			- 跟文件大小有歧义
 * dimensions	- 跟二维/三维有歧义
 * resolution	- 比较合适
 *
 * 【客户端实现 vs 服务端实现】
 * 在客户端里获取尺寸可以用于第三方图源，这个过程难以用在服务端，另外还能用于需要交互的场景。
 * 在服务端实现更利于代码复用，运维脚本、以及各种预处理过程都可以使用。
 */

/**
 * 二维尺寸对象，包含宽高，单位是像素，可能有小数。
 */
export interface Resolution {
	width: number;
	height: number;
}

type MediaElement = HTMLVideoElement | HTMLImageElement;

/**
 * 设置媒体元素的 src 属性，并安排可能的清理操作。
 * IDE 老提示代码重复所以就提取出来了。
 *
 * @param fetcher 读取尺寸的 Promise
 * @param el 媒体元素
 * @param src 媒体源
 */
function setMediaElementSource(
	fetcher: Promise<Resolution>,
	el: MediaElement,
	src: string | Blob,
) {
	if (typeof src === "string") {
		el.src = src;
		return fetcher;
	} else {
		el.src = URL.createObjectURL(src);
		return fetcher.finally(() => URL.revokeObjectURL(el.src));
	}
}

/**
 * 获取视频的原始尺寸。
 *
 * 【输入兼容性】
 * 浏览器不一定支持所有的视频编码，不支持的视频会抛异常。
 *
 * @param video 视频文件或URL
 * @return 尺寸信息
 * @throws 如果视频不受支持
 */
export function getVideoResolution(video: string | Blob) {
	const el = document.createElement("video");

	const promise = new Promise<Resolution>((resolve, reject) => {
		el.onerror = reject;
		el.onloadedmetadata = () => resolve({ width: el.videoWidth, height: el.videoHeight });
	});

	return setMediaElementSource(promise, el, video);
}

/**
 * 获取像素图的尺寸。
 *
 * @param image 图片文件或URL
 * @return 尺寸信息
 */
export function getRasterImageResolution(image: string | Blob) {
	const el = document.createElement("img");

	const promise = new Promise<Resolution>((resolve, reject) => {
		el.onerror = reject;
		el.onload = () => resolve({ width: el.width, height: el.height });
	});

	return setMediaElementSource(promise, el, image);
}

/**
 * 获取 SVG 图片的尺寸。
 *
 * 【为何不用 <img> 来实现】
 * 有些SVG没有设置 width 和 height 属性，比如 Adobe Illustrator 导出时选择了“响应”选项，
 * 此时无法通过 <img> 来获取尺寸，应选用 viewBox 属性。
 *
 * 若是只有我自己上传图片倒是能保证有 width & height，
 * 但第三方输入的话就不好说了，所以需要提升下输入的兼容性。
 *
 * 【注意】
 * SVG的长宽值可能含有小数，在转换为JS Number时可能产生精度误差。
 *
 * @param image 图片文件或URL
 * @return 尺寸信息
 * @throws 如果SVG加载失败，或是使用了相对尺寸
 */
export async function getSVGImageResolution(image: string | Blob) {
	if (typeof image === "string") {
		const res = await fetch(image, { credentials: "include" });
		return svgSizeOrViewBox(await res.text());
	} else {
		return svgSizeOrViewBox(await image.text());
	}
}

/**
 * 仅支持 px 单位和不带单位的值，因为其它单位都与上下文有关。
 * 如果长度属性不存在则默认为 100%，此时抛出异常。
 *
 * @param length SVG长度对象
 * @throws 如果是不支持的单位或没有该属性
 */
function getLengthInPx(length: SVGAnimatedLength) {
	const { baseVal } = length;

	switch (baseVal.unitType) {
		case SVGLength.SVG_LENGTHTYPE_NUMBER:
		case SVGLength.SVG_LENGTHTYPE_PX:
			return baseVal.value;
		default:
			throw new Error("Unsupported SVG length unit");
	}
}

function svgSizeOrViewBox(text: string): Resolution {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, "image/svg+xml");
	const svg = doc.documentElement as unknown as SVGSVGElement;

	try {
		return {
			width: getLengthInPx(svg.width),
			height: getLengthInPx(svg.height),
		};
	} catch (e) {
		const viewBox = svg.viewBox.baseVal;
		return { width: viewBox.width, height: viewBox.height };
	}
}

/**
 * 获取图片的尺寸，同时支持像素图和 SVG 图。
 * 如果参数是URL，则根据响应的 Content-Type 头判断图片类型。
 *
 * 详细的说明请见 getRasterImageResolution() 和 getSVGImageResolution() 的文档。
 *
 * @param image 图片文件或URL
 * @return 尺寸信息
 * @throw 如果参数是URL且响应缺少Content-Type头
 */
export async function getImageResolution(image: string | Blob) {
	if (typeof image === "string") {
		const res = await fetch(image, { credentials: "include" });
		const type = res.headers.get("Content-Type");

		if (type === null) {
			throw new Error("响应没有 Content-Type 头，" +
				"请自己判断图片类型使用 getRasterImageResolution 或 getSVGImageResolution.");
		}

		if (type.indexOf("svg") !== -1) {
			return svgSizeOrViewBox(await res.text());
		} else {
			return getRasterImageResolution(await res.blob());
		}
	} else if (image.type.indexOf("svg") === -1) {
		return getRasterImageResolution(image);
	} else {
		return svgSizeOrViewBox(await image.text());
	}
}
