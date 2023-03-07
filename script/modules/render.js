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

export const renderGoods = (arr) => {
	arr.map((item) => {
		tbody.append(createRow(item));
	});
	goodNumberChange();
	getTotalPrice();
	rowControl();
	overlay.classList.remove('active');
};


