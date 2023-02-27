'use strict';
// import data from "../goods.json" assert { type: "json" };

let data = [
	{
		"id": 1,
		"title": "Смартфон Xiaomi 11T 8/128GB",
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
		"title": "Радиоуправляемый автомобиль Cheetan",
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
		"title": "ТВ приставка MECOOL KI",
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
		"title": "Витая пара PROConnect 01-0043-3-25",
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
const tbody = document.querySelector('.table__body');
const buttonAdd = document.querySelector('.panel__add-goods');
const buttonModalClose = document.querySelector('.modal__close');
const overlay = document.querySelector('.overlay');
const formOverlay = document.querySelector('.overlay__modal');

overlay.classList.remove('active');

const createRow = (item) => {
	const tableRow = document.createElement('tr');
	tableRow.innerHTML = `
		<td class="table__cell ">${item.id}</td>
		<td class="table__cell table__cell_left table__cell_name"
		data-id="${item.id}">
			<span class="table__cell-id">id: ${item.id}</span>${item.title}</td>
		<td class="table__cell table__cell_left">${item.category}</td>
		<td class="table__cell">${item.units}</td>
		<td class="table__cell">${item.count}</td>
		<td class="table__cell">${item.price}</td>
		<td class="table__cell">${item.count * item.price}</td>
		<td class="table__cell table__cell_btn-wrapper">
			<button class="table__btn table__btn_pic"></button>
			<button class="table__btn table__btn_edit"></button>
			<button class="table__btn table__btn_del"></button>
		</td>
	`;
	return tableRow;
};

const renderGoods = (data) => {
	data.map((item) => {
		tbody.append(createRow(item));
	});
};

renderGoods(data);

buttonAdd.addEventListener('click', () => {
	overlay.classList.add('active');
});

overlay.addEventListener('click', e => {
	const target = e.target;
	if (target === overlay || target.classList.contains('modal__close')) {
		overlay.classList.remove('active');
	}
});

buttonModalClose.addEventListener('click', () => {
	overlay.classList.remove('active');
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
	}
});



// const json = JSON.stringify(data, null, 2);
// console.log('json: ', json);

