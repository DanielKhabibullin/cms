export const createRow = (item) => {
	const tableRow = document.createElement('tr');
	// const num = document.querySelectorAll('tr');
	tableRow.innerHTML = `
		<td class="table__cell"></td>
		<td class="table__cell table__cell_left table__cell_name"
		data-id="${item.id}">
			<span class="table__cell-id">id: ${item.id}</span>${item.name}</td>
		<td class="table__cell table__cell_left">${item.category}</td>
		<td class="table__cell">${item.units}</td>
		<td class="table__cell">${item.count}</td>
		<td class="table__cell">${item.price}</td>
		<td class="table__cell  table__cell_price">${item.count * item.price}</td>
		<td class="table__cell table__cell_btn-wrapper">
			<button class="table__btn table__btn_pic" data-pic="https://i.ibb.co/6H9QXVg/pepe.jpg"></button>
			<button class="table__btn table__btn_edit"></button>
			<button class="table__btn table__btn_del"></button>
		</td>
	`;
	return tableRow;
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
