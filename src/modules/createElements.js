export const createRow = (item) => {
	const {id, title, price, category, discount, units,
		count, image} = item;
	const tableRow = document.createElement('tr');
	const discountPrice = (price * discount / 100).toFixed(2);
	const totalItemPrice = (count * (price - discountPrice)).toFixed(2);
	tableRow.dataset.id = id;
	tableRow.innerHTML = `
		<td class="table__cell"></td>
		<td class="table__cell table__cell_left table__cell_name"
		data-id="${id}">
			<span class="table__cell-id">id: ${id}</span>
			<p class="table__cell_title">${title}</p></td>
		<td class="table__cell table__cell_left">${category}</td>
		<td class="table__cell">${units}</td>
		<td class="table__cell">${count}</td>
		<td class="table__cell">${price}</td>
		<td class="table__cell  table__cell_price">${totalItemPrice}</td>
		<td class="table__cell table__cell_btn-wrapper">
			<button class="table__btn table__btn_pic" data-pic="${image}"> 
			</button>
			<button class="table__btn table__btn_edit"></button>
			<button class="table__btn table__btn_del"></button>
		</td>
	`;
	return tableRow;
};

export const createOption = category => {
	const option = document.createElement('option');
	option.value = category;
	return option;
};

// modalForm.querySelectorAll('input').forEach(input => {
// if (input.name === 'count' || input.name === 'discount_count' ||
// input.name === 'price') {
// input.setAttribute('type', 'number');
// }
// if (input.name !== 'image' && input.name !== 'discount') {
// input.setAttribute('required', true);
// }
// }); // ?? HTML
