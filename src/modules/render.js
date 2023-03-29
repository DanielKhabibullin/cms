import {tbody} from './const.js';
import {createOption, createRow} from './createElements.js';
import {fetchRequest} from './fetchRequest.js';

export const getTotalPrice = () => {
	const total = Array.from(tbody.querySelectorAll('.table__cell_price'));
	let sumTotal = 0;
	total.forEach(e => {
		sumTotal += Number(e.innerHTML);
	});
	document.querySelector('.cms__total-price').textContent = `$ ${sumTotal}`;
	return sumTotal;
};

export const goodNumberChange = () => {
	const goods = tbody.querySelectorAll('tr');
	goods.forEach((item, index) => {
		item.cells[0].textContent = `${index + 1}`;
	});
	getTotalPrice();
};

export const renderGoods = elem => {
	fetchRequest(`/api/goods`, {
		method: 'get',
		callback(err, data) {
			if (err) return;
			const allRow = data.map(createRow);
			elem.append(...allRow);
			goodNumberChange();
		},
	});
};

export const renderFilteredGoods = (elem, text) => {
	elem.innerHTML = '';

	fetchRequest(`/api/goods`, {
		method: 'GET',
		callback(err, goods) {
			if (err) return;
			const filteredGoods = goods.filter(item =>
				item.title.toLowerCase().startsWith(text.toLowerCase()) ||
					item.category.toLowerCase().startsWith(text.toLowerCase()));
			const allRow = filteredGoods.map(createRow);
			elem.append(...allRow);
		},
	});
};

export const renderCategories = datalist => {
	fetchRequest(`/api/category`, {
		method: 'get',
		callback(err, data) {
			if (err) return;
			const allOptions = data.map(createOption);
			datalist.append(...allOptions);
		},
	});
};
