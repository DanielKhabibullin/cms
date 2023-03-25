import {overlay, tbody} from './const.js';
import {rowControl} from './control.js';
import {createRow} from './createElements.js';

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
};

export const renderGoods = (err, data) => {
	if (err) {
		console.warn(err, data);
		const h2 = document.createElement('h2');
		h2.style.color = 'red';
		h2.textContent = err;
		document.body.append(h2);
		return;
	}
	data.map((item) => {
		tbody.append(createRow(item));
	});
	goodNumberChange();
	getTotalPrice();
	rowControl();
	overlay.classList.remove('active');

	return true;
};

// export const renderCategory = (err, data) => {

// };
