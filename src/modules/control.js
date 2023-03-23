import {data} from '../index.js';
import {buttonAdd, buttonAddImage, modalCheckbox, modalFieldset, modalForm,
	modalInputDiscount, overlay, randomId, spanId, tbody} from './const.js';
import {createRow} from './createElements.js';
import {getTotalPrice, goodNumberChange} from './render.js';
export const addItemData = item => {
	data.push(item);
};

const openModal = () => {
	overlay.classList.add('active');
	spanId.textContent = `${randomId}`;
};

const closeModal = () => {
	overlay.classList.remove('active');
};

export const modalControl = (buttonAdd, overlay, randomId) => {
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

export const addItemPage = (item, tbody) => {
	tbody.append(createRow(item));
};

export const formControl = (form, tbody, closeModal, randomId) => {
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
		goodNumberChange();
	});
};

export const rowControl = () => {
	tbody.addEventListener('click', e => {
		const target = e.target;
		if (target.closest('.table__btn_pic')) {
			const width = 800;
			const height = 600;
			const left = (screen.width / 2) - (width / 2);
			const top = (screen.height / 2) - (height / 2);
			open(target.dataset.pic, 'picture', `width=${width},
				height=${height}, top=${top}, left=${left}`);
		}
	});
};

export const modalActivate = () => {
	modalForm.price.addEventListener('blur', () => {
		modalForm.total.value = `$ ${modalForm.price.value *
			modalForm.count.value}`;
	});
	modalForm.count.addEventListener('blur', () => {
		modalForm.total.value = `$ ${modalForm.price.value *
			modalForm.count.value}`;
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
			goodNumberChange();
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

	modalControl(buttonAdd, overlay, randomId);
	formControl(modalForm, tbody, closeModal, randomId);
};

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
