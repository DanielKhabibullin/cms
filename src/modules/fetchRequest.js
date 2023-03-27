import {apiURL} from './const.js';

export const fetchRequest = async (url, {
	method = 'get',
	callback,
	body,
	headers,
}) => {
	try {
		const options = {
			method,
		};

		if (body) options.body = JSON.stringify(body);
		if (headers) options.headers = headers;

		const response = await fetch(`${apiURL}${url}`, options);

		if (response.ok) {
			const data = await response.json();
			if (callback) return callback(null, data);
			return;
		}

		throw new Error(`Ошибка ${response.status} ${response.statusText}`);
	} catch (err) {
		console.log(err);
		if (err.message.includes('404') ||
			err.message.includes('422') || err.message.includes('500')) {
			callback(err.message);
			return;
		}
		callback(`Что-то пошло не так...`);
	}
};
