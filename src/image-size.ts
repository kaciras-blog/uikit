type Size = { width: number, height: number };

/**
 * 获取图片的尺寸，同时支持像素图和SVG图。
 * 如果参数是URL，则根据响应的Content-Type头判断图片类型。
 *
 * 详细的说明请见 getRasterImageSize() 和 getSVGImageSize() 的文档。
 *
 * @param image 图片文件或URL
 * @return 尺寸 { width, height }，单位像素
 * @throw 如果参数是URL且响应缺少Content-Type头
 */
export async function getImageSize(image: string | Blob) {
	if (typeof image === "string") {
		const res = await fetch(image, { credentials: "include" });
		const type = res.headers.get("Content-Type");

		if(type === null) {
			throw new Error("响应没有Content-Type头，请自己判断图片类型使用 getRasterImageSize 或 getSVGImageSize.");
		}

		if (type.indexOf("svg") === -1) {
			return getRasterImageSize(await res.blob());
		} else {
			return getRasterImageSize(await res.text());
		}
	} else if (image.type.indexOf("svg") === -1) {
		return getRasterImageSize(image);
	} else {
		return svgSizeOrViewBox(await image.text());
	}
}

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
export async function getSVGImageSize(image: string | Blob) {
	if (typeof image === "string") {
		const res = await fetch(image, { credentials: "include" });
		return svgSizeOrViewBox(await res.text());
	} else {
		return svgSizeOrViewBox(await image.text());
	}
}

function svgSizeOrViewBox(text: string): Size {
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, "image/svg+xml");
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
