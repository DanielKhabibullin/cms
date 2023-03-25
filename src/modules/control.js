import {apiURL, buttonAdd, buttonAddImage, modalCheckbox, modalFieldset,
	modalForm, modalInputDiscount, overlay, randomId, spanId, tbody,
} from './const.js';
import {createRow} from './createElements.js';
import {modalShow} from './deleteModal.js';
import {fetchRequest} from './fetchRequest.js';
import {getTotalPrice, goodNumberChange} from './render.js';
import {toBase64} from './sendImage.js';

const openModal = () => {
	overlay.classList.add('active');
	// if (!currentId) {
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
	form.addEventListener('submit', async e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newItem = Object.fromEntries(formData);
		newItem.id = randomId;
		if (!newItem.discount) {
			newItem.discount = 0;
		}
		newItem.image = await toBase64(newItem.image);
		addItemPage(newItem, tbody); // TODO
		fetchRequest(apiURL, {
			method: 'post',
			body: newItem,
			callback(err, data) {
				if (err) {
					console.warn(err, data);
					form.textContent = err;
				}
				form.textContent = `Товар ${data.title} добавлен в таблицу`; // todo
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});
		form.reset();
		closeModal();
		// const imageContainer = document.querySelector('.image-container');
		// if (imageContainer) {
		// 	imageContainer.remove();
		// }
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

	modalCheckbox.addEventListener('change', () => {
		if (modalCheckbox.checked) {
			modalInputDiscount.removeAttribute('disabled');
			modalInputDiscount.setAttribute('required', true);
			modalTotalPrice();
		} else {
			modalInputDiscount.value = 0;
			modalInputDiscount.setAttribute('disabled', true);
			modalTotalPrice();
		}
	});

	modalControl(buttonAdd, overlay, randomId);
	formControl(modalForm, tbody, closeModal, randomId);
};

tbody.addEventListener('click', async e => {
	const target = e.target;
	if (target.closest('.table__btn_del')) {
		const row = target.closest('tr');
		const currentTitle = row.querySelector('.table__cell_title').textContent;
		const currentId = row.querySelector('.table__cell_name')
			.getAttribute('data-id');
		modalShow(null, currentId, currentTitle);
		document.body.style.overflow = 'hidden';
	}
});

tbody.addEventListener('click', async e => {
	const target = e.target;
	if (target.closest('.table__btn_edit')) {
		const row = target.closest('tr');
		const currentId = row.querySelector('.table__cell_name')
			.getAttribute('data-id');
		openModal();
		document.body.style.overflow = 'hidden';
	}
});

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
