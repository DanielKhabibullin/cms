export const tbody = document.querySelector('.table__body');
export const buttonAdd = document.querySelector('.panel__add-goods');
// export const API_URL = 'http://localhost:3000';
export const apiURL = 'https://conscious-stellar-rainbow.glitch.me';
export const searchInput = document.querySelector('.panel__input');

// GET /api/goods - получить список товаров, в query параметр search можно передать поисковый запрос
// POST /api/goods - создать товар, в теле запроса нужно передать объект {title: string, description: string, price: number, discount?: number, count: number, units: string, images?: [] }
// GET /api/goods/{id} - получить товар по его ID
// PATCH /api/goods/{id} - изменить товар с ID, в теле запроса нужно передать объект {title: string, description: string, price: number, discount?: number, c ount: number, units: string, images?: [] }
// DELETE /api/goods/{id} - удалить товар по ID
// GET /api/goods/discount - получить список дисконтных товаров
// GET /api/goods/{category} - получить список товаров по категории
// GET /api/category - получить список категорий {[]}
