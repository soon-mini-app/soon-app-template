interface Result {
	code: number;
	message: string;
}

export interface ResultData<T = unknown> extends Result {
    data: T;
}