export const modalTitle = document.querySelector('.modal__title');
export const modalForm = document.querySelector('.modal__form');
export const modalCheckbox = document.querySelector('.modal__checkbox');
export const modalInputDiscount = document
	.querySelector('.modal__input_discount');
export const modalSubmit = document.querySelector('.modal__submit');
export const totalPrice = modalForm.querySelector('.modal__total-price');
export const tbody = document.querySelector('.table__body');
export const buttonAdd = document.querySelector('.panel__add-goods');
export const buttonModalClose = document.querySelector('.modal__close');
export const overlay = document.querySelector('.overlay');
export const formOverlay = document.querySelector('.overlay__modal');
export const spanId = document.querySelector('.vendor-code__id');
export const randomId = Math.floor(Math.random() * 10000000000000);
export const buttonAddImage = document.querySelector('.modal__file');
export const modalFieldset = document.querySelector('.modal__fieldset');
export const apiURL = 'http://localhost:3000/api/goods';
export const API_URL = 'https://conscious-stellar-rainbow.glitch.me';

// GET /api/goods - получить список товаров, в query параметр search можно передать поисковый запрос
// POST /api/goods - создать товар, в теле запроса нужно передать объект {title: string, description: string, price: number, discount?: number, count: number, units: string, images?: [] }
// GET /api/goods/{id} - получить товар по его ID
// PATCH /api/goods/{id} - изменить товар с ID, в теле запроса нужно передать объект {title: string, description: string, price: number, discount?: number, c ount: number, units: string, images?: [] }
// DELETE /api/goods/{id} - удалить товар по ID
// GET /api/goods/discount - получить список дисконтных товаров
// GET /api/goods/{category} - получить список товаров по категории
// GET /api/category - получить список категорий {[]}