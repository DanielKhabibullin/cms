import {apiURL, buttonAddImage, modalCheckbox, modalFieldset,
	modalForm, modalInputDiscount, overlay, randomId} from './const.js';
import {createRow} from './createElements.js';
import {fetchRequest} from './fetchRequest.js';
import {showConfirmation, showError, showModal} from './modal.js';
import {getTotalPrice, goodNumberChange, renderFilteredGoods,
} from './render.js';
import {toBase64} from './sendImage.js';

const updateRow = (id, item) => {
	const row = document.querySelector(`[data-id="${id}"]`);
	row.replaceWith(createRow(item));
};

export const addButtonControl = (buttonAdd, tbody) => {
	buttonAdd.addEventListener('click', () => {
		showModal(null, null, tbody);
	});
};

export const overlayControl = (overlay, closeButton) => {
	overlay.addEventListener('click', ({target}) => {
		if (target === overlay || target === closeButton) {
			overlay.classList.remove('active');
		}
	});
};

export const formControl = (form, overlay, method, tbody, id, newId) => {
	form.addEventListener('input', ({target}) => {
		if (target === form.discount || target === form.count ||
			target === form.price) {
			target.value = target.value.replace(/\D/, '');
		} else if (target === form.units) {
			target.value = target.value.replace(/[^а-я]/i, '');
		} else if (target === form.caregory) {
			target.value = target.value.replace(/[^а-я\s]/i, '');
		}
	});

	form.addEventListener('submit', async e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newItem = Object.fromEntries(formData);
		id ? newItem.id = id : newItem.id = newId;
		if (!newItem.discount) {
			newItem.discount = 0;
		}
		newItem.image = await toBase64(newItem.image);
		if (newItem.image === 'data:') delete newItem.image;

		fetchRequest(`/api/goods${id ? '/' + id : ''}`, {
			method,
			body: newItem,
			headers: {
				'Content-Type': 'application/json',
			},
			callback(err, item) {
				if (err) {
					console.warn(err, item);
					showError(err);
					return;
				}
				form.reset();
				overlay.classList.remove('active');

				if (tbody) {
					tbody.append(createRow(item));
				} else if (id) {
					updateRow(item.id, item);
				}
				getTotalPrice();
				goodNumberChange();
			},
		});
	});
};

export const rowControl = (tbody) => {
	tbody.addEventListener('click', e => {
		const target = e.target;
		const row = target.closest('tr');
		const currentId = row.dataset.id;
		// const currentId = row.querySelector('.table__cell_name')
		// .getAttribute('data-id');
		if (target.closest('.table__btn_del')) {
			const currentTitle = row.querySelector('.table__cell_title').textContent;
			showConfirmation(currentId, row, currentTitle);
			document.body.style.overflow = 'hidden';
		} else if (target.closest('.table__btn_pic') && row.dataset.pic) { // TODO
			const width = 800;
			const height = 600;
			const left = (screen.width / 2) - (width / 2);
			const top = (screen.height / 2) - (height / 2);
			const popup = open(target.dataset.pic, 'picture', `width=${width},
				height=${height}, top=${top}, left=${left}`);
			popup.document.body.innerHTML = `
			<img src="${apiURL}/${row.dataset.pic}" style="max-width: 600px;">
			`;
		} else if (target.closest('.table__btn_edit')) {
			fetchRequest(`/api/goods/${currentId}`, {
				method: 'GET',
				callback(err, item) {
					showModal(err, item, tbody);
					document.body.style.overflow = 'hidden';
				},
			});
		}
	});
};

export const modalTotalPrice = () => {
	if (!modalForm.discount.value) {
		modalForm.discount.value = 0;
	}
	const discount = (modalForm.price.value *
		modalForm.discount.value / 100).toFixed(2);
	const totalItemPrice = (modalForm.count.value *
		(modalForm.price.value - discount)).toFixed(2);
	modalForm.total.value = `$ ${totalItemPrice}`;
};

export const modalActivate = () => {
	let timeout = null;
	modalForm.price.addEventListener('input', () => {
		clearTimeout(timeout);
		timeout = setTimeout(modalTotalPrice, 300);
	});
	modalForm.discount.addEventListener('input', () => {
		clearTimeout(timeout);
		timeout = setTimeout(modalTotalPrice, 300);
	});
	modalForm.count.addEventListener('input', () => {
		clearTimeout(timeout);
		timeout = setTimeout(modalTotalPrice, 300);
	});
};

export const discountCheckboxControl = () => {
	modalCheckbox.addEventListener('change', () => {
		if (modalCheckbox.checked) {
			modalInputDiscount.removeAttribute('disabled');
			modalInputDiscount.setAttribute('required', true);
			modalInputDiscount.style.backgroundColor = '#F4F2FF';

			modalTotalPrice();
		} else {
			modalInputDiscount.value = '';
			modalInputDiscount.setAttribute('disabled', true);
			modalInputDiscount.style.backgroundColor = '#dbdbdb';
			modalTotalPrice();
		}
	});
};

export const fileControl = () => {
	buttonAddImage.addEventListener('change', () => {
		const file = buttonAddImage.files[0];
		const fileSizeInMB = file.size / (1024 * 1024);
		const error = document.querySelector('.modal__error');
		const imageContainer = document.querySelector('.image-container');
		if (imageContainer) {
			imageContainer.remove();
		}

		if (error) {
			error.remove();
		}
		if (buttonAddImage.files.length > 0 && fileSizeInMB > 1) {
			const errorElement = document.createElement('h3');
			errorElement.classList.add('modal__error');
			errorElement.textContent = `Изображение не должно превышать размер 1 Мб`;
			modalFieldset.append(errorElement);
		}
		if (buttonAddImage.files.length > 0 && fileSizeInMB < 1) {
			const imageContainerNew = document.createElement('div');
			imageContainerNew.classList.add('image-container');
			modalFieldset.append(imageContainerNew);
			const preview = document.createElement('img');
			preview.onload = () => URL.revokeObjectURL(preview.src);
			preview.src = URL.createObjectURL(file);
			imageContainerNew.append(preview);
		}
	});
};

export const confirmationControl = (modal, id, row) => {
	modal.addEventListener('click', ({target}) => {
		if (target === modal || target.closest('.modal__cancel') ||
			target.closest('.modal__close')) {
			modal.remove();
			document.body.style.overflow = 'auto';
		}

		if (target.classList.contains('modal__submit')) {
			fetchRequest(`/api/goods/${id}`, {
				method: 'DELETE',
				callback(err) {
					if (err) {
						showError(err);
						return;
					}

					getTotalPrice();
					row.remove();
					document.body.style.overflow = 'auto';
					goodNumberChange();
					modal.remove();
				},
			});
		}
	});
};

export const searchControl = (search, tbody) => {
	search.addEventListener('input', e => {
		const target = e.target;
		const text = target.value;

		setTimeout(() => {
			if (text === target.value) {
				renderFilteredGoods(tbody, text);
			}
		}, 300);
	});
};
