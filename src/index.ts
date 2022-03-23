import http from 'http';
import { StringDecoder } from 'string_decoder';

import router from './router';
import { RequestData } from './types';

const server = http.createServer((req, res) => {
	const baseURL = 'http://' + req.headers.host + '/';
	const url = new URL(req.url ?? "", baseURL);

	const trimmedPath = url.pathname.replace(/^\/+|\/+$/g, '');
	const method = req.method?.toLowerCase();
	const searchParams = url.searchParams;
	const headers = req.headers;

	const decoder = new StringDecoder('utf-8');
	let payload = '';

	req.on('data', (data) => {
		payload += decoder.write(data);
	});

	req.on('end', () => {
		payload += decoder.end();

		const chosenHandler = trimmedPath in router ? trimmedPath : 'notFound';

		const requestData: RequestData = {
			trimmedPath,
			method,
			searchParams,
			headers,
			payload
		}

		router[chosenHandler](requestData, (statusCode, result) => {
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			result = result ?? {};
			res.end(JSON.stringify(result));
		});
	});
});

server.listen(3000, () => {
	console.log('listening on port 3000');
});

