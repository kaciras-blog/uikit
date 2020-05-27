type Size = { width: number, height: number };

/**
 * 获取图片的尺寸，该函数基于 HTMLImageElement 只能在浏览器端使用。
 *
 * @param image 图片文件或URL
 * @return 尺寸 { width, height }，单位像素
 */
export function getRasterImageSize(image: string | Blob) {
	const el = document.createElement("img");

	const promise = new Promise<Size>((resolve, reject) => {
		el.onerror = reject;
		el.onload = () => resolve({ width: el.width, height: el.height });
	});

	if (typeof image === "string") {
		el.src = image;
		return promise;
	} else {
		el.src = URL.createObjectURL(image);
		return promise.finally(() => URL.revokeObjectURL(el.src));
	}
}

/**
 * 有些SVG没有设置width和height属性，比如AI导出时选择了“响应”选项，
 * 此时无法通过<img>来获取尺寸，应选用SVG的viewBox属性。
 *
 * @param image 图片文件或URL
 */
export async function getSVGImageSize(image: string | Blob) {
	let svgText;
	if (typeof image === "string") {
		svgText = await (await fetch(image)).text();
	} else {
		svgText = await image.text();
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(svgText, "image/svg+xml");
	const svg = doc.documentElement as unknown as SVGSVGElement;

	const width = svg.width.baseVal;
	const height = svg.height.baseVal;

	if (width.unitType === 2 || height.unitType === 2) {
		return svg.viewBox.baseVal;
	}
	return { width: width.value, height: height.value };
}
