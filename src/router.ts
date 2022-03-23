import { Handler, Router } from './types';

const sample: Handler = (_data, callback) => {
	callback(200, { message: 'lolz' });
}

const notFound: Handler = (_data, callback) => {
	callback(404);
}

const router: Router = {
	sample,
	notFound
}

export default router;