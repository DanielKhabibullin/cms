'use strict';
// import data from "../goods.json" assert { type: "json" };

let data = [
	{
		"id": 1,
		"name": "Смартфон Xiaomi 11T 8/128GB",
		"price": 27000,
		"description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
		"category": "mobile-phone",
		"discont": false,
		"count": 3,
		"units": "шт",
		"images": {
			"small": "img/smrtxiaomi11t-m.jpg",
			"big": "img/smrtxiaomi11t-b.jpg"
		},
	},
	{
		"id": 2,
		"name": "Радиоуправляемый автомобиль Cheetan",
		"price": 4000,
		"description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
		"category": "toys",
		"discont": 5,
		"count": 1,
		"units": "шт",
		"images": {
			"small": "img/cheetancar-m.jpg",
			"big": "img/cheetancar-b.jpg"
		}
	},
	{
		"id": 3,
		"name": "ТВ приставка MECOOL KI",
		"price": 12400,
		"description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
		"category": "tv-box",
		"discont": 15,
		"count": 4,
		"units": "шт",
		"images": {
			"small": "img/tvboxmecool-m.jpg",
			"big": "img/tvboxmecool-b.jpg"
		}
	},
	{
		"id": 4,
		"name": "Витая пара PROConnect 01-0043-3-25",
		"price": 22,
		"description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
		"category": "cables",
		"discont": false,
		"count": 420,
		"units": "м",
		"images": {
			"small": "img/lan_proconnect43-3-25.jpg",
			"big": "img/lan_proconnect43-3-25-b.jpg"
		}
	}
];

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const modalSubmit = document.querySelector('.modal__submit');
const totalPrice = modalForm.querySelector('.modal__total-price');
const tbody = document.querySelector('.table__body');
const buttonAdd = document.querySelector('.panel__add-goods');
const buttonModalClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');
const formOverlay = document.querySelector('.overlay__modal');
const spanId = document.querySelector('.vendor-code__id');

overlay.classList.remove('active');
const randomId = Math.floor(Math.random() * 10000000000000);

const addItemData = item => {
	data.push(item);
	console.log('data: ', data);
};

const createRow = (item) => {
	const tableRow = document.createElement('tr');
	const num = document.querySelectorAll('tr');
	tableRow.innerHTML = `
		<td class="table__cell ">${num.length}</td>
		<td class="table__cell table__cell_left table__cell_name"
		data-id="${item.id}">
			<span class="table__cell-id">id: ${item.id}</span>${item.name}</td>
		<td class="table__cell table__cell_left">${item.category}</td>
		<td class="table__cell">${item.units}</td>
		<td class="table__cell">${item.count}</td>
		<td class="table__cell">${item.price}</td>
		<td class="table__cell  table__cell_price">${item.count * item.price}</td>
		<td class="table__cell table__cell_btn-wrapper">
			<button class="table__btn table__btn_pic"></button>
			<button class="table__btn table__btn_edit"></button>
			<button class="table__btn table__btn_del"></button>
		</td>
	`;
	return tableRow;
};

const renderGoods = (arr) => {
	arr.map((item) => {
		tbody.append(createRow(item));
	});
};

// modalForm.querySelectorAll('input').forEach(input => {
// 	if (input.name === 'count' || input.name === 'discount_count' ||
// 	input.name === 'price') {
// 		input.setAttribute('type', 'number');
// 	}
// 	if (input.name !== 'image' && input.name !== 'discount') {
// 		input.setAttribute('required', true);
// 	}
// });

const modalControl = (buttonAdd, overlay, randomId) => {
	const openModal = () => {
		overlay.classList.add('active');
		spanId.textContent = `${randomId}`;
	};

	const closeModal = () => {
		overlay.classList.remove('active');
	};

	buttonAdd.addEventListener('click', openModal);

	overlay.addEventListener('click', e => {
		const target = e.target;
		if (target === overlay || target.closest('.modal__close')) {
			closeModal();
		}
	});
	return {
		closeModal,
	};
};

const addItemPage = (item, tbody) => {
	tbody.append(createRow(item));
};

const getTotalPrice = () => {
	const total = Array.from(tbody.querySelectorAll('.table__cell_price'));
	let sumTotal = 0;
	total.forEach(e => {
		sumTotal += Number(e.innerHTML);
	});
	document.querySelector('.cms__total-price').textContent = `$ ${sumTotal}`;
	return sumTotal;
};

const formControl = (form, tbody, closeModal, randomId) => {
	form.addEventListener('submit', e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newItem = Object.fromEntries(formData);
		newItem.id = randomId;
		console.log('newItem: ', newItem);
		addItemPage(newItem, tbody);
		addItemData(newItem);
		form.reset();
		closeModal();
		getTotalPrice();
	});
};

const {closeModal} = modalControl(buttonAdd, overlay, randomId);
renderGoods(data);
formControl(modalForm, tbody, closeModal, randomId);

modalForm.price.addEventListener('blur', () => {
	modalForm.total.value = `$ ${modalForm.price.value * modalForm.count.value}`;
});
modalForm.count.addEventListener('blur', () => {
	modalForm.total.value = `$ ${modalForm.price.value * modalForm.count.value}`;
});

tbody.addEventListener('click', e => {
	const target = e.target;
	if (target.closest('.table__btn_del')) {
		// target.closest('.table__body tr').remove();
		const row = target.closest('tr');
		const currentId = +row.querySelector('td').textContent;
		data.splice(data.findIndex(item => item.id === currentId), 1);
		console.log(data);
		row.remove();
		getTotalPrice();
	}
});

modalCheckbox.addEventListener('change', () => {
	if (modalCheckbox.checked) {
		modalInputDiscount.removeAttribute('disabled');
		modalInputDiscount.setAttribute('required', true);
	} else {
		modalInputDiscount.value = '';
		modalInputDiscount.setAttribute('disabled', true);
	}
});

getTotalPrice();
// const json = JSON.stringify(data, null, 2);
// console.log('json: ', json);

