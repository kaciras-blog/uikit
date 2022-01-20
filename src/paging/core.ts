export interface PageData {
	total: number;
	items: unknown[];
}

export type LoadPageFn = (start: number, count: number, signal: AbortSignal) => Promise<PageData>;
