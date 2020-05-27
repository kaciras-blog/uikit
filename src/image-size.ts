type Size = { width: number, height: number };

/**
 * 获取像素图的尺寸，该函数只能在浏览器端使用。
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
 * 获取SVG图片的尺寸，该函数只能在浏览器端使用。
 *
 * 有些SVG没有设置width和height属性，比如AI导出时选择了“响应”选项，
 * 此时无法通过<img>来获取尺寸，应选用SVG的viewBox属性。
 *
 * 【注意】
 * SVG的长宽值可能含有小数，在转换为JS Number时可能产生精度误差。
 *
 * @param image 图片文件或URL
 * @return 尺寸 { width, height }，单位像素
 */
export async function getSVGImageSize(image: string | Blob): Promise<Size> {
	let svgText;
	if (typeof image === "string") {
		svgText = await (await fetch(image)).text();
	} else {
		svgText = await image.text();
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(svgText, "image/svg+xml");
	const svg = doc.documentElement as unknown as SVGSVGElement;

	/**
	 * 仅支持px单位和不带单位，因为其它单位与上下文有关，
	 *
	 * @param length SVG长度
	 * @throws 如果是不支持的单位
	 */
	function getLengthPx(length: SVGAnimatedLength) {
		const { baseVal } = length;

		switch (baseVal.unitType) {
			case SVGLength.SVG_LENGTHTYPE_NUMBER:
			case SVGLength.SVG_LENGTHTYPE_PX:
				return baseVal.value;
		}
		throw new Error("Unsupported SVG length unit.");
	}

	try {
		return { width: getLengthPx(svg.width), height: getLengthPx(svg.height) };
	} catch (e) {
		const viewBox = svg.viewBox.baseVal;
		return { width: viewBox.width, height: viewBox.height };
	}
}
