import {apiURL, buttonAdd, searchInput} from './const.js';
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

export const addButtonControl = (tbody) => {
	buttonAdd.addEventListener('click', () => {
		showModal(null, null, tbody);
		document.body.style.overflow = 'hidden';
	});
};

export const overlayControl = (overlay) => {
	overlay.addEventListener('click', ({target}) => {
		if (target === overlay || target.closest('.modal__close') ||
		target.closest('.overlay__message_close')) {
			overlay.remove();
			document.body.style.overflow = 'auto';
		}
	});
};

export const formControl = (form, overlay, method, tbody, id) => {
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

		newItem.image = await toBase64(newItem.image);
		if (newItem.image === 'data:') delete newItem.image;
		const imageContainer = document.querySelector('.image-container');
		if (!imageContainer) {
			newItem.image = 'image/notimage.jpg';
		}

		fetchRequest(`/api/goods${id ? '/' + id : ''}`, {
			method,
			body: newItem,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			callback(err, item) {
				if (err) {
					console.warn(err, item);
					showError(err);
					return;
				}
				form.reset();
				overlay.remove();

				if (tbody) {
					tbody.append(createRow(item));
				} else if (id) {
					updateRow(item.id, item);
				}
				document.body.style.overflow = 'auto';
				goodNumberChange();
			},
		});
	});
};

export const discountCheckboxControl = (modalCheckbox, modalInputDiscount) => {
	modalCheckbox.addEventListener('change', () => {
		modalInputDiscount.disabled = !modalInputDiscount.disabled;

		if (modalInputDiscount.disabled) {
			modalInputDiscount.value = '0';
		}
	});
};

export const rowControl = (tbody) => {
	tbody.addEventListener('click', e => {
		const target = e.target;
		const row = target.closest('tr');
		const currentId = row.dataset.id;
		if (target.closest('.table__btn_del')) {
			const currentTitle = row.querySelector('.table__cell_title').textContent;
			showConfirmation(currentId, row, currentTitle);
			document.body.style.overflow = 'hidden';
		} else if (target.closest('.table__btn_pic') && row.dataset.pic) {
			const width = 800;
			const height = 600;
			const left = (screen.width / 2) - (width / 2);
			const top = (screen.height / 2) - (height / 2);
			const popup = open('about:blank', 'picture', `width=${width},
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

export const modalActivate = (modalForm, modalCheckbox, modalInputPrice,
		modalInputCount, modalInputDiscount, totalPrice) => {
	const modalTotalPrice = () => {
		const discount = (modalForm.price.value *
			modalInputDiscount.value / 100).toFixed(2);
		const totalItemPrice = (modalForm.count.value *
			(modalForm.price.value - discount)).toFixed(2);
		totalPrice.value = `$ ${totalItemPrice}`;
	};
	let timeout = null;
	modalCheckbox.addEventListener('change', () => {
		modalInputDiscount.disabled = !modalInputDiscount.disabled;

		if (modalInputDiscount.disabled) {
			modalInputDiscount.value = 0;
		}
		modalTotalPrice();
	});
	modalInputPrice.addEventListener('input', () => {
		clearTimeout(timeout);
		timeout = setTimeout(modalTotalPrice, 300);
	});
	modalInputDiscount.addEventListener('input', () => {
		clearTimeout(timeout);
		timeout = setTimeout(modalTotalPrice, 300);
	});
	modalInputCount.addEventListener('input', () => {
		clearTimeout(timeout);
		timeout = setTimeout(modalTotalPrice, 300);
	});
};

export const fileControl = (buttonAddImage, modalFieldset) => {
	const imageContainer = document.querySelector('.image-container');
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
	if (imageContainer) {
		imageContainer.addEventListener('click', () => {
			imageContainer.remove();
		});
	}
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

export const searchControl = (tbody) => {
	searchInput.addEventListener('input', e => {
		const target = e.target;
		const text = target.value;

		setTimeout(() => {
			if (text === target.value) {
				renderFilteredGoods(tbody, text);
			}
		}, 300);
	});
};
