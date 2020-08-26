export interface PagingModel<T> {

	total: number;
	index: number;

	addItem(item: T): Promise<void>;

	loadNext(): Promise<void>;



}

export interface NPagingModel<T> extends PagingModel<T> {

	jumpTo(index: number): Promise<void>;
}
