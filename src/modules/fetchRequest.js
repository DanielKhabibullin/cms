import {apiURL} from './const.js';
import {renderGoods} from './render.js';

// const URL = 'https://conscious-stellar-rainbow.glitch.me/api/goods';

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

		const response = await fetch(url, options);
		if (response.ok) {
			const data = await response.json();
			if (callback) return callback(null, data);
			return;
		}
		throw new Error(`Ошибка: ${response.statusText}`);
	} catch (err) {
		return callback(err);
	}
};

export const getGoods = async () => {
	const result = await fetchRequest(apiURL, {
		method: 'get',
		callback: renderGoods,
	});
	if (result) {
	//	reservationButton.disabled = true;
	}
};
