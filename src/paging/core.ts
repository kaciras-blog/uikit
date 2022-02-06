export interface PageData {
	total: number;
	items: unknown[];
}

// Vue 有 BUG，使用 setup script 同时不能再通常 script 里导出，所以放这了。
export enum State {
	FREE,
	LOADING,
	FAILED,
	ALL_LOADED,
}

export type PageLinkFn = (start: number, count: number) => string;

export type LoadDateFn = (start: number, count: number, signal: AbortSignal) => Promise<PageData>;
