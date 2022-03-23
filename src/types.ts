import http from 'http';

export interface RequestData {
	trimmedPath: string,
	method?: string,
	searchParams: URLSearchParams,
	headers: http.IncomingHttpHeaders,
	payload: string
}

export type Handler = (
	requestData: RequestData,
	callback: (status: number, payload?: object) => void
) => void;

export interface Router {
	[name: string]: Handler;
};